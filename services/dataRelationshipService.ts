import { RecipeData, SelectedComponent, MealDay, Ingredient } from '../types';
import { saveUserRecipe, getUserRecipes } from './recipeStorage';
import { getHorkramPrice } from './pricingService';
import { getAllRecipes } from './authenticRecipes';

// Central data store for relationships
class DataRelationshipStore {
    private relationships: Map<string, Set<string>> = new Map();
    private reverseRelationships: Map<string, Set<string>> = new Map();
    private dataCache: Map<string, any> = new Map();
    private listeners: Set<() => void> = new Set();

    // Entity types
    static readonly ENTITY_TYPES = {
        MENU_ITEM: 'menu_item',
        RECIPE: 'recipe',
        SUB_RECIPE: 'sub_recipe',
        INGREDIENT: 'ingredient',
        PRICE: 'price',
        PROCUREMENT: 'procurement'
    };

    // Register a relationship (parent -> child)
    registerRelationship(parentId: string, childId: string, relationshipType: string) {
        if (!this.relationships.has(parentId)) {
            this.relationships.set(parentId, new Set());
        }
        if (!this.reverseRelationships.has(childId)) {
            this.reverseRelationships.set(childId, new Set());
        }

        this.relationships.get(parentId)!.add(`${relationshipType}:${childId}`);
        this.reverseRelationships.get(childId)!.add(`${relationshipType}:${parentId}`);
    }

    // Get all children of an entity
    getChildren(entityId: string): Array<{ type: string, id: string }> {
        const children = this.relationships.get(entityId) || new Set();
        return Array.from(children).map(rel => {
            const [type, id] = rel.split(':', 2);
            return { type, id };
        });
    }

    // Get all parents of an entity
    getParents(entityId: string): Array<{ type: string, id: string }> {
        const parents = this.reverseRelationships.get(entityId) || new Set();
        return Array.from(parents).map(rel => {
            const [type, id] = rel.split(':', 2);
            return { type, id };
        });
    }

    // Update entity and cascade changes
    updateEntity(entityId: string, entityType: string, data: any, silent: boolean = false) {
        // Cache the data
        this.dataCache.set(`${entityType}:${entityId}`, data);

        if (silent) return; // Stop cascading if silent update

        // Cascade updates based on entity type
        switch (entityType) {
            case DataRelationshipStore.ENTITY_TYPES.RECIPE:
                this.cascadeRecipeUpdate(entityId, data);
                break;
            case DataRelationshipStore.ENTITY_TYPES.INGREDIENT:
                this.cascadeIngredientUpdate(entityId, data);
                break;
            case DataRelationshipStore.ENTITY_TYPES.PRICE:
                this.cascadePriceUpdate(entityId, data);
                break;
        }

        // Notify listeners
        this.notifyListeners();
    }

    // Cascade recipe updates
    private cascadeRecipeUpdate(recipeId: string, recipe: RecipeData) {
        console.log(`[CASCADE] Updating recipe ${recipeId}`);

        // Update sub-recipes
        if (recipe.subRecipes) {
            recipe.subRecipes.forEach(subRecipe => {
                // Find and update sub-recipe references
                const subRecipeEntity = this.dataCache.get(`${DataRelationshipStore.ENTITY_TYPES.RECIPE}:${subRecipe.recipeNumber}`);
                if (subRecipeEntity) {
                    // Update sub-recipe with new parent reference - SILENTLY to avoid loops
                    this.updateEntity(subRecipe.recipeNumber, DataRelationshipStore.ENTITY_TYPES.RECIPE, {
                        ...subRecipeEntity,
                        sourceReference: `Updated from ${recipe.recipeName}`
                    }, true);
                }
            });
        }

        // Update ingredients
        recipe.ingredients.forEach(ingredient => {
            this.updateEntity(ingredient.name, DataRelationshipStore.ENTITY_TYPES.INGREDIENT, ingredient, true);
        });

        // Update procurement lists that reference this recipe
        const procurementLists = this.getChildren(recipeId)
            .filter(child => child.type === DataRelationshipStore.ENTITY_TYPES.PROCUREMENT);

        procurementLists.forEach(procurement => {
            this.updateProcurementList(procurement.id);
        });
    }

