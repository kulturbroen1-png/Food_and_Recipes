
import { martsTestPlan } from '../services/martsTestPlan.ts';
import { allMarch2026Recipes } from '../services/recipesMarch2026.ts';

// Replicating the fuzzy match logic from authenticRecipes.ts
function findRecipe(dishName: string) {
    const recipes = Object.values(allMarch2026Recipes);
    // Normalize logic: remove weight/size info for better matching
    const cleanName = dishName.replace(/\s*\(\d+.*?\)/, '').toLowerCase().trim();

    return recipes.find(r => {
        const rName = r.recipeName.toLowerCase();
        return rName.includes(cleanName) || cleanName.includes(rName);
    });
}

console.log("--- MARCH MENU COVERAGE TEST ---");
let foundCount = 0;
let missingCount = 0;

martsTestPlan.forEach(day => {
    if (!day.dish) return;

    const match = findRecipe(day.dish);
    if (match) {
        foundCount++;
        // console.log(`[OK] ${day.date}: ${day.dish} -> ${match.recipeName}`);
    } else {
        missingCount++;
        console.log(`[MISSING] ${day.date}: ${day.dish}`);
    }
});

console.log("\n--- SUMMARY ---");
console.log(`Total Days: ${martsTestPlan.length}`);
console.log(`Found: ${foundCount}`);
console.log(`Missing: ${missingCount}`);
console.log(`Coverage: ${Math.round((foundCount / martsTestPlan.length) * 100)}%`);
