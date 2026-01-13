
import { MenuItem } from '../types';

export const menuCategories: Record<string, MenuItem[]> = {
  hovedretter: [
    { id: 52014, name: "Kylling i Butterchicken sauce", category: "Helt kød m/sauce" },
    { id: 52013, name: "BBQ perlehøne m/ tomatchutney", category: "Helt kød m/sauce" },
    { id: 130004, name: "Kalvefricassé m/ gulerødder", category: "Sammenkogte retter" },
    { id: 53010, name: "Fiskefrikadeller m/ dild", category: "Fisk- og fjerkræsretter" },
    { id: 10057, name: "Quiche Lorraine m/ bacon", category: "Hovedret m/tilbehør" },
    { id: 270908, name: "Sæsonfisk (Råvarehåndtering)", category: "Kød, slagter" }
  ],
  supper: [
    { id: 116001, name: "Blomkålssuppe", category: "Suppe" },
    { id: 365033, name: "Karry suppe - Gratin", category: "Gratin supper" },
    { id: 64100, name: "Rabarbersuppe", category: "Desserter / Supper" }
  ],
  dessert: [
    { id: 64183, name: "Skyrmousse m/ vanilje", category: "Desserter" },
    { id: 210524, name: "Citronfromage m/ bælg", category: "Desserter" },
    { id: 78119, name: "Rabarbercrumble", category: "Brød & Kager" },
    { id: 210599, name: "Broken Gel (Frugt)", category: "Dessert / Pynt" }
  ],
  delopskrifter: [
    { id: 80116, name: "Leverpostej Kastanjehaven", category: "Pålæg / Produktion" },
    { id: 56030, name: "Rabarberkompot", category: "Green add ons" },
    { id: 59046, name: "Sauce Tatare", category: "Saucer & dressinger" },
    { id: 275170, name: "Gurkemejecreme", category: "Tilbehør - aften" },
    { id: 900374, name: "Søde kartofler (Pålæg)", category: "Snitgrønt" }
  ],
  grundtilberedning: [
    { id: 10001, name: "Hønsefond (Basis)", category: "Grundtilberedning" },
    { id: 10002, name: "Kalvefond (Brun)", category: "Grundtilberedning" },
    { id: 60100, name: "Bechamel sauce", category: "Grundtilberedning" },
    { id: 62900, name: "Vinaigrette (Basis)", category: "Grundtilberedning" },
    { id: 50031, name: "Kogte Ingridærter", category: "Green by default" }
  ]
};
