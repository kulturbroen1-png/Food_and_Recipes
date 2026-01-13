
import type { RecipeData, RecipeParameters } from '../types.ts';

// Chef Ashis Gautams KOMPLETTE Opskriftsdatabase - Breelteparken 2026
// Kilde: Samlet JSON-import (Part 1-4)
const sourceRecipes: Record<string, any> = {
  // ===== DELOPSKRIFTER / SUB-RECIPES (til produktionsstationer) =====
  "DEL-001": { recipeName: "Kødsauce (Bolognese)", id: "DEL-001", category: "Delopskrift", yield_net: "20.0 KG", ingredients: [{ name: "Hakket oksekød", quantity: 10000, unit: "g" }, { name: "Løg, hakket", quantity: 2000, unit: "g" }, { name: "Gulerødder, revet", quantity: 1500, unit: "g" }, { name: "Hakkede tomater", quantity: 4000, unit: "g" }, { name: "Tomatpuré", quantity: 500, unit: "g" }, { name: "Oksefond", quantity: 2000, unit: "ml" }], method: ["Brun kødet i portioner ved høj varme.", "Svits løg og gulerødder.", "Tilsæt tomatpuré, hakkede tomater og fond.", "Simrer i 45-60 min. Smag til."] },
  "DEL-002": { recipeName: "Bechamel Sauce", id: "DEL-002", category: "Delopskrift", yield_net: "10.0 KG", ingredients: [{ name: "Smør", quantity: 600, unit: "g" }, { name: "Hvedemel", quantity: 600, unit: "g" }, { name: "Mælk", quantity: 10000, unit: "ml" }, { name: "Salt", quantity: 50, unit: "g" }, { name: "Muskatnød", quantity: 5, unit: "g" }], method: ["Smelt smør, rør mel i til jævn roux.", "Tilsæt mælk gradvist under konstant omrøring.", "Kog i 10 min. Smag til med salt og muskat."] },
  "DEL-003": { recipeName: "Tomatsauce (Basis)", id: "DEL-003", category: "Delopskrift", yield_net: "15.0 KG", ingredients: [{ name: "Hakkede tomater", quantity: 10000, unit: "g" }, { name: "Løg, hakket", quantity: 1500, unit: "g" }, { name: "Hvidløg, hakket", quantity: 100, unit: "g" }, { name: "Olivenolie", quantity: 200, unit: "ml" }, { name: "Basilikum, frisk", quantity: 100, unit: "g" }], method: ["Svits løg og hvidløg i olie.", "Tilsæt tomater og simrer i 30 min.", "Blend let, tilsæt basilikum."] },
  "DEL-004": { recipeName: "Lasagneplader (Kogt)", id: "DEL-004", category: "Delopskrift", yield_net: "5.0 KG", ingredients: [{ name: "Lasagneplader, tørrede", quantity: 5000, unit: "g" }, { name: "Vand", quantity: 20000, unit: "ml" }, { name: "Salt", quantity: 100, unit: "g" }, { name: "Olie", quantity: 50, unit: "ml" }], method: ["Kog vand med salt og olie.", "Kog plader al dente.", "Afkøl i koldt vand, læg på bakke."] },
  "DEL-005": { recipeName: "Revet Ost Topping", id: "DEL-005", category: "Delopskrift", yield_net: "3.0 KG", ingredients: [{ name: "Mozzarella, revet", quantity: 2000, unit: "g" }, { name: "Parmesan, revet", quantity: 1000, unit: "g" }], method: ["Bland ostene.", "Fordel jævnt over retten før gratinering."] },
  "DEL-006": { recipeName: "Kartoffelmos", id: "DEL-006", category: "Delopskrift", yield_net: "25.0 KG", ingredients: [{ name: "Kartofler, skrællet", quantity: 20000, unit: "g" }, { name: "Smør", quantity: 2000, unit: "g" }, { name: "Mælk, varm", quantity: 3000, unit: "ml" }, { name: "Salt", quantity: 100, unit: "g" }], method: ["Kog kartofler møre.", "Mos med smør og varm mælk.", "Smag til med salt."] },
  "DEL-007": { recipeName: "Brun Sovs", id: "DEL-007", category: "Delopskrift", yield_net: "10.0 KG", ingredients: [{ name: "Stegsky/Fond", quantity: 8000, unit: "ml" }, { name: "Roux (smør+mel)", quantity: 800, unit: "g" }, { name: "Fløde", quantity: 500, unit: "ml" }, { name: "Soja", quantity: 100, unit: "ml" }], method: ["Kog sky/fond op.", "Jævn med roux til ønsket konsistens.", "Tilsæt fløde, smag til."] },
  "DEL-008": { recipeName: "Persille Sovs", id: "DEL-008", category: "Delopskrift", yield_net: "10.0 KG", ingredients: [{ name: "Mælk", quantity: 8000, unit: "ml" }, { name: "Smør", quantity: 400, unit: "g" }, { name: "Mel", quantity: 400, unit: "g" }, { name: "Persille, hakket", quantity: 300, unit: "g" }], method: ["Lav hvid sauce af smør, mel og mælk.", "Tilsæt rigeligt persille.", "Smag til."] },
  "DEL-009": { recipeName: "Kogte Ris", id: "DEL-009", category: "Delopskrift", yield_net: "15.0 KG", ingredients: [{ name: "Ris, langkornet", quantity: 6000, unit: "g" }, { name: "Vand", quantity: 12000, unit: "ml" }, { name: "Salt", quantity: 60, unit: "g" }], method: ["Kog vand med salt.", "Tilsæt ris, kog i 12-15 min.", "Lad hvile tildækket i 5 min."] },
  "DEL-010": { recipeName: "Dampet Broccoli", id: "DEL-010", category: "Delopskrift", yield_net: "10.0 KG", ingredients: [{ name: "Broccoli, buketter", quantity: 10000, unit: "g" }, { name: "Salt", quantity: 50, unit: "g" }], method: ["Damp broccoli i 4-6 min.", "Skal være sprød, ikke blød.", "Afkøl hurtigt i isbad."] },

  // ===== SAMLERETTER (til samlestation) =====
  "SAM-001": { recipeName: "Lasagne (Samling)", id: "SAM-001", category: "Samling", yield_net: "50 Portioner", ingredients: [{ name: "Kødsauce (DEL-001)", quantity: 15000, unit: "g" }, { name: "Bechamel (DEL-002)", quantity: 8000, unit: "g" }, { name: "Lasagneplader (DEL-004)", quantity: 3000, unit: "g" }, { name: "Ost topping (DEL-005)", quantity: 2000, unit: "g" }], method: ["Læg et lag bechamel i bunden.", "Læg lasagneplader, kødsauce, bechamel.", "Gentag 3-4 gange.", "Afslut med bechamel og ost.", "Bag ved 180°C i 45 min."] },

  // HOVEDRETTER & KØD
  "52014": { recipeName: "Kylling i tern med Butterchicken sauce", id: "52014", category: "Helt kød m/sauce", yield_net: "23.0 KG", ingredients: [{ name: "Kylling i tern, bagte", quantity: 8000, unit: "g" }, { name: "Butterchicken sauce", quantity: 15000, unit: "g" }], method: ["Bland kylling og sauce.", "Varm op til kernetemperatur på min. 75 grader.", "Anretning: 400 g kylling og 750 g sauce pr. bakke."] },
  "52013": { recipeName: "BBQ perlehøne m/ tomatchutney og supremesauce", id: "52013", category: "Helt kød m/sauce", yield_net: "59.76 KG", ingredients: [{ name: "BBQ perlehøne", quantity: 49800, unit: "g" }, { name: "Tomatchutney", quantity: 9960, unit: "g" }, { name: "Svinekæber", quantity: 5, unit: "STK" }], method: ["Braisere i ovnen ved 80 grader natten over med låg på.", "Sigt bouillonen igennem et fint sauce net.", "Reducer ned og jævn let med roux.", "Pakkes: 5 stks svinekæbe + 750 g sauce."] },
  "130004": { recipeName: "Kalvefricassé med gulerødder og persillerod", id: "130004", category: "Sammenkogte retter", yield_net: "40.0 KG", ingredients: [{ name: "Kød til kalvefricassé", quantity: 25668, unit: "g" }, { name: "Gulerod i tern 2 x 2 cm", quantity: 6845, unit: "g" }, { name: "Persillerod", quantity: 5000, unit: "g" }, { name: "Lys sauce (opbagt)", quantity: 10000, unit: "g" }], method: ["Kog kødet mørt i vand/fond.", "Lav en lys sauce på fonden.", "Tilsæt kød og grøntsager og varm igennem."] },
  "53010": { recipeName: "Fiskefrikadeller m/ dild", id: "53010", category: "Fisk- og fjerkræsretter", yield_net: "10.5 KG", ingredients: [{ name: "Fiskefars", quantity: 10000, unit: "g" }, { name: "Dild, frisk hakket", quantity: 500, unit: "g" }], method: ["Rør fiskefarsen med den hakkede dild.", "Formes og steges på pande eller i ovn ved 185 grader."] },
  "10057": { recipeName: "Quiche Lorraine med bacon", id: "10057", category: "Hovedret m/tilbehør", yield_net: "100.0 STK", ingredients: [{ name: "Tærtebunde", quantity: 100, unit: "STK" }, { name: "Bacon i tern, stegt", quantity: 3000, unit: "g" }, { name: "Løg, sauteret", quantity: 2000, unit: "g" }, { name: "Æggemasse (Æg/Fløde)", quantity: 8000, unit: "ml" }, { name: "Ost, revet", quantity: 2000, unit: "g" }], method: ["Fordel løg og bacon i tærtebundene.", "Drys med ost.", "Hæld æggemassen over.", "Bages ved 175 grader i ca. 25 minutter."] },

  // SUPPER & GRATIN
  "116001": { recipeName: "Blomkålssuppe", id: "116001", category: "Suppe", yield_net: "50.0 KG", ingredients: [{ name: "Blomkål, buketter", quantity: 25000, unit: "g" }, { name: "Løg, hakket", quantity: 5000, unit: "g" }, { name: "Fløde", quantity: 5000, unit: "ml" }, { name: "Hønsefond", quantity: 20000, unit: "ml" }], method: ["Svits løg.", "Tilsæt blomkål og fond.", "Kog mør, blend og tilsæt fløde.", "Smag til med salt, peber og citron."] },
  "365033": { recipeName: "Karry suppe - Gratin", id: "365033", category: "Gratin supper", yield_net: "100.0 KG", ingredients: [{ name: "Løg i tern", quantity: 17315, unit: "g" }, { name: "Gulerødder i tern", quantity: 30301, unit: "g" }, { name: "Champignon i skiver", quantity: 30301, unit: "g" }, { name: "Kokosmælk", quantity: 5000, unit: "g" }, { name: "Madras karry", quantity: 519, unit: "g" }], method: ["Brun grøntsager og krydderier i smør.", "Tilsæt væske.", "Kog mør og blend til glat suppe."] },
  "360099": { recipeName: "Grøntsagsgratin (Basis)", id: "360099", category: "Gratin", yield_net: "20.0 KG", ingredients: [{ name: "Grøntsagsblanding", quantity: 10000, unit: "g" }, { name: "Opbagning", quantity: 8000, unit: "g" }, { name: "Æg", quantity: 2000, unit: "g" }], method: ["Lav tyk opbagning.", "Rør blommer i.", "Vend stive hvider og grøntsager i.", "Bages ved 160-170 grader til gylden."] },

  // GRUNDTILBEREDNING (Part 4)
  "10001": { recipeName: "Hønsefond (Basis)", id: "10001", category: "Grundtilberedning", yield_net: "50.0 L", ingredients: [{ name: "Hønseskrog", quantity: 25000, unit: "g" }, { name: "Vand", quantity: 60000, unit: "ml" }, { name: "Suppevisker", quantity: 5000, unit: "g" }], method: ["Brun skrog af.", "Dæk med koldt vand.", "Kog op og skum grundigt.", "Simrer i 4-6 timer."] },
  "10002": { recipeName: "Kalvefond (Brun)", id: "10002", category: "Grundtilberedning", yield_net: "50.0 L", ingredients: [{ name: "Kalveben", quantity: 30000, unit: "g" }, { name: "Tomatpuré", quantity: 1000, unit: "g" }, { name: "Rødvin", quantity: 2000, unit: "ml" }], method: ["Brun ben kraftigt ved 225 grader.", "Kog af med rødvin.", "Kog i 8-12 timer."] },
  "60100": { recipeName: "Bechamel (Mælkesauce)", id: "60100", category: "Grundtilberedning", yield_net: "10.0 KG", ingredients: [{ name: "Smør", quantity: 600, unit: "g" }, { name: "Hvedemel", quantity: 600, unit: "g" }, { name: "Mælk", quantity: 10000, unit: "ml" }], method: ["Lav opbagning.", "Tilsæt mælk gradvist.", "Kog i 10 min."] },
  "59009": { recipeName: "Brun sovs (Grundsauce)", id: "59009", category: "Saucer & dressinger", yield_net: "50.0 KG", ingredients: [{ name: "Sky fra stegning", quantity: 20000, unit: "ml" }, { name: "Fond / Vand", quantity: 25000, unit: "ml" }, { name: "Fløde", quantity: 2500, unit: "ml" }], method: ["Kog sky og fond op.", "Jævn til passende konsistens.", "Rund af med fløde."] },

  // DESSERTER
  "64183": { recipeName: "Skyrmousse", id: "64183", category: "Desserter", yield_net: "10.0 KG", ingredients: [{ name: "Skyr naturell", quantity: 5000, unit: "g" }, { name: "Piskefløde", quantity: 3000, unit: "ml" }, { name: "Husblas", quantity: 100, unit: "g" }], method: ["Pisk fløde.", "Rør skyr, sukker og citron.", "Smelt husblas i.", "Vend flødeskum i og køl."] },
  "210524": { recipeName: "Citronfromage med bælg", id: "210524", category: "Desserter", yield_net: "15.0 KG", ingredients: [{ name: "Citronsaft", quantity: 2000, unit: "ml" }, { name: "Aquafaba", quantity: 3000, unit: "ml" }, { name: "Flødeskum", quantity: 6000, unit: "ml" }], method: ["Pisk aquafaba luftigt.", "Vend citron/husblas i.", "Vend flødeskum i."] },
  "210599": { recipeName: "Broken Gel (Grundmetode)", id: "210599", category: "Dessert / Pynt", yield_net: "1.0 KG", ingredients: [{ name: "Frugtpuré", quantity: 1000, unit: "g" }, { name: "Agar Agar", quantity: 10, unit: "g" }], method: ["Kog op under omrøring.", "Køl til fast blok.", "Blend glat og kom på sprøjtepose."] },

  // PÅLÆG & SNIT
  "80116": { recipeName: "Leverpostej Kastanjehaven", id: "80116", category: "Pålæg / Produktion", yield_net: "12.5 KG", ingredients: [{ name: "Svinelever", quantity: 4000, unit: "g" }, { name: "Spæk", quantity: 2000, unit: "g" }, { name: "Mælk", quantity: 4500, unit: "ml" }], method: ["Hak lever/spæk.", "Lav opbagning.", "Bland alt.", "Bages i vandbad til 75 grader."] },
  "900374": { recipeName: "Søde kartofler til smørrebrød", id: "900374", category: "Snitgrønt", yield_net: "102.2 KG", ingredients: [{ name: "Søde kartofler", quantity: 102225, unit: "g" }], method: ["Damp i 30-45 min.", "Afkøl, skræl og skær i skiver."] }
};

