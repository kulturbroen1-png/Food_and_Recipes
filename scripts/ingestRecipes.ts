import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from "@google/genai";
import mammoth from 'mammoth';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

// Load environment variables
dotenv.config({ path: '.env.local' });

const API_KEY = process.env.API_KEY || process.env.VITE_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("API Key not found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenAI({ apiKey: API_KEY });

// Configuration
const SOURCE_DIRS = [
    '/Users/ashisgautam/Documents/Food_and_Recipes/Recipes',
    '/Users/ashisgautam/Documents/Food_and_Recipes/Import_From_Cloud',
    '/Users/ashisgautam/Library/CloudStorage/GoogleDrive-foodexpert143@gmail.com/My Drive'
];

// Placeholder for OneDrive if user provides it later
// '/Users/ashisgautam/Library/CloudStorage/OneDrive-Personal'

const OUTPUT_FILE = path.join(process.cwd(), 'public/imported_recipes.json');

// Schema Definition (Copied from geminiService.ts to ensure compatibility)
const RECIPE_SCHEMA = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING },
        recipeNumber: { type: Type.STRING },
        category: { type: Type.STRING },
        yield: {
            type: Type.OBJECT,
            properties: {
                portions: { type: Type.STRING },
                rawWeightPerPortion: { type: Type.STRING },
                finishedWeightPerPortion: { type: Type.STRING, description: 'MÅL-VÆGT pr portion i gram' }
            }
        },
        timeEstimate: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        storageNotes: { type: Type.STRING },
        specialRequirements: { type: Type.STRING },
        ovenSettings: {
            type: Type.OBJECT,
            properties: {
                temperature: { type: Type.STRING },
                time: { type: Type.STRING },
                steamPercentage: { type: Type.STRING },
                mode: { type: Type.STRING, enum: ['DAMP', 'KOMBI', 'VARMLUFT'] }
            }
        },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    quantity: { type: Type.NUMBER, description: 'NETTO vægt i gram (færdig tilberedt)' },
                    grossQuantity: { type: Type.NUMBER, description: 'BRUTTO vægt i gram (råvare inkl. svind)' },
                    wastePercentage: { type: Type.NUMBER, description: 'Svind i procent (fx 22)' },
                    levnedsmiddelNr: { type: Type.STRING }
                }
            }
        },
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    description: { type: Type.STRING }
                }
            }
        },
        nutrition: {
            type: Type.OBJECT,
            properties: {
                fatPercentage: { type: Type.NUMBER },
                proteinPercentage: { type: Type.NUMBER }
            }
        },
        varedeklaration: { type: Type.STRING },
        productionNotes: { type: Type.STRING }
    }
};

async function extractText(filePath: string): Promise<string> {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.txt' || ext === '.md') {
        return await fs.readFile(filePath, 'utf-8');
    } else if (ext === '.docx') {
        const buffer = await fs.readFile(filePath);
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
    } else if (ext === '.pdf') {
        const buffer = await fs.readFile(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    }
    return '';
}

async function parseRecipe(text: string, filename: string) {
    try {
        const prompt = `
      Du er en ekspert i opskriftskonvertering. 
      Opgave: Analyser følgende tekst (fra filen "${filename}") og konverter den til en struktureret JSON opskrift.
      
      VIGTIGT:
      1. Beregn manglende værdier (f.eks. brutto/netto hvis kun én er givet), brug standard svind (kød 25%, grønt 10% osv).
      2. Hvis mængder mangler, giv et kvalificeret estimat for en standard gastro-bakke portion (eller hvad der giver mening).
      3. Fjern økologi-termer hvis de forekommer.
      
      TEKST:
      ${text.substring(0, 30000)} // Truncate to avoid token limits
    `;

        const result = await genAI.models.generateContent({
            model: 'gemini-2.0-flash-thinking-exp-01-21',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: RECIPE_SCHEMA
            }
        });

        if (result && result.text) {
            return JSON.parse(result.text);
        }
    } catch (err) {
        console.error(`Error parsing ${filename}:`, err);
    }
    return null;
}


async function getFiles(dir: string): Promise<string[]> {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : Promise.resolve([res]);
    }));
    return Array.prototype.concat(...files);
}


function calculateHash(text: string): string {
    return crypto.createHash('sha256').update(text).digest('hex');
}

async function main() {
    console.log("Starting Recipe Ingestion...");
    const recipes = [];
    const processedHashes = new Set<string>();
    const processedNames = new Set<string>();

    for (const dir of SOURCE_DIRS) {
        console.log(`Scanning directory (recursive): ${dir}`);
        try {
            try {
                await fs.access(dir);
            } catch {
                console.warn(`Directory not accessible: ${dir}`);
                continue;
            }

            const files = await getFiles(dir);

            for (const fullPath of files) {
                const ext = path.extname(fullPath).toLowerCase();
                if (['.txt', '.md', '.docx', '.pdf'].includes(ext)) {
                    // Skip temp files
                    if (path.basename(fullPath).startsWith('.') || path.basename(fullPath).startsWith('~')) continue;

                    console.log(`Processing: ${path.basename(fullPath)}`);
                    try {
                        const text = await extractText(fullPath);
                        if (text && text.length > 50) {
                            // 1. Deduplication by Content Hash
                            const fileHash = calculateHash(text);
                            if (processedHashes.has(fileHash)) {
                                console.log(`⏭️  Skipping duplicate file (content match): ${path.basename(fullPath)}`);
                                continue;
                            }
                            processedHashes.add(fileHash);

                            const recipe = await parseRecipe(text, path.basename(fullPath));
                            if (recipe) {

                                // 2. Deduplication by Recipe Name
                                if (processedNames.has(recipe.recipeName.trim().toLowerCase())) {
                                    console.log(`⏭️  Skipping duplicate recipe name: ${recipe.recipeName}`);
                                    continue;
                                }
                                processedNames.add(recipe.recipeName.trim().toLowerCase());

                                recipe.sourceReference = `Imported from ${path.basename(fullPath)}`;
                                recipes.push(recipe);
                                console.log(`✅ Successfully parsed: ${recipe.recipeName}`);
                            }
                        }
                    } catch (err) {
                        console.error(`Failed to process ${path.basename(fullPath)}`, err);
                    }
                }
            }
        } catch (err) {
            console.error(`Error processing dir ${dir}:`, err);
        }
    }

    // Ensure output dir exists
    const outputDir = path.dirname(OUTPUT_FILE);
    await fs.mkdir(outputDir, { recursive: true });

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(recipes, null, 2));
    console.log(`\n🎉 Process Complete. Wrote ${recipes.length} unique recipes to ${OUTPUT_FILE}`);
}

main().catch(console.error);
