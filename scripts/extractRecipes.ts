import fs from 'fs/promises';
import path from 'path';

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

interface Recipe {
    recipeName: string;
    date: string;
    portions: string;
    totalWeight: string;
    portionSize: string;
    protein: string;
    carbohydrate: string;
    source: string;
    components: RecipeComponent[];
}

const INPUT_FILE = path.join(process.cwd(), 'public/recipes_data/Samlet_Opskriftsbog_Jan_Feb_2026.html');
const OUTPUT_FILE = path.join(process.cwd(), 'public/structured_recipes.json');

async function parseRecipes(): Promise<Recipe[]> {
    const html = await fs.readFile(INPUT_FILE, 'utf-8');
    const recipes: Recipe[] = [];

    // Split by recipe cards
    const recipeCards = html.split('<div class="recipe-card">').slice(1);

    for (const card of recipeCards) {
        try {
            // Extract header info
            const nameMatch = card.match(/<h1>([^<]+)<\/h1>/);
            const recipeName = nameMatch ? nameMatch[1].trim() : 'Ukendt';

            const metaLines = card.match(/<p class="recipe-meta">([^<]+(?:<strong>[^<]+<\/strong>[^<]*)*)<\/p>/g) || [];

            let date = '', portions = '', totalWeight = '', portionSize = '', protein = '', carbohydrate = '', source = '';

            for (const meta of metaLines) {
                const text = meta.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                if (text.includes('Dato:')) {
                    const match = text.match(/Dato:\s*([^|]+)/);
                    if (match) date = match[1].trim();
                    const portMatch = text.match(/Antal:\s*(\d+)/);
                    if (portMatch) portions = portMatch[1];
                }
                if (text.includes('Total tilberedt')) {
                    const weightMatch = text.match(/Total tilberedt vægt:\s*([^|]+)/);
                    if (weightMatch) totalWeight = weightMatch[1].trim();
                    const sizeMatch = text.match(/Portionsstørrelse:\s*([^\s]+\s*g)/);
                    if (sizeMatch) portionSize = sizeMatch[1].trim();
                }
                if (text.includes('Protein:')) {
                    const proteinMatch = text.match(/Protein:\s*([^|]+)/);
                    if (proteinMatch) protein = proteinMatch[1].trim();
                    const carbMatch = text.match(/Kulhydrat:\s*(.*)/);
                    if (carbMatch) carbohydrate = carbMatch[1].trim();
                }
                if (text.includes('Kilde:')) {
                    const sourceMatch = text.match(/Kilde:\s*(.*)/);
                    if (sourceMatch) source = sourceMatch[1].trim();
                }
            }

            // Extract components
            const components: RecipeComponent[] = [];
            const componentBlocks = card.split('<div class="component">').slice(1);

            for (const block of componentBlocks) {
                const titleMatch = block.match(/<h2>([^<]+)<\/h2>/);
                const componentTitle = titleMatch ? titleMatch[1].trim() : '';

                // Extract ingredients from table
                const ingredients: Ingredient[] = [];
                const rows = block.match(/<tr>[\s\S]*?<\/tr>/g) || [];

                for (const row of rows) {
                    // Skip header rows and section dividers
                    if (row.includes('<th>') || row.includes('colspan')) continue;

                    const cells = row.match(/<td>([^<]*)<\/td>/g) || [];
                    if (cells.length >= 4) {
                        const name = cells[0].replace(/<[^>]+>/g, '').trim();
                        const grossQty = cells[1].replace(/<[^>]+>/g, '').trim();
                        const waste = cells[2].replace(/<[^>]+>/g, '').trim();
                        const nettoQty = cells[3].replace(/<[^>]+>/g, '').trim();

                        if (name && name !== '-') {
                            ingredients.push({
                                name,
                                grossQuantity: grossQty,
                                wastePercentage: waste,
                                nettoQuantity: nettoQty
                            });
                        }
                    }
                }

                // Extract steps
                const steps: string[] = [];
                const liItems = block.match(/<li>([\s\S]*?)<\/li>/g) || [];
                for (const li of liItems) {
                    const stepText = li.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
                    if (stepText) steps.push(stepText);
                }

                if (componentTitle || ingredients.length > 0 || steps.length > 0) {
                    components.push({ title: componentTitle, ingredients, steps });
                }
            }

            if (recipeName !== 'Ukendt') {
                recipes.push({
                    recipeName,
                    date,
                    portions,
                    totalWeight,
                    portionSize,
                    protein,
                    carbohydrate,
                    source,
                    components
                });
            }
        } catch (err) {
            console.error('Error parsing recipe card:', err);
        }
    }

    return recipes;
}

async function main() {
    console.log('Extracting structured recipes from HTML...');

    const recipes = await parseRecipes();

    console.log(`Found ${recipes.length} recipes`);

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(recipes, null, 2));
    console.log(`✅ Wrote ${recipes.length} recipes to ${OUTPUT_FILE}`);

    // Print summary
    for (const r of recipes) {
        console.log(`  - ${r.recipeName} (${r.portions} portioner)`);
    }
}

main().catch(console.error);
