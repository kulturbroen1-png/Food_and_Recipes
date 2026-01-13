/**
 * SENSORY PROFILE SERVICE (Peter Klosse's 3D Flavor Theory)
 * 
 * Implements analysis based on:
 * Axis 1: Mouthfeel (Coating/Filmskabende vs Contracting/Sammentrækkende)
 * Axis 2: Flavor Intensity (Low -> High)
 * Axis 3: Texture & Color Variation
 */

export interface SensoryProfile {
    mouthfeel: 'Coating' | 'Contracting' | 'Neutral' | 'Balanced';
    intensity: number; // 1-10
    textures: string[]; // e.g. 'Soft', 'Crispy', 'Chewy', 'Liquid'
    colors: string[]; // e.g. 'Brown', 'Green', 'Red', 'White'
    score?: number;
}

// Knowledge base of component characteristics
// This acts as our "Sensory Database"
const INGREDIENT_SENSORY_DB: Record<string, SensoryProfile> = {
    // --- MEAT / PROTEIN ---
    'Frikadeller': { mouthfeel: 'Coating', intensity: 7, textures: ['Soft', 'Chewy'], colors: ['Brown'] },
    'Svinekam': { mouthfeel: 'Balanced', intensity: 8, textures: ['Chewy', 'Crispy'], colors: ['Brown', 'White'] }, // Fat is coating, salt/crust is contracting
    'Kylling': { mouthfeel: 'Neutral', intensity: 5, textures: ['Chewy'], colors: ['White', 'Brown'] },
    'Okse': { mouthfeel: 'Coating', intensity: 7, textures: ['Chewy'], colors: ['Brown', 'Red'] },
    'Fisk': { mouthfeel: 'Coating', intensity: 4, textures: ['Soft', 'Flaky'], colors: ['White'] },
    'Medister': { mouthfeel: 'Coating', intensity: 8, textures: ['Chewy', 'Soft'], colors: ['Brown'] },

    // --- STARCH ---
    'Kartofler': { mouthfeel: 'Coating', intensity: 3, textures: ['Soft'], colors: ['Yellow/White'] },
    'Kartoffelmos': { mouthfeel: 'Coating', intensity: 4, textures: ['Creamy', 'Soft'], colors: ['White'] },
    'Ris': { mouthfeel: 'Neutral', intensity: 2, textures: ['Soft'], colors: ['White'] },
    'Pasta': { mouthfeel: 'Neutral', intensity: 2, textures: ['Soft'], colors: ['White'] },

    // --- VEGETABLES ---
    'Rødkål': { mouthfeel: 'Contracting', intensity: 6, textures: ['Crunchy', 'Wet'], colors: ['Red/Purple'] },
    'Asier': { mouthfeel: 'Contracting', intensity: 7, textures: ['Crunchy', 'Wet'], colors: ['White'] },
    'Agurkesalat': { mouthfeel: 'Contracting', intensity: 5, textures: ['Crunchy', 'Wet'], colors: ['Green'] },
    'Broccoli': { mouthfeel: 'Neutral', intensity: 3, textures: ['Soft', 'Crunchy'], colors: ['Green'] },
    'Gulerødder': { mouthfeel: 'Neutral', intensity: 3, textures: ['Soft', 'Crunchy'], colors: ['Orange'] },
    'Ærter': { mouthfeel: 'Coating', intensity: 4, textures: ['Pop'], colors: ['Green'] },
    'Blomkål': { mouthfeel: 'Neutral', intensity: 3, textures: ['Soft'], colors: ['White'] },

    // --- SAUCE ---
    'Brun sovs': { mouthfeel: 'Coating', intensity: 6, textures: ['Liquid', 'Creamy'], colors: ['Brown'] },
    'Persillesovs': { mouthfeel: 'Coating', intensity: 6, textures: ['Liquid', 'Creamy'], colors: ['White', 'Green'] },
    'Skysovs': { mouthfeel: 'Coating', intensity: 5, textures: ['Liquid'], colors: ['Brown'] }
};

/**
 * Analyze a dish based on its components using fuzzy matching against the DB.
 */
export function analyzeDishSensory(components: string[]): SensoryProfile & { isBalanced: boolean } {
    let coatingScore = 0;
    let contractingScore = 0;
    let totalIntensity = 0;
    const collectedTextures = new Set<string>();
    const collectedColors = new Set<string>();

    for (const comp of components) {
        if (!comp) continue;
        const profile = findProfile(comp);

        if (profile) {
            if (profile.mouthfeel === 'Coating') coatingScore++;
            if (profile.mouthfeel === 'Contracting') contractingScore++;
            if (profile.mouthfeel === 'Balanced') { coatingScore += 0.5; contractingScore += 0.5; }

            totalIntensity += profile.intensity;
            profile.textures.forEach(t => collectedTextures.add(t));
            profile.colors.forEach(c => collectedColors.add(c));
        }
    }

    // Balance Calculation (Peter Klosse Goal: Balance between Coating and Contracting)
    // A perfect dish has elements of both.
    const isBalanced = (coatingScore > 0 && contractingScore > 0);

    // Predominant mouthfeel
    let overallMouthfeel: 'Coating' | 'Contracting' | 'Balanced' = 'Balanced';
    if (coatingScore > contractingScore + 1) overallMouthfeel = 'Coating';
    if (contractingScore > coatingScore + 1) overallMouthfeel = 'Contracting';

    return {
        mouthfeel: overallMouthfeel,
        intensity: Math.round(totalIntensity / components.length) || 0,
        textures: Array.from(collectedTextures),
        colors: Array.from(collectedColors),
        isBalanced,
        score: isBalanced ? 10 : 5 // Simple scoring for now
    };
}

function findProfile(query: string): SensoryProfile | null {
    const lowerQ = query.toLowerCase();

    // Direct or Substring Match
    for (const [key, profile] of Object.entries(INGREDIENT_SENSORY_DB)) {
        if (lowerQ.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerQ)) {
            return profile;
        }
    }

    // Heuristic Fallbacks
    if (lowerQ.includes('sovs') || lowerQ.includes('creme')) return { mouthfeel: 'Coating', intensity: 5, textures: ['Creamy'], colors: ['White/Brown'] };
    if (lowerQ.includes('surt') || lowerQ.includes('syltet') || lowerQ.includes('citron')) return { mouthfeel: 'Contracting', intensity: 6, textures: ['Wet'], colors: ['Unknown'] };
    if (lowerQ.includes('sprød') || lowerQ.includes('paneret')) return { mouthfeel: 'Coating', intensity: 6, textures: ['Crispy'], colors: ['Brown'] };

    return null;
}
