
import { RecipeData, NutritionData } from '../types';

export const allMarch2026Recipes: Record<string, RecipeData> = {

  "MAR-001": {
    recipeName: "Bankekød (90g)",
    recipeNumber: "MAR-001",
    levnedsmiddelNr: "MDS-MAR-001",
    category: "Okse",
    sourceReference: "Bankekød, Kød.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "2.58424g",
      finishedWeightPerPortion: "0.8529000000000001g",
      wastePercentage: 67.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Oksetykkam", quantity: 155.1, unit: "KG", grossQuantity: 170.61, scaling: "100%" },
      { name: "KGD  Braiseringslage til bankekød 103,370", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "kødet braiseres med lagen natten over ved **85°C**." },
      { description: "kødet fiskes  og braiserings lage bruges til sauce." },
    ],
    varedeklaration: "OKSETYKKAM, KGD  BRAISERINGSLAGE TIL BANKEKØD 103,370",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1050,
        energyKcal: 250,
        fat: 18,
        saturatedFat: 7,
        carbohydrates: 0,
        sugar: 0,
        protein: 22,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1575,
        energyKcal: 375,
        fat: 27.0,
        saturatedFat: 10.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 33.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 45
    }
  },

  "MAR-002": {
    recipeName: "Biksemad (200g)",
    recipeNumber: "MAR-002",
    levnedsmiddelNr: "MDS-MAR-002",
    category: "Gris",
    sourceReference: "Biksemad (oksekød).pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "4.05019g",
      finishedWeightPerPortion: "2.83514g",
      wastePercentage: 30.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Oksetykkam til biksemad 136,004", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Kogte kartofler i tern 204,006", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Rapsolie", quantity: 1.768, unit: "DK", grossQuantity: 1.9448, scaling: "100%" },
      { name: "Smør saltet", quantity: 10.0, unit: "kg", grossQuantity: 11.0, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.082, unit: "S", grossQuantity: 0.09020000000000002, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 0.272, unit: "PS", grossQuantity: 0.2992, scaling: "100%" },
      { name: "Worchestershire sauce", quantity: 0.765, unit: "DK", grossQuantity: 0.8415000000000001, scaling: "100%" },
      { name: "HP sauce", quantity: 0.765, unit: "DK", grossQuantity: 0.8415000000000001, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Kød og løg brunes i olie og smør på kipstegepanden." },
      { description: "Kartofler blandes i og det hele varmes igennem." },
      { description: "Smag til med salt, Worchestershire sauce og peber." },
    ],
    varedeklaration: "KGD  OKSETYKKAM TIL BIKSEMAD 136,004, KGD  KOGTE KARTOFLER I TERN 204,006, RAPSOLIE, SMØR SALTET, SALT GROFT RAFFINERET 3-1, SORT PEBER, STØDT, WORCHESTERSHIRE SAUCE, HP SAUCE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-003": {
    recipeName: "Gule Ærter (250g)",
    recipeNumber: "MAR-003",
    levnedsmiddelNr: "MDS-MAR-003",
    category: "Gris",
    sourceReference: "Gule ærter.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.7740699999999999g",
      finishedWeightPerPortion: "0.58055g",
      wastePercentage: 25.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Udblødte gule ærter 24,483", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 31,254", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Knoldselleri i tern 8,335", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Timian, kviste", quantity: 4.465, unit: "PS", grossQuantity: 4.9115, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.042, unit: "S", grossQuantity: 0.046200000000000005, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Gulerødder i tern", quantity: 12.0, unit: "x", recipeNumber: "SUB-000" },
      { name: "Porre i skiver", quantity: 3.0, unit: "mm", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "De gule ærter sættes i blød i vand 2 dagefør" },
      { description: "De gule ærter koges i hønse fond under låg ved svag varme   indtil mørt." },
      { description: "Gulerod, porre, selleri og timian(pose) tilsættes" },
      { description: "og suppen koges, til urterne er møre" },
      { description: "Timian tages op" },
      { description: "Salt tilsættes" },
      { description: "Smages til" },
      { description: "AG: 30.12.2019: Mængde af salt og Timian hævet" },
      { description: "AG:13.1.2022:    300 til 400 g gulerødder og selleri, timian sat ned til 15 fra 25 g" },
    ],
    varedeklaration: "KGD  UDBLØDTE GULE ÆRTER 24,483, KGD  HØNSEFOND - HJEMMELAVET 31,254, KGD  KNOLDSELLERI I TERN 8,335, TIMIAN, KVISTE, SALT GROFT RAFFINERET 3-1",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-004": {
    recipeName: "Pandekager (2 stk)",
    recipeNumber: "MAR-004",
    levnedsmiddelNr: "MDS-MAR-004",
    category: "Dessert",
    sourceReference: "PandekagerVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.16g",
      finishedWeightPerPortion: "0.16g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Pandekager 16,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  PANDEKAGER 16,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-005": {
    recipeName: "Mørbradbøf (90g)",
    recipeNumber: "MAR-005",
    levnedsmiddelNr: "MDS-MAR-005",
    category: "Gris",
    sourceReference: "Filet mignon Mørbradbøf.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0g",
      finishedWeightPerPortion: "0g",
      wastePercentage: 0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-006": {
    recipeName: "Sandkage (70g)",
    recipeNumber: "MAR-006",
    levnedsmiddelNr: "MDS-MAR-006",
    category: "Dessert",
    sourceReference: "Sandkage med banan og blå birkes.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.10587999999999999g",
      finishedWeightPerPortion: "0.09g",
      wastePercentage: 15.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Dagen før dej:" },
      { description: "Tag bananer op fra kælderen og opbevar ved stuetemperatur." },
      { description: "Dej:" },
      { description: "Rist blå birkes i 4 min på 240°C." },
      { description: "Rør bitter00 og sukker i en stor kedel og kør det sammen, med en spartel indtil det bliver" },
      { description: "ensartet i høj hastighed." },
      { description: "Kom smør i lidt ad gangen." },
      { description: "Sæt skraberen på maskinen, så siderne bliver skrabet med imens det kører." },
      { description: "Kom æg i lidt ad gangen." },
      { description: "Bland hvedemel og bagepulver sammen, sigt det og kom det i imens maskinen kører" },
      { description: "langsomt og kør det sammen indtil det er ensartet." },
      { description: "Pil og mos bananerne, de behøver ikke at moses fuldstændigt. De må gerne køres i en kedel." },
      { description: "Kom bananer og blå birkes i, imens den kører langsomt." },
      { description: "Lav plader klar med ramme, kagepap og bagepapir." },
      { description: "Vej dejen af til 4000g pr plade." },
      { description: "Bages på 160°C i ca 35 minutter." },
      { description: "Når det er kølet, tag rammerne af og kagepap, så kagerne kun står på bagepapir." },
      { description: "Kom dato på og sæt på frost." },
      { description: "Rettet 18/8 2021" },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-007": {
    recipeName: "Risengrød (180g)",
    recipeNumber: "MAR-007",
    levnedsmiddelNr: "MDS-MAR-007",
    category: "Dessert",
    sourceReference: "Risengrød.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "4.19127g",
      finishedWeightPerPortion: "3.5625799999999996g",
      wastePercentage: 15.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Sødmælk,", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "Grødris", quantity: 11.11, unit: "PS", grossQuantity: 12.221, scaling: "100%" },
      { name: "Sukker", quantity: 1.01, unit: "S", grossQuantity: 1.1110000000000002, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Til En Portion: Ris a la mande" },
      { description: "Del 1:" },
      { description: "Ris (1100 G) og mælk(7000 G) blandes i de dybe G/N. Filmes  tæt og låg lægges over." },
      { description: "Dampes i ovnen 1.5 time" },
      { description: "Grøden dækkes med sukker drys" },
      { description: "Grøden sættes på køl" },
      { description: "lille portion= 1 gastro" },
      { description: "11.2019 : AG: oprettet" },
    ],
    varedeklaration: "SØDMÆLK,, GRØDRIS, SUKKER",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-008": {
    recipeName: "Karrysuppe (180g)",
    recipeNumber: "MAR-008",
    levnedsmiddelNr: "MDS-MAR-008",
    category: "Suppe",
    sourceReference: "Karrysuppe.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.23169g",
      finishedWeightPerPortion: "0.2g",
      wastePercentage: 13.68
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Madras karry", quantity: 0.284, unit: "DS", grossQuantity: 0.3124, scaling: "100%" },
      { name: "Vindruekerneolie", quantity: 0.023, unit: "DK", grossQuantity: 0.025300000000000003, scaling: "100%" },
      { name: "Blegselleri i skiver", quantity: 1.818, unit: "PS", grossQuantity: 1.9998000000000002, scaling: "100%" },
      { name: "Vand", quantity: 13.64, unit: "KG", grossQuantity: 15.004000000000001, scaling: "100%" },
      { name: "Hønsebouillon, pasta", quantity: 0.284, unit: "DS", grossQuantity: 0.3124, scaling: "100%" },
      { name: "KGD  Citronsaft friskpresset 0,170", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.005, unit: "S", grossQuantity: 0.0055000000000000005, scaling: "100%" },
      { name: "KGD  Jævning (vand+mel+snowflake) 0,625", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  FYLD GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Kogt hønsebryst, plukket", quantity: 1.364, unit: "PS", grossQuantity: 1.5004000000000002, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Karry svitses i olie" },
      { description: "Løg i tern tilsættes og svitses 2 min." },
      { description: "Blegselleri tilsættes og svitses 3 min." },
      { description: "Vand, bouillonkonc. og citronsaft tilsættes" },
      { description: "Koges under låg ved sag varme ca. 20 min." },
      { description: "Vand og maizena røres til jævning og  tilsættes under omrøring" },
      { description: "Fløde og salt tilsættes og suppen varmes igennem" },
      { description: "Smages til" },
      { description: "Hønsekød tilsættes og varmes igennem" },
      { description: "Der suppleres med vand til den ønskede mængde" },
      { description: "Æbletern eller hvidløg kan evt. tilsættes." },
      { description: "Hønsekød kan erstattes af kogte ris, ærter, osv.." },
    ],
    varedeklaration: "MADRAS KARRY, VINDRUEKERNEOLIE, BLEGSELLERI I SKIVER, VAND, HØNSEBOUILLON, PASTA, KGD  CITRONSAFT FRISKPRESSET 0,170, PISKEFLØDE, SALT GROFT RAFFINERET 3-1, KGD  JÆVNING (VAND+MEL+SNOWFLAKE) 0,625, KGR  FYLD GR0,000, KOGT HØNSEBRYST, PLUKKET",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-009": {
    recipeName: "Kalkungryde (180g)",
    recipeNumber: "MAR-009",
    levnedsmiddelNr: "MDS-MAR-009",
    category: "Fjerkræ",
    sourceReference: "Kalkungryde sauce.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.105g",
      finishedWeightPerPortion: "0.084g",
      wastePercentage: 20.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Rapsolie", quantity: 0.051, unit: "DK", grossQuantity: 0.056100000000000004, scaling: "100%" },
      { name: "KGD  Hvidløg rosmarin og timian paste 0,139", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Tomatkoncentrat", quantity: 0.289, unit: "DS", grossQuantity: 0.3179, scaling: "100%" },
      { name: "Tomater knuste", quantity: 105.0, unit: "GR", grossQuantity: 115.50000000000001, scaling: "100%" },
      { name: "Madras karry", quantity: 0.173, unit: "DS", grossQuantity: 0.1903, scaling: "100%" },
      { name: "Spidskommen, stødt", quantity: 0.154, unit: "DS", grossQuantity: 0.16940000000000002, scaling: "100%" },
      { name: "Gurkemeje", quantity: 0.046, unit: "PS", grossQuantity: 0.050600000000000006, scaling: "100%" },
      { name: "KGD  Roux- Melboller 0,083", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 4,626", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGD  Broccoli i buketter 0,694", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Blomkål i buketter 0,925", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Koriander, frisk", quantity: 1.322, unit: "BDT", grossQuantity: 1.4542000000000002, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.007, unit: "S", grossQuantity: 0.007700000000000001, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 6.0, unit: "x", recipeNumber: "SUB-000" },
      { name: "Gulerødder i tern", quantity: 12.0, unit: "x", recipeNumber: "SUB-000" },
      { name: "Peberfrugt rød i tern", quantity: 12.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Olie varmes og løg , hvidløg paste, og tomat koncentrat  svistes heri" },
      { description: "Derefter tilføjes alle tørre krydderie og svistes videre" },
      { description: "Knuste tomat og hønsefond tilføjes og koges videre og derefter piskefløde tilføjes" },
      { description: "Hvis der er behov for så jævnes saucen med roux og blendes til en fine glat konsistence" },
      { description: "Broccoli og blomkål hældes i saucenen og koges aldente" },
      { description: "Peberfrugt, forårsløg tilføjes" },
      { description: "Til sidst tilsættes hakket koriander" },
      { description: "Smages til" },
    ],
    varedeklaration: "RAPSOLIE, KGD  HVIDLØG ROSMARIN OG TIMIAN PASTE 0,139, TOMATKONCENTRAT, TOMATER KNUSTE, MADRAS KARRY, SPIDSKOMMEN, STØDT, GURKEMEJE, KGD  ROUX- MELBOLLER 0,083, KGD  HØNSEFOND - HJEMMELAVET 4,626, PISKEFLØDE, KGD  BROCCOLI I BUKETTER 0,694, KGD  BLOMKÅL I BUKETTER 0,925, KORIANDER, FRISK, SALT GROFT RAFFINERET 3-1",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 750,
        energyKcal: 180,
        fat: 8,
        saturatedFat: 2,
        carbohydrates: 0,
        sugar: 0,
        protein: 25,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1125,
        energyKcal: 270,
        fat: 12.0,
        saturatedFat: 3.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 37.5,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-010": {
    recipeName: "Gulerodskage (70g)",
    recipeNumber: "MAR-010",
    levnedsmiddelNr: "MDS-MAR-010",
    category: "Dessert",
    sourceReference: "Gulerodskage med bælgfrugter.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.10589g",
      finishedWeightPerPortion: "0.09g",
      wastePercentage: 15.01
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Kom hasselnødder i til sidst og bland godt sammen.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Skift piskeriset ud med en spartel og sæt skraberen på maskinen, så den skraber siderne med.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Kom melblandingen i, imens maskinen kører langsomt.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Hæld smør i langsomt sammen med butterbeans pure imens maskinen kører langsomt og kør", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Lav plader klar med ramme, kagepap og bagepapir.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Vej dejen af til 4000 g pr plade.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Bag på gulerodsprogrammet.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Når det er kølet ned, tag rammerne af og kagepap, så kagerne kun står på bagepapir.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Kom dato på og sæt på frost.", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Rettet 5/9 2023", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Smelt smørret." },
      { description: "Kom brun farin, olie og æg i en stor kedel, og pisk det godt op." },
      { description: "Kom mel, salt, kanel, natron, nellike og ingefær i en stor beholder og bland det godt sammen." },
      { description: "Kom de revne gulerødder i lidt af gangen, sørg for at alle gulerødderne er blandet godt ind" },
    ],
    varedeklaration: "KOM HASSELNØDDER I TIL SIDST OG BLAND GODT SAMMEN., SKIFT PISKERISET UD MED EN SPARTEL OG SÆT SKRABEREN PÅ MASKINEN, SÅ DEN SKRABER SIDERNE MED., KOM MELBLANDINGEN I, IMENS MASKINEN KØRER LANGSOMT., HÆLD SMØR I LANGSOMT SAMMEN MED BUTTERBEANS PURE IMENS MASKINEN KØRER LANGSOMT OG KØR, LAV PLADER KLAR MED RAMME, KAGEPAP OG BAGEPAPIR., VEJ DEJEN AF TIL 4000 G PR PLADE., BAG PÅ GULERODSPROGRAMMET., NÅR DET ER KØLET NED, TAG RAMMERNE AF OG KAGEPAP, SÅ KAGERNE KUN STÅR PÅ BAGEPAPIR., KOM DATO PÅ OG SÆT PÅ FROST., RETTET 5/9 2023",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-011": {
    recipeName: "Bagt Ørred (90g)",
    recipeNumber: "MAR-011",
    levnedsmiddelNr: "MDS-MAR-011",
    category: "Fisk",
    sourceReference: "Bagt ørred.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.02667g",
      finishedWeightPerPortion: "0.024g",
      wastePercentage: 10.01
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Bagt ørred med dildsalt 2,648", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Salt, groft  m/ jod 0,019", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Bag i ovn 180°C til kernetemp 58 - 60 C, ca 7 min." },
      { description: "Max 8 portioner: 800 g fisk og 1200 g sovs over" },
      { description: "Varmhold i ovn på 75°C indtil de skal pakkes i vogne." },
      { description: "Rettet 21/4 2022" },
      { description: "Varmt team :)" },
    ],
    varedeklaration: "KGD  BAGT ØRRED MED DILDSALT 2,648, KGR  SALT, GROFT  M/ JOD 0,019",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 600,
        energyKcal: 145,
        fat: 6,
        saturatedFat: 1,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 900,
        energyKcal: 217,
        fat: 9.0,
        saturatedFat: 1.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 23
    }
  },

  "MAR-012": {
    recipeName: "Frugtsalat m. creme (100g)",
    recipeNumber: "MAR-012",
    levnedsmiddelNr: "MDS-MAR-012",
    category: "Gris",
    sourceReference: "Frugtsalat m råcremeVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.14g",
      finishedWeightPerPortion: "0.14g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Frugtsalat 10,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Råcreme 4,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  FRUGTSALAT 10,000, KGD  RÅCREME 4,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-013": {
    recipeName: "Spinattærte (150g)",
    recipeNumber: "MAR-013",
    levnedsmiddelNr: "MDS-MAR-013",
    category: "Grøn",
    sourceReference: "Spinattærte med feta og soltørret tomat.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.528g",
      finishedWeightPerPortion: "0.528g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Tærtedej til madtærter 24,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Tærtefyld spinattærte med feta 16,800", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Æggemasse til madtærter 12,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Udportioner ca. 35 g fyld i hver portionstærte." },
      { description: "Udportioner 25 g æggemasse over fyldet i hver tærte." },
      { description: "Bland fyld og æggemasse sammen" },
      { description: "Bag tærterne eller frys dem ned med fyldet i." },
      { description: "Bag kun med plade på hver anden ribbe i ovnen. Ellers bager de ikke korrekt." },
      { description: "Bagetid **170°C** i 25 minutter" },
      { description: "Rettet 31/1 2024" },
    ],
    varedeklaration: "KGD  TÆRTEDEJ TIL MADTÆRTER 24,000, KGD  TÆRTEFYLD SPINATTÆRTE MED FETA 16,800, KGD  ÆGGEMASSE TIL MADTÆRTER 12,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 400,
        energyKcal: 95,
        fat: 5,
        saturatedFat: 1,
        carbohydrates: 8,
        sugar: 3,
        protein: 4,
        salt: 0.8,
        fiber: 4
      },
      perPortion: {
        energyKj: 600,
        energyKcal: 142,
        fat: 7.5,
        saturatedFat: 1.5,
        carbohydrates: 12.0,
        sugar: 4.5,
        protein: 6.0,
        salt: 1.2,
        fiber: 6.0
      },
      allergens: [],
      fatPercentage: 29
    }
  },

  "MAR-014": {
    recipeName: "Stegt Flæsk (90g)",
    recipeNumber: "MAR-014",
    levnedsmiddelNr: "MDS-MAR-014",
    category: "Gris",
    sourceReference: "Stegt flæsk.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "6.85333g",
      finishedWeightPerPortion: "3.0839999999999996g",
      wastePercentage: 55.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Stegeflæsk i skiver m/svær", quantity: 678.5, unit: "KG", grossQuantity: 746.35, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.543, unit: "S", grossQuantity: 0.5973, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Flæskeskiverne bankes let og drysses med salt." },
      { description: "De fordeles på bageriste til ovnen" },
      { description: "Der sættes en høj bradepande i bunden til opsamling af fedtet." },
      { description: "De sættes i ovnen ved 160°C , minus frugtihed i ca. 35-40  minutter." },
      { description: "Flæsket kan med fordel steges på panden." },
    ],
    varedeklaration: "STEGEFLÆSK I SKIVER M/SVÆR, SALT GROFT RAFFINERET 3-1",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-015": {
    recipeName: "Æblekage (90g)",
    recipeNumber: "MAR-015",
    levnedsmiddelNr: "MDS-MAR-015",
    category: "Dessert",
    sourceReference: "ÆblekageVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.13g",
      finishedWeightPerPortion: "0.13g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Gammeldags æblekage 13,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  GAMMELDAGS ÆBLEKAGE 13,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-016": {
    recipeName: "Høns i asparges (110g)",
    recipeNumber: "MAR-016",
    levnedsmiddelNr: "MDS-MAR-016",
    category: "Fjerkræ",
    sourceReference: "Høns i asparges.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "3.13946g",
      finishedWeightPerPortion: "2.6999400000000002g",
      wastePercentage: 14.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Hønsefond - hjemmelavet 75,251", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.12, unit: "S", grossQuantity: 0.132, scaling: "100%" },
      { name: "Hvid peber, stødt", quantity: 0.151, unit: "PS", grossQuantity: 0.1661, scaling: "100%" },
      { name: "KGD  Roux- Melboller 22,575", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  FYLD GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Aspargesnitter fine MIKADO vr. nr242249", quantity: 36.33, unit: "DS", grossQuantity: 39.963, scaling: "100%" },
      { name: "Kogt hønsekød i tern, frost", quantity: 30.1, unit: "PS", grossQuantity: 33.11000000000001, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Hønsefond og roux koges sammen under omrøring til at få en fine glat konsistence." },
      { description: "Stuvningen koges igennem ." },
      { description: "Fløde tilsættes." },
      { description: "Salt og peber tilsættes." },
      { description: "Asparges og hønsekød tilsættes og stuvningen varmes forsigtigt op." },
      { description: "Smages til." },
      { description: "Stuvningen nedkøles indtil udportionering" },
    ],
    varedeklaration: "KGD  HØNSEFOND - HJEMMELAVET 75,251, PISKEFLØDE, SALT GROFT RAFFINERET 3-1, HVID PEBER, STØDT, KGD  ROUX- MELBOLLER 22,575, KGR  FYLD GR0,000, ASPARGESNITTER FINE MIKADO VR. NR242249, KOGT HØNSEKØD I TERN, FROST",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 750,
        energyKcal: 180,
        fat: 8,
        saturatedFat: 2,
        carbohydrates: 0,
        sugar: 0,
        protein: 25,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1125,
        energyKcal: 270,
        fat: 12.0,
        saturatedFat: 3.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 37.5,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-017": {
    recipeName: "Kalvesteg (90g)",
    recipeNumber: "MAR-017",
    levnedsmiddelNr: "MDS-MAR-017",
    category: "Okse",
    sourceReference: "Kalvesteg.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "11.56571g",
      finishedWeightPerPortion: "5.6672g",
      wastePercentage: 51.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Kalveinderlår", quantity: 216.9, unit: "STK", grossQuantity: 238.59000000000003, scaling: "100%" },
      { name: "KGD  Braiseringslage 289,143", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Kalveinderlår drysses med salt og peber." },
      { description: "Brunes i bradepande ved 225°C ca. 10-15 min." },
      { description: "brasaireings lager hældes over" },
      { description: "Braiseres **85°C** natten over" },
      { description: "AG: 8.7.2020: Svind % sat ned fra 35 til 30 %" },
    ],
    varedeklaration: "KALVEINDERLÅR, KGD  BRAISERINGSLAGE 289,143",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1050,
        energyKcal: 250,
        fat: 18,
        saturatedFat: 7,
        carbohydrates: 0,
        sugar: 0,
        protein: 22,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1575,
        energyKcal: 375,
        fat: 27.0,
        saturatedFat: 10.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 33.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 45
    }
  },

  "MAR-018": {
    recipeName: "Citronfromage (90g)",
    recipeNumber: "MAR-018",
    levnedsmiddelNr: "MDS-MAR-018",
    category: "Dessert",
    sourceReference: "Citronfromage.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "5.9561g",
      finishedWeightPerPortion: "5.6583000000000006g",
      wastePercentage: 5.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "DEL", quantity: 1.0, unit: "GR", grossQuantity: 1.1, scaling: "100%" },
      { name: "Æggeblommer", quantity: 1.0, unit: "L", grossQuantity: 1.1, scaling: "100%" },
      { name: "Helæg øko", quantity: 5.0, unit: "L", grossQuantity: 5.5, scaling: "100%" },
      { name: "Sukker", quantity: 11.32, unit: "S", grossQuantity: 12.452000000000002, scaling: "100%" },
      { name: "DEL", quantity: 2.0, unit: "GR", grossQuantity: 2.2, scaling: "100%" },
      { name: "Citronsaft", quantity: 70.67, unit: "FL", grossQuantity: 77.73700000000001, scaling: "100%" },
      { name: "Gelatinepulver okse gelatine", quantity: 200.0, unit: "bloom", grossQuantity: 220.00000000000003, scaling: "100%" },
      { name: "KGR  DEL3 GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Del 1:" },
      { description: "? pisk æg og sukker helt fast og skummende" },
      { description: "Del 2:" },
      { description: "? kog 4/5 af citronsaften op med gelatinepulver til pulveret er opløst" },
      { description: "? tilsæt den sidste 1/5 af saften og finsigt gelatine citron massen" },
      { description: "Del 3:" },
      { description: "? pisk fløden til skum" },
      { description: "? pisk den creme gelatine-citronmasse(del 2) i æggemassen (del 1)" },
      { description: "? vend flødeskummet i citroncremen" },
      { description: "AG: 10.05.2018" },
      { description: "2.19 AG: Svine gelatine erstattet med okse gelatine og mængde ændret. (Ref: Bilal)" },
      { description: "3.19. æggeblommer tilføjet (ref kris)" },
    ],
    varedeklaration: "DEL, ÆGGEBLOMMER, HELÆG ØKO, SUKKER, DEL, CITRONSAFT, GELATINEPULVER OKSE GELATINE, KGR  DEL3 GR0,000, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-019": {
    recipeName: "Frikadeller (2stk/90g)",
    recipeNumber: "MAR-019",
    levnedsmiddelNr: "MDS-MAR-019",
    category: "Gris",
    sourceReference: "Frikadeller.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0g",
      finishedWeightPerPortion: "0g",
      wastePercentage: 0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-020": {
    recipeName: "Blomkålssuppe (180g)",
    recipeNumber: "MAR-020",
    levnedsmiddelNr: "MDS-MAR-020",
    category: "Suppe",
    sourceReference: "Blomkålssuppe.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.03286g",
      finishedWeightPerPortion: "0.03g",
      wastePercentage: 8.7
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Hønsefedt", quantity: 74.0, unit: "GR", grossQuantity: 81.4, scaling: "100%" },
      { name: "Blomkålsbuketter 20-60mm", quantity: 0.382, unit: "PS", grossQuantity: 0.4202, scaling: "100%" },
      { name: "Sødmælk,", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "Kyllingefond, konc.,", quantity: 1.0, unit: "ltr", grossQuantity: 1.1, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.001, unit: "S", grossQuantity: 0.0011, scaling: "100%" },
      { name: "KGD  Citronsaft friskpresset 0,015", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Løg sauteres i hønsefedt" },
      { description: "Blomkål sauteres med" },
      { description: "Mælk og bouillon tilsættes og det hele koges igennem" },
      { description: "Suppen bringes i kog" },
      { description: "Suppen blendes og sigtes" },
      { description: "Sidst måles suppen af og den smages til med salt & citronsaft" },
    ],
    varedeklaration: "HØNSEFEDT, BLOMKÅLSBUKETTER 20-60MM, SØDMÆLK,, KYLLINGEFOND, KONC.,, SALT GROFT RAFFINERET 3-1, KGD  CITRONSAFT FRISKPRESSET 0,015, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-021": {
    recipeName: "Citronmåne (70g)",
    recipeNumber: "MAR-021",
    levnedsmiddelNr: "MDS-MAR-021",
    category: "Gris",
    sourceReference: "Citronmånedej med bælg.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.12097g",
      finishedWeightPerPortion: "0.10887000000000001g",
      wastePercentage: 10.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Smør, saltet", quantity: 200.0, unit: "g", grossQuantity: 220.00000000000003, scaling: "100%" },
      { name: "Sukker, Ø", quantity: 0.284, unit: "S", grossQuantity: 0.3124, scaling: "100%" },
      { name: "Æg, hele past.", quantity: 5.0, unit: "l", grossQuantity: 5.5, scaling: "100%" },
      { name: "Mel, Hvede Reform, Ø", quantity: 0.142, unit: "S", grossQuantity: 0.1562, scaling: "100%" },
      { name: "Mel,Ingrid ærtemel Øko", quantity: 284.0, unit: "GR", grossQuantity: 312.40000000000003, scaling: "100%" },
      { name: "Natron, bikarbonat", quantity: 0.036, unit: "DS", grossQuantity: 0.0396, scaling: "100%" },
      { name: "Bagepulver, pose á", quantity: 1.0, unit: "kg", grossQuantity: 1.1, scaling: "100%" },
      { name: "Salt,fint", quantity: 19.0, unit: "GR", grossQuantity: 20.900000000000002, scaling: "100%" },
      { name: "Citronsaft Ø", quantity: 0.473, unit: "FL", grossQuantity: 0.5203, scaling: "100%" },
      { name: "Frost, Citronskal, revet", quantity: 0.359, unit: "G", grossQuantity: 0.39490000000000003, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Pisk smør og sukker til det er hvidt og skummende, det tager ca. 10 minutter." },
      { description: "Tilsæt 1 æg ad gangen mens du piskes." },
      { description: "Bland hvedemel, ærtemel, natron, bagepulver, salt og vend det i dejen." },
      { description: "Vend citron saft + skal" },
      { description: "kom 360 g dej i aluforme" },
      { description: "Bag 30 minutter ved **175°C**" },
    ],
    varedeklaration: "SMØR, SALTET, SUKKER, Ø, ÆG, HELE PAST., MEL, HVEDE REFORM, Ø, MEL,INGRID ÆRTEMEL ØKO, NATRON, BIKARBONAT, BAGEPULVER, POSE Á, SALT,FINT, CITRONSAFT Ø, FROST, CITRONSKAL, REVET",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-022": {
    recipeName: "Chokolademousse (80g)",
    recipeNumber: "MAR-022",
    levnedsmiddelNr: "MDS-MAR-022",
    category: "Dessert",
    sourceReference: "Chokolademousse.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.192g",
      finishedWeightPerPortion: "0.192g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Chokoladeknapper Mørk", quantity: 1.413, unit: "PS", grossQuantity: 1.5543000000000002, scaling: "100%" },
      { name: "Kaffe pulver frysetørret", quantity: 0.235, unit: "PS", grossQuantity: 0.2585, scaling: "100%" },
      { name: "Vand", quantity: 1.374, unit: "KG", grossQuantity: 1.5114000000000003, scaling: "100%" },
      { name: "Sukker", quantity: 0.064, unit: "S", grossQuantity: 0.0704, scaling: "100%" },
      { name: "Æggeblommer", quantity: 1.0, unit: "L", grossQuantity: 1.1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Chokolade deles i mindre stykker og smeltes over vandbad." },
      { description: "Når chokoladen er smeltet, fjernes den fra varmen." },
      { description: "Kaffepulver opløses i vand og piskes i  chokoladen." },
      { description: "Æggeblomme piskes sammen med sukeret og tilsættes derefter." },
      { description: "Fløde piskes til skum og vendes forsigtigt i chokolademmassen, når den er kold." },
      { description: "Udportioneres og stilles koldt 4 - 6 timer." },
    ],
    varedeklaration: "CHOKOLADEKNAPPER MØRK, KAFFE PULVER FRYSETØRRET, VAND, SUKKER, ÆGGEBLOMMER, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-023": {
    recipeName: "Forloren Hare (110g)",
    recipeNumber: "MAR-023",
    levnedsmiddelNr: "MDS-MAR-023",
    category: "Gris",
    sourceReference: "44 Forloren hare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0g",
      finishedWeightPerPortion: "0g",
      wastePercentage: 0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-024": {
    recipeName: "Drømmekage (70g)",
    recipeNumber: "MAR-024",
    levnedsmiddelNr: "MDS-MAR-024",
    category: "Dessert",
    sourceReference: "Drømmekage.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.07197g",
      finishedWeightPerPortion: "0.06801g",
      wastePercentage: 5.5
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Æg, hele past.", quantity: 5.0, unit: "l", grossQuantity: 5.5, scaling: "100%" },
      { name: "Sukker, Ø", quantity: 0.202, unit: "S", grossQuantity: 0.22220000000000004, scaling: "100%" },
      { name: "Smør,Naturli Smørbar Blok Vegan Øko", quantity: 1.682, unit: "KG", grossQuantity: 1.8502, scaling: "100%" },
      { name: "Havredrik Naturel", quantity: 1.345, unit: "L", grossQuantity: 1.4795, scaling: "100%" },
      { name: "Mel, Hvede Reform, Ø", quantity: 0.202, unit: "S", grossQuantity: 0.22220000000000004, scaling: "100%" },
      { name: "Bagepulver, pose á", quantity: 1.0, unit: "kg", grossQuantity: 1.1, scaling: "100%" },
      { name: "KGD  Vaniljesukker - hjemmelavet 0,034", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Kom vaniljesukker, sukker og plantesmør i en stor kedel, og rør det sammen med en" },
      { description: "spartel på høj hastighed." },
      { description: "Sæt skraberen på maskinen, så den skraber siderne med." },
      { description: "Kom æg i, lidt af gangen." },
      { description: "Sigt mel og bagepulver og kom det i lidt af gangen, imens maskinen kører på lav" },
      { description: "hastighed." },
      { description: "Kom havredrik i, lidt af gangen og kør det, indtil det er ensartet." },
      { description: "Lav plader klar med ramme, kagepap og bagepapir." },
      { description: "Vej dejen af til 2700 g pr plade." },
      { description: "Bag på 180°C i ca. 18-20 min." },
      { description: "Kom fyld på - 2200 g og bag på 225°C i 10 min." },
      { description: "Når det er kølet så meget ned at fyldet ikke flyder mere, tag rammerne af og" },
      { description: "kagepap, så kagerne kun står på bagepapir." },
      { description: "Skriv dato på og sæt på frost." },
      { description: "Rettet 29/11 2023" },
    ],
    varedeklaration: "ÆG, HELE PAST., SUKKER, Ø, SMØR,NATURLI SMØRBAR BLOK VEGAN ØKO, HAVREDRIK NATUREL, MEL, HVEDE REFORM, Ø, BAGEPULVER, POSE Á, KGD  VANILJESUKKER - HJEMMELAVET 0,034",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-025": {
    recipeName: "Oksesteg (90g)",
    recipeNumber: "MAR-025",
    levnedsmiddelNr: "MDS-MAR-025",
    category: "Okse",
    sourceReference: "Oksesteg.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "15.27904g",
      finishedWeightPerPortion: "6.340800000000001g",
      wastePercentage: 58.5
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Tykkam af kalv, udbenet, i net, ca", quantity: 2.0, unit: "kg", grossQuantity: 2.2, scaling: "100%" },
      { name: "KGD  Braiseringslage til oksesteg med rødvin 381,976", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Stegens fedtlag ridses og gnides med salt og peber" },
      { description: "Brunes i bradepande ved 250°C ca. 35 min." },
      { description: "Dække kødet helt med braiserings lage og sættes låg på." },
      { description: "Braiseres natten over ved 85 \'c" },
      { description: "Kontrollesres næste morgen for man tage ud fra ovn, hvid kødet er ikke møret så tilberedes" },
      { description: "videre." },
      { description: "30/11-2017 M.M. skifted kød stykke ud" },
      { description: "26/02-2018 J.E. skifted kød stykke ud" },
      { description: "AG:8.7.2020: Svind % sat ned fra 40 til 30 %" },
      { description: "AG: 3.12.2020 Svind % sat op fra 30% til 40 % igen :) hahahahahahah mangler altid" },
    ],
    varedeklaration: "TYKKAM AF KALV, UDBENET, I NET, CA, KGD  BRAISERINGSLAGE TIL OKSESTEG MED RØDVIN 381,976",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1050,
        energyKcal: 250,
        fat: 18,
        saturatedFat: 7,
        carbohydrates: 0,
        sugar: 0,
        protein: 22,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1575,
        energyKcal: 375,
        fat: 27.0,
        saturatedFat: 10.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 33.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 45
    }
  },

  "MAR-026": {
    recipeName: "Ymerfromage (90g)",
    recipeNumber: "MAR-026",
    levnedsmiddelNr: "MDS-MAR-026",
    category: "Dessert",
    sourceReference: "Ymerfromage.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.14118g",
      finishedWeightPerPortion: "0.12g",
      wastePercentage: 15.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Fløde, Piske, dunk", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "Ymer, 3,5 %", quantity: 5.0, unit: "L", grossQuantity: 5.5, scaling: "100%" },
      { name: "Sukker, moscavado, mørk", quantity: 2.189, unit: "PS", grossQuantity: 2.4079, scaling: "100%" },
      { name: "Husblas, blade gris, Ø", quantity: 0.088, unit: "KS", grossQuantity: 0.0968, scaling: "100%" },
      { name: "Sukker, Flormelis, Ø", quantity: 0.876, unit: "PS", grossQuantity: 0.9636000000000001, scaling: "100%" },
      { name: "Salt, flage", quantity: 0.021, unit: "PK", grossQuantity: 0.023100000000000002, scaling: "100%" },
      { name: "KGR  Vand L0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Læg gelatine i blød." },
      { description: "Pisk fløden til LET skum (Det skal IKKE kunne trække ’spor’)." },
      { description: "Pisk ymer, flormelis & salt sammen i en stor skål." },
      { description: "I en mellemstor gryde smeltes muscavadosukker og den udblødte gelatine, mens der" },
      { description: "jævnligt røres, ved lav varme i længere tid." },
      { description: "Når det hele er smeltet, tilsættes flormelis, salt til ymerblandnigen i en tynd stråle under" },
      { description: "omrøring." },
      { description: "Fortsæt med at varme blandingen under omrøring, til det er ca. 45°C og flydende." },
      { description: "Blandingen sigtes ned i en stor kande/ litermål." },
      { description: "Tilsæt resten af ymeren til flødeskummet i kedlen og rør rundt med K-spade og skraber." },
      { description: "Hæld i en tynd stråle/ langsomt gelatineblandingen ned i kedlen mens den kører rundt." },
      { description: "Sørg for at det bliver godt og jævnt fordelt ved laveste hastighed." },
      { description: "Udportioner straks." },
    ],
    varedeklaration: "FLØDE, PISKE, DUNK, YMER, 3,5 %, SUKKER, MOSCAVADO, MØRK, HUSBLAS, BLADE GRIS, Ø, SUKKER, FLORMELIS, Ø, SALT, FLAGE, KGR  VAND L0,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-027": {
    recipeName: "Boller i Karry (3stk/90g)",
    recipeNumber: "MAR-027",
    levnedsmiddelNr: "MDS-MAR-027",
    category: "Gris",
    sourceReference: "Boller i karry.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "21.168000000000003g",
      finishedWeightPerPortion: "21.168000000000003g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Kødboller til boller i karry 1058,400", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Karrysauce (boller i karry) 1058,400", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Test opskrift med karry sauce med linse" },
      { description: "Kødbollerne udportioneres med 10 stk a 50 g pr. bakke." },
      { description: "Saucen hældes over, 500 gram pr. bakke" },
      { description: "10.2021: AG + GB: Tilbage til den gammeldags karrysauce pga klager fra BB" },
      { description: "AG:11.2.2022: Sauce mængde sat ned fra 750 til 500 g  efter smagning projekt" },
    ],
    varedeklaration: "KGD  KØDBOLLER TIL BOLLER I KARRY 1058,400, KGD  KARRYSAUCE (BOLLER I KARRY) 1058,400",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-028": {
    recipeName: "Tomatsuppe (180g)",
    recipeNumber: "MAR-028",
    levnedsmiddelNr: "MDS-MAR-028",
    category: "Suppe",
    sourceReference: "Tomatsuppe.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.22765999999999997g",
      finishedWeightPerPortion: "0.2g",
      wastePercentage: 12.15
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Hønsefedt", quantity: 165.0, unit: "GR", grossQuantity: 181.50000000000003, scaling: "100%" },
      { name: "Knust hvidløg", quantity: 0.017, unit: "FL", grossQuantity: 0.0187, scaling: "100%" },
      { name: "Tomater knuste", quantity: 935.0, unit: "GR", grossQuantity: 1028.5, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 9,174", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.004, unit: "S", grossQuantity: 0.0044, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 0.005, unit: "PS", grossQuantity: 0.0055000000000000005, scaling: "100%" },
      { name: "Timian, tørret skåret", quantity: 0.009, unit: "PS", grossQuantity: 0.0099, scaling: "100%" },
      { name: "Laurbærblade", quantity: 0.018, unit: "PS", grossQuantity: 0.0198, scaling: "100%" },
      { name: "KGD  Jævning (vand+mel) 1,330", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Løg svitses i olie, til de er klare" },
      { description: "Hvidløg tilsættes og svistes med et øjeblik" },
      { description: "Flåede tomater inkl. væde, vand, bouillonpasta, salt, peber, timian og lauerbærblade tilsættes" },
      { description: "Suppen koges 20 min." },
      { description: "Suppen piskes igennem" },
      { description: "Jævning tilsættes under omrøring" },
      { description: "Suppen koges 5-10 min." },
      { description: "Der suppleres evt. med vand til den ønskede mængde" },
      { description: "Smages til" },
    ],
    varedeklaration: "HØNSEFEDT, KNUST HVIDLØG, TOMATER KNUSTE, KGD  HØNSEFOND - HJEMMELAVET 9,174, SALT GROFT RAFFINERET 3-1, SORT PEBER, STØDT, TIMIAN, TØRRET SKÅRET, LAURBÆRBLADE, KGD  JÆVNING (VAND+MEL) 1,330, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-029": {
    recipeName: "Karbonader (1stk/110g)",
    recipeNumber: "MAR-029",
    levnedsmiddelNr: "MDS-MAR-029",
    category: "Gris",
    sourceReference: "Karbonader m stuvet gulerødder, persille, kartofler.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.43799999999999994g",
      finishedWeightPerPortion: "0.43799999999999994g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Krebinetter 12,500", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Gulerødder Stuvede 15,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Persille, drys 0,300", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD   Ærter dampede 6,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Kartofler Smørdampet 10,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  KREBINETTER 12,500, KGD  GULERØDDER STUVEDE 15,000, KGD  PERSILLE, DRYS 0,300, KGD   ÆRTER DAMPEDE 6,000, KGD  KARTOFLER SMØRDAMPET 10,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-030": {
    recipeName: "Jordbærgrød m. fløde (150g)",
    recipeNumber: "MAR-030",
    levnedsmiddelNr: "MDS-MAR-030",
    category: "Dessert",
    sourceReference: "Jordbærgrød m piskeflødeVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.175g",
      finishedWeightPerPortion: "0.175g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Jordbærgrød 15,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Piskefløde 1/4 2,500", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  JORDBÆRGRØD 15,000, KGD  PISKEFLØDE 1/4 2,500",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-031": {
    recipeName: "Klar suppe m. boller (180g)",
    recipeNumber: "MAR-031",
    levnedsmiddelNr: "MDS-MAR-031",
    category: "Suppe",
    sourceReference: "Klar suppe med boller og urter (250 ml).pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0g",
      finishedWeightPerPortion: "0g",
      wastePercentage: 0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-032": {
    recipeName: "Tarteletter m. høns (2stk)",
    recipeNumber: "MAR-032",
    levnedsmiddelNr: "MDS-MAR-032",
    category: "Fjerkræ",
    sourceReference: "Tarteletter m høns i asparges m.spidskålsalat m. ærterVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.273g",
      finishedWeightPerPortion: "0.273g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Høns i asparges 15,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Tarteletter x3 6,300", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Spidskålssalat m/ ærter og ristede hasselnødder 6,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  HØNS I ASPARGES 15,000, KGD  TARTELETTER X3 6,300, KGD  SPIDSKÅLSSALAT M/ ÆRTER OG RISTEDE HASSELNØDDER 6,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 750,
        energyKcal: 180,
        fat: 8,
        saturatedFat: 2,
        carbohydrates: 0,
        sugar: 0,
        protein: 25,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1125,
        energyKcal: 270,
        fat: 12.0,
        saturatedFat: 3.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 37.5,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-033": {
    recipeName: "Frugtsalat (100g)",
    recipeNumber: "MAR-033",
    levnedsmiddelNr: "MDS-MAR-033",
    category: "Gris",
    sourceReference: "Frugtsalat.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.373g",
      finishedWeightPerPortion: "0.373g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Frugtcocktail i let sukkerlage", quantity: 24.06, unit: "DS", grossQuantity: 26.466, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "29/03-2022 M.E. ny opskrit." },
    ],
    varedeklaration: "FRUGTCOCKTAIL I LET SUKKERLAGE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-034": {
    recipeName: "Rabarbertrifli (90g)",
    recipeNumber: "MAR-034",
    levnedsmiddelNr: "MDS-MAR-034",
    category: "Dessert",
    sourceReference: "RabarbertrifliVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.196g",
      finishedWeightPerPortion: "0.196g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Rabarber trifli 19,600", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  RABARBER TRIFLI 19,600",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-035": {
    recipeName: "Krebinet (1stk/110g)",
    recipeNumber: "MAR-035",
    levnedsmiddelNr: "MDS-MAR-035",
    category: "Gris",
    sourceReference: "Krebinetter.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "11.85593g",
      finishedWeightPerPortion: "11.746310000000001g",
      wastePercentage: 0.92
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Krebinetter", quantity: 1175.0, unit: "KG", grossQuantity: 1292.5, scaling: "100%" },
      { name: "Salt Fint m/Jod", quantity: 9.789, unit: "PK", grossQuantity: 10.767900000000001, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 1.175, unit: "PS", grossQuantity: 1.2925000000000002, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Ovn indstilling:" },
      { description: "? tænd ovn" },
      { description: "? tryk på kød (steg)" },
      { description: "? tryk på styk steg" },
      { description: "? vælg TYK steg" },
      { description: "? Vælg MØRK" },
      { description: "? Sat temp til 65 \'C" },
      { description: "? luk ovn og lad den forvarme" },
      { description: "? husk at tænde udsugning" },
      { description: "Kød:" },
      { description: "? sæt rister på brader og spray rister med fedtspray" },
      { description: "? sæt 15 stks bøf på rist med god mellemrum, de må ikke røre hindanden" },
      { description: "? lave peber og fintsalt blanding og dys over bøffer" },
      { description: "? fyld ovn med 2 mellemrum (ca .7 rister =105 stks =21 bk )" },
      { description: "? når ovn er forvarmet sat ovn stativ i ovn og sat temperatur spyd ind i midten af en af bøf (ovn vælge selv" },
      { description: "tiden : SMART )" },
      { description: "? steg indtil oven ringer" },
      { description: "? tage stativ fra ovn pas på den er meget varm." },
      { description: "? vend kødet når i fylde bakke, så de ser pænere ud." },
    ],
    varedeklaration: "KREBINETTER, SALT FINT M/JOD, SORT PEBER, STØDT",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-036": {
    recipeName: "Aspargessuppe (180g)",
    recipeNumber: "MAR-036",
    levnedsmiddelNr: "MDS-MAR-036",
    category: "Suppe",
    sourceReference: "Aspargessuppe.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "2.458g",
      finishedWeightPerPortion: "2.09201g",
      wastePercentage: 14.89
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Smør saltet", quantity: 10.0, unit: "kg", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 101,386", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Hvidløg rosmarin og timian paste 2,028", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Aspargessnitte m/h Extra Fin", quantity: 33.8, unit: "DS", grossQuantity: 37.18, scaling: "100%" },
      { name: "Laurbærblade, stødt", quantity: 0.637, unit: "PK", grossQuantity: 0.7007000000000001, scaling: "100%" },
      { name: "Hvid peber, stødt", quantity: 0.223, unit: "PS", grossQuantity: 0.24530000000000002, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGD  Roux- Melboller 8,111", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.081, unit: "S", grossQuantity: 0.08910000000000001, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 6.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Smør smeltes uden at tage farve" },
      { description: "Mel røres hurtigt i" },
      { description: "Hønsefond og drainet asparges tilsættes lidt efter lidt under kraftig omrøring med piskeris" },
      { description: "Suppen koges  og blendes til cremet konsistence." },
      { description: "Fløde tilsættes" },
      { description: "Der suppleres evt. med fond til den ønskede mængde" },
      { description: "Smages til  med salt og peber." },
      { description: "AG: 05-01-2021: Asparages snitter mænde hævet fra 4 kg til 5 kg." },
    ],
    varedeklaration: "SMØR SALTET, KGD  HØNSEFOND - HJEMMELAVET 101,386, KGD  HVIDLØG ROSMARIN OG TIMIAN PASTE 2,028, ASPARGESSNITTE M/H EXTRA FIN, LAURBÆRBLADE, STØDT, HVID PEBER, STØDT, PISKEFLØDE, KGD  ROUX- MELBOLLER 8,111, SALT GROFT RAFFINERET 3-1",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-037": {
    recipeName: "Bagt Torsk (120g)",
    recipeNumber: "MAR-037",
    levnedsmiddelNr: "MDS-MAR-037",
    category: "Fisk",
    sourceReference: "Bagt torsk.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "1.7638900000000002g",
      finishedWeightPerPortion: "1.1177g",
      wastePercentage: 36.63
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Torskefilet", quantity: 29.57, unit: "KS", grossQuantity: 32.527, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.049, unit: "S", grossQuantity: 0.0539, scaling: "100%" },
      { name: "KGR  TIL FORMEN GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Margarine", quantity: 2.464, unit: "PK", grossQuantity: 2.7104000000000004, scaling: "100%" },
      { name: "KGR  LAGE GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Vand", quantity: 12.32, unit: "KG", grossQuantity: 13.552000000000001, scaling: "100%" },
      { name: "Sherry vineddike", quantity: 4.929, unit: "FL", grossQuantity: 5.421900000000001, scaling: "100%" },
      { name: "Sort peber, hel", quantity: 0.308, unit: "DS", grossQuantity: 0.33880000000000005, scaling: "100%" },
      { name: "Laurbærblade", quantity: 0.246, unit: "PS", grossQuantity: 0.2706, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Torsken lægges i smurt, ovnfast fad" },
      { description: "Drysses med salt" },
      { description: "Vand, løg i tern, vineddike, peberkorn let knust og laurbærblade tilsættes" },
      { description: "Dækkes med folie eller låg" },
      { description: "Dampes i ovnen ved 175°C i 15 - 20 min, til den er mør" },
      { description: "Torsken udportioneres i 1/4 sorte bakker med rød streg med 5 portioner i hver bakke" },
      { description: "Torsken kan også skæres i portionsstykker og tilberedes som anført, dog med lidt kortere kogetid." },
    ],
    varedeklaration: "TORSKEFILET, SALT GROFT RAFFINERET 3-1, KGR  TIL FORMEN GR0,000, MARGARINE, KGR  LAGE GR0,000, VAND, SHERRY VINEDDIKE, SORT PEBER, HEL, LAURBÆRBLADE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 600,
        energyKcal: 145,
        fat: 6,
        saturatedFat: 1,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 900,
        energyKcal: 217,
        fat: 9.0,
        saturatedFat: 1.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 23
    }
  },

  "MAR-038": {
    recipeName: "Rødgrød m. fløde (150g)",
    recipeNumber: "MAR-038",
    levnedsmiddelNr: "MDS-MAR-038",
    category: "Dessert",
    sourceReference: "Rødgrød m flødeVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.145g",
      finishedWeightPerPortion: "0.145g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Rødgrød m/ solbær og jordbær blød 12,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Piskefløde 1/4 2,500", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  RØDGRØD M/ SOLBÆR OG JORDBÆR BLØD 12,000, KGD  PISKEFLØDE 1/4 2,500",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-039": {
    recipeName: "Frugtgrød m. fløde (150g)",
    recipeNumber: "MAR-039",
    levnedsmiddelNr: "MDS-MAR-039",
    category: "Dessert",
    sourceReference: "Rødgrød m flødeVare.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.145g",
      finishedWeightPerPortion: "0.145g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Rødgrød m/ solbær og jordbær blød 12,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Piskefløde 1/4 2,500", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  RØDGRØD M/ SOLBÆR OG JORDBÆR BLØD 12,000, KGD  PISKEFLØDE 1/4 2,500",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-040": {
    recipeName: "Appelsinsuppe (180g)",
    recipeNumber: "MAR-040",
    levnedsmiddelNr: "MDS-MAR-040",
    category: "Suppe",
    sourceReference: "appelsin pulp.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.00068g",
      finishedWeightPerPortion: "0.00058g",
      wastePercentage: 14.71
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Frugt, Appelsin", quantity: 0.411, unit: "STK", grossQuantity: 0.4521, scaling: "100%" },
      { name: "KGR  Vand L0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "appelsinerne  vaskes" },
      { description: "kog i vand ved medium varme **80°C** 2 timer med låg." },
      { description: "Vand sigtes fra , appelsin afkøles og køres på foodprocessor til en pure." },
      { description: "kernerne frasorteres først der hvor den skal indgå så kan de sigtes fra." },
      { description: "appelsin pulp køres fint med kerner hvis det skal bruges til pund til pund" },
      { description: "Rettet 16/5 2023" },
    ],
    varedeklaration: "FRUGT, APPELSIN, KGR  VAND L0,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-041": {
    recipeName: "Kylling i Karry (180g)",
    recipeNumber: "MAR-041",
    levnedsmiddelNr: "MDS-MAR-041",
    category: "Fjerkræ",
    sourceReference: "Paneret kylling m stegte kartofler, karrydressing og.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.32g",
      finishedWeightPerPortion: "0.32g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Stegt paneret kylling 11,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Karrydressing 5,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Kartofler i både, Bagte 10,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Salat af vandmelon,radiser og feta & vinaigrett 6,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "KGD  STEGT PANERET KYLLING 11,000, KGD  KARRYDRESSING 5,000, KGD  KARTOFLER I BÅDE, BAGTE 10,000, KGD  SALAT AF VANDMELON,RADISER OG FETA & VINAIGRETT 6,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 750,
        energyKcal: 180,
        fat: 8,
        saturatedFat: 2,
        carbohydrates: 0,
        sugar: 0,
        protein: 25,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1125,
        energyKcal: 270,
        fat: 12.0,
        saturatedFat: 3.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 37.5,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-042": {
    recipeName: "Dampet Ørred (90g)",
    recipeNumber: "MAR-042",
    levnedsmiddelNr: "MDS-MAR-042",
    category: "Fisk",
    sourceReference: "Varmrøget ørred.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.03088g",
      finishedWeightPerPortion: "0.0125g",
      wastePercentage: 59.52
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Kummesaltlage 12° m. nitrit 1,617", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Ørred Hel Øko", quantity: 2.262, unit: "KG", grossQuantity: 2.4882000000000004, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Varmrøget" },
      { description: "Kom ørred i 12% salt lage i 1 døgn" },
      { description: "udvandes dagen efter i koldt vand i ca. 1 time" },
      { description: "Tør ørred for lage" },
      { description: "læg skind side ned af på rist" },
      { description: "Ryg det på røgprogramme lige som varmtrøget laks." },
      { description: "Slagterens varmrøget" },
      { description: "ørred" },
      { description: "Pluk i stykker a ca 10-15 g" },
      { description: "Total portion 50g" },
      { description: "AG: 15.07.2024: oprettet" },
    ],
    varedeklaration: "KGD  KUMMESALTLAGE 12° M. NITRIT 1,617, ØRRED HEL ØKO",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 600,
        energyKcal: 145,
        fat: 6,
        saturatedFat: 1,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 900,
        energyKcal: 217,
        fat: 9.0,
        saturatedFat: 1.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 23
    }
  },

  "MAR-043": {
    recipeName: "Koteletter i fad (110g)",
    recipeNumber: "MAR-043",
    levnedsmiddelNr: "MDS-MAR-043",
    category: "Gris",
    sourceReference: "Tomatsauce til fad koteletter.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.10719g",
      finishedWeightPerPortion: "0.08576g",
      wastePercentage: 19.99
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Smør saltet", quantity: 10.0, unit: "kg", grossQuantity: 11.0, scaling: "100%" },
      { name: "Hvidløg krydderpasta", quantity: 0.227, unit: "GL", grossQuantity: 0.24970000000000003, scaling: "100%" },
      { name: "KGD  Hakket timian 0,032", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Laurbærblade", quantity: 0.005, unit: "PS", grossQuantity: 0.0055000000000000005, scaling: "100%" },
      { name: "KGD  Basilikum hakket, fint 0,165", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 0.003, unit: "PS", grossQuantity: 0.0033000000000000004, scaling: "100%" },
      { name: "Tomatkoncentrat", quantity: 0.257, unit: "DS", grossQuantity: 0.2827, scaling: "100%" },
      { name: "Hakkede tomater, ds", quantity: 3.117, unit: "DS", grossQuantity: 3.4287, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.002, unit: "S", grossQuantity: 0.0022, scaling: "100%" },
      { name: "Sukker", quantity: 0.004, unit: "S", grossQuantity: 0.0044, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 6.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Smør smelts" },
      { description: "tomatkoncentrat, hvidløg timian paste og løg i tern svitses" },
      { description: "hakket tomat og alle krydderier tilføjes og koges til passenede konsistence" },
      { description: "blends glat sammen med piskefløde" },
      { description: "smage til med salt, peber og sukker." },
      { description: "1.2021: AG: Oprettet" },
      { description: "1.2022: rettet efter første test med Kris" },
    ],
    varedeklaration: "SMØR SALTET, HVIDLØG KRYDDERPASTA, KGD  HAKKET TIMIAN 0,032, LAURBÆRBLADE, KGD  BASILIKUM HAKKET, FINT 0,165, SORT PEBER, STØDT, TOMATKONCENTRAT, HAKKEDE TOMATER, DS, SALT GROFT RAFFINERET 3-1, SUKKER, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-044": {
    recipeName: "Kartoffel-porresuppe (180g)",
    recipeNumber: "MAR-044",
    levnedsmiddelNr: "MDS-MAR-044",
    category: "Suppe",
    sourceReference: "Kartoffel-porresuppe.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.0904g",
      finishedWeightPerPortion: "0.08g",
      wastePercentage: 11.5
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Porrer i tern 6-10mm", quantity: 0.379, unit: "PS", grossQuantity: 0.41690000000000005, scaling: "100%" },
      { name: "Hønsefedt", quantity: 71.0, unit: "GR", grossQuantity: 78.10000000000001, scaling: "100%" },
      { name: "Timian, kviste", quantity: 0.066, unit: "PS", grossQuantity: 0.07260000000000001, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 3,685", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Laurbærblade", quantity: 0.001, unit: "PS", grossQuantity: 0.0011, scaling: "100%" },
      { name: "Sødmælk,", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGR  Salt Groft Raffineret 3-1 SÆK0,001", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 10.0, unit: "x", recipeNumber: "SUB-000" },
      { name: "Kartofler i tern (Bage)", quantity: 20.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Porrer og løg sauteres i fedtet sammen med timian og lauerbærblade" },
      { description: "Kartoflerne tilsættes" },
      { description: "Hønsebouillon tilsættes og det hele koger til kartoflerne er møre" },
      { description: "Mælken tilsættes og suppen blendes glat og cremet" },
      { description: "Der smages til med salt" },
    ],
    varedeklaration: "PORRER I TERN 6-10MM, HØNSEFEDT, TIMIAN, KVISTE, KGD  HØNSEFOND - HJEMMELAVET 3,685, LAURBÆRBLADE, SØDMÆLK,, KGR  SALT GROFT RAFFINERET 3-1 SÆK0,001, PISKEFLØDE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 350,
        energyKcal: 85,
        fat: 4,
        saturatedFat: 1,
        carbohydrates: 6,
        sugar: 2,
        protein: 2,
        salt: 1.0,
        fiber: 1
      },
      perPortion: {
        energyKj: 525,
        energyKcal: 127,
        fat: 6.0,
        saturatedFat: 1.5,
        carbohydrates: 9.0,
        sugar: 3.0,
        protein: 3.0,
        salt: 1.5,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 33
    }
  },

  "MAR-045": {
    recipeName: "Sveskegrød m. fløde (150g)",
    recipeNumber: "MAR-045",
    levnedsmiddelNr: "MDS-MAR-045",
    category: "Dessert",
    sourceReference: "Sveskegrød.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.23536g",
      finishedWeightPerPortion: "0.20006000000000002g",
      wastePercentage: 15.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Svesker, store u/sten", quantity: 1.434, unit: "KS", grossQuantity: 1.5774000000000001, scaling: "100%" },
      { name: "Æblemost, ufiltreret", quantity: 1.553, unit: "BX", grossQuantity: 1.7083000000000002, scaling: "100%" },
      { name: "Sukker", quantity: 0.048, unit: "S", grossQuantity: 0.05280000000000001, scaling: "100%" },
      { name: "KGR  JÆVNING GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Snowflake", quantity: 0.036, unit: "PK", grossQuantity: 0.0396, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Svesker skylles og sættes i blød i vand ca. 24 timer." },
      { description: "Sveskerne koges i udblødningsvandet, til de er møre." },
      { description: "Sukker tilsættes." },
      { description: "Smages til." },
      { description: "Grøden afkøles til 78 - 82 C." },
      { description: "Vand og kartoffelmel røres til jævning." },
      { description: "Grøden jæævnes til en passende konsistens og en frisk, klar farve er  opnået." },
      { description: "Der suppleres evt. med vand til den ønskede mængde." },
      { description: "Udportioneres." },
    ],
    varedeklaration: "SVESKER, STORE U/STEN, ÆBLEMOST, UFILTRERET, SUKKER, KGR  JÆVNING GR0,000, SNOWFLAKE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-046": {
    recipeName: "Kyllingelår BBQ (1stk)",
    recipeNumber: "MAR-046",
    levnedsmiddelNr: "MDS-MAR-046",
    category: "Fjerkræ",
    sourceReference: "Kyllinge overlår.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.6972799999999999g",
      finishedWeightPerPortion: "0.35561g",
      wastePercentage: 49.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Røget kylling lår 69,728", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Kyllingelår steges i ovn ca. 40 min v **140°C**" },
      { description: "Skindet tages fra og kødet plukkes af, trækkes i passende strimler og gemmes til" },
      { description: "retten." },
    ],
    varedeklaration: "KGD  RØGET KYLLING LÅR 69,728",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 750,
        energyKcal: 180,
        fat: 8,
        saturatedFat: 2,
        carbohydrates: 0,
        sugar: 0,
        protein: 25,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1125,
        energyKcal: 270,
        fat: 12.0,
        saturatedFat: 3.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 37.5,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-047": {
    recipeName: "Budding m. saft (100g)",
    recipeNumber: "MAR-047",
    levnedsmiddelNr: "MDS-MAR-047",
    category: "Gris",
    sourceReference: "Rombudding.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.15g",
      finishedWeightPerPortion: "0.15g",
      wastePercentage: 0.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Gelatine blade", quantity: 0.138, unit: "PK", grossQuantity: 0.15180000000000002, scaling: "100%" },
      { name: "Letmælk 1,5%", quantity: 1.0, unit: "l", grossQuantity: 1.1, scaling: "100%" },
      { name: "Vanilje stang", quantity: 0.688, unit: "DS", grossQuantity: 0.7568, scaling: "100%" },
      { name: "Helæg øko", quantity: 5.0, unit: "L", grossQuantity: 5.5, scaling: "100%" },
      { name: "Sukker", quantity: 0.138, unit: "S", grossQuantity: 0.15180000000000002, scaling: "100%" },
      { name: "KGD  Flødeskum 4,128", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Romessens", quantity: 0.344, unit: "FL", grossQuantity: 0.3784, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Gelatine skilles og sættes i blød i koldt vand 5-10 min." },
      { description: "Letmælk og vanillestang bringes i kog" },
      { description: "Æg og sukker piskes skummende" },
      { description: "Lidt af den kogende letmælk hældes i  æggemassen under piskning" },
      { description: "Hældes tilbage i gryden og tilsæt romessens. Varmes op, til cremen bliver jævn - må ikke koge, dog minimum 80" },
      { description: "grader." },
      { description: "Gelatinen dryppes af og tilsættes" },
      { description: "Vanillestangen fjernes og buddingen afkøles" },
      { description: "Når cremen begynder at stivne, tilsættes flødeskummet" },
      { description: "9 Udportioneres, tildækkes og stilles koldt" },
      { description: "M.E Opretted 12/10-2017 OPS. rom essens er mængten ikke afprøvet" },
    ],
    varedeklaration: "GELATINE BLADE, LETMÆLK 1,5%, VANILJE STANG, HELÆG ØKO, SUKKER, KGD  FLØDESKUM 4,128, ROMESSENS",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-048": {
    recipeName: "Stegt Ørred (90g)",
    recipeNumber: "MAR-048",
    levnedsmiddelNr: "MDS-MAR-048",
    category: "Fisk",
    sourceReference: "Bagt ørred.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.02667g",
      finishedWeightPerPortion: "0.024g",
      wastePercentage: 10.01
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Bagt ørred med dildsalt 2,648", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Salt, groft  m/ jod 0,019", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Bag i ovn 180°C til kernetemp 58 - 60 C, ca 7 min." },
      { description: "Max 8 portioner: 800 g fisk og 1200 g sovs over" },
      { description: "Varmhold i ovn på 75°C indtil de skal pakkes i vogne." },
      { description: "Rettet 21/4 2022" },
      { description: "Varmt team :)" },
    ],
    varedeklaration: "KGD  BAGT ØRRED MED DILDSALT 2,648, KGR  SALT, GROFT  M/ JOD 0,019",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 600,
        energyKcal: 145,
        fat: 6,
        saturatedFat: 1,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 900,
        energyKcal: 217,
        fat: 9.0,
        saturatedFat: 1.5,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 23
    }
  },

  "MAR-049": {
    recipeName: "Chokoladekage (70g)",
    recipeNumber: "MAR-049",
    levnedsmiddelNr: "MDS-MAR-049",
    category: "Dessert",
    sourceReference: "Chokolade kage.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.7660800000000001g",
      finishedWeightPerPortion: "0.655g",
      wastePercentage: 14.5
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGR  Sukker, Ø 15,814", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Hvedemel 13,178", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Kakao pulver, Ø 3,514", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Vaniljestang Uganda NF (trørret og flækket) 0,088", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Sukker, Ø 0,791", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Bagepulver, pose á", quantity: 1.0, unit: "kg", grossQuantity: 1.1, scaling: "100%" },
      { name: "Smør,", quantity: 10.0, unit: "kg", grossQuantity: 11.0, scaling: "100%" },
      { name: "Æg, hele past.", quantity: 5.0, unit: "l", grossQuantity: 5.5, scaling: "100%" },
      { name: "KGR  Vand 6,325", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  . 0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGD  Glasur, Chokolade kage 17,571", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "til start med koge vand og smelt smør" },
      { description: "Tænd ovnen på 175°C (alm. ovn)." },
      { description: "Smelt smør og lad det køle lidt." },
      { description: "Bland sukker, mel, kakao, vaniljesukker og bagepulver i stor røreskål." },
      { description: "Tilsæt smeltet smør, æg og kogende vand. Rør/pisk til ensartet dej." },
      { description: "Fordel dejen i smurte/bradepander med bagepapir." },
      { description: "Bag midt i ovnen ca. 30-35 min. Tjek med nål – den skal være næsten" },
      { description: "ren." },
      { description: "Afkøl kagen helt før glasur." },
      { description: "Samling: 3 kg kage + 1 kg glasur.. aftalt" },
      { description: "05.2025:AG: oprettet" },
      { description: "Test i muffins form når vi har tid." },
    ],
    varedeklaration: "KGR  SUKKER, Ø 15,814, KGR  HVEDEMEL 13,178, KGR  KAKAO PULVER, Ø 3,514, KGR  VANILJESTANG UGANDA NF (TRØRRET OG FLÆKKET) 0,088, KGR  SUKKER, Ø 0,791, BAGEPULVER, POSE Á, SMØR,, ÆG, HELE PAST., KGR  VAND 6,325, KGR  . 0,000, KGD  GLASUR, CHOKOLADE KAGE 17,571",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 1200,
        energyKcal: 285,
        fat: 12,
        saturatedFat: 8,
        carbohydrates: 35,
        sugar: 25,
        protein: 3,
        salt: 0.1,
        fiber: 1
      },
      perPortion: {
        energyKj: 1800,
        energyKcal: 427,
        fat: 18.0,
        saturatedFat: 12.0,
        carbohydrates: 52.5,
        sugar: 37.5,
        protein: 4.5,
        salt: 0.2,
        fiber: 1.5
      },
      allergens: [],
      fatPercentage: 24
    }
  },

  "MAR-050": {
    recipeName: "Lammekølle",
    recipeNumber: "MAR-050",
    levnedsmiddelNr: "MDS-MAR-050",
    category: "Gris",
    sourceReference: "Lammesteg_1.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.18181999999999998g",
      finishedWeightPerPortion: "0.08g",
      wastePercentage: 56.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Lammebov, udbenet", quantity: 14.55, unit: "STK", grossQuantity: 16.005000000000003, scaling: "100%" },
      { name: "KGD  Braiserings lage til Lammesteg 3,636", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Brunes af" },
      { description: "Braiserings lage hældes over" },
      { description: "Steges natter over ved **85°C**." },
    ],
    varedeklaration: "LAMMEBOV, UDBENET, KGD  BRAISERINGS LAGE TIL LAMMESTEG 3,636",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-051": {
    recipeName: "Gl.dags Blomkålsgratin",
    recipeNumber: "MAR-051",
    levnedsmiddelNr: "MDS-MAR-051",
    category: "Grøn",
    sourceReference: "Blomkålsgratin.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0g",
      finishedWeightPerPortion: "0g",
      wastePercentage: 0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Revet muskatnød, salt, peber", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Rugbrød med smør", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Karbonader med Stuvning", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Salt og friskkværnet peber", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Rigeligt Smør og/eller olie til stegning", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Stuvning & Tilbehør", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "D a t o :  2 0 .  f e b r u a r  |  A n t a l :  4 5 0  p e r s o n e r", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "K i l d e :  G e n e r e r e t  b a s e r e t  p å  m e n u p l a n  o g  k l a s s i s k  m e t o d e", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Se kildemateriale for detaljeret fremgangsmåde." },
    ],
    varedeklaration: "REVET MUSKATNØD, SALT, PEBER, RUGBRØD MED SMØR, KARBONADER MED STUVNING, SALT OG FRISKKVÆRNET PEBER, RIGELIGT SMØR OG/ELLER OLIE TIL STEGNING, STUVNING & TILBEHØR, D A T O :  2 0 .  F E B R U A R  |  A N T A L :  4 5 0  P E R S O N E R, K I L D E :  G E N E R E R E T  B A S E R E T  P Å  M E N U P L A N  O G  K L A S S I S K  M E T O D E",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 400,
        energyKcal: 95,
        fat: 5,
        saturatedFat: 1,
        carbohydrates: 8,
        sugar: 3,
        protein: 4,
        salt: 0.8,
        fiber: 4
      },
      perPortion: {
        energyKj: 600,
        energyKcal: 142,
        fat: 7.5,
        saturatedFat: 1.5,
        carbohydrates: 12.0,
        sugar: 4.5,
        protein: 6.0,
        salt: 1.2,
        fiber: 6.0
      },
      allergens: [],
      fatPercentage: 29
    }
  },

  "MAR-052": {
    recipeName: "Hjerter i flødesauce",
    recipeNumber: "MAR-052",
    levnedsmiddelNr: "MDS-MAR-052",
    category: "Gris",
    sourceReference: "Hjerter i flødesauce_2.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "5.5081299999999995g",
      finishedWeightPerPortion: "3.85569g",
      wastePercentage: 30.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "Hakkede kalvehjerter", quantity: 159.2, unit: "KG", grossQuantity: 175.12, scaling: "100%" },
      { name: "Smør saltet", quantity: 10.0, unit: "kg", grossQuantity: 11.0, scaling: "100%" },
      { name: "Persille krus", quantity: 2.067, unit: "KS", grossQuantity: 2.2737000000000003, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 176,840", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGD  Citronsaft friskpresset 1,768", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Salt Groft Raffineret 3-1", quantity: 0.248, unit: "S", grossQuantity: 0.27280000000000004, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 0.442, unit: "PS", grossQuantity: 0.4862, scaling: "100%" },
      { name: "Kulør", quantity: 0.442, unit: "FL", grossQuantity: 0.4862, scaling: "100%" },
      { name: "KGD  Roux- Melboller 17,684", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 6.0, unit: "x", recipeNumber: "SUB-000" },
      { name: "Champignon i tern", quantity: 20.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "Hjerterne brunes i grundigt i fedtstoffet" },
      { description: "Persillen med stilke og de kvarte løg kommes ned til hjerterne." },
      { description: "Krydres godt med salt og peber." },
      { description: "Læg låg på og lad det slutte tæt." },
      { description: "Lad hjerterne simre ved svag varme i 2 timer." },
      { description: "Halvdelen af væden skal være tilbage." },
      { description: "Så er der fordampet for meget, må der suppleres." },
      { description: "Persille og løg tages op." },
      { description: "Saucen jævnes og koges godt igennem" },
      { description: "Fløden tilsættes og saucen varmes igennem" },
      { description: "Saucen smages til med citronsaft, salt og peber." },
      { description: "Den resterende persille bruges til at drysse over retten ved servering." },
      { description: "M.E: 07.02.2020: Ny opskrift" },
      { description: "7.2021:AG: salt mængde hævet fra 20 g til 35 g" },
    ],
    varedeklaration: "HAKKEDE KALVEHJERTER, SMØR SALTET, PERSILLE KRUS, KGD  HØNSEFOND - HJEMMELAVET 176,840, PISKEFLØDE, KGD  CITRONSAFT FRISKPRESSET 1,768, SALT GROFT RAFFINERET 3-1, SORT PEBER, STØDT, KULØR, KGD  ROUX- MELBOLLER 17,684",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 950,
        energyKcal: 227,
        fat: 15,
        saturatedFat: 6,
        carbohydrates: 0,
        sugar: 0,
        protein: 20,
        salt: 0.5,
        fiber: 0
      },
      perPortion: {
        energyKj: 1425,
        energyKcal: 340,
        fat: 22.5,
        saturatedFat: 9.0,
        carbohydrates: 0.0,
        sugar: 0.0,
        protein: 30.0,
        salt: 0.8,
        fiber: 0.0
      },
      allergens: [],
      fatPercentage: 42
    }
  },

  "MAR-053": {
    recipeName: "Dagens Tærte",
    recipeNumber: "MAR-053",
    levnedsmiddelNr: "MDS-MAR-053",
    category: "Grøn",
    sourceReference: "Porretærte m  gedeost V.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "1.15195g",
      finishedWeightPerPortion: "0.8639600000000001g",
      wastePercentage: 25.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
    ],
    subRecipes: [
    ],
    steps: [
      { description: "Dobbelt tærte bund" },
      { description: "3 kg stegte porre pr. gastro bakke" },
      { description: "2 kg æggemassen" },
      { description: "500 g  øst" },
      { description: "3 step baking" },
      { description: "**230°C** 20 min m. låg" },
      { description: "**180°C** 20 min m. låg" },
      { description: "**230°C** 20 min uden låg" },
      { description: "Køles ned og Skares 140 x 160 cm" },
      { description: "Double dej i bund af dyb gasto bakke." },
      { description: "Steg timian og porre." },
      { description: "Bland æg, fløde & alle krydderierne sammen." },
      { description: "Blend  osten til små tern." },
      { description: "Bland osten & fløde blandingen sammen." },
      { description: "Udportioner porre, hæld mælke/osteblanding over, og bland forsigtigt." },
      { description: "Bagning af tærten" },
      { description: "**230°C** i 20 minutter med låg" },
      { description: "**178°C** i 20 minutter med låg" },
      { description: "**230°C** i 20 minutter uden låg" },
      { description: "M.E. 10/12-2019 Ind skriver dansk opskrift. REF Sofie" },
    ],
    varedeklaration: "SE INDGREDIENSLISTE",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 400,
        energyKcal: 95,
        fat: 5,
        saturatedFat: 1,
        carbohydrates: 8,
        sugar: 3,
        protein: 4,
        salt: 0.8,
        fiber: 4
      },
      perPortion: {
        energyKj: 600,
        energyKcal: 142,
        fat: 7.5,
        saturatedFat: 1.5,
        carbohydrates: 12.0,
        sugar: 4.5,
        protein: 6.0,
        salt: 1.2,
        fiber: 6.0
      },
      allergens: [],
      fatPercentage: 29
    }
  },

  "MAR-054": {
    recipeName: "Broccoligratin",
    recipeNumber: "MAR-054",
    levnedsmiddelNr: "MDS-MAR-054",
    category: "Grøn",
    sourceReference: "Broccolisuppe_ Gratin.pdf",
    yield: {
      portions: "100",
      rawWeightPerPortion: "0.03141g",
      finishedWeightPerPortion: "0.026699999999999998g",
      wastePercentage: 15.0
    },
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: [
      { name: "KGD  Broccoli i buketter 1,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Piskefløde", quantity: 10.0, unit: "L", grossQuantity: 11.0, scaling: "100%" },
      { name: "KGD  Hvidløg rosmarin og timian paste 0,020", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "KGR  Xanthan Gum GR0,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
      { name: "Maizena", quantity: 0.004, unit: "PK", grossQuantity: 0.0044, scaling: "100%" },
      { name: "Salt med jod (groft)", quantity: 0.001, unit: "S", grossQuantity: 0.0011, scaling: "100%" },
      { name: "Sort peber, stødt", quantity: 0.001, unit: "PS", grossQuantity: 0.0011, scaling: "100%" },
      { name: "KGD  Hønsefond - hjemmelavet 2,000", quantity: 1, unit: "stk", grossQuantity: 1, scaling: "100%" },
    ],
    subRecipes: [
      { name: "Løg i tern", quantity: 12.0, unit: "x", recipeNumber: "SUB-000" },
    ],
    steps: [
      { description: "9.2022: AG: oprettet: for Nadzije  fra Helena" },
    ],
    varedeklaration: "KGD  BROCCOLI I BUKETTER 1,000, PISKEFLØDE, KGD  HVIDLØG ROSMARIN OG TIMIAN PASTE 0,020, KGR  XANTHAN GUM GR0,000, MAIZENA, SALT MED JOD (GROFT), SORT PEBER, STØDT, KGD  HØNSEFOND - HJEMMELAVET 2,000",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {
      per100g: {
        energyKj: 400,
        energyKcal: 95,
        fat: 5,
        saturatedFat: 1,
        carbohydrates: 8,
        sugar: 3,
        protein: 4,
        salt: 0.8,
        fiber: 4
      },
      perPortion: {
        energyKj: 600,
        energyKcal: 142,
        fat: 7.5,
        saturatedFat: 1.5,
        carbohydrates: 12.0,
        sugar: 4.5,
        protein: 6.0,
        salt: 1.2,
        fiber: 6.0
      },
      allergens: [],
      fatPercentage: 29
    }
  },
};
