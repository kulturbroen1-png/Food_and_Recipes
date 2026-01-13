/**
 * MENU OPTIMIZER SERVICE
 * 
 * Automatically corrects compliance failures by modifying the dish composition.
 * 
 * Strategies:
 * 1. ENERGY GAP -> Add 'Piskefløde' (Cream) or 'Smør' (Butter).
 * 2. PROTEIN GAP -> Increase Raw Protein Weight.
 * 3. SENSORY GAP -> Add 'Agurkesalat' (Pickles) or 'Asier'.
 */

import type { SensoryProfile } from './sensoryProfile.ts';

export interface OptimizedResult {
    adjustments: {
        addedCreamG: number;
        addedButterG: number;
        proteinScale: number; // 1.0 = none, 1.2 = +20%
        addedSensoryItem: string | null;
    };
    costImpactPerPortion: number;
    actions: string[];
}

// Fixed Prices for Optimization Items (approx 2025 levels)
const PRICE_CREAM = 35; // kr/kg (Piskefløde)
const PRICE_BUTTER = 70; // kr/kg (Smør)
const PRICE_PICKLES = 20; // kr/kg (Agurkesalat/Asier)
const PRICE_SLAW = 15; // kr/kg (Gulerrod/Raakost)

export function optimizeDishComposition(
    baseCompliance: { protein: boolean; energy: boolean; sensory: boolean },
    currentProteinWeightRaw: number,
    baseProteinPrice: number, // kr/kg
    dishName: string
): OptimizedResult {

    const res: OptimizedResult = {
        adjustments: {
            addedCreamG: 0,
            addedButterG: 0,
            proteinScale: 1.0,
            addedSensoryItem: null
        },
        costImpactPerPortion: 0,
        actions: []
    };

    // 1. ENERGY FIX (Ældreloven)
    // If Energy Density is low, we MUST add fat.
    // Strategy: Add 50g Cream to sauce. If no sauce implied, add 20g Butter (Melting).
    if (!baseCompliance.energy) {
        // Simple heuristic: Most dishes have sauce.
        res.adjustments.addedCreamG = 50;
        res.costImpactPerPortion += (PRICE_CREAM * 50 / 1000);
        res.actions.push('Enrichment: +50ml Piskefløde');

        // If that's likely not enough (very lean), add butter too? 
        // For now, let's assume 50g cream fixes E% density (adds ~18g fat -> ~650kJ).
    }

    // 2. PROTEIN FIX (Ældreloven)
    // If Protein < 26g/meal (approx < 130g active meat or < 80g raw protein depending on shrinkage).
    // Strategy: Increase portion size by 25%.
    if (!baseCompliance.protein) {
        res.adjustments.proteinScale = 1.25;
        const extraWeight = currentProteinWeightRaw * 0.25;
        res.costImpactPerPortion += (baseProteinPrice * extraWeight / 1000);
        res.actions.push(`Protein Fortification: +25% Meat (${Math.round(extraWeight)}g)`);
    }

    // 3. SENSORY FIX (Peter Klosse)
    // If not balanced (likely too Coating), add Contracting.
    if (!baseCompliance.sensory) {
        // Heuristic: What fits?
        const dishLower = dishName.toLowerCase();
        let item = 'Agurkesalat'; // Default cheap acid/crunch

        if (dishLower.includes('steg') || dishLower.includes('kam')) item = 'Rødkål (Ekstra)'; // Usually implies pickles/red cabbage
        else if (dishLower.includes('fisk')) item = 'Citron & Dild';
        else if (dishLower.includes('kylling')) item = 'Agurkesalat';
        else if (dishLower.includes('frikadelle')) item = 'Asier';
        else if (dishLower.includes('kødsovs') || dishLower.includes('pasta')) item = 'Tomatsalat';

        res.adjustments.addedSensoryItem = item;
        // Assume 60g portion for sensory side
        res.costImpactPerPortion += (PRICE_PICKLES * 60 / 1000);
        res.actions.push(`Sensory Balance: +60g ${item}`);
    }

    return res;
}
