
import { MealDay, ALaCarteItem } from './mealPlanData';

export enum MealType {
  Gris = 'Gris',
  Okse = 'Okse',
  Fjerkrae = 'Fjerkræ',
  Fisk = 'Fisk',
  Groen = 'Grøn',
  Fest = 'Fest'
}

export const martsTestPlan: MealDay[] = [
  // VERIFIED CORRECT DATA FROM march_2026_recipes_v2.md
  { date: "1. mar (Søn)", icon: "🐂", type: "Okse", dish: "Bankekød", protein: "90g", sauce: "-", carb: "Kartoffelmos", veg: "-", biret: "Frugtgrød m. fløde", isHoliday: true },
  { date: "2. mar (Man)", icon: "🐂", type: "Okse", dish: "Biksemad", protein: "200g", sauce: "-", carb: "-", veg: "-", biret: "Appelsinsuppe" },
  { date: "3. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kylling i Karry", protein: "180g", sauce: "Karrysauce", carb: "Løse Ris", veg: "Rabarberchutney", biret: "Krydderkage" },
  { date: "4. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Dampet Ørred", protein: "90g", sauce: "Urtecreme", carb: "Hvide kartofler", veg: "Dampet broccoli", biret: "Pæretærte" },
  { date: "5. mar (Tor)", icon: "🐖", type: "Gris", dish: "Gule Ærter / Sprængt nakke", protein: "250g", sauce: "-", carb: "Rødbeder & Sennep", veg: "-", biret: "Pandekager" },
  { date: "6. mar (Fre)", icon: "🐖", type: "Gris", dish: "Mørbradbøf", protein: "90g", sauce: "Champignonsauce", carb: "Hvide kartofler", veg: "-", biret: "Sandkage" },
  { date: "7. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Andebryst", protein: "90g", sauce: "-", carb: "Hvide kartofler", veg: "-", biret: "Risengrød" },
  { date: "8. mar (Søn)", icon: "🐂", type: "Okse", dish: "Wienerschnitzel", protein: "110g", sauce: "-", carb: "Hvide kartofler", veg: "Ærter", biret: "Rubinsteinerkage", isHoliday: true },
  { date: "9. mar (Man)", icon: "🐖", type: "Gris", dish: "Koteletter i fad", protein: "110g", sauce: "-", carb: "Løse Ris", veg: "Dampede ærter", biret: "Karrysuppe" },
  { date: "10. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kalkungryde", protein: "180g", sauce: "-", carb: "Kartoffelmos", veg: "-", biret: "Gulerodskage" },
  { date: "11. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Bagt Ørred", protein: "90g", sauce: "Smørsauce", carb: "Kartofler", veg: "Råkost af gulerod", biret: "Frugtsalat m. creme" },
  { date: "12. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Spinattærte", protein: "150g", sauce: "Dressing", carb: "-", veg: "Tomatsalat", biret: "Kartoffel-porresuppe" },
  { date: "13. mar (Fre)", icon: "🐖", type: "Gris", dish: "Stegt Flæsk", protein: "90g", sauce: "Persillesauce", carb: "Kartofler", veg: "Syltede rødbeder", biret: "Æblekage" },
  { date: "14. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Høns i asparges", protein: "110g", sauce: "-", carb: "Tarteletter (3 stk)", veg: "Dampede grøntsager", biret: "Sveskegrød m. fløde" },
  { date: "15. mar (Søn)", icon: "🐂", type: "Okse", dish: "Kalvesteg", protein: "90g", sauce: "Skysauce m. portvin", carb: "Kartofler", veg: "Rodfrugter i sesam", biret: "Citronfromage", isHoliday: true },
  { date: "16. mar (Man)", icon: "🐖", type: "Gris", dish: "Frikadeller", protein: "90g", sauce: "Brun sauce", carb: "Kartofler", veg: "Kålsalat", biret: "Blomkålssuppe" },
  { date: "17. mar (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kylling i Peberrod", protein: "180g", sauce: "Peberrodsauce", carb: "Kartofler", veg: "Gulerødder", biret: "Citronmåne" },
  { date: "18. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Dampet Ørred", protein: "90g", sauce: "Urtecreme", carb: "Kartofler", veg: "Spidskålssalat", biret: "Chokolademousse" },
  { date: "19. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Ovnæggekage", protein: "150g", sauce: "Løgmarmelade", carb: "Rugbrød", veg: "Bagte tomater", biret: "Minestronesuppe" },
  { date: "20. mar (Fre)", icon: "🐖", type: "Gris", dish: "Forloren Hare", protein: "110g", sauce: "Vildtsauce", carb: "Kartofler", veg: "Sprødgrønt", biret: "Drømmekage" },
  { date: "21. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Kyllingelår BBQ", protein: "90g", sauce: "-", carb: "Bagte kartofler", veg: "Coleslaw", biret: "Abrikosgrød m. fløde" },
  { date: "22. mar (Søn)", icon: "🐂", type: "Okse", dish: "Oksesteg", protein: "90g", sauce: "Rødvinsauce", carb: "Flødekartofler", veg: "Perleløg", biret: "Ymerfromage", isHoliday: true },
  { date: "23. mar (Man)", icon: "🐖", type: "Gris", dish: "Boller i Karry", protein: "90g", sauce: "-", carb: "Løse Ris", veg: "Mangochutney", biret: "Tomatsuppe" },
  { date: "24. mar (Tir)", icon: "🐖", type: "Gris", dish: "Karbonader", protein: "110g", sauce: "Stuvede ærter & gulerødder", carb: "Kartofler", veg: "Glacerede Gulerødder", biret: "Budding m. saft" },
  { date: "25. mar (Ons)", icon: "🐟", type: "Fisk", dish: "Stegt Ørred", protein: "90g", sauce: "Persillesauce", carb: "Hvide kartofler", veg: "Broccoliblanding", biret: "Jordbærgrød m. fløde" },
  { date: "26. mar (Tor)", icon: "🥦", type: "Grøn", dish: "Broccoligratin", protein: "160g", sauce: "-", carb: "Rugbrød", veg: "Spidskål m. ærter", biret: "Klar suppe m. boller" },
  { date: "27. mar (Fre)", icon: "🐔", type: "Fjerkræ", dish: "Kyllingefrikassé", protein: "180g", sauce: "-", carb: "Hvide kartofler", veg: "Syltede agurker", biret: "Chokoladekage" },
  { date: "28. mar (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Tarteletter m. høns", protein: "90g", sauce: "-", carb: "Tarteletter", veg: "Tomatsalat", biret: "Frugtsalat" },
  { date: "29. mar (Søn)", icon: "🐂", type: "Okse", dish: "Lammekølle", protein: "90g", sauce: "Rosmarinsauce", carb: "Flødekartofler", veg: "Bønner", biret: "Rabarbertrifli", isHoliday: true },
  { date: "30. mar (Man)", icon: "🐖", type: "Gris", dish: "Krebinet", protein: "90g", sauce: "-", carb: "Hvide kartofler", veg: "Ærter & gulerødder", biret: "Aspargessuppe" },
  { date: "31. mar (Tir)", icon: "🐂", type: "Okse", dish: "Ungarsk Gullasch", protein: "180g", sauce: "Paprikasauce", carb: "Kartoffelmos", veg: "Asier", biret: "Citronfromage" },
];

export const martsALaCarte: ALaCarteItem[] = [];
