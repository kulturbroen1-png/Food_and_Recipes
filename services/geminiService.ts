
import { RecipeParameters, RecipeData, Ingredient } from '../types';
import { GenerateContentParameters, Type } from "@google/genai";
import { MODEL_RECIPE_THINKING, MODEL_RECIPE_BASIC, MODEL_SEARCH, MODEL_IMAGE_EDIT } from '../constants';
import { MASTER_CHECKLIST } from './instructionManifest';

// Liste over lovpligtige allergener
const ALLERGEN_DICTIONARY = [
  'HVEDE', 'RUG', 'BYG', 'HAVRE', 'GLUTEN', 'SKALDYR', 'ÆG', 'FISK',
  'JORDNØDDER', 'SOJA', 'MÆLK', 'LAKTOSE', 'FLØDE', 'SMØR', 'OST',
  'NØDDER', 'MANDLER', 'HASSELNØDDER', 'VALNØDDER', 'CASHEWNØDDER',
  'PEKANNØDDER', 'PARANØDDER', 'PISTACIENØDDER', 'QUEENSLANDNØDDER',
  'SELLERI', 'SENNEP', 'SESAM', 'SVOVLODIOXID', 'LUPIN', 'BLØDDYR'
];

export const formatVaredeklarationWithAllergens = (ingredients: Ingredient[]): string => {
  if (!ingredients || ingredients.length === 0) return "";
  const sortedIngredients = [...ingredients].sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
  const formattedNames = sortedIngredients.map(ing => {
    let nameToProcess = ing.name.trim();
    ALLERGEN_DICTIONARY.forEach(allergen => {
      const regex = new RegExp(allergen, 'gi');
      nameToProcess = nameToProcess.replace(regex, (match) => match.toUpperCase());
    });
    return nameToProcess;
  });
  return Array.from(new Set(formattedNames)).join(', ');
};

const RECIPE_PROPERTIES = {
  recipeName: { type: Type.STRING },
  recipeNumber: { type: Type.STRING },
  category: { type: Type.STRING },
  yield: {
    type: Type.OBJECT,
    properties: {
      portions: { type: Type.STRING },
      rawWeightPerPortion: { type: Type.STRING },
      finishedWeightPerPortion: { type: Type.STRING, description: 'MÅL-VÆGT pr portion i gram' }
    }
  },
  timeEstimate: { type: Type.STRING },
  difficulty: { type: Type.STRING },
  storageNotes: { type: Type.STRING },
  specialRequirements: { type: Type.STRING },
  ovenSettings: {
    type: Type.OBJECT,
    properties: {
      temperature: { type: Type.STRING },
      time: { type: Type.STRING },
      steamPercentage: { type: Type.STRING },
      mode: { type: Type.STRING, enum: ['DAMP', 'KOMBI', 'VARMLUFT'] }
    }
  },
  subRecipes: {
    type: Type.ARRAY,
    description: 'Separate recipes for components that can be prepared by different stations',
    items: {
      type: Type.OBJECT,
      properties: {
        recipeNumber: { type: Type.STRING, description: 'MDS reference number for sub-recipe' },
        quantity: { type: Type.NUMBER, description: 'Amount needed for this recipe' },
        unit: { type: Type.STRING, description: 'Unit: kg, liter, portions, stk, etc.' },
        name: { type: Type.STRING, description: 'Display name for the sub-recipe' }
      }
    }
  },
  ingredients: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        quantity: { type: Type.NUMBER, description: 'NETTO vægt i gram (færdig tilberedt)' },
        grossQuantity: { type: Type.NUMBER, description: 'BRUTTO vægt i gram (råvare inkl. svind)' },
        wastePercentage: { type: Type.NUMBER, description: 'Svind i procent (fx 22)' },
        levnedsmiddelNr: { type: Type.STRING }
      }
    }
  },
  steps: {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        description: { type: Type.STRING }
      }
    }
  },
  nutrition: {
    type: Type.OBJECT,
    properties: {
      fatPercentage: { type: Type.NUMBER },
      proteinPercentage: { type: Type.NUMBER }
    }
  },
  varedeklaration: { type: Type.STRING },
  productionNotes: { type: Type.STRING }
};

