import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const SEARCH_DIRS = [
    '/Users/ashisgautam/Documents/Food_and_Recipes'
];

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

// 2. Read Comprehensive Recipe Database
const jsonPath = '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling/Opskrifter_Samlet/recipes.json';
console.log(`Loading recipe database from: ${jsonPath}`);

let recipeDb = [];
try {
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    recipeDb = JSON.parse(rawData);
    console.log(`Loaded ${recipeDb.length} recipes.`);
} catch (e) {
    console.error(`Error loading recipe database: ${e.message}`);
    // Non-fatal, we will just use file search
}

// 3. Helper to normalize names for matching
function normalize(name) {
    if (!name) return '';
    return name.toLowerCase().replace(/\s*\([^)]*\)/g, '').trim();
}

// Helper to extract recipe name from the comprehensive JSON object
function getRecipeName(recipe) {
    if (recipe.description) return recipe.description;
    if (recipe.filename) return path.parse(recipe.filename).name;
    // Fallback
    return "Ukendt Opskrift";
}

function findRecipeInJson(queryName) {
    const normQuery = normalize(queryName);
    const keywords = normQuery.split(' ').filter(k => k.length > 2); // Split into keywords

    // 1. Try exact match on Description or Filename
    let match = recipeDb.find(r => {
        const name = getRecipeName(r);
        return normalize(name) === normQuery;
    });

    // 2. Try inclusion (Recipe Name includes Query)
    if (!match) {
        match = recipeDb.find(r => {
            const name = getRecipeName(r);
            return normalize(name).includes(normQuery);
        });
    }

    // 3. Try reverse inclusion (Query includes Recipe Name)
    if (!match) {
        match = recipeDb.find(r => {
            const name = getRecipeName(r);
            return name.length > 5 && normQuery.includes(normalize(name));
        });
    }

    // 4. Keyword match (if at least 2 keywords match)
    if (!match && keywords.length >= 1) {
        match = recipeDb.find(r => {
            const name = normalize(getRecipeName(r));
            // Check if all keywords are present
            return keywords.every(k => name.includes(k));
        });
    }

    // 5. Special keyword match for single word queries like "Sandkage"
    if (!match && keywords.length === 1) {
        match = recipeDb.find(r => {
            const name = normalize(getRecipeName(r));
            return name.includes(keywords[0]);
        });
    }

    return match;
}

// Helper to parse .txt recipe files
function parseTxtRecipe(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        const ingredients = [];
        const method = [];
        let section = 'meta'; // meta, ingredients, method

        lines.forEach(line => {
            const trimmed = line.trim();
            if (!trimmed) return;

            if (trimmed.includes('Ingredienser Opskrift Enh Lager Enh')) {
                section = 'ingredients';
                return;
            }
            if (trimmed.startsWith('Metodik')) {
                section = 'method';
                return;
            }
            if (trimmed.includes('Bispebjerg og Frederiksberg Hospital') || trimmed.includes('Side ')) {
                return; // Skip headers/footers
            }

            if (section === 'ingredients') {
                // heuristic to filter out meta info lines in ingredients section
                if (!trimmed.startsWith('Standard portion str') && !trimmed.startsWith('Total mængde')) {
                    ingredients.push(trimmed);
                }
            } else if (section === 'method') {
                method.push(trimmed);
            }
        });

        return { ingredients, method };
    } catch (e) {
        console.error(`Error parsing txt file ${filePath}: ${e.message}`);
        return null;
    }
}

// 0. Preload File Index (Performance Optimization)
console.log('Indexing files from:', SEARCH_DIRS[0]);
let allFiles = [];
try {
    // Find all files, excluding node_modules and hidden files
    const cmd = `find "${SEARCH_DIRS[0]}" -type f -not -path "*/.*" -not -path "*/node_modules/*"`;
    const output = execSync(cmd, { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 50 }); // 50MB buffer
    allFiles = output.split('\n').filter(l => l.trim().length > 0);
    console.log(`Indexed ${allFiles.length} files.`);

    // Debug Index
    const biksemadCheck = allFiles.filter(f => f.toLowerCase().includes('biksemad'));
    console.log(`Debug Index: Found ${biksemadCheck.length} files containing 'biksemad'.`);
    if (biksemadCheck.length > 0) console.log(`Example: ${biksemadCheck[0]}`);

} catch (e) {
    console.error(`Error indexing files: ${e.message}`);
    process.exit(1);
}

