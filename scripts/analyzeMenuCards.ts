import * as fs from 'fs/promises';
import * as path from 'path';
import { SHRINKAGE_DATA, getShrinkage, calculateRawWeight } from '../services/cookingShrinkage.ts';
import { PORTION_STANDARDS, getPortionWeight } from '../services/portionStandards.ts';
import { analyzeDishSensory } from '../services/sensoryProfile.ts';
import type { SensoryProfile } from '../services/sensoryProfile.ts';
import { checkCulturalCompliance, isLivret } from '../services/culturalCalendar.ts';
import { checkSeasonality } from '../services/seasonalCompliance.ts';
import { calculateNutritionalCompliance } from '../services/nutritionalCompliance.ts';

// --- CONFIGURATION ---
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'yearly_menu_costs.json');

// --- INTERFACES ---
interface PriceEntry {
    varenummer: string;
    navn: string;
    pris: number;
    enhed: string;
    kategori: string;
    source: string;
}

interface DishCost {
    dish: string;
    proteinType: string;
    estimatedCost: number;
    costBreakdown: { protein: number; carb: number; vegetables: number; sauce: number; biret: number; };
    compliance: {
        isProteinCompliant: boolean; // Legal (Weight)
        isEnergyCompliant: boolean;  // Legal (E%)
        isSeasonal: boolean;         // Eco/Quality
        isCultural: boolean;         // Tradition
        issues: string[];            // List of specific warnings
    };
    sensory: SensoryProfile & { isBalanced: boolean; };
    meta: { shrinkageFactor: number; rawWeight: number; };
}

interface MonthData {
    label: string;
    data: MealDay[];
}

interface MealDay {
    date: string;
    dayName: string;
    dish: string;
    type: string;
    biret: string;
    soup: string;
    carb: string;
    veg: string;
    isHoliday: boolean;
}

interface MonthSummary {
    month: string;
    totalDays: number;
    holidays: number;
    typeDistribution: Record<string, number>;
    estimatedTotalCost: number;
    estimatedDailyCost: number;
    dishes: DishCost[];
    complianceStats: {
        nutritional: number;
        seasonal: number;
        cultural: number;
        sensory: number;
    }
}


// --- 2025 PRICING ---
async function loadPrices(): Promise<Record<string, PriceEntry>> {
    try {
        const raw = await fs.readFile(path.join(process.cwd(), 'public', 'horkram_2025_prices.json'), 'utf-8');
        const prices: PriceEntry[] = JSON.parse(raw);
        const priceMap: Record<string, PriceEntry> = {};
        for (const p of prices) { priceMap[p.navn.toLowerCase()] = p; }
        return priceMap;
    } catch (error) { return {}; }
}

function findPrice(query: string, prices: Record<string, PriceEntry>): number | null {
    if (!query) return null;
    const lowerQuery = query.toLowerCase();
    if (prices[lowerQuery]) return prices[lowerQuery].pris;
    const keys = Object.keys(prices);
    const match = keys.find(k => k.includes(lowerQuery) || lowerQuery.includes(k));
    return match ? prices[match].pris : null;
}

const BASE_PROTEIN_COSTS_2025: Record<string, number> = {
    'Okse/Kalv': 150, 'Svin': 120, 'Fjerkræ': 120, 'Fisk': 160, 'Indmad': 100, 'Vegetar': 80, 'Grød': 40, 'Suppe': 60
};


function estimateDishCost(day: MealDay, prices: Record<string, PriceEntry>, portions: number = 450): DishCost {
    const typeKey = day.type || 'Svin';
    const baseProteinPrice = BASE_PROTEIN_COSTS_2025[typeKey] || 100;

    // 1. Identify Prices
    const proteinPrice = findPrice(day.dish, prices) || baseProteinPrice;
    const carbPrice = findPrice(day.carb, prices) || 15;
    const vegPrice = findPrice(day.veg, prices) || 30;
    const saucePrice = 45;
    const biretPrice = 30;

    // 2. Weights & Svind
    const isMash = day.carb ? day.carb.toLowerCase().includes('mos') : false;
    const isSoup = day.type === 'Suppe';

    const portionsServed = {
        protein: getPortionWeight('protein', isSoup),
        carb: getPortionWeight('carb', isSoup, isMash),
        veg: getPortionWeight('veg', isSoup),
        sauce: getPortionWeight('sauce', isSoup),
        biret: getPortionWeight('biret', isSoup)
    };

    const shrinkageProtein = getShrinkage(day.dish);
    const rawWeights = {
        protein: calculateRawWeight(portionsServed.protein, shrinkageProtein),
        carb: calculateRawWeight(portionsServed.carb, 0),
        veg: calculateRawWeight(portionsServed.veg, 15),
        sauce: calculateRawWeight(portionsServed.sauce, 15),
        biret: portionsServed.biret
    };

    // 3. Costs
    const costPerPortion = {
        protein: (proteinPrice * rawWeights.protein) / 1000,
        carb: (carbPrice * rawWeights.carb) / 1000,
        veg: (vegPrice * rawWeights.veg) / 1000,
        sauce: (saucePrice * rawWeights.sauce) / 1000,
        biret: (biretPrice * rawWeights.biret) / 1000
    };
    const totalPerPortion = Object.values(costPerPortion).reduce((a, b) => a + b, 0);

    // --- 4. COMPLIANCE CHECKS (V4) ---
    const issueList: string[] = [];

    // A. Culture & Holidays
    const culturalCheck = checkCulturalCompliance(day.date, day.dish);
    let isCultural = culturalCheck.isCompliant;
    if (!isCultural) issueList.push(culturalCheck.message || 'Cultural Mismatch');
    if (isLivret(day.dish)) { /* Bonus point? */ }

    // B. Seasonality
    const ingredients = [day.dish, day.carb, day.veg, day.biret].filter(Boolean) as string[];
    const seasonCheck = checkSeasonality(day.date, ingredients);
    const isSeasonal = seasonCheck.isCompliant;
    if (!isSeasonal) issueList.push(...seasonCheck.warnings);

    // C. Nutritional (Ældreloven)
    const nutriCheck = calculateNutritionalCompliance(
        day.dish, rawWeights.protein,
        day.carb || 'Kartofler', portionsServed.carb, // Carb cooked weight
        portionsServed.sauce // Sauce weight
    );
    const isProteinCompliant = nutriCheck.isCompliant; // Strict check from service now
    const isEnergyCompliant = nutriCheck.profile.energyKJ > 2000; // Require minimal density
    if (!nutriCheck.isCompliant) issueList.push(...nutriCheck.issues);

    // D. Sensory
    const sensoryProfile = analyzeDishSensory(ingredients);
    if (!sensoryProfile.isBalanced) issueList.push('Sensory Imbalance (Mangler modspil)');

    return {
        dish: day.dish,
        proteinType: day.type,
        estimatedCost: totalPerPortion * portions,
        costBreakdown: {
            protein: costPerPortion.protein * portions,
            carb: costPerPortion.carb * portions,
            vegetables: costPerPortion.veg * portions,
            sauce: costPerPortion.sauce * portions,
            biret: costPerPortion.biret * portions
        },
        compliance: {
            isProteinCompliant,
            isEnergyCompliant,
            isSeasonal,
            isCultural,
            issues: issueList
        },
        sensory: sensoryProfile,
        meta: {
            shrinkageFactor: shrinkageProtein,
            rawWeight: rawWeights.protein
        }
    };
}


