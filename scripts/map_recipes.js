
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// We need to look in these directories
const SEARCH_DIRS = [
    '/Users/ashisgautam/Documents/Food_and_Recipes/Systematic_Collection_By_Origin',
    '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling',
    '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Optimized'
];

// Embedded data from martsTestPlan.ts
const martsTestPlan = [
    { date: "1. mar (Søn)", icon: "🐂", type: "Okse", dish: "Bankekød (90g)", biret: "Frugtgrød m. fløde (150g)" },
    { date: "2. mar (Man)", icon: "🐖", type: "Gris", dish: "Biksemad (200g)", biret: "Appelsinsuppe (180g)" },
    { date: "3. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kylling i Karry (180g)", biret: "Krydderkage (70g)" },
    { date: "4. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Dampet Ørred (90g)", biret: "Pæretærte (90g)" },
    { date: "5. mar (Tor)", icon: "🐖", type: "Gris", dish: "Gule Ærter (250g)", biret: "Pandekager (2 stk)" },
    { date: "6. mar (Fre)", icon: "🐖", type: "Gris", dish: "Mørbradbøf (90g)", biret: "Sandkage (70g)" },
    { date: "7. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Andebryst (90g)", biret: "Risengrød (180g)" },
    { date: "8. mar (Søn)", icon: "🐂", type: "Okse", dish: "Wienerschnitzel (110g)", biret: "Rubinsteinerkage (90g)" },
    { date: "9. mar (Man)", icon: "🐖", type: "Gris", dish: "Koteletter i fad (110g)", biret: "Karrysuppe (180g)" },
    { date: "10. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kalkungryde (180g)", biret: "Gulerodskage (70g)" },
    { date: "11. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Bagt Ørred (90g)", biret: "Frugtsalat m. creme (100g)" },
    { date: "12. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Spinattærte (150g)", biret: "Kartoffel-porresuppe (180g)" },
    { date: "13. mar (Fre)", icon: "🐖", type: "Gris", dish: "Stegt Flæsk (90g)", biret: "Æblekage (90g)" },
    { date: "14. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Høns i asparges (110g)", biret: "Sveskegrød m. fløde (150g)" },
    { date: "15. mar (Søn)", icon: "🐂", type: "Okse", dish: "Kalvesteg (90g)", biret: "Citronfromage (90g)" },
    { date: "16. mar (Man)", icon: "🐖", type: "Gris", dish: "Frikadeller (2stk/90g)", biret: "Blomkålssuppe (180g)" },
    { date: "17. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kylling i Peberrod (180g)", biret: "Citronmåne (70g)" },
    { date: "18. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Dampet Ørred (90g)", biret: "Chokolademousse (80g)" },
    { date: "19. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Ovnæggekage (150g)", biret: "Minestronesuppe (180g)" },
    { date: "20. mar (Fre)", icon: "🐖", type: "Gris", dish: "Forloren Hare (110g)", biret: "Drømmekage (70g)" },
    { date: "21. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Kyllingelår BBQ (1stk)", biret: "Abrikosgrød m. fløde (150g)" },
    { date: "22. mar (Søn)", icon: "🐂", type: "Okse", dish: "Oksesteg (90g)", biret: "Ymerfromage (90g)" },
    { date: "23. mar (Man)", icon: "🐖", type: "Gris", dish: "Boller i Karry (3stk/90g)", biret: "Tomatsuppe (180g)" },
    { date: "24. mar (Tir)", icon: "🐖", type: "Gris", dish: "Karbonader (1stk/110g)", biret: "Budding m. saft (100g)" },
    { date: "25. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Stegt Ørred (90g)", biret: "Jordbærgrød m. fløde (150g)" },
    { date: "26. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Broccoligratin (160g)", biret: "Klar suppe m. boller (180g)" },
    { date: "27. mar (Fre)", icon: "🐔", type: "Fjerkræ", dish: "Kyllingefrikassé (180g)", biret: "Chokoladekage (70g)" },
    { date: "28. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Tarteletter m. høns (2stk)", biret: "Frugtsalat (100g)" },
    { date: "29. mar (Søn)", icon: "🐂", type: "Okse", dish: "Lammekølle", biret: "Rabarbertrifli (90g)" },
    { date: "30. mar (Man)", icon: "🐖", type: "Gris", dish: "Krebinet (1stk/110g)", biret: "Aspargessuppe (180g)" },
    { date: "31. mar (Tir)", icon: "🐟", type: "Fisk", dish: "Bagt Torsk (120g)", biret: "Rødgrød m. fløde (150g)" }
];