// Map of dishes to their required sub-recipes (for production kitchen stations)
const dishSubRecipes: Record<string, string[]> = {
  "lasagne": ["DEL-001", "DEL-002", "DEL-004", "DEL-005"],
  "moussaka": ["DEL-001", "DEL-002", "DEL-005"],
  "pastaret": ["DEL-003"],
  "frikadeller": ["DEL-007", "DEL-006"],
  "kylling": ["DEL-007", "DEL-009"],
  "fisk": ["DEL-008", "DEL-006"],
  "steg": ["DEL-007", "DEL-006"],
  "karry": ["DEL-009"],
};

// Get sub-recipes needed for a dish
export const getSubRecipesForDish = (dishName: string): string[] => {
  const lowerName = dishName.toLowerCase();
  for (const [keyword, subRecipeIds] of Object.entries(dishSubRecipes)) {
    if (lowerName.includes(keyword)) {
      return subRecipeIds;
    }
  }
  return [];
};

// Get all available sub-recipes
export const getAllSubRecipes = (): any[] => {
  return Object.values(sourceRecipes).filter(r => r.category === 'Delopskrift');
};

export const getAllRecipes = (): any[] => {
  return Object.values(sourceRecipes);
};

export const getAuthenticRecipe = (name: string, targetParams: RecipeParameters): RecipeData | null => {
  const match = Object.values(sourceRecipes).find(r =>
    r.recipeName.toLowerCase().includes(name.toLowerCase()) ||
    name.toLowerCase().includes(r.recipeName.toLowerCase())
  );

  if (!match) return null;

  const baseYieldVal = parseFloat(match.yield_net) || 1;
  const targetPortions = parseInt(targetParams.numPieces) || 450;

  // Vi beregner en faktor baseret på at 100 portioner typisk er standard i dine PDF'er
  // Men vi tager højde for om opskriften er i KG eller STK.
  let factor = 1;
  if (match.yield_net.includes('STK')) {
    factor = targetPortions / baseYieldVal;
  } else {
    // For KG opskrifter antager vi 150g standard færdigvægt pr. portion jf. din instruks
    const targetKg = targetPortions * 0.150;
    factor = targetKg / baseYieldVal;
  }

  return {
    recipeName: match.recipeName,
    recipeNumber: match.id,
    levnedsmiddelNr: `MDS-${match.id}`,
    category: match.category,
    yield: {
      portions: targetPortions.toString(),
      rawWeightPerPortion: `${Math.round((baseYieldVal / (targetPortions / factor)) * 1000)}g`,
      finishedWeightPerPortion: targetParams.weightPerPiece + "g"
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "MDS Professionel",
    storageNotes: "Cook-Chill (Køl straks til < 5°C)",
    specialRequirements: "97,5% Økologi Pålægges",
    ingredients: match.ingredients.map((ing: any) => ({
      name: ing.name,
      quantity: Math.round(ing.quantity * factor),
      grossQuantity: Math.round(ing.quantity * factor * 1.22),
      scaling: `${Math.round(factor * 100)}%`
    })),
    steps: match.method.map((m: string) => ({ description: m })),
    varedeklaration: match.ingredients.map((i: any) => i.name.toUpperCase()).join(", "),
    productionNotes: `Opskrift fra Chef Ashis Gautams database (ID: ${match.id}).`
  };
};
