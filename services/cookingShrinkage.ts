/**
 * COOKING SHRINKAGE (SVIND) SERVICE
 * 
 * Based on authoritative data from:
 * 1. Slagteriernes Forskningsinstitut (via Mastercater 'kød % svind.docx')
 * 2. DTU Fødevareinstituttet (Generic fallback)
 * 3. Bæredygtighedssekretariatet (Hospital standards)
 */

export interface ShrinkageGuide {
    category: string;
    item: string;
    shrinkagePercent: number; // 0-100
    source: 'Slagteriernes Forskningsinstitut' | 'DTU' | 'Standard';
    notes?: string;
}

export const SHRINKAGE_DATA: ShrinkageGuide[] = [
    // --- SVINEKØD (Pork) ---
    { category: 'Svinekød', item: 'Panerede skinkeschnitzler', shrinkagePercent: 5, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Panerede nakkekoteletter', shrinkagePercent: 10, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Hakket svinekød (Frikadeller)', shrinkagePercent: 12, source: 'Slagteriernes Forskningsinstitut', notes: 'Avg for 6-18% fat' },
    { category: 'Svinekød', item: 'Lever', shrinkagePercent: 15, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Svinekoteletter', shrinkagePercent: 20, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Mørbrad', shrinkagePercent: 20, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Skinkeschnitzler', shrinkagePercent: 20, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Fadkoteletter', shrinkagePercent: 25, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Skinkesteg / Kam', shrinkagePercent: 25, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Nakkesteg / Filet', shrinkagePercent: 35, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Ribbensteg', shrinkagePercent: 35, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Svinekød', item: 'Bacon', shrinkagePercent: 70, source: 'Slagteriernes Forskningsinstitut' },

    // --- OKSEKØD (Beef) ---
    { category: 'Oksekød', item: 'Okseculotte', shrinkagePercent: 9, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Oksekød', item: 'Oksetyndsteg', shrinkagePercent: 10, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Oksekød', item: 'Roastbeef (Inderlår)', shrinkagePercent: 15, source: 'Slagteriernes Forskningsinstitut' },
    { category: 'Oksekød', item: 'Hakket oksekød', shrinkagePercent: 25, source: 'Slagteriernes Forskningsinstitut', notes: 'Avg for 5-15% fat' },
    { category: 'Oksekød', item: 'Oksetykkam (Simre)', shrinkagePercent: 39, source: 'Slagteriernes Forskningsinstitut' },

    // --- FISK (Fish) ---
    { category: 'Fisk', item: 'Fisk (Generelt)', shrinkagePercent: 20, source: 'DTU' },
    { category: 'Fisk', item: 'Paneret fisk', shrinkagePercent: 10, source: 'DTU' }, // Lower due to coating retention

    // --- GRØNT (Vegetables) ---
    { category: 'Grønt', item: 'Bagte rodfrugter', shrinkagePercent: 25, source: 'Standard' },
    { category: 'Grønt', item: 'Dampet grønt', shrinkagePercent: 5, source: 'Standard' },

    // --- SAUCE/SOUP ---
    { category: 'Flydende', item: 'Sovs (Indkogning)', shrinkagePercent: 15, source: 'Standard' },
    { category: 'Flydende', item: 'Suppe', shrinkagePercent: 10, source: 'Standard' }
];

/**
 * Get shrinkage percentage for a given ingredient name.
 * Uses fuzzy matching to find best category.
 */
export function getShrinkage(ingredientName: string): number {
    const lowerName = ingredientName.toLowerCase();

    // Specific high-confidence matches FIRST
    if (lowerName.includes('bacon')) return 70;
    if (lowerName.includes('frikadelle') || (lowerName.includes('hakket') && lowerName.includes('svin'))) return 12;
    if (lowerName.includes('hakket') && lowerName.includes('okse')) return 25;
    if (lowerName.includes('ribben')) return 35;
    if (lowerName.includes('nakke')) return 35;
    if (lowerName.includes('skinkesteg') || lowerName.includes('kamsteg') || lowerName.includes('svinekam')) return 25;
    if (lowerName.includes('mørbrad')) return 20;
    if (lowerName.includes('culotte')) return 9;
    if (lowerName.includes('roastbeef')) return 15;

    // Category fallback
    if (lowerName.includes('svin') || lowerName.includes('flæsk')) return 25; // Default pork
    if (lowerName.includes('okse') || lowerName.includes('kalv')) return 20; // Default beef
    if (lowerName.includes('fisk') || lowerName.includes('laks') || lowerName.includes('torsk')) return 20; // Default fish
    if (lowerName.includes('kylling') || lowerName.includes('han')) return 25; // Default poultry

    // Default fallback if no match
    return 0;
}

/**
 * Calculate raw weight needed for a desired served weight.
 * Formula: Raw = Served / (1 - shrinkage)
 */
export function calculateRawWeight(servedWeightGrams: number, shrinkagePercent: number): number {
    if (shrinkagePercent >= 100) return servedWeightGrams; // Safety
    return servedWeightGrams / (1 - (shrinkagePercent / 100));
}
