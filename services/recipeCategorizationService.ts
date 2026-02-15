
// Recipe Categorization Service - AI-Powered
import { GoogleGenAI } from "@google/genai";
import { Type, GenerateContentParameters } from "@google/genai";

// Category Definitions
export type PrimaryCategory = 'Grise' | 'Okse/Kalv' | 'Fjerkræ' | 'Fisk' | 'Grønne' | 'Diverse';
export type SecondaryCategory = 'Gryde' | 'Stegt' | 'Kogt' | 'Bagt' | 'Dampet';
export type MealType = 'Hovedret' | 'Suppe' | 'Dessert' | 'Grød' | 'Kage' | 'Tilbehør';
export type StyleTag = 'Klassisk' | 'Gammeldags' | 'Højtid' | 'Modern' | 'International';

export interface RecipeCategory {
    primary: PrimaryCategory;
    secondary?: SecondaryCategory;
    mealType: MealType;
    styles: StyleTag[];
    confidence: number; // 0-100
    autoTagged: boolean;
    taggedAt: string;
}

export interface CategorizedRecipe {
    recipeName: string;
    recipeId?: string;
    category: RecipeCategory;
    ingredients?: string[];
    originalSource?: string;
}

export interface CategorizationProgress {
    total: number;
    processed: number;
    successful: number;
    failed: number;
    currentBatch: number;
}

// AI Categorization Engine
export class RecipeCategorizationService {
    private ai: GoogleGenAI;
    private batchSize: number = 20;

    constructor(apiKey: string) {
        this.ai = new GoogleGenAI({ apiKey });
    }