const recipeMap = {};
const missingRecipes = [];

console.log(`Scanning for ${martsTestPlan.length} days of recipes...`);

// Flatten the plan to get a list of dish names
const dishes = [];
martsTestPlan.forEach(day => {
    if (day.dish) dishes.push({ name: day.dish, date: day.date, type: 'Main' });
    if (day.biret) dishes.push({ name: day.biret, date: day.date, type: 'Dessert' });
});

console.log(`Total dishes to find: ${dishes.length}`);

for (const dish of dishes) {
    const safeName = dish.name.replace(/\(.*?\)/g, '').replace('Palmesøndag:', '').trim();
    // Example: "Bankekød" (from "Bankekød (90g)")

    // Use the first two words if available, else first word
    // "Kylling i Karry" -> "Kylling i" might be too specific if file is just "Kylling i karry.pdf" or "Kylling.pdf"
    // Let's try first word for broad search, then filter
    const parts = safeName.split(' ');
    let searchPattern = parts[0];
    if (parts.length > 1 && parts[1].length > 2) {
        // If second word is significant, use it too, but rely on finding *Part1*Part2*
        // searchPattern = `${parts[0]}*${parts[1]}`;
        // Actually, `find` handles glob patterns.
    }

    // Logic: find keys: "*Word1*Word2*" if possible.
    // Simpler: Find "*Word1*" and then JS filter.
    const firstWord = parts[0];

    console.log(`Searching for: ${dish.name} (Base: ${safeName}, Pattern: *${firstWord}*)`);

    let foundFiles = [];
    try {
        const cmd = `find "${SEARCH_DIRS.join('" "')}" -name "*${firstWord}*" -name "*.pdf"`;
        const output = execSync(cmd, { encoding: 'utf-8' });
        const lines = output.split('\n').filter(l => l.trim().length > 0);

        // Filter lines to find the best match
        lines.forEach(file => {
            const basename = path.basename(file).toLowerCase();
            const keywords = safeName.toLowerCase().split(' ').filter(k => k.length > 2); // Filter out small words like "i", "m."

            // Check if ALL significant keywords are present in basename
            // or at least a high percentage
            const matchCount = keywords.filter(k => basename.includes(k.replace(/[^\wåæø]/g, ''))).length;

            // Score based on match coverage
            const score = matchCount / keywords.length;

            if (score > 0.5) { // At least 50% of keywords matched
                foundFiles.push({ file, score, basename });
            }
        });

        // Sort by score desc, then by length asc (shorter filenames usually better matches? or specific ones?)
        foundFiles.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.basename.length - b.basename.length;
        });

    } catch (e) {
        // console.error(e);
    }

    if (foundFiles.length > 0) {
        console.log(`  FOUND: ${path.basename(foundFiles[0].file)}`);
        recipeMap[dish.name] = foundFiles[0].file;
    } else {
        console.log(`  MISSING: ${dish.name} (Searched for *${firstWord}*)`);
        missingRecipes.push(dish.name);
    }
}

console.log('-----------------------------------');
console.log(`Found: ${Object.keys(recipeMap).length}`);
console.log(`Missing: ${missingRecipes.length}`);

fs.writeFileSync('recipe_file_map.json', JSON.stringify(recipeMap, null, 2));
fs.writeFileSync('missing_recipes_list.txt', missingRecipes.join('\n'));
