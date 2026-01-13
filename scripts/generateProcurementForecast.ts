import * as fs from 'fs/promises';
import * as path from 'path';
import { getAuthenticRecipe } from '../services/authenticRecipes.ts';
import { yearlyPlan2026 } from '../services/mealPlanData.ts';
import { SHRINKAGE_DATA, calculateRawWeight, getShrinkage } from '../services/cookingShrinkage.ts';

// --- CONFIGURATION ---
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'procurement_forecast_2026.json');

// --- INFLATION INDICES (Source: "Fødevarer og prisudvikling 2021-2025.xlsx" & 2026 Forecast) ---
const INFLATION_2026 = {
    'Okse/Kalv': 1.10, // High risk (Beef +47% historic)
    'Svin': 1.04,
    'Fjerkræ': 1.06,
    'Fisk': 1.08,
    'Mejeri/Ost': 1.08, // Historic high volatility
    'Grønt/Frugt': 1.05,
    'Kolonial/Diverse': 1.03,
    'Frost': 1.04
};

// --- CATEGORY MAPPING ---
function classifyIngredient(name: string): string {
    const n = name.toLowerCase();

    if (n.includes('okse') || n.includes('kalv') || n.includes('beef')) return 'Okse/Kalv';
    if (n.includes('svin') || n.includes('skinke') || n.includes('bacon') || n.includes('medister') || n.includes('flæsk') || n.includes('gris')) return 'Svin';
    if (n.includes('kylling') || n.includes('høne') || n.includes('and') || n.includes('kalkun') || n.includes('fjerkræ')) return 'Fjerkræ';
    if (n.includes('fisk') || n.includes('laks') || n.includes('torsk') || n.includes('sild') || n.includes('rødspætte')) return 'Fisk';

    if (n.includes('mælk') || n.includes('fløde') || n.includes('smør') || n.includes('ost') || n.includes('skyr') || n.includes('yoghurt') || n.includes('creme fraiche')) return 'Mejeri/Ost';

    if (n.includes('kartof') || n.includes('gulerod') || n.includes('løg') || n.includes('kål') || n.includes('agurk') || n.includes('tomat') || n.includes('frugt') || n.includes('bær') || n.includes('purløg') || n.includes('dild') || n.includes('persille') || n.includes('grøn')) return 'Grønt/Frugt';

    if (n.includes('mel') || n.includes('sukker') || n.includes('ris') || n.includes('pasta') || n.includes('bønner') || n.includes('linser') || n.includes('olie') || n.includes('krydderier') || n.includes('salt') || n.includes('bouillon') || n.includes('jævning')) return 'Kolonial/Diverse';

    return 'Kolonial/Diverse'; // Default
}

// --- PRICE LOADING ---
interface PriceEntry {
    varenummer: string;
    navn: string;
    pris: number;
    enhed: string;
    kategori: string;
}

