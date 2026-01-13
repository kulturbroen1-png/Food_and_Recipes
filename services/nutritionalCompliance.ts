/**
 * NUTRITIONAL COMPLIANCE SERVICE (Ældreloven / Bekendtgørelsen)
 * 
 * Targets for 'Energi-tæt kost' (Small appetite, high need):
 * - Protein: 18-20 E% (or > 26g per main meal)
 * - Fat: ~50 E%
 * - Carb: ~30-35 E%
 * 
 * Energy per gram:
 * Protein: 17 kJ (4 kcal)
 * Fat: 37 kJ (9 kcal)
 * Carb: 17 kJ (4 kcal)
 */

interface NutritionalProfile {
    proteinG: number;
    fatG: number;
    carbG: number;
    energyKJ: number;
    proteinEPercent: number;
    fatEPercent: number;
}

// Estimated Macros per 100g RAW/COOKED (Standard lookup)
const INGREDIENT_MACROS: Record<string, { p: number, f: number, c: number }> = {
    // PROTEIN
    'svin': { p: 18, f: 20, c: 0 }, // Fatty pork
    'frikadeller': { p: 14, f: 18, c: 5 }, // Pre-made or standard
    'okse': { p: 20, f: 15, c: 0 },
    'fisk': { p: 18, f: 10, c: 0 }, // Fatty fish mix
    'fisk (magre)': { p: 18, f: 2, c: 0 },
    'kylling': { p: 20, f: 5, c: 0 },
    'bælgfrugt': { p: 8, f: 1, c: 15 }, // Cooked beans/lentils
    'æg': { p: 12, f: 10, c: 1 },

    // CARB
    'kartofler': { p: 2, f: 0, c: 17 },
    'kartoffelmos': { p: 2, f: 5, c: 15 }, // With butter/milk
    'ris': { p: 2, f: 0, c: 28 }, // Cooked
    'pasta': { p: 5, f: 1, c: 30 }, // Cooked

    // VEG
    'grønt': { p: 2, f: 0, c: 5 }, // Generic cooked veg (broccoli/carrots)
    'rødkål': { p: 1, f: 1, c: 10 }, // Sweetened

    // SAUCE / FAT
    'sovs': { p: 2, f: 15, c: 5 }, // Cream gravy
    'smør': { p: 0, f: 80, c: 0 },
    'opbagning': { p: 1, f: 50, c: 30 }
};

export function calculateNutritionalCompliance(
    proteinName: string,
    proteinWeightRaw: number,
    carbName: string,
    carbWeightCooked: number,
    sauceWeight: number
): { profile: NutritionalProfile, isCompliant: boolean, issues: string[] } {

    // 1. Estimate Macros
    const pMacro = findMacro(proteinName);
    const cMacro = findMacro(carbName);
    const sauceMacro = INGREDIENT_MACROS['sovs'];
    const vegMacro = INGREDIENT_MACROS['grønt'];

    // Total Grams
    let totalP = (pMacro.p * proteinWeightRaw / 100) + (cMacro.p * carbWeightCooked / 100) + (sauceMacro.p * sauceWeight / 100) + (vegMacro.p * 150 / 100);
    let totalF = (pMacro.f * proteinWeightRaw / 100) + (cMacro.f * carbWeightCooked / 100) + (sauceMacro.f * sauceWeight / 100) + (vegMacro.f * 150 / 100);
    let totalC = (pMacro.c * proteinWeightRaw / 100) + (cMacro.c * carbWeightCooked / 100) + (sauceMacro.c * sauceWeight / 100) + (vegMacro.c * 150 / 100);

    // 2. Adjust for 'Lean Meat' paradox
    // If chicken/lean fish, assume extra fat added in preparation (frying) or sauce
    if (proteinName.toLowerCase().includes('kylling') || proteinName.toLowerCase().includes('kalkun')) {
        totalF += 10; // 10g fat for frying
    }

    // 3. Estimate Energy
    const energyKJ = (totalP * 17) + (totalF * 37) + (totalC * 17);

    // 4. E%
    const pE = (totalP * 17 / energyKJ) * 100;
    const fE = (totalF * 37 / energyKJ) * 100;

    const issues: string[] = [];
    if (energyKJ < 2000) issues.push('Low Energy (< 2 MJ)'); // Main meal should be 2-3 MJ approx? Actually for seniors 3.2-3.9 MJ total? 2.5 is typical for main meal.
    if (totalP < 26) issues.push(`Low Protein (${totalP.toFixed(1)}g < 26g)`);
    if (fE < 40) issues.push(`Low Fat/Energy Density (${fE.toFixed(0)} E% < 40%)`);

    return {
        profile: {
            proteinG: totalP,
            fatG: totalF,
            carbG: totalC,
            energyKJ,
            proteinEPercent: pE,
            fatEPercent: fE
        },
        isCompliant: issues.length === 0,
        issues
    };
}

function findMacro(name: string): { p: number, f: number, c: number } {
    const lower = name.toLowerCase();
    if (lower.includes('kylling')) return INGREDIENT_MACROS['kylling'];
    if (lower.includes('fisk')) return INGREDIENT_MACROS['fisk'];
    if (lower.includes('svin') || lower.includes('flæsk') || lower.includes('medister')) return INGREDIENT_MACROS['svin'];
    if (lower.includes('okse') || lower.includes('kalv')) return INGREDIENT_MACROS['okse'];
    if (lower.includes('frikadelle')) return INGREDIENT_MACROS['frikadeller'];
    if (lower.includes('grød')) return { p: 4, f: 4, c: 15 };
    if (lower.includes('suppe')) return { p: 4, f: 4, c: 5 }; // Needs bread

    if (lower.includes('mos')) return INGREDIENT_MACROS['kartoffelmos'];
    if (lower.includes('ris')) return INGREDIENT_MACROS['ris'];
    if (lower.includes('pasta')) return INGREDIENT_MACROS['pasta'];

    return INGREDIENT_MACROS['kartofler']; // Default carb
}
