
import { RecipeData } from '../types';
import { MealPlanItem, ShoppingListItem } from '../types/aiTypes';
import { getAllRecipes, getAuthenticRecipe } from './authenticRecipes';

export interface WeeklyMealPlan {
    weekStartDate: string;
    meals: Record<string, Record<string, MealPlanItem>>;
    shoppingList: ShoppingListItem[];
}

class MealPlanningService {
    private static instance: MealPlanningService;

    public static getInstance(): MealPlanningService {
        if (!MealPlanningService.instance) {
            MealPlanningService.instance = new MealPlanningService();
        }
        return MealPlanningService.instance;
    }

    async generateWeeklyMealPlan(startDate: Date): Promise<WeeklyMealPlan> {
        const weekStart = new Date(startDate);
        const plan: WeeklyMealPlan = {
            weekStartDate: weekStart.toISOString(),
            meals: {},
            shoppingList: []
        };

        const allRecipes = getAllRecipes(); // Raw objects

        // Generate 7 days
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + i);
            const dateKey = date.toISOString().split('T')[0];

            // Simple random selection
            const dinner = allRecipes[Math.floor(Math.random() * allRecipes.length)];
            // Convert to RecipeData
            // @ts-ignore
            const recipeData = getAuthenticRecipe(dinner.recipeName, { numPieces: '4', weightPerPiece: '400' }) || {};

            plan.meals[dateKey] = {
                dinner: {
                    id: `meal-${dateKey}-dinner`,
                    date: dateKey,
                    mealType: 'dinner',
                    recipeId: dinner.id,
                    // @ts-ignore
                    recipe: recipeData,
                    plannedTime: '18:00',
                    portions: 4
                }
            };
        }

        plan.shoppingList = this.generateShoppingList(plan);
        return plan;
    }

    private generateShoppingList(plan: WeeklyMealPlan): ShoppingListItem[] {
        const items: ShoppingListItem[] = [];
        Object.values(plan.meals).forEach(day => {
            Object.values(day).forEach(meal => {
                // @ts-ignore 
                meal.recipe.ingredients?.forEach(ing => {
                    items.push({
                        id: `shop-${ing.name}`,
                        shoppingListId: 'weekly',
                        ingredientName: ing.name,
                        quantity: ing.quantity,
                        unit: ing.unit || 'g',
                        isCompleted: false,
                        createdAt: new Date()
                    });
                });
            });
        });
        return items;
    }
}

export default MealPlanningService;
