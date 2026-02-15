
import axios from 'axios';
import { RecipeData, Ingredient, NutritionData } from '../types';
import { NutritionInsights } from '../types/aiTypes';

export interface NutritionAnalysis extends NutritionData {
    vitamins: Record<string, number>;
    minerals: Record<string, number>;
}

class NutritionService {
    private static instance: NutritionService;
    private apiKey: string = '';
    private appId: string = '';
    private baseUrl = 'https://trackapi.nutritionix.com/v2';
    private isEnabled = false;

    public static getInstance(): NutritionService {
        if (!NutritionService.instance) {
            NutritionService.instance = new NutritionService();
        }
        return NutritionService.instance;
    }

    async initialize(): Promise<void> {
        // In Vite, use import.meta.env
        this.apiKey = import.meta.env.VITE_NUTRITIONIX_API_KEY || '';
        this.appId = import.meta.env.VITE_NUTRITIONIX_APP_ID || '';
        this.isEnabled = !!(this.apiKey && this.appId);
        console.log(`Nutrition Service (Web) initialized. API enabled: ${this.isEnabled}`);
    }

    async analyzeRecipe(recipe: RecipeData): Promise<NutritionAnalysis> {
        if (recipe.nutrition?.perPortion) {
            // Return existing data if available
            return this.expandNutritionData(recipe.nutrition.perPortion);
        }

        // Fallback: analyze ingredients
        let total: NutritionAnalysis = this.getEmptyNutritionAnalysis();
        for (const ing of recipe.ingredients) {
            const analysis = await this.analyzeIngredient(ing);
            total = this.addNutrition(total, analysis, ing.quantity); // basic scaling
        }

        // Average per portion (approximate if yield is text)
        const portions = parseInt(recipe.yield.portions) || 1;
        return this.scaleNutrition(total, 1 / portions);
    }

    private async analyzeIngredient(ingredient: Ingredient): Promise<NutritionAnalysis> {
        if (this.isEnabled) {
            try {
                const response = await axios.post(`${this.baseUrl}/natural/nutrients`, {
                    query: ingredient.name
                }, {
                    headers: {
                        'x-app-id': this.appId,
                        'x-app-key': this.apiKey,
                        'x-remote-user-id': '0'
                    }
                });
                const food = response.data.foods[0];
                if (food) return this.mapApiToAnalysis(food);
            } catch (e) {
                console.warn('Nutrition API failed, using fallback', e);
            }
        }
        return this.getFallbackNutrition(ingredient.name);
    }

    private mapApiToAnalysis(food: any): NutritionAnalysis {
        return {
            energyKj: (food.nf_calories || 0) * 4.184,
            energyKcal: food.nf_calories || 0,
            protein: food.nf_protein || 0,
            fat: food.nf_total_fat || 0,
            saturatedFat: food.nf_saturated_fat || 0,
            carbohydrates: food.nf_total_carbohydrate || 0,
            sugar: food.nf_sugars || 0,
            fiber: food.nf_dietary_fiber || 0,
            salt: (food.nf_sodium || 0) / 400, // Sodium mg to Salt g approx
            vitamins: { vitaminC: food.nf_vitamin_c || 0 },
            minerals: { iron: food.nf_iron || 0 }
        };
    }

    private getFallbackNutrition(name: string): NutritionAnalysis {
        // Very basic fallback
        return {
            energyKj: 0, energyKcal: 50, protein: 1, fat: 1, saturatedFat: 0,
            carbohydrates: 5, sugar: 1, fiber: 1, salt: 0,
            vitamins: {}, minerals: {}
        };
    }

    private expandNutritionData(data: NutritionData): NutritionAnalysis {
        return { ...data, vitamins: {}, minerals: {} };
    }

    private getEmptyNutritionAnalysis(): NutritionAnalysis {
        return {
            energyKj: 0, energyKcal: 0, protein: 0, fat: 0, saturatedFat: 0,
            carbohydrates: 0, sugar: 0, fiber: 0, salt: 0,
            vitamins: {}, minerals: {}
        };
    }

    private addNutrition(a: NutritionAnalysis, b: NutritionAnalysis, quantityFactor: number = 1): NutritionAnalysis {
        return {
            energyKj: a.energyKj + (b.energyKj * quantityFactor),
            energyKcal: a.energyKcal + (b.energyKcal * quantityFactor),
            protein: a.protein + (b.protein * quantityFactor),
            fat: a.fat + (b.fat * quantityFactor),
            saturatedFat: a.saturatedFat + (b.saturatedFat * quantityFactor),
            carbohydrates: a.carbohydrates + (b.carbohydrates * quantityFactor),
            sugar: a.sugar + (b.sugar * quantityFactor),
            fiber: a.fiber + (b.fiber * quantityFactor),
            salt: a.salt + (b.salt * quantityFactor),
            vitamins: {}, minerals: {}
        };
    }

    private scaleNutrition(a: NutritionAnalysis, factor: number): NutritionAnalysis {
        return {
            energyKj: a.energyKj * factor,
            energyKcal: a.energyKcal * factor,
            protein: a.protein * factor,
            fat: a.fat * factor,
            saturatedFat: a.saturatedFat * factor,
            carbohydrates: a.carbohydrates * factor,
            sugar: a.sugar * factor,
            fiber: a.fiber * factor,
            salt: a.salt * factor,
            vitamins: {}, minerals: {}
        };
    }
}

export default NutritionService;
