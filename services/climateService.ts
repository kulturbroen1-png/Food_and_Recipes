/**
 * CLIMATE SERVICE (CO2 Estimates)
 * 
 * Estimates CO2e (kg) per dish based on main protein.
 * Source: Den Store Klimadatabase (Concito) - Approx/Heuristic values.
 */

// kg CO2e per kg raw ingredient
const CO2_FACTORS: Record<string, number> = {
    'okse': 30.0,  // Beef is high
    'kalv': 30.0,
    'lam': 25.0,
    'svin': 4.5,   // Pork is med
    'flæsk': 4.5,
    'kylling': 3.5, // Chicken is low
    'kalkun': 3.5,
    'fisk': 3.0,    // Varied, but avg
    'torsk': 3.0,
    'sild': 2.0,
    'vegetar': 1.5, // Avg plant proteins
    'grød': 0.8,
    'suppe': 1.0,
    'kartofler': 0.2, // Very low
    'ris': 2.5,
    'pasta': 1.5,
    'grønt': 0.5,
    'sovs': 4.0 // Butter/Cream heavy
};

export function estimateDishCO2(
    proteinName: string, proteinWeightRawG: number,
    carbName: string, carbWeightRawG: number,
    vegWeightG: number,
    sauceWeightG: number
): { totalCO2: number, rating: 'Low' | 'Medium' | 'High' } {

    const pFactor = getFactor(proteinName);
    const cFactor = getFactor(carbName);
    const vFactor = CO2_FACTORS['grønt'];
    const sFactor = CO2_FACTORS['sovs'];

    const co2 = (
        (pFactor * proteinWeightRawG / 1000) +
        (cFactor * carbWeightRawG / 1000) +
        (vFactor * vegWeightG / 1000) +
        (sFactor * sauceWeightG / 1000)
    );

    let rating: 'Low' | 'Medium' | 'High' = 'Medium';
    if (co2 < 0.8) rating = 'Low'; // Target for 2030
    if (co2 > 3.0) rating = 'High'; // Beef days

    return { totalCO2: co2, rating };
}

function getFactor(name: string): number {
    if (!name) return 0.5;
    const lower = name.toLowerCase();
    for (const [key, val] of Object.entries(CO2_FACTORS)) {
        if (lower.includes(key)) return val;
    }
    // Default fallback
    if (lower.includes('bøf') || lower.includes('steg')) return 15.0; // Assume red meat if unknown
    return 1.5;
}
