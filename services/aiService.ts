
import nlp from 'compromise';
import { RecipeData, Ingredient } from '../types';
import { AIAnalysis, FlavorProfile, AIRecipeVariation } from '../types/aiTypes';
import { getAllRecipes } from './authenticRecipes';

class AIService {
    private static instance: AIService;
    private isInitialized = false;

    private readonly HEALTHY_SUBSTITUTIONS: Record<string, string[]> = {
        'butter': ['olive oil', 'greek yogurt', 'avocado', 'applesauce'],
        'sugar': ['honey', 'maple syrup', 'stevia', 'banana puree'],
        'heavy cream': ['coconut cream', 'greek yogurt', 'cashew cream', 'evaporated milk'],
        'white flour': ['whole wheat flour', 'almond flour', 'oat flour'],
        'pasta': ['zucchini noodles', 'spaghetti squash', 'whole wheat pasta'],
        'rice': ['cauliflower rice', 'quinoa', 'brown rice'],
        'sour cream': ['greek yogurt', 'cottage cheese'],
        'mayonnaise': ['greek yogurt', 'avocado', 'hummus'],
        'oil': ['applesauce', 'greek yogurt'],
        'salt': ['herbs', 'spices', 'lemon juice']
    };

    private readonly VEGAN_SUBSTITUTIONS: Record<string, string[]> = {
        'milk': ['almond milk', 'oat milk', 'soy milk', 'coconut milk'],
        'butter': ['vegan butter', 'coconut oil', 'olive oil'],
        'eggs': ['flax eggs', 'chia eggs', 'applesauce', 'silken tofu'],
        'cheese': ['nutritional yeast', 'vegan cheese', 'cashew cheese'],
        'honey': ['maple syrup', 'agave nectar'],
        'yogurt': ['coconut yogurt', 'soy yogurt'],
        'cream': ['coconut cream', 'oat cream', 'soy cream'],
        'chicken': ['tofu', 'tempeh', 'seitan', 'chickpeas'],
        'beef': ['lentils', 'black beans', 'mushrooms', 'plant-based meat'],
        'fish': ['tofu', 'seaweed', 'jackfruit']
    };

    public static getInstance(): AIService {
        if (!AIService.instance) {
            AIService.instance = new AIService();
        }
        return AIService.instance;
    }

    async initialize(): Promise<void> {
        this.isInitialized = true;
        console.log('AI Service initialized');
    }

    async analyzeRecipe(recipe: RecipeData): Promise<AIAnalysis> {
        return {
            healthScore: this.calculateHealthScore(recipe),
            difficulty: this.assessDifficulty(recipe),
            cuisineType: this.detectCuisineType(recipe),
            cookingMethods: this.extractCookingMethods(recipe),
            flavorProfile: this.analyzeFlavorProfile(recipe),
            dietaryTags: this.identifyDietaryTags(recipe),
            allergens: this.detectAllergens(recipe),
            nutritionInsights: {
                highProtein: (recipe.nutrition?.perPortion?.protein || 0) > 20,
                lowCarb: (recipe.nutrition?.perPortion?.carbohydrates || 0) < 30,
                highFiber: (recipe.nutrition?.perPortion?.fiber || 0) > 5,
                lowSodium: (recipe.nutrition?.perPortion?.salt || 0) < 1, // Salt is usually low in grams
                heartHealthy: (recipe.nutrition?.perPortion?.saturatedFat || 0) < 5
            }
        };
    }

    private calculateHealthScore(recipe: RecipeData): number {
        let score = 50;
        const ingredients = recipe.ingredients.map(i => i.name.toLowerCase());

        const healthyKeywords = ['broccoli', 'spinach', 'cale', 'carrot', 'tomato', 'fish', 'chicken', 'beans', 'lentils', 'quinoa', 'oats'];
        const unhealthyKeywords = ['sugar', 'processed', 'refined', 'deep fry', 'fatty', 'butter', 'cream', 'bacon'];

        score += ingredients.filter(i => healthyKeywords.some(k => i.includes(k))).length * 5;
        score -= ingredients.filter(i => unhealthyKeywords.some(k => i.includes(k))).length * 5;

        return Math.max(0, Math.min(100, score));
    }

