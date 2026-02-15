
// Mock database to map dishes/proteins to Hørkram ordering information
// Prices and Varenumre are fictitious for demonstration

export interface MeatProduct {
    name: string;
    varenummer: string;
    priceCheck: number; // DKK per kg/unit
    unit: string;
    supplier: string;
}

export const meatDatabase: Record<string, MeatProduct> = {
    // Pork
    "Ribbensteg": { name: "Svinekam m/svær ridset", varenummer: "123456", priceCheck: 45.00, unit: "kg", supplier: "Hørkram" },
    "Mørbrad": { name: "Svinemørbrad m/bimørbrad", varenummer: "123457", priceCheck: 69.95, unit: "kg", supplier: "Hørkram" },
    "Koteletter": { name: "Svinekotelet 110g", varenummer: "123458", priceCheck: 55.00, unit: "kg", supplier: "Hørkram" },
    "Frikadeller": { name: "Svinekød 10-12%", varenummer: "123459", priceCheck: 38.00, unit: "kg", supplier: "Hørkram" },
    "Forloren Hare": { name: "Svinekød 10-12%", varenummer: "123459", priceCheck: 38.00, unit: "kg", supplier: "Hørkram" },
    "Boller i karry": { name: "Svinekød 10-12%", varenummer: "123459", priceCheck: 38.00, unit: "kg", supplier: "Hørkram" },
    "Stegt Flæsk": { name: "Stegeflæsk i skiver", varenummer: "123460", priceCheck: 52.00, unit: "kg", supplier: "Hørkram" },
    "Karbonader": { name: "Svinekød 10-12%", varenummer: "123459", priceCheck: 38.00, unit: "kg", supplier: "Hørkram" },
    "Krebinet": { name: "Svinekød 10-12%", varenummer: "123459", priceCheck: 38.00, unit: "kg", supplier: "Hørkram" },
    "Gule Ærter": { name: "Sprængt Nakke", varenummer: "123461", priceCheck: 48.00, unit: "kg", supplier: "Hørkram" },

    // Beef
    "Millionbøf": { name: "Oksekød 10-12%", varenummer: "223456", priceCheck: 65.00, unit: "kg", supplier: "Hørkram" },
    "Kalvesteg": { name: "Kalveyderlår", varenummer: "223457", priceCheck: 110.00, unit: "kg", supplier: "Hørkram" },
    "Oksesteg": { name: "Oksetyksteg", varenummer: "223458", priceCheck: 95.00, unit: "kg", supplier: "Hørkram" },
    "Bankekød": { name: "Oksebov uden ben", varenummer: "223459", priceCheck: 85.00, unit: "kg", supplier: "Hørkram" },
    "Ungarsk Gullasch": { name: "Okseklump i tern", varenummer: "223460", priceCheck: 88.00, unit: "kg", supplier: "Hørkram" },
    "Wienerschnitzel": { name: "Kalveinderlår i skiver", varenummer: "223461", priceCheck: 135.00, unit: "kg", supplier: "Hørkram" },

    // Poultry
    "Kylling i Karry": { name: "Kyllingebrystfilet", varenummer: "323456", priceCheck: 58.00, unit: "kg", supplier: "Hørkram" },
    "Høns i asparges": { name: "Hønsekød kogt/tern", varenummer: "323457", priceCheck: 62.00, unit: "kg", supplier: "Hørkram" },
    "Andebryst": { name: "Andebryst Berberi", varenummer: "323458", priceCheck: 120.00, unit: "kg", supplier: "Hørkram" },
    "Kalkungryde": { name: "Kalkunbryst i tern", varenummer: "323459", priceCheck: 65.00, unit: "kg", supplier: "Hørkram" },
    "Kylling i Peberrod": { name: "Hele Kyllinger 1400g", varenummer: "323460", priceCheck: 34.00, unit: "stk", supplier: "Hørkram" },
    "Kyllingelår BBQ": { name: "Kyllingeunderlår", varenummer: "323461", priceCheck: 28.00, unit: "kg", supplier: "Hørkram" },
    "Kyllingefrikassé": { name: "Kyllingebrystfilet", varenummer: "323456", priceCheck: 58.00, unit: "kg", supplier: "Hørkram" },

    // Fish
    "Stegt Rødspætte": { name: "Rødspættefilet paneret", varenummer: "423456", priceCheck: 75.00, unit: "kg", supplier: "Hørkram" },
    "Dampet Torsk": { name: "Torskeloins", varenummer: "423457", priceCheck: 140.00, unit: "kg", supplier: "Hørkram" },
    "Bagt Torsk": { name: "Torskeloins", varenummer: "423457", priceCheck: 140.00, unit: "kg", supplier: "Hørkram" },
    "Ovnbagt Laks": { name: "Laksefilet side", varenummer: "423458", priceCheck: 125.00, unit: "kg", supplier: "Hørkram" },
    "Dampet Ørred": { name: "Ørredfilet m/skind", varenummer: "423459", priceCheck: 115.00, unit: "kg", supplier: "Hørkram" },
    "Bagt Ørred": { name: "Ørredfilet m/skind", varenummer: "423459", priceCheck: 115.00, unit: "kg", supplier: "Hørkram" },
    "Stegt Ørred": { name: "Ørredfilet m/skind", varenummer: "423459", priceCheck: 115.00, unit: "kg", supplier: "Hørkram" },

    // Veg/Other
    "Grøntsagstærte": { name: "Æggemasse Past", varenummer: "523456", priceCheck: 25.00, unit: "kg", supplier: "Hørkram" },
    "Ovnæggekage": { name: "Æggemasse Past", varenummer: "523456", priceCheck: 25.00, unit: "kg", supplier: "Hørkram" },
    "Broccoligratin": { name: "Broccolibuketter", varenummer: "523457", priceCheck: 22.00, unit: "kg", supplier: "Hørkram" },

    // Default fallback
    "fallback": { name: "Kontakt Køkkenchef", varenummer: "000000", priceCheck: 0.00, unit: "stk", supplier: "Internt" }
};

export function getMeatOrder(dishName: string): MeatProduct {
    // Basic lookup
    for (const key in meatDatabase) {
        if (dishName.includes(key)) return meatDatabase[key];
    }
    return meatDatabase["fallback"];
}