// Manual Mappings for tricky dish names
const MANUAL_MAPPINGS = {
    "Frugtgrød m. fløde (150g)": "Frugtgrød",
    "Appelsinsuppe (180g)": "Appelsinsuppe",
    "Krydderkage (70g)": "Krydderkage", // Check if file exists
    "Mørbradbøf (90g)": "Mørbrad",
    "Andebryst (90g)": "Andebryst",
    "Rubinsteinerkage (90g)": "Rubinsteinerkage",
    "Wienerschnitzel (110g)": "Wienerschnitzel",
    "Risengrød (180g)": "Risengrød",
    "Pæretærte (90g)": "Pæretærte",
    "Chokoladekage (70g)": "Chokoladekage",
    "Minestronesuppe (180g)": "Minestronesuppe",
    "Abrikosgrød m. fløde (150g)": "Abrikosgrød",
    "Budding m. saft (100g)": "Budding"
};

// Optimized findRecipeFile using in-memory index
function findRecipeFile(dishName) {
    let safeName = dishName.replace(/\(.*?\)/g, '').trim();

    // Check Manual Mapping
    if (MANUAL_MAPPINGS[dishName]) {
        safeName = MANUAL_MAPPINGS[dishName];
        // console.log(`Using mapping: ${dishName} -> ${safeName}`);
    }

    // Normalize for search: remove special chars, lowercase
    const cleanName = safeName.replace(/[^\w\såæøÅÆØ]/g, '').toLowerCase();
    const parts = cleanName.split(/\s+/).filter(w => w.length > 2);

    if (parts.length === 0) return null;

    try {
        let bestMatch = null;
        let bestScore = -1;

        // Debug Biksemad
        const debug = cleanName.includes('biksemad');

        // Filter candidates: Files that contain at least one of the search parts (Case Insensitive)
        // Since we iterate all files, we can just score them directly if they match a basic filter

        // Optimization: Pre-filter to reduce iteration count for scoring
        // Only consider files that have at least one keyword in their name (basename)
        const candidates = allFiles.filter(file => {
            const basename = path.basename(file).toLowerCase();
            return parts.some(p => basename.includes(p));
        });

        if (debug) {
            console.log(`Debug Biksemad: Found ${candidates.length} candidates.`);
            // console.log(candidates.slice(0, 5));
        }

        candidates.forEach(file => {
            const basename = path.basename(file).toLowerCase();
            const ext = path.extname(file).toLowerCase();

            // 1. Keyword Overlap Score
            let matchCount = 0;
            parts.forEach(part => {
                if (basename.includes(part)) matchCount++;
            });
            let score = (matchCount / parts.length) * 10; // Base score 0-10

            // 2. Penalties
            // If dish name doesn't have "suppe", but file does -> Penalty
            if (!cleanName.includes('suppe') && basename.includes('suppe')) score -= 10;
            if (!cleanName.includes('sauce') && basename.includes('sauce')) score -= 5;
            if (!cleanName.includes('tilbehør') && basename.includes('tilbehør')) score -= 5;
            if (!cleanName.includes('creme') && basename.includes('creme')) score -= 5;
            if (!cleanName.includes('lage') && basename.includes('lage')) score -= 5; // e.g. Braiseringslage

            // 3. Bonuses
            if (basename.includes(cleanName)) score += 5; // Exact phrase match
            if (['.pdf', '.txt', '.doc', '.docx'].includes(ext)) score += 1;

            // 4. Strict Requirement for Multi-word Queries
            if (parts.length > 1 && matchCount < parts.length) {
                // If specific words are missing, heavy penalty unless it's a super good match otherwise
                // e.g. "Stegt Flæsk" -> "Stegt Flæsk.pdf" matches both.
                // "Stegt Flæsk" -> "Stegt Kylling.pdf" matches 1.
                score -= 10;
            }

            // Special case: Exact match of the full cleaned name (ignoring extension)
            const nameNoExt = path.parse(basename).name.toLowerCase();
            if (nameNoExt === cleanName) score += 20;

            if (score > 6 && score > bestScore) { // Threshold 6
                bestScore = score;
                bestMatch = file;
            } else if (score === bestScore && bestMatch) {
                if (basename.length < path.basename(bestMatch).length) {
                    bestMatch = file;
                }
            }
        });

        if (!bestMatch && candidates.length > 0) {
            // console.log(`Debug: No match for "${dishName}". Found ${candidates.length} candidates.`);
            // candidates.slice(0, 3).forEach(c => console.log(` - ${path.basename(c)}`));
        }

        return bestMatch;

    } catch (e) {
        // console.error(`Find error for ${dishName}: ${e.message}`);
        return null;
    }
}


