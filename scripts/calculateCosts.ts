import fs from 'fs/promises';
import path from 'path';

interface PriceEntry {
    name: string;
    unit: string;
    price: number;
    supplier: string;
    productNumber?: string;
    category?: string;
}

interface Ingredient {
    name: string;
    grossQuantity: string;
    wastePercentage: string;
    nettoQuantity: string;
}

interface RecipeComponent {
    title: string;
    ingredients: Ingredient[];
    steps: string[];
}

interface StructuredRecipe {
    recipeName: string;
    date: string;
    portions: string;
    components: RecipeComponent[];
}

interface CostResult {
    recipeName: string;
    portions: number;
    components: {
        title: string;
        ingredients: {
            name: string;
            quantityKg: number;
            pricePerKg: number | null;
            totalCost: number | null;
            matchedProduct: string | null;
        }[];
        componentCost: number;
    }[];
    totalCost: number;
    costPerPortion: number;
}

const RECIPES_FILE = path.join(process.cwd(), 'public/structured_recipes.json');
const PRICES_FILE = path.join(process.cwd(), 'public/horkram_prices.json');
const OUTPUT_FILE = path.join(process.cwd(), 'public/recipe_costs.json');

// Parse quantity string like "~116 kg" or "5 kg" or "~60 g"
function parseQuantity(qty: string): number {
    if (!qty || qty === '-' || qty.toLowerCase().includes('smag') || qty.toLowerCase().includes('rigeligt')) {
        return 0;
    }

    // Remove ~ and whitespace
    const cleaned = qty.replace(/~/g, '').trim();

    // Extract number and unit
    const match = cleaned.match(/([\d.,]+)\s*(kg|g|l|L)?/i);
    if (!match) return 0;

    let value = parseFloat(match[1].replace(',', '.'));
    const unit = (match[2] || 'kg').toLowerCase();

    // Convert to kg
    if (unit === 'g') value = value / 1000;
    if (unit === 'l') value = value; // Assume 1L = 1kg for liquids

    return value;
}

// Find best price match for an ingredient
function findPriceMatch(ingredientName: string, priceDb: Record<string, PriceEntry>): { price: number; matchedName: string } | null {
    const searchName = ingredientName.toLowerCase().trim();

    // Direct match
    for (const [name, entry] of Object.entries(priceDb)) {
        if (name.toLowerCase() === searchName) {
            return { price: entry.price, matchedName: name };
        }
    }

    // Partial match - ingredient name is contained in price DB name
    for (const [name, entry] of Object.entries(priceDb)) {
        const dbName = name.toLowerCase();
        if (dbName.includes(searchName) || searchName.includes(dbName)) {
            return { price: entry.price, matchedName: name };
        }
    }

    // Fuzzy match: first word
    const firstWord = searchName.split(/[\s,]+/)[0];
    if (firstWord.length >= 3) {
        for (const [name, entry] of Object.entries(priceDb)) {
            if (name.toLowerCase().startsWith(firstWord)) {
                return { price: entry.price, matchedName: name };
            }
        }
    }

    return null;
}

async function main() {
    console.log('Calculating recipe costs...\n');

    const recipesData = await fs.readFile(RECIPES_FILE, 'utf-8');
    const recipes: StructuredRecipe[] = JSON.parse(recipesData);

    const pricesData = await fs.readFile(PRICES_FILE, 'utf-8');
    const priceDb: Record<string, PriceEntry> = JSON.parse(pricesData);

    console.log(`Loaded ${recipes.length} recipes and ${Object.keys(priceDb).length} prices\n`);

    const results: CostResult[] = [];

    for (const recipe of recipes) {
        const portions = parseInt(recipe.portions) || 450;
        let recipeTotalCost = 0;

        const componentResults = recipe.components.map(comp => {
            let componentCost = 0;

            const ingredientResults = comp.ingredients.map(ing => {
                const quantityKg = parseQuantity(ing.grossQuantity);
                const priceMatch = findPriceMatch(ing.name, priceDb);

                let totalCost = 0;
                if (priceMatch && quantityKg > 0) {
                    totalCost = quantityKg * priceMatch.price;
                    componentCost += totalCost;
                }

                return {
                    name: ing.name,
                    quantityKg,
                    pricePerKg: priceMatch?.price || null,
                    totalCost: totalCost || null,
                    matchedProduct: priceMatch?.matchedName || null
                };
            });

            recipeTotalCost += componentCost;

            return {
                title: comp.title,
                ingredients: ingredientResults,
                componentCost
            };
        });

        results.push({
            recipeName: recipe.recipeName,
            portions,
            components: componentResults,
            totalCost: recipeTotalCost,
            costPerPortion: recipeTotalCost / portions
        });

        console.log(`${recipe.recipeName}:`);
        console.log(`  Total: ${recipeTotalCost.toFixed(2)} kr`);
        console.log(`  Per portion: ${(recipeTotalCost / portions).toFixed(2)} kr`);
        console.log();
    }

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`\n✅ Wrote cost calculations to ${OUTPUT_FILE}`);

    // Summary
    console.log('\n=== COST SUMMARY ===');
    for (const r of results) {
        console.log(`${r.recipeName}: ${r.totalCost.toFixed(2)} kr total, ${r.costPerPortion.toFixed(2)} kr/portion`);
    }
}

main().catch(console.error);
