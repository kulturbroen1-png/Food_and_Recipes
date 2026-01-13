/**
 * PORTION STANDARDS SERVICE
 * 
 * Based on data from:
 * 1. DTU Fødevareinstituttet 'Mål, vægt og portionsstørrelser'
 * 2. Ældreloven Guidelines (Energy-dense recommendations)
 * 3. Kosthåndbogen
 */

export interface PortionStandard {
    component: string;
    servedWeightGrams: number;
    description: string;
}

// Standard portion sizes for 'Middagsmad' (Hot Meal) for elderly
// Focusing on energy-dense requirements (Small/Medium portions with high density)
export const PORTION_STANDARDS: Record<string, PortionStandard> = {
    'Meat (Main)': {
        component: 'Meat/Fish',
        servedWeightGrams: 100, // Cooked weight. Raw will be higher (~125-150g)
        description: 'Cooked meat, fish, or vegetarian protein source'
    },
    'Potatoes': {
        component: 'Starch',
        servedWeightGrams: 125,
        description: 'Boiled potatoes (Energy dense options like mashed are higher)'
    },
    'Mashed Potatoes': {
        component: 'Starch',
        servedWeightGrams: 200,
        description: 'Mashed potatoes with butter/cream'
    },
    'Rice/Pasta': {
        component: 'Starch',
        servedWeightGrams: 150,
        description: 'Cooked rice or pasta'
    },
    'Vegetables': {
        component: 'Vegetables',
        servedWeightGrams: 100,
        description: 'Cooked vegetables (often baked or creamed for energy)'
    },
    'Sauce': {
        component: 'Sauce',
        servedWeightGrams: 100,
        description: 'Gravy or sauce'
    },
    'Soup (Main)': {
        component: 'Soup',
        servedWeightGrams: 200,
        description: 'Full meal soup served with bread - Standard 200g whole year'
    },
    'Dessert': {
        component: 'Dessert',
        servedWeightGrams: 100,
        description: 'Pudding, stewed fruit, or cake'
    }
};

/**
 * Get portion weight for a specific component type
 */
export function getPortionWeight(componentType: string, isSoup: boolean = false, isMash: boolean = false): number {
    if (isSoup) return PORTION_STANDARDS['Soup (Main)'].servedWeightGrams;

    switch (componentType.toLowerCase()) {
        case 'meat':
        case 'fish':
        case 'fisk':
        case 'kød':
        case 'protein':
            return PORTION_STANDARDS['Meat (Main)'].servedWeightGrams;

        case 'starch':
        case 'kartoffel':
        case 'kartofler':
        case 'carb':
            return isMash ? PORTION_STANDARDS['Mashed Potatoes'].servedWeightGrams : PORTION_STANDARDS['Potatoes'].servedWeightGrams;

        case 'vegetable':
        case 'grønt':
        case 'veg':
            return PORTION_STANDARDS['Vegetables'].servedWeightGrams;

        case 'sauce':
        case 'dyppelse':
            return PORTION_STANDARDS['Sauce'].servedWeightGrams;

        case 'dessert':
        case 'biret':
            return PORTION_STANDARDS['Dessert'].servedWeightGrams;

        default:
            return 100; // Safe default
    }
}