async function main() {
    console.log('Analyzing yearly menu cards (V4 FULL COMPLIANCE)...\n');

    const prices = await loadPrices();
    const mealPlanModule = await import('../services/mealPlanData.ts');
    const yearlyPlan: Record<string, MonthData> = mealPlanModule.yearlyPlan2026;

    const monthlyResults: MonthSummary[] = [];
    let totalYearCost = 0;
    let totalDays = 0;

    // Year Stats
    let totalCompliantNutri = 0;
    let totalCompliantSeason = 0;
    let totalCompliantCulture = 0;
    let totalCompliantSensory = 0;

    for (const [monthKey, monthData] of Object.entries(yearlyPlan)) {
        const dishCosts: DishCost[] = [];
        const typeCount: Record<string, number> = {};
        let monthTotal = 0;

        let mNutri = 0, mSeason = 0, mCulture = 0, mSensory = 0;

        for (const day of monthData.data) {
            const type = day.type || 'Ukendt';
            typeCount[type] = (typeCount[type] || 0) + 1;

            const cost = estimateDishCost(day, prices);
            dishCosts.push(cost);
            monthTotal += cost.estimatedCost;

            if (cost.compliance.isProteinCompliant && cost.compliance.isEnergyCompliant) mNutri++;
            if (cost.compliance.isSeasonal) mSeason++;
            if (cost.compliance.isCultural) mCulture++;
            if (cost.sensory.isBalanced) mSensory++;
        }

        totalCompliantNutri += mNutri;
        totalCompliantSeason += mSeason;
        totalCompliantCulture += mCulture;
        totalCompliantSensory += mSensory;

        monthlyResults.push({
            month: monthData.label,
            totalDays: monthData.data.length,
            holidays: 0,
            typeDistribution: typeCount,
            estimatedTotalCost: monthTotal,
            estimatedDailyCost: monthTotal / monthData.data.length,
            dishes: dishCosts,
            complianceStats: {
                nutritional: mNutri,
                seasonal: mSeason,
                cultural: mCulture,
                sensory: mSensory
            }
        });

        totalYearCost += monthTotal;
        totalDays += monthData.data.length;
        console.log(`${monthData.label}: Cost ${(monthTotal / 1000000).toFixed(2)}M. Nutri: ${mNutri}/${monthData.data.length}`);
    }

    // Write results
    const results = {
        generatedAt: new Date().toISOString(),
        standard: "2025_FULL_COMPLIANCE_V4",
        portionsPerDay: 450,
        yearSummary: {
            totalDays,
            totalCost: totalYearCost,
            complianceRates: {
                nutritional: (totalCompliantNutri / totalDays) * 100,
                seasonal: (totalCompliantSeason / totalDays) * 100,
                cultural: (totalCompliantCulture / totalDays) * 100,
                sensory: (totalCompliantSensory / totalDays) * 100
            }
        },
        months: monthlyResults
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));

    console.log('='.repeat(50));
    console.log('YEARLY SUMMARY 2025 (FULL COMPLIANCE)');
    console.log('='.repeat(50));
    console.log(`Total Cost: ${totalYearCost.toLocaleString('da-DK', { maximumFractionDigits: 0 })} kr`);
    console.log(`Nutritional Compliance (Ældreloven): ${results.yearSummary.complianceRates.nutritional.toFixed(1)}%`);
    console.log(`Seasonal Compliance: ${results.yearSummary.complianceRates.seasonal.toFixed(1)}%`);
    console.log(`Cultural Compliance: ${results.yearSummary.complianceRates.cultural.toFixed(1)}%`);
    console.log(`Sensory Balance: ${results.yearSummary.complianceRates.sensory.toFixed(1)}%`);
    console.log(`\n✅ Analyzed ${totalDays} days.`);
}

main().catch(console.error);
