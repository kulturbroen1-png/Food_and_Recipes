
export type SourceType = 'pdf' | 'word' | 'excel' | 'video' | 'web' | 'txt' | 'mds' | 'book';

export interface MenuItem {
  id: number;
  name: string;
  category?: string;
  sourceType?: SourceType;
  sourceReference?: string;
  tags?: string[];
}

export interface RecipeParameters {
  recipeName: string;
  recipeNumber?: string; // MDS Varenummer
  numPieces: string;
  weightPerPiece: string;
  portionType: 'Normal' | 'Lille' | 'Stor';
  category: string;
  userInitials: string;
  ovenTemperature?: string;
  ovenTime?: string;
  ovenSteam?: string;
  ovenMode?: 'DAMP' | 'KOMBI' | 'VARMLUFT' | '';
  sourceReference?: string; // Kildehenvisning (fx filnavn)
}

export interface Ingredient {
  name: string;
  levnedsmiddelNr?: string;
  quantity: number;
  grossQuantity: number;
  scaling: string;
  wastePercentage?: number;
}

export interface RecipeStep {
  description: string;
}

export interface OvenSettings {
  temperature: string;
  time: string;
  steamPercentage: string;
  mode: 'DAMP' | 'KOMBI' | 'VARMLUFT';
}

export interface NutritionData {
  energyKj: number;
  energyKcal: number;
  fat: number;
  saturatedFat: number;
  carbohydrates: number;
  sugar: number;
  protein: number;
  salt: number;
  fiber: number;
}

export interface RecipeNutrition {
  per100g: NutritionData;
  perPortion: NutritionData;
  allergens: string[];
  fatPercentage?: number;
  proteinPercentage?: number;
}

export interface SubRecipe {
  recipeNumber: string;
  quantity: number;
  unit: string; // e.g., "kg", "liter", "portions"
  name?: string; // optional display name
}

export interface RecipeData {
  recipeName: string;
  recipeNumber: string;
  category?: string;
  levnedsmiddelNr: string;
  sourceReference?: string; // Kildehenvisning (fx filnavn)
  yield: {
    portions: string;
    rawWeightPerPortion: string;
    finishedWeightPerPortion: string;
  };
  timeEstimate: string;
  difficulty: string;
  storageNotes: string;
  specialRequirements: string;
  ovenSettings?: OvenSettings;
  subRecipes?: SubRecipe[];
  ingredients: Ingredient[];
  steps: RecipeStep[];
  varedeklaration: string;
  productionNotes: string;
  nutrition?: RecipeNutrition;
  groundingUrls?: { uri: string, title: string }[];
}

export interface SelectedComponent {
  dayDate: string;
  type: 'Dish' | 'Sauce' | 'Carb' | 'Veg' | 'Biret';
  category?: string;
  name: string;
  recipeNumber?: string; // Valgfrit MDS nummer
  sourceReference?: string; // Kildehenvisning
}

export interface MealDay {
  date: string;
  icon: string;
  type: 'Gris' | 'Okse' | 'Fjerkræ' | 'Fisk' | 'Grøn' | 'Fest';
  dish: string;       // Hovedret navn
  protein: string;    // Kød/Fisk mængde (90-110g)
  sauce: string;      // Sauce mængde (1 dl)
  carb: string;       // Kartofler/Ris (100g)
  veg: string;        // Grønt (30-50g)
  biret: string;      // Suppe/Dessert/Kage
  isHoliday?: boolean;
}

export interface CalculatedIngredient {
  name: string;
  quantityGram: number;
  bakersPercentage: number;
  isFlour?: boolean;
  substitutions?: string;
}