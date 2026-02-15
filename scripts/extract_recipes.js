import fs from 'fs';
import path from 'path';

// 1. Define March 2026 Menu Plan (Copied from martsTestPlan.ts)
const martsTestPlan = [
    { date: "1. mar (Søn)", dish: "Bankekød (90g)", biret: "Frugtgrød m. fløde (150g)" },
    { date: "2. mar (Man)", dish: "Biksemad (200g)", biret: "Appelsinsuppe (180g)" },
    { date: "3. mar (Tir)", dish: "Kylling i Karry (180g)", biret: "Krydderkage (70g)" },
    { date: "4. mar (Ons)", dish: "Dampet Ørred (90g)", biret: "Pæretærte (90g)" },
    { date: "5. mar (Tor)", dish: "Gule Ærter (250g)", biret: "Pandekager (2 stk)" },
    { date: "6. mar (Fre)", dish: "Mørbradbøf (90g)", biret: "Sandkage (70g)" },
    { date: "7. mar (Lør)", dish: "Andebryst (90g)", biret: "Risengrød (180g)" },
    { date: "8. mar (Søn)", dish: "Wienerschnitzel (110g)", biret: "Rubinsteinerkage (90g)" },
    { date: "9. mar (Man)", dish: "Koteletter i fad (110g)", biret: "Karrysuppe (180g)" },
    { date: "10. mar (Tir)", dish: "Kalkungryde (180g)", biret: "Gulerodskage (70g)" },
    { date: "11. mar (Ons)", dish: "Bagt Ørred (90g)", biret: "Frugtsalat m. creme (100g)" },
    { date: "12. mar (Tor)", dish: "Spinattærte (150g)", biret: "Kartoffel-porresuppe (180g)" },
    { date: "13. mar (Fre)", dish: "Stegt Flæsk (90g)", biret: "Æblekage (90g)" },
    { date: "14. mar (Lør)", dish: "Høns i asparges (110g)", biret: "Sveskegrød m. fløde (150g)" },
    { date: "15. mar (Søn)", dish: "Kalvesteg (90g)", biret: "Citronfromage (90g)" },
    { date: "16. mar (Man)", dish: "Frikadeller (2stk/90g)", biret: "Blomkålssuppe (180g)" },
    { date: "17. mar (Tir)", dish: "Kylling i Peberrod (180g)", biret: "Citronmåne (70g)" },
    { date: "18. mar (Ons)", dish: "Dampet Ørred (90g)", biret: "Chokolademousse (80g)" },
    { date: "19. mar (Tor)", dish: "Ovnæggekage (150g)", biret: "Minestronesuppe (180g)" },
    { date: "20. mar (Fre)", dish: "Forloren Hare (110g)", biret: "Drømmekage (70g)" },
    { date: "21. mar (Lør)", dish: "Kyllingelår BBQ (1stk)", biret: "Abrikosgrød m. fløde (150g)" },
    { date: "22. mar (Søn)", dish: "Oksesteg (90g)", biret: "Ymerfromage (90g)" },
    { date: "23. mar (Man)", dish: "Boller i Karry (3stk/90g)", biret: "Tomatsuppe (180g)" },
    { date: "24. mar (Tir)", dish: "Karbonader (1stk/110g)", biret: "Budding m. saft (100g)" },
    { date: "25. mar (Ons)", dish: "Stegt Ørred (90g)", biret: "Jordbærgrød m. fløde (150g)" },
    { date: "26. mar (Tor)", dish: "Broccoligratin (160g)", biret: "Klar suppe m. boller (180g)" },
    { date: "27. mar (Fre)", dish: "Kyllingefrikassé (180g)", biret: "Chokoladekage (70g)" },
    { date: "28. mar (Lør)", dish: "Tarteletter m. høns (2stk)", biret: "Frugtsalat (100g)" },
    { date: "29. mar (Søn)", dish: "Lammekølle", biret: "Rabarbertrifli (90g)" },
    { date: "30. mar (Man)", dish: "Krebinet (1stk/110g)", biret: "Aspargessuppe (180g)" },
    { date: "31. mar (Tir)", dish: "Bagt Torsk (120g)", biret: "Rødgrød m. fløde (150g)" },
];

// 2. Read Recipe Database
const jsonPath = '/Users/ashisgautam/Documents/Food_and_Recipes/MDS_Opskrifts_Arkiv_2026-01-25.json';
const rawData = fs.readFileSync(jsonPath, 'utf8');
const recipeDb = JSON.parse(rawData);

// 3. Helper to normalize names for matching
function normalize(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim();
}

function findRecipe(queryName) {
    const normQuery = normalize(queryName);

    // Try exact match first
    let match = recipeDb.find(r => r.recipeName && normalize(r.recipeName) === normQuery);

    // Try fuzzy inclusion if no exact match 
    if (!match) {
        match = recipeDb.find(r => r.recipeName && normalize(r.recipeName).includes(normQuery));
    }

    // Try reverse inclusion (query includes recipe name)
    if (!match) {
        match = recipeDb.find(r => r.recipeName && normQuery.includes(normalize(r.recipeName)));
    }

    return match;
}

// 4. Generate Markdown
let markdown = `# Opskriftssamling - Marts 2026\n\n`;
markdown += `Genereret: ${new Date().toISOString().split('T')[0]}\n\n`;

const processedRecipes = new Set();
const missingRecipes = [];

// Iterate through the plan
martsTestPlan.forEach(day => {
    const recipesToFind = [
        { name: day.dish, type: 'Hovedret' },
        { name: day.biret, type: 'Biret/Dessert' }
    ];

    recipesToFind.forEach(item => {
        const recipe = findRecipe(item.name);

        if (recipe) {
            if (!processedRecipes.has(recipe.recipeName)) {
                processedRecipes.add(recipe.recipeName);

                markdown += `## ${recipe.recipeName}\n`;
                markdown += `**Kategori:** ${recipe.category || item.type} | **Dato:** ${day.date}\n\n`;

                if (recipe.yield) {
                    markdown += `**Mængde:** ${recipe.yield.portions} portioner (${recipe.yield.finishedWeightPerPortion || '?'}g pr. portion)\n\n`;
                }

                markdown += `### Ingredienser\n`;
                markdown += `| Vare | Mængde |\n| --- | --- |\n`;
                if (recipe.ingredients) {
                    recipe.ingredients.forEach(ing => {
                        markdown += `| ${ing.name} | ${ing.quantity} ${ing.unit || 'g'} |\n`;
                    });
                }
                markdown += `\n`;

                markdown += `### Fremgangsmåde\n`;
                if (recipe.steps) {
                    recipe.steps.forEach((step, idx) => {
                        markdown += `${idx + 1}. ${step.description}\n`;
                    });
                }
                markdown += `\n`;

                if (recipe.productionNotes) {
                    markdown += `> **Produktionsnoter:** ${recipe.productionNotes}\n\n`;
                }

                markdown += `---\n\n`;
            }
        } else {
            missingRecipes.push(`${day.date}: ${item.name}`);
        }
    });
});

// Append Missing Recipes Section
if (missingRecipes.length > 0) {
    markdown += `## Manglende Opskrifter (Ikke fundet i arkivet)\n`;
    missingRecipes.forEach(m => markdown += `- ${m}\n`);
}

const outputPath = path.join(process.cwd(), 'march_2026_recipes.md');
fs.writeFileSync(outputPath, markdown);
console.log(`Successfully generated recipe book at: ${outputPath}`);
console.log(`Found ${processedRecipes.size} recipes.`);
console.log(`Missing ${missingRecipes.length} recipes.`);
