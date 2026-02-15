
import { MealDay } from '../mealPlanData';

/**
 * APRIL 2026 MEAL PLAN
 * Generated with ældreloven compliance
 * Easter: April 5th
 * Total days: 30
 */

export const april2026: MealDay[] = [
    { date: "1. apr (Ons)", icon: "🐟", type: "Fisk", dish: "Stegt Rødspætte", protein: "90g", sauce: "Remoulade", carb: "Stegte kartofler", veg: "Citron", biret: "Æblekage m. flødeskum" },
    { date: "2. apr (Tor)", icon: "🥦", type: "Grøn", dish: "Grøntsagstærte", protein: "160g", sauce: "Urte dressing", carb: "-", veg: "Råkostsalat", biret: "Aspargessuppe" },
    { date: "3. apr (Fre)", icon: "🐖", type: "Gris", dish: "Krebinet", protein: "110g", sauce: "Champignonsauce", carb: "Kartofler", veg: "Ærter & gulerødder", biret: "Chokoladekage" },
    { date: "4. apr (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Kylling i Karry", protein: "180g", sauce: "Karrysauce", carb: "Løse Ris", veg: "Rabarberchutney", biret: "Frugtsalat m. creme" },

    // Påske (Easter Sunday - April 5th) - MUST include Lamb or Eggs
    { date: "5. apr (Søn)", icon: "🐂", type: "Okse", dish: "Lammekølle", protein: "90g", sauce: "Rosmarinsauce", carb: "Flødekartofler", veg: "Bønner", biret: "Påskekage", isHoliday: true },

    // Anden Påskedag (Easter Monday)
    { date: "6. apr (Man)", icon: "🐂", type: "Okse", dish: "Lammegryde", protein: "180g", sauce: "Grøntsagssauce", carb: "Kartofler", veg: "Forårsløg", biret: "Citronfromage", isHoliday: true },

    { date: "7. apr (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Sprængt Kylling", protein: "90g", sauce: "Peberrodsauce", carb: "Kartofler", veg: "Gulerødder", biret: "Hindbærsnitte" },
    { date: "8. apr (Ons)", icon: "🐟", type: "Fisk", dish: "Bagt Torsk", protein: "90g", sauce: "Sennepsauce", carb: "Kartofler", veg: "Dampet broccoli", biret: "Budding m. saft" },
    { date: "9. apr (Tor)", icon: "🥦", type: "Grøn", dish: "Pastinakpostej", protein: "150g", sauce: "Tomatsauce", carb: "Rugbrød", veg: "Agurkesalat", biret: "Blomkålssuppe" },
    { date: "10. apr (Fre)", icon: "🐖", type: "Gris", dish: "Frikadeller", protein: "90g", sauce: "Brun sauce", carb: "Kartofler", veg: "Surkål", biret: "Drømmekage" },
    { date: "11. apr (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Høns i asparges", protein: "110g", sauce: "Aspargessauce", carb: "Tarteletter (3 stk)", veg: "Persille", biret: "Rabarberkompot" },
    { date: "12. apr (Søn)", icon: "🐂", type: "Okse", dish: "Kalvesteg", protein: "90g", sauce: "Skysauce", carb: "Kartofler", veg: "Glaserede perleløg", biret: "Panna cotta", isHoliday: true },
    { date: "13. apr (Man)", icon: "🐖", type: "Gris", dish: "Boller i Karry", protein: "90g", sauce: "Karrysauce", carb: "Løse Ris", veg: "Mangochutney", biret: "Gulerodssuppe" },
    { date: "14. apr (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Kalkungryde", protein: "180g", sauce: "Flødesauce", carb: "Kartoffelmos", veg: "Ærter", biret: "Gulerodskage" },
    { date: "15. apr (Ons)", icon: "🐟", type: "Fisk", dish: "Dampet Ørred", protein: "90g", sauce: "Urtecreme", carb: "Hvide kartofler", veg: "Spidskål", biret: "Jordbærgrød m. fløde" },
    { date: "16. apr (Tor)", icon: "🥦", type: "Grøn", dish: "Ovnæggekage", protein: "150g", sauce: "Løgmarmelade", carb: "Rugbrød", veg: "Tomatsalat", biret: "Tomatsuppe" },
    { date: "17. apr (Fre)", icon: "🐖", type: "Gris", dish: "Stegt Flæsk", protein: "90g", sauce: "Persillesauce", carb: "Kartofler", veg: "Syltede rødbeder", biret: "Sandkage" },
    { date: "18. apr (Lør)", icon: "🐔", type: "Fjerkræ", dish: "BBQ Kylling", protein: "90g", sauce: "BBQ sauce", carb: "Bagte kartofler", veg: "Coleslaw", biret: "Chokolademousse" },
    { date: "19. apr (Søn)", icon: "🐂", type: "Okse", dish: "Oksesteg", protein: "90g", sauce: "Rødvinsauce", carb: "Flødekartofler", veg: "Bønner", biret: "Ymerfromage", isHoliday: true },
    { date: "20. apr (Man)", icon: "🐖", type: "Gris", dish: "Forloren Hare", protein: "110g", sauce: "Vildtsauce", carb: "Kartofler", veg: "Tyttebær", biret: "Minestronesuppe" },
    { date: "21. apr (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Paprikagryde", protein: "180g", sauce: "Paprikasauce", carb: "Ris", veg: "Persille", biret: "Citronmåne" },
    { date: "22. apr (Ons)", icon: "🐟", type: "Fisk", dish: "Stegt Ørred", protein: "90g", sauce: "Smørsauce", carb: "Hvide kartofler", veg: "Dampede grøntsager", biret: "Frugtsalat" },
    { date: "23. apr (Tor)", icon: "🥦", type: "Grøn", dish: "Broccoligratin", protein: "160g", sauce: "-", carb: "Rugbrød", veg: "Råkost", biret: "Kartoffel-porresuppe" },
    { date: "24. apr (Fre)", icon: "🐖", type: "Gris", dish: "Karbonader", protein: "110g", sauce: "Stuvede ærter", carb: "Kartofler", veg: "Glacerede gulerødder", biret: "Pæretærte" },
    { date: "25. apr (Lør)", icon: "🐔", type: "Fjerkræ", dish: "Kyllingefrikassé", protein: "180g", sauce: "-", carb: "Hvide kartofler", veg: "Syltede agurker", biret: "Risengrød" },
    { date: "26. apr (Søn)", icon: "🐂", type: "Okse", dish: "Bankekød", protein: "90g", sauce: "Skysauce", carb: "Kartoffelmos", veg: "Glaserede løg", biret: "Rubinsteinerkage", isHoliday: true },
    { date: "27. apr (Man)", icon: "🐖", type: "Gris", dish: "Hjerter i fløde", protein: "150g", sauce: "Flødesauce", carb: "Kartoffelmos", veg: "Asier", biret: "Æblegrød" },
    { date: "28. apr (Tir)", icon: "🐔", type: "Fjerkræ", dish: "Andebryst", protein: "90g", sauce: "Portvinsauce", carb: "Kartofler", veg: "Svesker", biret: "Cremet gulerodssuppe" },
    { date: "29. apr (Ons)", icon: "🐟", type: "Fisk", dish: "Paneret Fisk", protein: "90g", sauce: "Remoulade", carb: "Stegte kartofler", veg: "Citron", biret: "Hindbærstrifli" },
    { date: "30. apr (Tor)", icon: "🥦", type: "Grøn", dish: "Spinattærte", protein: "150g", sauce: "Dressing", carb: "-", veg: "Tomatsalat", biret: "Klar suppe m. boller" },
];