    private assessDifficulty(recipe: RecipeData): 'easy' | 'medium' | 'hard' {
        const stepsCount = recipe.steps.length;
        const ingredientsCount = recipe.ingredients.length;
        const score = stepsCount + ingredientsCount;

        if (score < 10) return 'easy';
        if (score < 20) return 'medium';
        return 'hard';
    }

    private detectCuisineType(recipe: RecipeData): string {
        const text = (recipe.recipeName + ' ' + recipe.ingredients.map(i => i.name).join(' ')).toLowerCase();

        if (text.includes('pasta') || text.includes('basil') || text.includes('oregano')) return 'Italian';
        if (text.includes('soy') || text.includes('ginger') || text.includes('rice') || text.includes('wok')) return 'Asian';
        if (text.includes('taco') || text.includes('chili') || text.includes('cumin')) return 'Mexican';
        if (text.includes('curry') || text.includes('masala') || text.includes('turmeric')) return 'Indian';
        if (text.includes('frikadeller') || text.includes('sovs') || text.includes('kartofler')) return 'Danish';

        return 'International';
    }

    private extractCookingMethods(recipe: RecipeData): string[] {
        const methods: string[] = [];
        const instructions = recipe.steps.map(s => s.description).join(' ').toLowerCase();
        const knownMethods = ['bake', 'roast', 'grill', 'fry', 'sauté', 'steam', 'boil', 'simmer', 'poach', 'braise', 'steg', 'kog', 'bag'];

        knownMethods.forEach(m => {
            if (instructions.includes(m)) methods.push(m);
        });

        return [...new Set(methods)];
    }

    private analyzeFlavorProfile(recipe: RecipeData): FlavorProfile {
        const ingredients = recipe.ingredients.map(i => i.name.toLowerCase());

        const countMatches = (keywords: string[]) =>
            ingredients.filter(i => keywords.some(k => i.includes(k))).length;

        const profile = {
            sweet: countMatches(['sugar', 'honey', 'fruit', 'sukker', 'sirup']),
            salty: countMatches(['salt', 'soy', 'soja', 'bacon']),
            sour: countMatches(['lemon', 'lime', 'vinegar', 'citron', 'eddike']),
            bitter: countMatches(['kale', 'coffee', 'dark chocolate', 'olives']),
            umami: countMatches(['tomato', 'mushroom', 'cheese', 'meat', 'bouillon', 'fond']),
            spicy: countMatches(['chili', 'pepper', 'cayenne', 'jalapeno'])
        };

        // Normalize roughly to 0-10
        Object.keys(profile).forEach(k => {
            // @ts-ignore
            profile[k] = Math.min(10, profile[k] * 2);
        });

        return profile;
    }

    private identifyDietaryTags(recipe: RecipeData): string[] {
        const tags: string[] = [];
        const ingredients = recipe.ingredients.map(i => i.name.toLowerCase());

        const isVegetarian = !ingredients.some(i => ['meat', 'chicken', 'beef', 'pork', 'fish', 'bacon', 'skinke', 'okse', 'kalv', 'svine'].some(m => i.includes(m)));
        const isVegan = isVegetarian && !ingredients.some(i => ['milk', 'cheese', 'butter', 'egg', 'honey', 'mælk', 'ost', 'smør', 'æg', 'fløde'].some(d => i.includes(d)));
        const isGlutenFree = !ingredients.some(i => ['wheat', 'flour', 'bread', 'pasta', 'mel', 'hvede', 'rug', 'byg'].some(g => i.includes(g)));

        if (isVegetarian) tags.push('Vegetarian');
        if (isVegan) tags.push('Vegan');
        if (isGlutenFree) tags.push('Gluten-Free');

        return tags;
    }

    private detectAllergens(recipe: RecipeData): string[] {
        return recipe.nutrition?.allergens || [];
    }

    async generateRecipeVariations(recipe: RecipeData): Promise<AIRecipeVariation[]> {
        const variations: AIRecipeVariation[] = [];

        const healthy = await this.createHealthyVariation(recipe);
        if (healthy) variations.push(healthy);

        const vegan = await this.createVeganVariation(recipe);
        if (vegan) variations.push(vegan);

        return variations;
    }

