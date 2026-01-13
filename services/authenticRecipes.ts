
import type { RecipeData, RecipeParameters } from '../types';
import { allNewRecipes } from './recipesSprint2';
import { allSprintRecipes } from './recipesSprint35';
import { allSprint6Recipes } from './recipesSprint6';
import { allSprint7Recipes } from './recipesSprint7';
import { allSprint8Recipes } from './recipesSprint8';
import { allSprint9Recipes } from './recipesSprint9';

// Chef Ashis Gautams KOMPLETTE Opskriftsdatabase - Breelteparken 2026
// Kilde: Samlet JSON-import (Part 1-4) + Sprint 2-5 (AI-genereret)
const baseRecipes: Record<string, any> = {

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

  // ===== SPRINT 1: PRIORITEREDE HOVEDRETTER (baseret på frekvensanalyse 2026) =====
  "HO-001": { recipeName: "Høns i asparges", id: "HO-001", category: "Fjerkræ", yield_net: "50.0 KG", ingredients: [{ name: "Kyllingebryst, kogt og skåret", quantity: 15000, unit: "g" }, { name: "Hvide asparges, dåse", quantity: 10000, unit: "g" }, { name: "Smør", quantity: 1200, unit: "g" }, { name: "Mel", quantity: 1200, unit: "g" }, { name: "Hønsefond", quantity: 8000, unit: "ml" }, { name: "Fløde", quantity: 5000, unit: "ml" }, { name: "Ærter, frosne", quantity: 3000, unit: "g" }, { name: "Salt og peber", quantity: 100, unit: "g" }], method: ["Lav en lys roux af smør og mel.", "Tilsæt fond gradvist under omrøring.", "Tilsæt fløde og kog til cremet konsistens.", "Skær asparges i 3 cm stykker, tilsæt til saucen.", "Vend kylling og ærter i.", "Varm igennem til min. 75°C.", "Server i tarteletter eller med kartofler."] },
  "HO-002": { recipeName: "Frikadeller (Danske)", id: "HO-002", category: "Svinekød", yield_net: "25.0 KG", ingredients: [{ name: "Hakket svinekød", quantity: 12000, unit: "g" }, { name: "Hakket kalvekød", quantity: 6000, unit: "g" }, { name: "Løg, finthakket", quantity: 2000, unit: "g" }, { name: "Æg", quantity: 1000, unit: "g" }, { name: "Mælk", quantity: 1500, unit: "ml" }, { name: "Mel", quantity: 800, unit: "g" }, { name: "Salt", quantity: 200, unit: "g" }, { name: "Peber", quantity: 30, unit: "g" }, { name: "Allehånde", quantity: 20, unit: "g" }], method: ["Blend løg, mælk, æg og mel til glat fars.", "Tilsæt kød og krydderier, ælt grundigt.", "Lad farsen hvile i 30 min.", "Form med 2 skeer til ca. 45g pr. stk.", "Steg i smør ved 180°C til gyldenbrune, ca. 6-8 min pr. side.", "Kernetemperatur: min. 75°C."] },
  "HO-003": { recipeName: "Svensk Pølseret", id: "HO-003", category: "Sammenkogte retter", yield_net: "60.0 KG", ingredients: [{ name: "Pølser (frankfurter/wiener)", quantity: 15000, unit: "g" }, { name: "Kartofler, skrællede og i tern", quantity: 20000, unit: "g" }, { name: "Løg, i halvringe", quantity: 5000, unit: "g" }, { name: "Smør", quantity: 1000, unit: "g" }, { name: "Tomatpuré", quantity: 800, unit: "g" }, { name: "Oksefond", quantity: 10000, unit: "ml" }, { name: "Fløde", quantity: 3000, unit: "ml" }, { name: "Paprika", quantity: 100, unit: "g" }], method: ["Kog kartofler næsten møre.", "Svits løg i smør til gyldne.", "Tilsæt tomatpuré og paprika, rør rundt.", "Tilsæt fond og fløde, kog op.", "Skær pølser i skiver, tilsæt sammen med kartofler.", "Simrer i 10-15 min.", "Server med purløg og rugbrød."] },
  "HO-004": { recipeName: "Kalkungryde", id: "HO-004", category: "Fjerkræ", yield_net: "45.0 KG", ingredients: [{ name: "Kalkunbryst, i tern", quantity: 18000, unit: "g" }, { name: "Champignon, i skiver", quantity: 5000, unit: "g" }, { name: "Løg, i tern", quantity: 3000, unit: "g" }, { name: "Gulerødder, i tern", quantity: 4000, unit: "g" }, { name: "Smør", quantity: 800, unit: "g" }, { name: "Mel", quantity: 600, unit: "g" }, { name: "Hønsefond", quantity: 8000, unit: "ml" }, { name: "Fløde", quantity: 5000, unit: "ml" }, { name: "Timian", quantity: 50, unit: "g" }], method: ["Brun kalkuntern i portioner ved høj varme.", "Svits løg, champignon og gulerødder.", "Lav roux af smør og mel.", "Tilsæt fond og fløde gradvist.", "Tilsæt kalkun og grøntsager.", "Simrer i 25-30 min til mørt.", "Smag til med salt, peber og timian."] },
  "HO-005": { recipeName: "Unghanebryst", id: "HO-005", category: "Fjerkræ", yield_net: "30.0 KG", ingredients: [{ name: "Unghanebryst, med skind", quantity: 25000, unit: "g" }, { name: "Smør", quantity: 1000, unit: "g" }, { name: "Salt", quantity: 200, unit: "g" }, { name: "Peber", quantity: 50, unit: "g" }, { name: "Timian, frisk", quantity: 100, unit: "g" }], method: ["Krydr bryst med salt, peber og timian.", "Brun skindside ned i smør ved 180°C.", "Vend og færdigsteg i ovn ved 160°C.", "Kernetemperatur: 72°C.", "Hvil i 5 min før skæring.", "Skær i skiver og anret med skysauce."] },
  "HO-006": { recipeName: "Ovnæggekage", id: "HO-006", category: "Vegetar", yield_net: "25.0 KG", ingredients: [{ name: "Æg", quantity: 6000, unit: "g" }, { name: "Mælk", quantity: 3000, unit: "ml" }, { name: "Mel", quantity: 500, unit: "g" }, { name: "Bacon, i tern", quantity: 3000, unit: "g" }, { name: "Løg, hakket", quantity: 2000, unit: "g" }, { name: "Purløg, hakket", quantity: 300, unit: "g" }, { name: "Tomat, i skiver", quantity: 3000, unit: "g" }, { name: "Salt og peber", quantity: 100, unit: "g" }], method: ["Pisk æg, mælk, mel og krydderier sammen.", "Steg bacon og løg sprødt.", "Fordel bacon/løg i smurte GN-forme.", "Hæld æggemasse over.", "Top med tomatskiver og purløg.", "Bag ved 180°C i 25-30 min til sat.", "Server med rugbrød."] },
  "HO-007": { recipeName: "Kalvesteg", id: "HO-007", category: "Oksekød", yield_net: "30.0 KG", ingredients: [{ name: "Kalveculotte", quantity: 25000, unit: "g" }, { name: "Smør", quantity: 1000, unit: "g" }, { name: "Løg, kvarter", quantity: 2000, unit: "g" }, { name: "Gulerødder, grove stykker", quantity: 2000, unit: "g" }, { name: "Kalvefond", quantity: 3000, unit: "ml" }, { name: "Timian og rosmarin", quantity: 100, unit: "g" }, { name: "Salt og peber", quantity: 150, unit: "g" }], method: ["Krydr kødet og brun på alle sider.", "Læg på rist over grøntsager i bradepande.", "Steg ved 150°C til kernetemperatur 58°C.", "Lad hvile tildækket i 20 min.", "Lav sauce på stegeskyen med fond.", "Skær i skiver og server med kartofler."] },
  "HO-008": { recipeName: "Gl.dags Oksesteg", id: "HO-008", category: "Oksekød", yield_net: "35.0 KG", ingredients: [{ name: "Okseklump", quantity: 28000, unit: "g" }, { name: "Smør", quantity: 1200, unit: "g" }, { name: "Løg, i kvarter", quantity: 3000, unit: "g" }, { name: "Selleri, grove stykker", quantity: 1500, unit: "g" }, { name: "Oksefond", quantity: 4000, unit: "ml" }, { name: "Laurbærblade", quantity: 20, unit: "g" }, { name: "Salt og peber", quantity: 200, unit: "g" }], method: ["Krydr kødet dagen før og lad hvile køligt.", "Brun grundigt på alle sider i gryde.", "Tilsæt grøntsager og fond.", "Steg langsomt ved 140°C i 3-4 timer.", "Kernetemperatur: 58-62°C for medium.", "Hvil kødet i 30 min før skæring.", "Si saucen og smag til."] },
  "HO-009": { recipeName: "Kylling i Karry", id: "HO-009", category: "Fjerkræ", yield_net: "50.0 KG", ingredients: [{ name: "Kyllingebryst, i tern", quantity: 20000, unit: "g" }, { name: "Løg, hakket", quantity: 4000, unit: "g" }, { name: "Hvidløg, hakket", quantity: 200, unit: "g" }, { name: "Madras karry", quantity: 400, unit: "g" }, { name: "Gurkemeje", quantity: 100, unit: "g" }, { name: "Kokosmælk", quantity: 8000, unit: "ml" }, { name: "Hønsefond", quantity: 5000, unit: "ml" }, { name: "Fløde", quantity: 3000, unit: "ml" }, { name: "Æble, revet", quantity: 2000, unit: "g" }], method: ["Brun kylling i portioner.", "Svits løg og hvidløg.", "Tilsæt karry og gurkemeje, steg 2 min.", "Tilsæt kokosmælk, fond og æble.", "Simrer i 20 min.", "Tilsæt fløde og kylling, varm igennem.", "Server med ris og mango chutney."] },
  "HO-010": { recipeName: "Hakkebøf", id: "HO-010", category: "Oksekød", yield_net: "25.0 KG", ingredients: [{ name: "Hakket oksekød (18-20% fedt)", quantity: 20000, unit: "g" }, { name: "Løg, finthakket", quantity: 2000, unit: "g" }, { name: "Æg", quantity: 800, unit: "g" }, { name: "Rasp", quantity: 500, unit: "g" }, { name: "Mælk", quantity: 1000, unit: "ml" }, { name: "Salt og peber", quantity: 150, unit: "g" }], method: ["Bland alle ingredienser til ensartet fars.", "Form til ca. 100g bøffer.", "Steg på pande eller grill ved høj varme.", "3-4 min pr. side for medium.", "Kernetemperatur: min. 63°C.", "Server med bløde løg og brun sauce."] },
  "HO-011": { recipeName: "Benløse Fugle", id: "HO-011", category: "Oksekød", yield_net: "30.0 KG", ingredients: [{ name: "Okseskiver (tynde)", quantity: 18000, unit: "g" }, { name: "Bacon", quantity: 3000, unit: "g" }, { name: "Løg, i strimler", quantity: 2000, unit: "g" }, { name: "Syltede agurker", quantity: 1500, unit: "g" }, { name: "Sennep", quantity: 500, unit: "g" }, { name: "Oksefond", quantity: 5000, unit: "ml" }, { name: "Fløde", quantity: 2000, unit: "ml" }], method: ["Bank kødskiver tynde.", "Smør med sennep, læg bacon, løg og agurk på.", "Rul sammen og bind med madsnor.", "Brun rulader i smør.", "Tilsæt fond og simrer i 1,5-2 timer.", "Tag rulader op, jævn sauce med roux.", "Tilsæt fløde og smag til."] },
  "HO-012": { recipeName: "Stegt Flæsk", id: "HO-012", category: "Svinekød", yield_net: "20.0 KG", ingredients: [{ name: "Flæsk m. svær, i skiver", quantity: 18000, unit: "g" }, { name: "Salt", quantity: 200, unit: "g" }], method: ["Skær flæsk i ca. 1 cm tykke skiver.", "Drys med salt.", "Steg på pande ved middel varme.", "Vend løbende til sprød og gylden.", "Ca. 8-10 min total stegetid.", "Lad dryppe af på køkkenrulle.", "Server med persillesauce og kartofler."] },
  "HO-013": { recipeName: "Sprængt Kylling", id: "HO-013", category: "Fjerkræ", yield_net: "25.0 KG", ingredients: [{ name: "Hel kylling", quantity: 20000, unit: "g" }, { name: "Salt", quantity: 1500, unit: "g" }, { name: "Sukker", quantity: 500, unit: "g" }, { name: "Laurbærblade", quantity: 30, unit: "g" }, { name: "Peberkorn", quantity: 50, unit: "g" }, { name: "Allehånde", quantity: 30, unit: "g" }], method: ["Lav saltlage: 100g salt pr. liter vand.", "Tilsæt sukker og krydderier, kog op og køl.", "Læg kyllinger i lagen i 24-48 timer.", "Kog kyllinger i frisk vand med suppevisker.", "Simrer til kernetemperatur 75°C, ca. 1,5 time.", "Afkøl og partr.", "Server med peberrodssauce og kartofler."] },
  "HO-014": { recipeName: "Forloren Hare", id: "HO-014", category: "Svinekød", yield_net: "25.0 KG", ingredients: [{ name: "Hakket svinekød", quantity: 12000, unit: "g" }, { name: "Hakket kalvekød", quantity: 6000, unit: "g" }, { name: "Løg, hakket", quantity: 2000, unit: "g" }, { name: "Æg", quantity: 800, unit: "g" }, { name: "Rasp", quantity: 600, unit: "g" }, { name: "Mælk", quantity: 1000, unit: "ml" }, { name: "Bacon, skiver", quantity: 2000, unit: "g" }, { name: "Ribsgelé", quantity: 500, unit: "g" }], method: ["Bland kød, løg, æg, rasp og mælk til fars.", "Krydr med salt, peber og allehånde.", "Form til aflange brød på ca. 1,5 kg.", "Vikl i bacon.", "Bag ved 175°C i ca. 45-50 min.", "Kernetemperatur: 75°C.", "Server med vildtsauce og ribsgelé."] },

  // ===== SPRINT 1: PRIORITEREDE SAUCER =====
  "SC-001": { recipeName: "Skysauce (Basis)", id: "SC-001", category: "Saucer", yield_net: "20.0 KG", ingredients: [{ name: "Stegsky fra kød", quantity: 10000, unit: "ml" }, { name: "Oksefond", quantity: 8000, unit: "ml" }, { name: "Smør", quantity: 400, unit: "g" }, { name: "Mel", quantity: 400, unit: "g" }, { name: "Soja (mørk)", quantity: 100, unit: "ml" }, { name: "Fløde", quantity: 1000, unit: "ml" }], method: ["Saml al stegsky i en gryde.", "Tilsæt fond og kog op.", "Lav roux af smør og mel.", "Jævn saucen til ønsket konsistens.", "Tilsæt soja til farve og smag.", "Rund af med fløde.", "Si og hold varm."] },
  "SC-002": { recipeName: "Karrysauce", id: "SC-002", category: "Saucer", yield_net: "15.0 KG", ingredients: [{ name: "Løg, hakket", quantity: 2000, unit: "g" }, { name: "Smør", quantity: 600, unit: "g" }, { name: "Mel", quantity: 600, unit: "g" }, { name: "Madras karry", quantity: 250, unit: "g" }, { name: "Hønsefond", quantity: 6000, unit: "ml" }, { name: "Kokosmælk", quantity: 4000, unit: "ml" }, { name: "Æble, revet", quantity: 1000, unit: "g" }, { name: "Fløde", quantity: 2000, unit: "ml" }], method: ["Svits løg i smør.", "Tilsæt karry og steg 2 min.", "Rør mel i til roux.", "Tilsæt fond og kokosmælk gradvist.", "Tilsæt æble og simrer 15 min.", "Blend glat om ønsket.", "Tilsæt fløde og smag til."] },
  "SC-003": { recipeName: "Peberrodssauce", id: "SC-003", category: "Saucer", yield_net: "10.0 KG", ingredients: [{ name: "Smør", quantity: 400, unit: "g" }, { name: "Mel", quantity: 400, unit: "g" }, { name: "Mælk", quantity: 6000, unit: "ml" }, { name: "Fløde", quantity: 2000, unit: "ml" }, { name: "Peberrod, revet", quantity: 800, unit: "g" }, { name: "Citronsaft", quantity: 100, unit: "ml" }, { name: "Sukker", quantity: 100, unit: "g" }], method: ["Lav hvid sauce af smør, mel og mælk.", "Tilsæt fløde og kog til cremet.", "Rør peberrod i.", "Smag til med citron, sukker og salt.", "Peberrod tilsættes til sidst for at bevare skarpheden."] },
  "SC-004": { recipeName: "Vildtsauce", id: "SC-004", category: "Saucer", yield_net: "15.0 KG", ingredients: [{ name: "Kalvefond (brun)", quantity: 8000, unit: "ml" }, { name: "Rødvin", quantity: 2000, unit: "ml" }, { name: "Portvin", quantity: 500, unit: "ml" }, { name: "Løg, hakket", quantity: 1000, unit: "g" }, { name: "Gulerødder, i tern", quantity: 500, unit: "g" }, { name: "Tyttebær eller ribsgelé", quantity: 500, unit: "g" }, { name: "Smør", quantity: 400, unit: "g" }, { name: "Mel", quantity: 400, unit: "g" }, { name: "Enebær", quantity: 30, unit: "g" }], method: ["Svits løg og gulerødder i smør.", "Tilsæt vin og reducer til halvdelen.", "Tilsæt fond og enebær, kog 20 min.", "Jævn med roux.", "Si saucen.", "Tilsæt gelé og smag til."] },
  "SC-005": { recipeName: "Aspargessauce", id: "SC-005", category: "Saucer", yield_net: "12.0 KG", ingredients: [{ name: "Smør", quantity: 500, unit: "g" }, { name: "Mel", quantity: 500, unit: "g" }, { name: "Hønsefond", quantity: 5000, unit: "ml" }, { name: "Fløde", quantity: 4000, unit: "ml" }, { name: "Asparges (lage fra dåse)", quantity: 2000, unit: "ml" }, { name: "Aspargesstykker", quantity: 1500, unit: "g" }, { name: "Citronsaft", quantity: 50, unit: "ml" }], method: ["Lav roux af smør og mel.", "Tilsæt fond og aspargeslage gradvist.", "Tilsæt fløde, kog til cremet.", "Hak aspargesstykker og tilsæt.", "Smag til med citron, salt og peber."] },
  "SC-006": { recipeName: "Remoulade", id: "SC-006", category: "Kolde saucer", yield_net: "10.0 KG", ingredients: [{ name: "Mayonnaise", quantity: 6000, unit: "g" }, { name: "Syltede agurker, hakket", quantity: 1500, unit: "g" }, { name: "Kapers, hakket", quantity: 300, unit: "g" }, { name: "Sennep (Dijon)", quantity: 200, unit: "g" }, { name: "Karry", quantity: 50, unit: "g" }, { name: "Citronsaft", quantity: 100, unit: "ml" }, { name: "Frisk estragon", quantity: 100, unit: "g" }], method: ["Hak agurker og kapers fint.", "Bland mayonnaise med sennep og karry.", "Tilsæt agurker og kapers.", "Smag til med citron og salt.", "Lad trække i min. 2 timer før servering."] },

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

  // ===== SPRINT 1: PRIORITEREDE DESSERTER & SUPPER =====
  "DS-001": { recipeName: "Banankage", id: "DS-001", category: "Kager", yield_net: "60 STK", ingredients: [{ name: "Modne bananer, moste", quantity: 2000, unit: "g" }, { name: "Sukker", quantity: 1200, unit: "g" }, { name: "Mel", quantity: 1500, unit: "g" }, { name: "Æg", quantity: 800, unit: "g" }, { name: "Smør, smeltet", quantity: 600, unit: "g" }, { name: "Bagepulver", quantity: 40, unit: "g" }, { name: "Natron", quantity: 15, unit: "g" }, { name: "Valnødder, hakkede", quantity: 300, unit: "g" }], method: ["Mos bananerne.", "Pisk æg og sukker luftigt.", "Tilsæt smeltet smør og bananer.", "Vend mel, bagepulver og natron i.", "Tilsæt valnødder.", "Bag ved 175°C i 35-40 min.", "Skær i 70g stykker."] },
  "DS-002": { recipeName: "Sveskegrød", id: "DS-002", category: "Desserter", yield_net: "25.0 KG", ingredients: [{ name: "Svesker, tørrede", quantity: 6000, unit: "g" }, { name: "Vand", quantity: 15000, unit: "ml" }, { name: "Sukker", quantity: 1500, unit: "g" }, { name: "Vaniljestang", quantity: 5, unit: "STK" }, { name: "Kartoffelmel", quantity: 300, unit: "g" }], method: ["Skyl svesker og læg i blød natten over.", "Kog svesker møre i væsken.", "Tilsæt sukker og vanilje.", "Jævn med kartoffelmel udrørt i lidt koldt vand.", "Kog op og køl.", "Server med fløde."] },
  "DS-003": { recipeName: "Sandkage", id: "DS-003", category: "Kager", yield_net: "60 STK", ingredients: [{ name: "Smør", quantity: 1000, unit: "g" }, { name: "Sukker", quantity: 1000, unit: "g" }, { name: "Æg", quantity: 600, unit: "g" }, { name: "Mel", quantity: 1000, unit: "g" }, { name: "Kartoffelmel", quantity: 500, unit: "g" }, { name: "Bagepulver", quantity: 30, unit: "g" }, { name: "Vaniljesukker", quantity: 50, unit: "g" }, { name: "Citronskal, revet", quantity: 30, unit: "g" }], method: ["Pisk smør og sukker hvidt.", "Tilsæt æg ét ad gangen.", "Vend mel, kartoffelmel, bagepulver og vanilje i.", "Kom i smurt sandkageform.", "Bag ved 175°C i 50-60 min.", "Afkøl og skær i 70g stykker."] },
  "DS-004": { recipeName: "Frugtsalat", id: "DS-004", category: "Desserter", yield_net: "20.0 KG", ingredients: [{ name: "Æbler, i tern", quantity: 4000, unit: "g" }, { name: "Pærer, i tern", quantity: 3000, unit: "g" }, { name: "Appelsiner, i tern", quantity: 4000, unit: "g" }, { name: "Vindruer", quantity: 3000, unit: "g" }, { name: "Bananer, i skiver", quantity: 2000, unit: "g" }, { name: "Appelsin-/æblejuice", quantity: 3000, unit: "ml" }, { name: "Sukker", quantity: 500, unit: "g" }], method: ["Skær al frugt i mundvenlige stykker.", "Bland i skål med juice og sukker.", "Lad trække køligt i min. 1 time.", "Server kold, evt. med fløde eller creme."] },
  "DS-005": { recipeName: "Tomatsuppe", id: "DS-005", category: "Supper", yield_net: "50.0 KG", ingredients: [{ name: "Hakkede tomater, dåse", quantity: 20000, unit: "g" }, { name: "Løg, hakket", quantity: 4000, unit: "g" }, { name: "Hvidløg", quantity: 200, unit: "g" }, { name: "Grøntsagsfond", quantity: 15000, unit: "ml" }, { name: "Fløde", quantity: 5000, unit: "ml" }, { name: "Tomatpuré", quantity: 500, unit: "g" }, { name: "Sukker", quantity: 200, unit: "g" }, { name: "Basilikum", quantity: 100, unit: "g" }], method: ["Svits løg og hvidløg i olie.", "Tilsæt tomater, puré og fond.", "Kog i 20 min.", "Blend glat.", "Tilsæt fløde og sukker.", "Smag til med salt og peber.", "Pynt med frisk basilikum."] },
  "DS-006": { recipeName: "Minestronesuppe", id: "DS-006", category: "Supper", yield_net: "50.0 KG", ingredients: [{ name: "Løg, i tern", quantity: 3000, unit: "g" }, { name: "Selleri, i tern", quantity: 2000, unit: "g" }, { name: "Gulerødder, i tern", quantity: 3000, unit: "g" }, { name: "Kartofler, i tern", quantity: 4000, unit: "g" }, { name: "Bønner, hvide (konserverede)", quantity: 4000, unit: "g" }, { name: "Hakkede tomater", quantity: 6000, unit: "g" }, { name: "Grøntsagsfond", quantity: 20000, unit: "ml" }, { name: "Pasta, små", quantity: 2000, unit: "g" }, { name: "Oregano og basilikum", quantity: 100, unit: "g" }], method: ["Svits løg, selleri og gulerødder.", "Tilsæt kartofler og tomater.", "Tilsæt fond og kog i 15 min.", "Tilsæt bønner og pasta.", "Kog pasta mørt.", "Smag til med urter, salt og peber."] },
  "DS-007": { recipeName: "Aspargessuppe", id: "DS-007", category: "Supper", yield_net: "50.0 KG", ingredients: [{ name: "Hvide asparges", quantity: 15000, unit: "g" }, { name: "Løg, hakket", quantity: 3000, unit: "g" }, { name: "Smør", quantity: 800, unit: "g" }, { name: "Mel", quantity: 600, unit: "g" }, { name: "Hønsefond", quantity: 20000, unit: "ml" }, { name: "Fløde", quantity: 8000, unit: "ml" }, { name: "Citronsaft", quantity: 200, unit: "ml" }], method: ["Rens asparges, gem skræl til fond.", "Kog skræl i fond i 30 min, si.", "Svits løg, lav roux.", "Tilsæt aspargefond gradvist.", "Skær asparges i stykker, kog i suppen.", "Blend halvdelen, tilsæt fløde.", "Smag til med citron og salt."] },
  "DS-008": { recipeName: "Grøntsagssuppe", id: "DS-008", category: "Supper", yield_net: "50.0 KG", ingredients: [{ name: "Løg, i tern", quantity: 4000, unit: "g" }, { name: "Gulerødder, i tern", quantity: 5000, unit: "g" }, { name: "Selleri, i tern", quantity: 3000, unit: "g" }, { name: "Kartofler, i tern", quantity: 5000, unit: "g" }, { name: "Grønne bønner", quantity: 3000, unit: "g" }, { name: "Ærter", quantity: 3000, unit: "g" }, { name: "Grøntsagsfond", quantity: 25000, unit: "ml" }, { name: "Persille", quantity: 200, unit: "g" }], method: ["Svits løg i smør.", "Tilsæt alle grøntsager undtagen ærter.", "Tilsæt fond og kog i 20-25 min.", "Tilsæt ærter til sidst.", "Smag til med salt, peber og persille."] },
  "DS-009": { recipeName: "Rabarbertrifli", id: "DS-009", category: "Desserter", yield_net: "15.0 KG", ingredients: [{ name: "Rabarber, i stykker", quantity: 5000, unit: "g" }, { name: "Sukker", quantity: 1500, unit: "g" }, { name: "Vaniljepuddingpulver", quantity: 500, unit: "g" }, { name: "Mælk", quantity: 4000, unit: "ml" }, { name: "Flødeskum", quantity: 3000, unit: "ml" }, { name: "Makroner eller kammerjunkere", quantity: 1000, unit: "g" }], method: ["Kog rabarber med sukker til kompot.", "Lav vaniljepudding af pulver og mælk.", "Pisk flødeskum.", "Lægger i glas/skåle: kager, kompot, pudding, flødeskum.", "Gentag lag og afslut med flødeskum.", "Køl min. 2 timer."] },
  "DS-010": { recipeName: "Chokolademousse", id: "DS-010", category: "Desserter", yield_net: "10.0 KG", ingredients: [{ name: "Mørk chokolade (64%)", quantity: 2000, unit: "g" }, { name: "Smør", quantity: 500, unit: "g" }, { name: "Æg (hele)", quantity: 1200, unit: "g" }, { name: "Sukker", quantity: 600, unit: "g" }, { name: "Piskefløde", quantity: 3000, unit: "ml" }, { name: "Vaniljeekstrakt", quantity: 30, unit: "ml" }], method: ["Smelt chokolade og smør au bain-marie.", "Adskil æg. Pisk blommer og sukker hvidt.", "Rør chokolademassen i blommemassen.", "Pisk æggehvider stive.", "Pisk fløde halvstiv.", "Vend først hvider, så fløde i chokoladen.", "Portioner i skåle og køl min. 4 timer."] },

  // PÅLÆG & SNIT
  "80116": { recipeName: "Leverpostej Kastanjehaven", id: "80116", category: "Pålæg / Produktion", yield_net: "12.5 KG", ingredients: [{ name: "Svinelever", quantity: 4000, unit: "g" }, { name: "Spæk", quantity: 2000, unit: "g" }, { name: "Mælk", quantity: 4500, unit: "ml" }], method: ["Hak lever/spæk.", "Lav opbagning.", "Bland alt.", "Bages i vandbad til 75 grader."] },
  "900374": { recipeName: "Søde kartofler til smørrebrød", id: "900374", category: "Snitgrønt", yield_net: "102.2 KG", ingredients: [{ name: "Søde kartofler", quantity: 102225, unit: "g" }], method: ["Damp i 30-45 min.", "Afkøl, skræl og skær i skiver."] }

};

// Merge all recipes into one unified database
const sourceRecipes: Record<string, any> = {
  ...baseRecipes,
  ...allNewRecipes,
  ...allSprintRecipes,
  ...allSprint6Recipes,
  ...allSprint7Recipes,
  ...allSprint8Recipes,
  ...allSprint9Recipes,
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
  // Sprint 1 additions
  "høns": ["DEL-008", "SC-005"], // Persillsovs variant + aspargessauce
  "hakkebøf": ["DEL-007"], // Brun sovs
  "benløse": ["DEL-007"], // Brun sovs til rulader
  "forloren hare": ["DEL-007", "SC-004"], // Brun sovs + vildtsauce
  "svensk pølseret": ["DEL-006"], // Evt. mos
  "kalkungryde": ["DEL-009"], // Med ris
  "ovnæggekage": [], // Selvstændig ret
  "flæsk": ["DEL-008", "DEL-006"], // Persillesauce + kartofler
  "sprængt": ["SC-003", "DEL-006"], // Peberrodssauce + kartofler
  "oksesteg": ["SC-001", "DEL-006"], // Skysauce + kartoffelmos
  "kalvesteg": ["SC-004", "DEL-006"], // Vildtsauce + kartoffelmos
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