// Helper to parse ingredients from the raw string format (JSON)
function parseIngredients(rawIngredients) {
    if (!Array.isArray(rawIngredients)) return [];

    return rawIngredients
        .filter(line => line.includes('[Ingredienser Opskrift Enh Lager Enh]')) // Filter relevant lines
        .map(line => {
            // Remove prefix
            return line.replace('[Ingredienser Opskrift Enh Lager Enh]', '').trim();
        })
        .filter(l =>
            !l.startsWith('Total mængde') &&
            !l.startsWith('Standard portion str') &&
            !l.startsWith('Metodik') &&
            !l.startsWith('Rettet') &&
            !l.includes('Side ') &&
            !l.includes('Bispebjerg og Frederiksberg Hospital')
        );
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

    markdown += `## ${day.date}\n`;

    recipesToFind.forEach(item => {
        const recipe = findRecipeInJson(item.name);
        const displayName = item.name;

        if (recipe) {
            const recipeName = getRecipeName(recipe);

            markdown += `### ${displayName} (${recipeName})\n`;
            markdown += `**Kategori:** ${recipe.category || item.type} | **Kilde:** JSON Database\n\n`;

            markdown += `#### Ingredienser\n`;
            const ingredients = parseIngredients(recipe.ingredients);
            if (ingredients.length > 0) {
                markdown += `| Råvarelinje |\n| --- |\n`;
                ingredients.forEach(ing => {
                    markdown += `| ${ing} |\n`;
                });
            } else {
                markdown += `_Ingen ingredienser fundet i data._\n`;
            }
            markdown += `\n`;

            markdown += `#### Fremgangsmåde\n`;
            let methods = recipe.method || [];
            if (methods.length === 0 && recipe.ingredients) {
                let methodStarted = false;
                recipe.ingredients.forEach(line => {
                    if (line.includes('Metodik')) methodStarted = true;
                    else if (methodStarted && line.includes('[Ingredienser Opskrift Enh Lager Enh]')) {
                        methods.push(line.replace('[Ingredienser Opskrift Enh Lager Enh]', '').trim());
                    }
                });
            }

            if (methods.length > 0) {
                methods.forEach((step, idx) => {
                    if (step.includes('Side ') || step.includes('Bispebjerg og Frederiksberg Hospital')) return;
                    markdown += `${idx + 1}. ${step}\n`;
                });
            } else {
                markdown += `_Ingen fremgangsmåde fundet._\n`;
            }
            markdown += `\n`;
            markdown += `---\n\n`;

        } else {
            // Fallback to File Search
            const fileMatch = findRecipeFile(item.name);

            if (fileMatch) {
                console.log(`Found file for ${displayName}: ${fileMatch}`);
                const basename = path.basename(fileMatch);

                // If it's a .txt file, try to parse it
                if (fileMatch.endsWith('.txt')) {
                    const parsed = parseTxtRecipe(fileMatch);
                    if (parsed && (parsed.ingredients.length > 0 || parsed.method.length > 0)) {
                        markdown += `### ${displayName} - [Tekst Opskrift]\n`;
                        markdown += `**Kategori:** ${item.type} | **Kilde:** ${basename}\n\n`;

                        markdown += `#### Ingredienser\n`;
                        markdown += `| Råvarelinje |\n| --- |\n`;
                        parsed.ingredients.forEach(ing => {
                            markdown += `| ${ing} |\n`;
                        });
                        markdown += `\n`;

                        markdown += `#### Fremgangsmåde\n`;
                        parsed.method.forEach((step, idx) => {
                            markdown += `${idx + 1}. ${step}\n`;
                        });
                        markdown += `\n`;
                        markdown += `---\n\n`;
                        return; // Done with this item
                    }
                }

                // Default: Link to file
                markdown += `### ${displayName} - [FIL FUNDET]\n`;
                markdown += `**Fil:** [${basename}](file://${fileMatch})\n\n`;
                markdown += `_Denne opskrift blev fundet som en fil, men data kunne ikke udtrækkes automatisk. Se venligst filen for detaljer._\n\n`;
                markdown += `---\n\n`;
            } else {
                console.log(`Missing: ${displayName}`);
                missingRecipes.push(`${day.date}: ${displayName}`);
                markdown += `### ${displayName} - [MANGLER]\n\n`;
                markdown += `---\n\n`;
            }
        }
    });
});

// Append Missing Recipes Section
if (missingRecipes.length > 0) {
    markdown += `## Manglende Opskrifter Opsamling\n`;
    missingRecipes.forEach(m => markdown += `- ${m}\n`);
}

const outputPath = path.join(process.cwd(), 'march_2026_recipes_v2.md');
fs.writeFileSync(outputPath, markdown);
console.log(`Successfully generated recipe book at: ${outputPath}`);
console.log(`Found ${62 - missingRecipes.length} recipes (JSON + Files).`); // 31 days * 2
console.log(`Missing ${missingRecipes.length} recipes.`);