    /**
     * Categorize a single recipe using Gemini AI
     */
    async categorizeRecipe(
        recipeName: string,
        ingredients?: string[]
    ): Promise<RecipeCategory> {
        const request = this.createCategorizationRequest(recipeName, ingredients);

        try {
            const response = await this.ai.models.generateContent(request);
            const category: RecipeCategory = JSON.parse(response.text);

            return {
                ...category,
                autoTagged: true,
                taggedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error(`Failed to categorize ${recipeName}:`, error);

            // Fallback to basic pattern matching
            return this.fallbackCategorization(recipeName, ingredients);
        }
    }

    /**
     * Categorize multiple recipes in batches
     */
    async categorizeBatch(
        recipes: { name: string; ingredients?: string[] }[],
        onProgress?: (progress: CategorizationProgress) => void
    ): Promise<CategorizedRecipe[]> {
        const results: CategorizedRecipe[] = [];
        const total = recipes.length;
        let processed = 0;
        let successful = 0;
        let failed = 0;

        // Process in batches to avoid rate limits
        for (let i = 0; i < recipes.length; i += this.batchSize) {
            const batch = recipes.slice(i, i + this.batchSize);
            const currentBatch = Math.floor(i / this.batchSize) + 1;

            // Process batch in parallel
            const batchPromises = batch.map(async (recipe) => {
                try {
                    const category = await this.categorizeRecipe(recipe.name, recipe.ingredients);
                    successful++;
                    return {
                        recipeName: recipe.name,
                        category,
                        ingredients: recipe.ingredients
                    };
                } catch (error) {
                    failed++;
                    console.error(`Failed to process ${recipe.name}:`, error);
                    return null;
                } finally {
                    processed++;

                    if (onProgress) {
                        onProgress({ total, processed, successful, failed, currentBatch });
                    }
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults.filter(r => r !== null) as CategorizedRecipe[]);

            // Rate limiting: wait 1 second between batches
            if (i + this.batchSize < recipes.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        return results;
    }

    /**
     * Create AI request for categorization
     */
    private createCategorizationRequest(
        recipeName: string,
        ingredients?: string[]
    ): GenerateContentParameters {
        const ingredientContext = ingredients && ingredients.length > 0
            ? `\n\nINGREDIENSER:\n${ingredients.join(', ')}`
            : '';

        const prompt = `Kategoriser følgende danske opskrift med HØST PRÆCISION:

OPSKRIFT: ${recipeName}${ingredientContext}

KATEGORIER AT VÆLGE FRA:

PRIMARY (vælg ÉN):
- Grise: Svinekød, bacon, flæsk, frikadeller af svin
- Okse/Kalv: Oksekød, kalvekød, tartar, bøf
- Fjerkræ: Kylling, kalkun, and, gås
- Fisk: Alle fisk og skaldyr
- Grønne: Vegetarisk, ingen kød/fisk
- Diverse: Hvis ingen ovenstående passer

SECONDARY (vælg én hvis relevant):
- Gryde: Stuvet, gryderetter, casserole
- Stegt: Stegt/pandet
- Kogt: Kogt hovedingrediens
- Bagt: Ovnbagt
- Dampet: Dampet tilberedning

MEAL_TYPE (vælg ÉN):
- Hovedret: Varm hovedret til frokost/aftensmad
- Suppe: Alle supper
- Dessert: Desserter, is, kager til dessert
- Grød: Grød, porridge
- Kage: Kager, wienerbrød (ikke dessert)
- Tilbehør: Sauce, salat, tilbehør

STYLES (vælg alle relevante):
- Klassisk: Traditionel dansk mad (frikadeller, stegt flæsk, etc.)
- Gammeldags: Gamle opskrifter, nostalgisk
- Højtid: Jul, påske, pinse, specielle højtider
- Modern: Moderne twist, fusion
- International: Inspiration udefra

EKSEMPLER:
"Frikadeller med brun sovs" → Primary: Grise, Secondary: Stegt, MealType: Hovedret, Styles: [Klassisk]
"Ris à l'amande" → Primary: Diverse, MealType: Dessert, Styles: [Klassisk, Højtid]
"Okserulle med grøntsager" → Primary: Okse/Kalv, Secondary: Bagt, MealType: Hovedret, Styles: []

Returner JSON med høj confidence (80-100 for sikre, 50-79 for usikre).`;

        return {
            model: 'gemini-3-flash-preview',
            contents: [{ parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        primary: {
                            type: Type.STRING,
                            enum: ['Grise', 'Okse/Kalv', 'Fjerkræ', 'Fisk', 'Grønne', 'Diverse']
                        },
                        secondary: {
                            type: Type.STRING,
                            enum: ['Gryde', 'Stegt', 'Kogt', 'Bagt', 'Dampet']
                        },
                        mealType: {
                            type: Type.STRING,
                            enum: ['Hovedret', 'Suppe', 'Dessert', 'Grød', 'Kage', 'Tilbehør']
                        },
                        styles: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                                enum: ['Klassisk', 'Gammeldags', 'Højtid', 'Modern', 'International']
                            }
                        },
                        confidence: { type: Type.NUMBER }
                    },
                    required: ['primary', 'mealType', 'styles', 'confidence']
                }
            }
        };
    }

    /**
     * Fallback categorization using pattern matching
     */
    private fallbackCategorization(
        recipeName: string,
        ingredients?: string[]
    ): RecipeCategory {
        const name = recipeName.toLowerCase();
        const ingredientText = ingredients?.join(' ').toLowerCase() || '';
        const combined = `${name} ${ingredientText}`;

        // Primary category detection
        let primary: PrimaryCategory = 'Diverse';
        if (combined.match(/gris|frikadelle|bacon|flæsk|medister|skinke/)) primary = 'Grise';
        else if (combined.match(/okse|kalv|bøf|hakkebøf|tartar/)) primary = 'Okse/Kalv';
        else if (combined.match(/kylling|kalkun|and|høne/)) primary = 'Fjerkræ';
        else if (combined.match(/fisk|laks|torsk|rødspætte|sild|rejer/)) primary = 'Fisk';
        else if (combined.match(/vegetar|grøn|bønne|linse/) && !combined.match(/kød|fisk/)) primary = 'Grønne';

        // Meal type detection
        let mealType: MealType = 'Hovedret';
        if (combined.match(/suppe|bouillon/)) mealType = 'Suppe';
        else if (combined.match(/dessert|is|mousse|fromage/)) mealType = 'Dessert';
        else if (combined.match(/grød|porridge/)) mealType = 'Grød';
        else if (combined.match(/kage|tærte|wienerbrød/) && !combined.match(/dessert/)) mealType = 'Kage';

        // Style detection
        const styles: StyleTag[] = [];
        if (combined.match(/klassisk|traditionel|dansk/)) styles.push('Klassisk');
        if (combined.match(/gammeldags|bedstemor/)) styles.push('Gammeldags');
        if (combined.match(/jul|påske|pinse|højtid/)) styles.push('Højtid');

        return {
            primary,
            mealType,
            styles,
            confidence: 50, // Lower confidence for fallback
            autoTagged: true,
            taggedAt: new Date().toISOString()
        };
    }

    /**
     * Get category statistics from a list of categorized recipes
     */
    getCategoryStats(recipes: CategorizedRecipe[]): {
        byPrimary: Record<PrimaryCategory, number>;
        byMealType: Record<MealType, number>;
        byStyle: Record<StyleTag, number>;
        avgConfidence: number;
    } {
        const byPrimary: Record<string, number> = {};
        const byMealType: Record<string, number> = {};
        const byStyle: Record<string, number> = {};
        let totalConfidence = 0;

        recipes.forEach(recipe => {
            // Count primary categories
            byPrimary[recipe.category.primary] = (byPrimary[recipe.category.primary] || 0) + 1;

            // Count meal types
            byMealType[recipe.category.mealType] = (byMealType[recipe.category.mealType] || 0) + 1;

            // Count styles
            recipe.category.styles.forEach(style => {
                byStyle[style] = (byStyle[style] || 0) + 1;
            });

            totalConfidence += recipe.category.confidence;
        });

        return {
            byPrimary: byPrimary as Record<PrimaryCategory, number>,
            byMealType: byMealType as Record<MealType, number>,
            byStyle: byStyle as Record<StyleTag, number>,
            avgConfidence: recipes.length > 0 ? totalConfidence / recipes.length : 0
        };
    }
}

// Export singleton instance
let categorizationService: RecipeCategorizationService | null = null;

export const getCategorizationService = (apiKey?: string): RecipeCategorizationService => {
    if (!categorizationService) {
        const key = apiKey || process.env.GEMINI_API_KEY || process.env.API_KEY || '';
        if (!key) {
            throw new Error('Gemini API key required for categorization service');
        }
        categorizationService = new RecipeCategorizationService(key);
    }
    return categorizationService;
};