    private async createHealthyVariation(recipe: RecipeData): Promise<AIRecipeVariation | null> {
        // Logic to swap ingredients based on HEALTHY_SUBSTITUTIONS
        const newIngredients = recipe.ingredients.map(ing => {
            const name = ing.name.toLowerCase();
            for (const [bad, goodOpts] of Object.entries(this.HEALTHY_SUBSTITUTIONS)) {
                if (name.includes(bad)) {
                    const replacement = goodOpts[0];
                    return { ...ing, name: `${replacement} (instead of ${ing.name})` };
                }
            }
            return ing;
        });

        if (JSON.stringify(newIngredients) === JSON.stringify(recipe.ingredients)) return null;

        return {
            id: `${recipe.recipeNumber}-healthy`,
            originalRecipeId: recipe.recipeNumber,
            title: `${recipe.recipeName} - Healthy Version`,
            description: 'Lower calorie and nutrient dense version.',
            modifiedIngredients: newIngredients,
            modifiedInstructions: recipe.steps.map(s => s.description).join('\n').replace(/fry/gi, 'bake'),
            healthBenefits: ['Lower calories', 'Better fats'],
            nutritionChanges: {},
            tags: ['Healthy']
        };
    }

    private async createVeganVariation(recipe: RecipeData): Promise<AIRecipeVariation | null> {
        const newIngredients = recipe.ingredients.map(ing => {
            const name = ing.name.toLowerCase();
            for (const [bad, goodOpts] of Object.entries(this.VEGAN_SUBSTITUTIONS)) {
                if (name.includes(bad)) {
                    const replacement = goodOpts[0];
                    return { ...ing, name: `${replacement} (vegan alt for ${ing.name})` };
                }
            }
            return ing;
        });

        const isChanged = JSON.stringify(newIngredients) !== JSON.stringify(recipe.ingredients);
        if (!isChanged) return null; // Already vegan or no subs found

        return {
            id: `${recipe.recipeNumber}-vegan`,
            originalRecipeId: recipe.recipeNumber,
            title: `${recipe.recipeName} - Vegan Version`,
            description: 'Plant-based version of the classic dish.',
            modifiedIngredients: newIngredients,
            modifiedInstructions: recipe.steps.map(s => s.description).join('\n'),
            healthBenefits: ['Plant-based', 'Zero cholesterol'],
            nutritionChanges: {},
            tags: ['Vegan']
        };
    }

    async suggestRecipes(preferences: any, availableIngredients: string[]): Promise<RecipeData[]> {
        const allRecipes = getAllRecipes(); // Returns raw objects, need to map to RecipeData?
        // Actually authenticRecipes.ts exports getAllRecipes which returns the raw objects.
        // We should allow suggestRecipes to work with raw objects but return RecipeData?
        // For simplicity, let's assume we filter the raw array and then 'getAuthenticRecipe' for the results.
        // But getAuthenticRecipe needs targetParams. 
        // I'll roughly filter the raw objects.

        // NOTE: This logic needs to be robust. For now, adapting the raw objects is easier as they are close enough for search.

        return allRecipes.filter(r => {
            const ingNames = r.ingredients.map((i: any) => i.name.toLowerCase());
            return availableIngredients.some(av => ingNames.some((n: string) => n.includes(av.toLowerCase())));
        }).slice(0, 10).map(r => ({
            // Quick cast or use getAuthenticRecipe
            recipeName: r.recipeName,
            recipeNumber: r.id,
            category: r.category,
            ingredients: r.ingredients,
            steps: r.method.map((m: string) => ({ description: m })),
            // ... fill other required fields with defaults
            levnedsmiddelNr: '',
            yield: { portions: '0', rawWeightPerPortion: '0', finishedWeightPerPortion: '0' },
            timeEstimate: '',
            difficulty: '',
            storageNotes: '',
            specialRequirements: '',
            varedeklaration: '',
            productionNotes: ''
        }));
    }
}

export default AIService;