    // Cascade ingredient updates
    private cascadeIngredientUpdate(ingredientId: string, ingredient: Ingredient) {
        console.log(`[CASCADE] Updating ingredient ${ingredientId}`);

        // Find all recipes that contain this ingredient by searching through all cached recipes
        const allRecipes = Array.from(this.dataCache.entries())
            .filter(([key, value]) => key.startsWith(`${DataRelationshipStore.ENTITY_TYPES.RECIPE}:`))
            .map(([key, recipe]) => ({
                id: key.split(':')[1],
                data: recipe
            }));

        allRecipes.forEach(recipeInfo => {
            const recipe = recipeInfo.data;
            // Check if this recipe contains the changed ingredient
            const hasIngredient = recipe.ingredients?.some(ing => ing.name === ingredientId);

            if (hasIngredient) {
                console.log(`[CASCADE] Updating recipe ${recipe.recipeName} due to ingredient change`);

                // Update ingredient in recipe
                const updatedIngredients = recipe.ingredients.map(ing =>
                    ing.name === ingredientId ? { ...ing, ...ingredient } : ing
                );

                // Collect all ingredients (main + sub-recipe) for calculations
                // Collect all ingredients (main + sub-recipe) for calculations
                const allIngredients = [...updatedIngredients];

                // Calculate total weight from sub-recipes and main ingredients
                let totalWeightPerPortion = updatedIngredients.reduce((sum, ing) => sum + (ing.quantity || 0), 0);

                if (recipe.subRecipes) {
                    // Find sub-recipe data and calculate their contribution per portion
                    recipe.subRecipes.forEach(subRecipeRef => {
                        const subRecipeData = this.dataCache.get(`${DataRelationshipStore.ENTITY_TYPES.RECIPE}:${subRecipeRef.recipeNumber}`);
                        if (subRecipeData && subRecipeData.ingredients) {
                            // Calculate how much of this sub-recipe contributes per portion of parent
                            const subRecipeWeightPerPortion = subRecipeData.ingredients.reduce((sum, ing) => sum + (ing.quantity || 0), 0);
                            const portionsInSubRecipe = parseInt(subRecipeData.yield?.portions || "1") || 1;
                            const weightPerPortionFromSubRecipe = subRecipeWeightPerPortion / portionsInSubRecipe * (subRecipeRef.quantity / parseInt(recipe.yield?.portions || "1"));

                            totalWeightPerPortion += weightPerPortionFromSubRecipe;
                            allIngredients.push(...subRecipeData.ingredients);
                        }
                    });
                }

                // Update yield information based on new total weight
                const updatedYield = {
                    ...recipe.yield,
                    finishedWeightPerPortion: totalWeightPerPortion.toFixed(1)
                };

                const updatedRecipe = {
                    ...recipe,
                    ingredients: updatedIngredients,
                    yield: updatedYield,
                    varedeklaration: this.generateVaredeklaration(allIngredients)
                };

                // Save the updated recipe
                saveUserRecipe(updatedRecipe);
                // Important: Update the store SILENTLY to prevent re-triggering cascade for this recipe
                this.updateEntity(recipeInfo.id, DataRelationshipStore.ENTITY_TYPES.RECIPE, updatedRecipe, true);
            }
        });
    }

    // Cascade price updates
    private cascadePriceUpdate(priceId: string, priceData: any) {
        console.log(`[CASCADE] Updating price ${priceId}`);

        // Find all ingredients with this price
        const ingredients = Array.from(this.dataCache.entries())
            .filter(([key, value]) => key.startsWith(`${DataRelationshipStore.ENTITY_TYPES.INGREDIENT}:`))
            .filter(([key, ingredient]) => ingredient.levnedsmiddelNr === priceId);

        ingredients.forEach(([key, ingredient]) => {
            const ingredientId = key.split(':')[1];
            this.updateEntity(ingredientId, DataRelationshipStore.ENTITY_TYPES.INGREDIENT, {
                ...ingredient,
                priceData: priceData
            });
        });
    }