export const generateRecipeRequest = (
  params: RecipeParameters,
  useThinking: boolean,
  useSearch: boolean,
  nutritionalTargets?: { proteinMin?: number; fatMin?: number; energyMin?: number },
  budgetLimit?: number,
  sustainabilityFocus?: boolean
): GenerateContentParameters => {
  const totalFinishedWeight = parseInt(params.numPieces) * parseInt(params.weightPerPiece);

  const nutritionalConstraints = nutritionalTargets ? `
NUTRITIONAL TARGETS (Ældreloven compliance):
- Protein: Minimum ${nutritionalTargets.proteinMin || 26}g per main meal portion
- Fat: Minimum ${nutritionalTargets.fatMin || 40} E% for energy density
- Energy: Minimum ${nutritionalTargets.energyMin || 2000} kJ per portion
- Focus on energy-dense ingredients for elderly appetites` : '';

  const budgetConstraints = budgetLimit ? `
BUDGET CONSTRAINTS:
- Total recipe cost must not exceed ${budgetLimit} DKK for ${params.numPieces} portions
- Optimize ingredient selection for cost efficiency
- Suggest affordable alternatives when possible` : '';

  const sustainabilityFocusText = sustainabilityFocus ? `
SUSTAINABILITY OPTIMIZATION:
- Prioritize seasonal ingredients for current month
- Minimize carbon footprint (prefer local, low-CO2 ingredients)
- Optimize for minimal food waste in preparation` : '';

  const prompt = `
🔐 SYSTEM COMMAND: AI-ENHANCED PRODUKTIONS-STYRET OPSKRIFT
Du er AI-produktionschef i et moderne dansk plejehjem køkken. Generer en teknisk korrekt, optimeret opskrift med intelligens som konkurrenter mangler.

VIGTIGT - SUPERIOR FEATURES:
1. BRUG IKKE ordet "Øko" eller "Økologisk" medmindre sustainability mode aktiveret.
2. NETTO VS BRUTTO: Beregn både NETTO (færdigvægt) og BRUTTO (råvare inkl. svind).
3. SVIND: Realistisk svind % baseret på råvaretype (kød 25-30%, grønt 10-15%).
4. UDPORTIONERING: ${params.numPieces} portioner á ${params.weightPerPiece}g hver.
5. METODIK: Korte, præcise punkter med temperaturer og konsistenskontrol.

AI OPTIMIZATION CAPABILITIES (Superior to Dankost/Master Cater):
${nutritionalConstraints}
${budgetConstraints}
${sustainabilityFocusText}

INGREDIENT INTELLIGENCE:
- Vælg sæsonbestemte råvarer når muligt
- Optimer for ernæringsprofil og energiindhold
- Inkluder allergen-markering i navne
- Beregn realistiske svindprocenter pr. råvare

MODULARITET FOR INDUSTRIKØKKEN:
- Opdel komplekse retter i delopskrifter med MDS-numre
- Hver delopskrift kan tilberedes uafhængigt
- Optimering for parallel produktion i store køkkener

RET: ${params.recipeName}
ANTAL: ${params.numPieces} portioner
MÅL-VÆGT PR. PORTION: ${params.weightPerPiece}g
KATEGORI: ${params.category}

FORMAT: Returner JSON med alle beregninger og optimeringer.
`;

  const model = useThinking ? MODEL_RECIPE_THINKING : (useSearch ? MODEL_SEARCH : MODEL_RECIPE_BASIC);

  return {
    model: model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: RECIPE_PROPERTIES,
        required: ['recipeName', 'ingredients', 'steps', 'yield', 'varedeklaration']
      },
      thinkingConfig: useThinking ? { thinkingBudget: 16000 } : undefined,
    }
  };
};

export const generateWeeklyMenuPlanRequest = (month: string, preferences: string): GenerateContentParameters => {
  const prompt = `Generer en komplet uges menuplan for ${month}.

VIGTIGT - FULDSTÆNDIG MENUPLAN:
- Hver dag SKAL have både hovedret OG biret/dessert
- "biret" feltet må ALDRIG være tomt
- Biret skal være konkrete desserter egnet til ældre (f.eks. Gammeldags ris à l'amande, Æblekage med flødeskum, Gulerodskage, Chokoladekage, Hindbærgrød med fløde, Kærnemælkskoldskål, Franskbrød med syltetøj)

MÅLGRUPPE: ${preferences}

FOKUS:
- Traditionel dansk mad
- E-kost (energitæt, møre konsistens)
- Ældreloven 2025 compliance
- Varieret ugeplan med forskellige proteinkilder

HVER DAG SKAL INDEHOLDE:
- Hovedret: Kød/fisk + sauce + kulhydrat + grønt
- Biret/Dessert: SKAL være en specifik dansk dessert

EKSEMPEL på korrekt biret:
✓ KORREKT: "Gammeldags ris à l'amande med kirsebærsovs"
✗ FORKERT: "" (tom)
✗ FORKERT: "Dessert" (for generisk)

Generér JSON array med 7 dage.`;

  return {
    model: MODEL_RECIPE_BASIC,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            icon: { type: Type.STRING },
            type: { type: Type.STRING },
            dish: { type: Type.STRING },
            protein: { type: Type.STRING },
            sauce: { type: Type.STRING },
            carb: { type: Type.STRING },
            veg: { type: Type.STRING },
            biret: { type: Type.STRING, description: "PÅKRÆVET: Specifik dansk dessert, aldrig tom" },
            isHoliday: { type: Type.BOOLEAN }
          },
          required: ['date', 'dish', 'biret']
        }
      }
    }
  };
};

export const parseImportedTextRequest = (text: string): GenerateContentParameters => {
  const safeText = text.slice(0, 150000);
  return {
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Konverter tekst til produktionsopskrifter. Beregn Netto/Brutto og Svind %. Ingen øko-labels. Tekst: ${safeText}` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: RECIPE_PROPERTIES,
          required: ['recipeName', 'ingredients', 'steps', 'yield']
        }
      }
    }
  };
};

export const parseImportedFileRequest = (base64Data: string, mimeType: string): GenerateContentParameters => {
  return {
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          { inlineData: { data: base64Data, mimeType: mimeType } },
          { text: "Udpak opskrifter. Beregn Netto/Brutto vægt ud fra svind %. Fjern alle øko-referencer." }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: RECIPE_PROPERTIES
        }
      }
    }
  };
};

export const editImageRequest = (base64ImageData: string, mimeType: string, prompt: string): GenerateContentParameters => {
  return {
    model: MODEL_IMAGE_EDIT,
    contents: {
      parts: [
        { inlineData: { data: base64ImageData, mimeType: mimeType } },
        { text: prompt }
      ]
    }
  };
};

export const parseMultiRecipeRequest = (files: any[]): GenerateContentParameters => {
  return {
    model: MODEL_RECIPE_BASIC,
    contents: [{ parts: [{ text: "Konverter til JSON." }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: RECIPE_PROPERTIES } }
    }
  };
};

export const parseMultiRecipeTextRequest = (text: string): GenerateContentParameters => {
  return {
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: `Konverter til JSON: ${text}` }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: RECIPE_PROPERTIES } }
    }
  };
};