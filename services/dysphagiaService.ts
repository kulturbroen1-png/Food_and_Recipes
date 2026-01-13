/**
 * DYSPHAGIA SERVICE (The Texture Premium)
 * 
 * Calculus for modified texture diets (Gratin / Gelé).
 * 
 * Premise:
 * - Normalkost: Standard price.
 * - Blød kost (Soft): +10% (More sauce, mash, stewing).
 * - Gratin/Gelé (Dysphagia): +30% (Requires eggs, cream, protein powder, molds, labor).
 * 
 * We assume a demographic split (configurable):
 * - 60% Normal
 * - 40% Dysphagia (Weighted average of Soft/Gratin)
 */

export interface TextureSplit {
    normal: number; // 0.6
    dysphagia: number; // 0.4
}

export interface DysphagiaResult {
    baseCost: number;
    dysphagiaSurcharge: number; // The extra cost for the 40%
    weightedTotalCost: number;
    textureMode: 'Standard' | 'Gratin-Required';
}

export function calculateDysphagiaCost(
    dishName: string,
    baseCostPerPortion: number,
    split: TextureSplit = { normal: 0.60, dysphagia: 0.40 }
): DysphagiaResult {
    const lower = dishName.toLowerCase();

    // Determine if the dish is ALREADY soft/friendly (e.g. Soup, Porridge, Mash)
    // If yes, the premium is lower.
    let isNaturallySoft = false;
    if (lower.includes('suppe') || lower.includes('grød') || lower.includes('mos') || lower.includes('frikadelle') || lower.includes('boller i karry')) {
        isNaturallySoft = true;
    }

    // Cost Multiplier for the Dysphagia portion
    // If Dish is "Flæskesteg", Dysphagia version is "Flæskestegs-Gelé/Gratin" -> High Process (+40%)
    // If Dish is "Jordskokkesuppe", Dysphagia version is "Blended Suppe" -> Low Process (+5%)
    let premiumFactor = 0.35; // Default high for meat dishes converted to gratin
    if (isNaturallySoft) premiumFactor = 0.10;

    const normalPart = baseCostPerPortion * split.normal;
    const dysphagiaPart = (baseCostPerPortion * (1 + premiumFactor)) * split.dysphagia;

    const weightedTotal = normalPart + dysphagiaPart;

    return {
        baseCost: baseCostPerPortion,
        dysphagiaSurcharge: weightedTotal - baseCostPerPortion,
        weightedTotalCost: weightedTotal,
        textureMode: isNaturallySoft ? 'Standard' : 'Gratin-Required'
    };
}