    // Update procurement list
    private updateProcurementList(procurementId: string) {
        // Implementation for updating procurement lists
        console.log(`[CASCADE] Updating procurement list ${procurementId}`);
    }

    // Generate varedeklaration from ingredients
    private generateVaredeklaration(ingredients: Ingredient[]): string {
        const allergens = ['HVEDE', 'RUG', 'BYG', 'HAVRE', 'GLUTEN', 'ÆG', 'MÆLK', 'LAKTOSE', 'FISK', 'SKALDYR'];
        const ingredientNames = ingredients
            .sort((a, b) => (b.quantity || 0) - (a.quantity || 0))
            .map(ing => {
                let name = ing.name;
                allergens.forEach(allergen => {
                    if (name.toUpperCase().includes(allergen)) {
                        name = name.toUpperCase();
                    }
                });
                return name;
            });

        return Array.from(new Set(ingredientNames)).join(', ');
    }

    // Subscribe to changes
    subscribe(listener: () => void) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    // Notify all listeners
    private notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    // Get entity data
    getEntity(entityId: string, entityType: string) {
        return this.dataCache.get(`${entityType}:${entityId}`);
    }

    initialize() {
        const userRecipes = getUserRecipes();
        const authentic = getAllRecipes().map(r => ({
            recipeName: r.recipeName,
            recipeNumber: r.id, // Map authentic ID to recipeNumber
            category: r.category,
            ingredients: r.ingredients || [],
            subRecipes: [], // Authentic recipes might not have subRecipes property structured same way initially
            yield: { portions: "1", finishedWeightPerPortion: "0" }
        }));

        // Merge - User recipes take precedence if they edit an authentic one
        const mergedMap = new Map();

        authentic.forEach((r: any) => mergedMap.set(r.recipeNumber, r));
        userRecipes.forEach(r => mergedMap.set(r.recipeNumber, r)); // Overwrite with user version

        const recipes = Array.from(mergedMap.values());

        recipes.forEach(recipe => {
            this.updateEntity(recipe.recipeNumber, DataRelationshipStore.ENTITY_TYPES.RECIPE, recipe);

            // Register relationships
            if (recipe.subRecipes) {
                recipe.subRecipes.forEach((subRecipe: any) => {
                    this.registerRelationship(
                        recipe.recipeNumber,
                        subRecipe.recipeNumber,
                        DataRelationshipStore.ENTITY_TYPES.SUB_RECIPE
                    );
                });
            }

            if (recipe.ingredients) {
                recipe.ingredients.forEach((ingredient: any) => {
                    this.registerRelationship(
                        recipe.recipeNumber,
                        ingredient.name,
                        DataRelationshipStore.ENTITY_TYPES.INGREDIENT
                    );
                });
            }
        });
    }
}

// Singleton instance
export const dataRelationshipStore = new DataRelationshipStore();

// Initialize on import or explicit call can remain
dataRelationshipStore.initialize();

// Helper functions
export const updateRecipeWithCascade = (recipe: RecipeData) => {
    saveUserRecipe(recipe);
    dataRelationshipStore.updateEntity(recipe.recipeNumber, DataRelationshipStore.ENTITY_TYPES.RECIPE, recipe);
};

export const updateIngredientWithCascade = (ingredient: Ingredient, recipeId: string) => {
    dataRelationshipStore.updateEntity(ingredient.name, DataRelationshipStore.ENTITY_TYPES.INGREDIENT, ingredient);
};

export const subscribeToDataChanges = (callback: () => void) => {
    return dataRelationshipStore.subscribe(callback);
};
