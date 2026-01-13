
import { RecipeData } from '../types';

const STORAGE_KEY = 'breelte_user_recipes';

export const saveUserRecipe = (recipe: RecipeData) => {
  const existing = getUserRecipes();
  const index = existing.findIndex(r => r.recipeName === recipe.recipeName);
  
  if (index > -1) {
    existing[index] = recipe;
  } else {
    existing.push(recipe);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getUserRecipes = (): RecipeData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteUserRecipe = (name: string) => {
  const existing = getUserRecipes();
  const filtered = existing.filter(r => r.recipeName !== name);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const exportDatabase = () => {
  const data = localStorage.getItem(STORAGE_KEY) || '[]';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `MDS_Opskrifts_Arkiv_${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

export const importDatabase = (jsonString: string) => {
  try {
    const imported = JSON.parse(jsonString);
    if (Array.isArray(imported)) {
      const existing = getUserRecipes();
      // Merge unique recipes by name
      const merged = [...existing];
      imported.forEach(newR => {
        const idx = merged.findIndex(r => r.recipeName === newR.recipeName);
        if (idx > -1) {
          merged[idx] = newR;
        } else {
          merged.push(newR);
        }
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    }
  } catch (e) {
    console.error("Import error:", e);
  }
  return false;
};