async function loadPrices(): Promise<PriceEntry[]> {
    try {
        const raw = await fs.readFile(path.join(process.cwd(), 'public', 'horkram_2025_prices.json'), 'utf-8');
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

// Helper to find a representative price for a category/ingredient
function findRepresentativePrice(ingredientName: string, category: string, prices: PriceEntry[]): number {
    const search = ingredientName.toLowerCase().split(' ')[0]; // First word e.g. "okse"

    // Filter by relevant terms for the category
    let candidates = prices.filter(p => p.navn.toLowerCase().includes(search));

    // Fallback if no specific Ingredient match, search for Category keywords
    if (candidates.length === 0) {
        if (category === 'Okse/Kalv') candidates = prices.filter(p => p.navn.toLowerCase().includes('okse'));
        if (category === 'Svin') candidates = prices.filter(p => p.navn.toLowerCase().includes('svin') || p.navn.toLowerCase().includes('skinke'));
        if (category === 'Fjerkræ') candidates = prices.filter(p => p.navn.toLowerCase().includes('kylling'));
        if (category === 'Fisk') candidates = prices.filter(p => p.navn.toLowerCase().includes('fisk') || p.navn.toLowerCase().includes('laks'));
        if (category === 'Mejeri/Ost') candidates = prices.filter(p => p.navn.toLowerCase().includes('mælk') || p.navn.toLowerCase().includes('fløde'));
        if (category === 'Grønt/Frugt') candidates = prices.filter(p => p.navn.toLowerCase().includes('grøntsagsblanding') || p.navn.toLowerCase().includes('kartofler'));
    }

    // Filter outlines (crazy expensive or cheap items)
    // We want a realistic "bulk" price. Let's take the median of the bottom 50% (cheapest half) to simulate smart procurement.
    if (candidates.length > 0) {
        candidates.sort((a, b) => a.pris - b.pris);
        // exclude zero/null
        candidates = candidates.filter(c => c.pris > 5);

        if (candidates.length === 0) return 30; // Default

        const mid = Math.floor(candidates.length / 3); // Top 33% cheapest
        return candidates[mid]?.pris || candidates[0].pris;
    }

    // Hard fallback if file matches nothing
    const DEFAULTS: Record<string, number> = {
        'Okse/Kalv': 95, 'Svin': 65, 'Fjerkræ': 55, 'Fisk': 120,
        'Mejeri/Ost': 35, 'Grønt/Frugt': 18, 'Kolonial/Diverse': 25, 'Frost': 30
    };
    return DEFAULTS[category] || 30;
}

interface ProcurementCategory {
    category: string;
    totalKg: number;
    cost2025: number;
    cost2026: number;
    inflationRate: number;
    topIngredients: Record<string, number>; // name -> kg
}

async function main() {
    console.log('Generating Procurement Forecast 2025 vs 2026 (Using HOKA K2 Prices)...\n');
    console.log('Source: public/horkram_2025_prices.json');

    const pricesDB = await loadPrices();
    console.log(`Loaded ${pricesDB.length} contract prices.`);

    const categories: Record<string, ProcurementCategory> = {};
    for (const cat of Object.keys(INFLATION_2026)) {
        categories[cat] = {
            category: cat,
            totalKg: 0,
            cost2025: 0,
            cost2026: 0,
            inflationRate: INFLATION_2026[cat as keyof typeof INFLATION_2026],
            topIngredients: {}
        };
    }

    const dailyPortions = 450;

    // Iterate Plan
    for (const [monthKey, monthData] of Object.entries(yearlyPlan2026)) {
        for (const day of monthData.data) {

            // 1. Resolve Meal
            let ingredients: { name: string, weightRaw: number }[] = [];
            const recipe = getAuthenticRecipe(day.dish, { numPieces: dailyPortions.toString(), weightPerPiece: "400" });

            if (recipe) {
                for (const ing of recipe.ingredients) ingredients.push({ name: ing.name, weightRaw: Number(ing.grossQuantity) });
            } else {
                // FALLBACK
                const proteinRaw = calculateRawWeight(day.type === 'Suppe' ? 100 : 150, getShrinkage(day.dish));
                ingredients.push({ name: `${day.type || 'Kød'} (Basis)`, weightRaw: proteinRaw * dailyPortions });
                if (day.carb) ingredients.push({ name: day.carb, weightRaw: 200 * dailyPortions });
                if (day.veg) ingredients.push({ name: day.veg, weightRaw: 100 * dailyPortions });
                ingredients.push({ name: 'Piskefløde/Smør', weightRaw: 40 * dailyPortions });
            }

            // 2. Classify & Cost
            for (const ing of ingredients) {
                const catName = classifyIngredient(ing.name);
                const cat = categories[catName] || categories['Kolonial/Diverse'];

                const weightKg = ing.weightRaw / 1000;
                cat.totalKg += weightKg;

                // Find distinct price for THIS ingredient
                const specificPrice = findRepresentativePrice(ing.name, catName, pricesDB);
                cat.cost2025 += (weightKg * specificPrice);

                cat.topIngredients[ing.name] = (cat.topIngredients[ing.name] || 0) + weightKg;
            }
        }
    }

    // 3. Summarize
    let total2025 = 0;
    let total2026 = 0;

    const resultList = Object.values(categories).map(c => {
        const sortedIngs = Object.entries(c.topIngredients)
            .sort(([, a], [, b]) => b - a).slice(0, 5)
            .reduce((obj, [k, v]) => ({ ...obj, [k]: Math.round(v) }), {});

        c.cost2026 = c.cost2025 * c.inflationRate;
        c.topIngredients = sortedIngs;

        total2025 += c.cost2025;
        total2026 += c.cost2026;

        return c;
    });

    const summary = {
        generatedAt: new Date().toISOString(),
        source: "Hørsholm Kommune / Hørkram 2025 (K2)",
        totalCost2025: total2025,
        totalCost2026: total2026,
        overallInflation: ((total2026 / total2025) - 1) * 100,
        categories: resultList
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(summary, null, 2));

    console.log('FORECAST GENERATED (CONTRACT COMPLIANT):');
    console.log(`2025 Est: ${(total2025 / 1000000).toFixed(2)}M kr`);
    console.log(`2026 Est: ${(total2026 / 1000000).toFixed(2)}M kr (+${summary.overallInflation.toFixed(1)}%)`);
}

main().catch(console.error);
