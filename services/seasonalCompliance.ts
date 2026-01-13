/**
 * SEASONAL COMPLIANCE SERVICE
 * 
 * Based on 'Sæsongrønt til udbud' structure:
 * Vinter: Jan - May (approx)
 * Sommer: June - Sept
 * Efterår: Sept - Jan
 * 
 * And general Danish seasonality.
 */

interface SeasonRule {
    ingredient: string;
    allowedMonths: number[]; // 0-11 (Jan=0)
    warningMessage: string;
}

// Key seasonal items that should NOT be used fresh out of season
const SEASONAL_RULES: SeasonRule[] = [
    {
        ingredient: 'Jordbær',
        allowedMonths: [5, 6, 7], // June-Aug (maybe late May)
        warningMessage: 'Friske jordbær er kun i sæson om sommeren. Brug frosne/grød ellers.'
    },
    {
        ingredient: 'Asparges',
        allowedMonths: [4, 5, 6], // May-June
        warningMessage: 'Hvide/grønne asparges er primært maj-juni.'
    },
    {
        ingredient: 'Grønlangkål',
        allowedMonths: [10, 11, 0, 1], // Nov-Feb
        warningMessage: 'Grønlangkål er en vinterspise.'
    },
    {
        ingredient: 'Rabarber',
        allowedMonths: [3, 4, 5, 6, 7, 8], // Apr-Sep
        warningMessage: 'Rabarber er forår/sommer.'
    },
    {
        ingredient: 'Majs',
        allowedMonths: [7, 8, 9], // Aug-Oct
        warningMessage: 'Friske majs er sensommer.'
    }
];

export function checkSeasonality(dateStr: string, ingredients: string[]): { isCompliant: boolean, warnings: string[] } {
    const date = new Date(dateStr);
    const month = date.getMonth(); // 0-11
    const warnings: string[] = [];

    for (const ing of ingredients) {
        if (!ing) continue;
        const ingLower = ing.toLowerCase();

        for (const rule of SEASONAL_RULES) {
            if (ingLower.includes(rule.ingredient.toLowerCase())) {
                // Exception cases (e.g. "henkogte", "frosne")
                if (ingLower.includes('frosne') || ingLower.includes('henkogte') || ingLower.includes('syltede') || ingLower.includes('grød')) {
                    continue;
                }

                if (!rule.allowedMonths.includes(month)) {
                    warnings.push(`${rule.ingredient}: ${rule.warningMessage}`);
                }
            }
        }
    }

    return {
        isCompliant: warnings.length === 0,
        warnings
    };
}
