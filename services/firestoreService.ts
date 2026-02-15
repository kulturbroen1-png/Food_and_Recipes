// Firestore Service for Recipe Cloud Platform
import { db } from '../config/firebaseConfig';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    addDoc,
    updateDoc,
    deleteDoc,
    WriteBatch,
    writeBatch
} from 'firebase/firestore';
import { CategorizedRecipe, PrimaryCategory, MealType, StyleTag } from './recipeCategorizationService';

// Collection names
const RECIPES_COLLECTION = 'recipes';
const CATEGORIES_COLLECTION = 'categories';

/**
 * Upload a single categorized recipe to Firestore
 */
export async function uploadRecipe(recipe: CategorizedRecipe): Promise<string> {
    try {
        const recipeRef = await addDoc(collection(db, RECIPES_COLLECTION), {
            ...recipe,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        console.log(`✅ Uploaded: ${recipe.recipeName} (ID: ${recipeRef.id})`);
        return recipeRef.id;
    } catch (error) {
        console.error(`❌ Failed to upload ${recipe.recipeName}:`, error);
        throw error;
    }
}

/**
 * Upload multiple recipes in batches (max 500 per batch)
 */
export async function uploadRecipesBatch(recipes: CategorizedRecipe[]): Promise<{
    successful: number;
    failed: number;
    errors: string[];
}> {
    const batchSize = 500;
    const results = { successful: 0, failed: 0, errors: [] as string[] };

    for (let i = 0; i < recipes.length; i += batchSize) {
        const batch: WriteBatch = writeBatch(db);
        const chunk = recipes.slice(i, i + batchSize);

        for (const recipe of chunk) {
            try {
                const recipeRef = doc(collection(db, RECIPES_COLLECTION));
                batch.set(recipeRef, {
                    ...recipe,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                });
                results.successful++;
            } catch (error) {
                results.failed++;
                results.errors.push(`${recipe.recipeName}: ${error}`);
            }
        }

        try {
            await batch.commit();
            console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} uploaded (${chunk.length} recipes)`);
        } catch (error) {
            console.error(`❌ Batch commit failed:`, error);
            results.failed += chunk.length;
            results.errors.push(`Batch ${i}-${i + batchSize}: ${error}`);
        }
    }

    return results;
}

/**
 * Get all recipes from Firestore
 */
export async function getAllRecipes(): Promise<CategorizedRecipe[]> {
    const recipesSnapshot = await getDocs(collection(db, RECIPES_COLLECTION));
    return recipesSnapshot.docs.map(doc => ({
        recipeId: doc.id,
        ...doc.data()
    } as CategorizedRecipe));
}

/**
 * Get recipes by category
 */
export async function getRecipesByCategory(category: PrimaryCategory): Promise<CategorizedRecipe[]> {
    const q = query(
        collection(db, RECIPES_COLLECTION),
        where('category.primary', '==', category)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        recipeId: doc.id,
        ...doc.data()
    } as CategorizedRecipe));
}

/**
 * Get recipes by meal type
 */
export async function getRecipesByMealType(mealType: MealType): Promise<CategorizedRecipe[]> {
    const q = query(
        collection(db, RECIPES_COLLECTION),
        where('category.mealType', '==', mealType)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        recipeId: doc.id,
        ...doc.data()
    } as CategorizedRecipe));
}

/**
 * Search recipes by name
 */
export async function searchRecipes(searchTerm: string): Promise<CategorizedRecipe[]> {
    // Note: Firestore doesn't support full-text search natively
    // For production, consider using Algolia or similar service
    // This is a simple client-side filter after fetching all recipes

    const allRecipes = await getAllRecipes();
    const lowerSearch = searchTerm.toLowerCase();

    return allRecipes.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(lowerSearch)
    );
}

/**
 * Get category statistics
 */
export async function getCategoryStats(): Promise<Record<PrimaryCategory, number>> {
    const allRecipes = await getAllRecipes();

    const stats: Record<string, number> = {
        'Grise': 0,
        'Okse/Kalv': 0,
        'Fjerkræ': 0,
        'Fisk': 0,
        'Grønne': 0,
        'Diverse': 0
    };

    allRecipes.forEach(recipe => {
        stats[recipe.category.primary] = (stats[recipe.category.primary] || 0) + 1;
    });

    return stats as Record<PrimaryCategory, number>;
}

/**
 * Delete all recipes (use with caution!)
 */
export async function deleteAllRecipes(): Promise<number> {
    const snapshot = await getDocs(collection(db, RECIPES_COLLECTION));
    const batch = writeBatch(db);

    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    return snapshot.size;
}

export default {
    uploadRecipe,
    uploadRecipesBatch,
    getAllRecipes,
    getRecipesByCategory,
    getRecipesByMealType,
    searchRecipes,
    getCategoryStats,
    deleteAllRecipes
};
