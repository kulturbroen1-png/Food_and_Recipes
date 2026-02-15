
import { RecipeData, Ingredient, NutritionData } from '../types';

export interface AIAnalysis {
    healthScore: number;
    difficulty: 'easy' | 'medium' | 'hard';
    cuisineType: string;
    cookingMethods: string[];
    flavorProfile: FlavorProfile;
    dietaryTags: string[];
    allergens: string[];
    nutritionInsights: NutritionInsights;
}

export interface FlavorProfile {
    sweet: number;
    salty: number;
    sour: number;
    bitter: number;
    umami: number;
    spicy: number;
}

export interface NutritionInsights {
    highProtein: boolean;
    lowCarb: boolean;
    highFiber: boolean;
    lowSodium: boolean;
    heartHealthy: boolean;
}

export interface AIRecipeVariation {
    id: string;
    originalRecipeId: string;
    title: string;
    description: string;
    modifiedIngredients: Ingredient[];
    modifiedInstructions: string;
    healthBenefits: string[];
    nutritionChanges: Partial<NutritionData>;
    tags: string[];
}

export interface MealPlanItem {
    id: string;
    date: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    recipeId: string;
    recipe: RecipeData;
    plannedTime: string;
    portions: number;
    notes?: string;
}

export interface ShoppingListItem {
    id: string;
    shoppingListId: string;
    ingredientName: string;
    quantity: number;
    unit: string;
    isCompleted: boolean;
    recipeId?: string;
    notes?: string;
    createdAt: Date;
}
