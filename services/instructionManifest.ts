
/**
 * MASTER SECURITY & CULINARY MANIFEST: BREELTEPARKEN
 * Denne fil er systemets "Grundlov".
 */

export const MASTER_CHECKLIST = {
  LOVGRUNDLAG: {
    KOST: "Anbefalinger for dansk institutionskost (2025), Kosthåndbogen og Ældreloven.",
    MÅLGRUPPE: "Småtspisende ældre (70+) / E-kost (Energi- og proteintæt)",
    ERNÆRINGSMÅL: "Protein: 30 E% (ca. 25-35g pr. port), Fedt: 50 E% (Høj-energi), Kulhydrat: 20 E%.",
    ØKOLOGI_MÅL: "97,5% ØKOLOGI (Det Gyldne Økologispyd). Alt SKAL være økologisk.",
    PROTEIN_KRAV: "Oksekød skal være NATURKVÆG. Fisk skal være NATURSKÅNSOM eller ØKOLOGISK."
  },

  DESIGN_LAYOUT: {
    KONTAKT: "Tlf: 21 34 27 31"
  },

  PRODUKTIONS_KRAV: {
    TYPE: "Cook-Chill (Genopvarmnings-sikret)",
    STRENGT_FORBUDT: [
      "Konventionelle råvarer (Alt skal være ØKOLOGISK)",
      "Vand (ERSTATTET AF: Sødmælk, Fløde 38%, Fond eller Saft)",
      "Margarine/Olie (ERSTATTET AF: Smør, Afklaret smør eller Andefedt)",
      "Industrielt opdrættet fisk (Kun NATURSKÅNSOM/ØKO)",
      "Laks (ERSTATTET AF: Dansk Øko Ørred fra Vejle Ådal)",
      "Rå grøntsager (Alt skal være tilberedt/blødt)"
    ],
    SIGNATUR: "Ashis Gautam_Opskrift Udvikler"
  },

  SUBSTITUTIONS_MATRIX: {
    VÆSKE: "Vand -> Øko Fond, Øko Fløde 38% eller Øko Sødmælk.",
    OKSEKØD: "Altid NATURKVÆG (Øko).",
    FISK: "Altid ØKOLOGISK eller NATURSKÅNSOM.",
    FEDTSTOF: "Øko Smør, Øko Afklaret smør, Øko Andefedt.",
    SAFT: "Øko Koncentrat 1+4 eller 1+10."
  },

  SIKKERHEDS_MÆNGDER: {
    HOVEDKOMPONENT: "90-110g (Tilberedt kød/fisk)",
    SAUCE: "1 dl (SKAL VÆRE BERIGET MED ØKO FLØDE/SMØR)",
    KULHYDRAT: "100g (Øko mos med smør)",
    TILBEHØR: "30-50g (Øko blødkogte grøntsager)"
  },

  // Fix: Added missing UGERYTME_KONTRAKT for InstructionDatabase.tsx
  UGERYTME_KONTRAKT: {
    FORDELING: {
      Mandag: "Gryderetter & Grund-baser",
      Tirsdag: "Fjerkræ & Dessert-prep",
      Onsdag: "Fisk & Sauce-produktion",
      Torsdag: "Grønne Retter & Tærter",
      Fredag: "Weekend-prep & Stegning",
      Lørdag: "Høns i asparges",
      Søndag: "Klassisk Steg"
    },
    TEKSTUR_REGEL: "Altid blød og synkevenlig konsistens. Ingen hårde skorper eller rå grøntsager."
  },

  // Fix: Added missing MÆRKEDAGE_2026 for InstructionDatabase.tsx
  MÆRKEDAGE_2026: {
    "Nytårsdag": "1. januar",
    "Fastelavn": "15. februar",
    "Palmesøndag": "29. marts",
    "Skærtorsdag": "2. april",
    "Langfredag": "3. april",
    "Påskedag": "5. april",
    "2. Påskedag": "6. april",
    "St. Bededag": "1. maj",
    "Kr. Himmelfart": "14. maj",
    "Pinsedag": "24. maj",
    "2. Pinsedag": "25. maj",
    "Grundlovsdag": "5. juni",
    "Sankthans": "23. juni",
    "Mortensaften": "10. november",
    "1. Søndag i Advent": "29. november",
    "Juleaften": "24. december",
    "Juledag": "25. december",
    "2. Juledag": "26. december",
    "Nytårsaften": "31. december"
  }
};
