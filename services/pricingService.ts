
export interface HorkramItem {
  id: string; // MDS Varenummer
  name: string;
  pricePerUnit: number;
  unit: 'kg' | 'l' | 'stk';
  co2PerKg?: number; // Kg CO2 pr. kg vare
}

// Priser og CO2 aftryk baseret på Breelteparken 2026 standard
export const horkramDatabase: Record<string, HorkramItem> = {
  "okse_hakket": { id: "110.234", name: "Hakket Naturkvæg (Øko) 8-12%", pricePerUnit: 112.50, unit: 'kg', co2PerKg: 13.5 }, // Naturkvæg har lavere CO2 end konv.
  "okse_steg": { id: "110.115", name: "Naturkvæg Yderlår (Øko)", pricePerUnit: 145.00, unit: 'kg', co2PerKg: 14.2 },
  "okse_mørbrad": { id: "110.550", name: "Naturkvæg Mørbrad (Øko)", pricePerUnit: 485.00, unit: 'kg', co2PerKg: 15.0 },
  "gris_kam": { id: "100.567", name: "Øko Svinekam m. svær", pricePerUnit: 98.00, unit: 'kg', co2PerKg: 4.2 },
  "gris_fars": { id: "100.440", name: "Øko Hakket Svinekød 8-12%", pricePerUnit: 78.00, unit: 'kg', co2PerKg: 3.8 },
  "kylling_bryst": { id: "100.772", name: "Øko Kyllingebryst filet", pricePerUnit: 124.00, unit: 'kg', co2PerKg: 2.1 },
  "fisk_orred": { id: "200.112", name: "Naturskånsom Ørred (Vejle Å)", pricePerUnit: 185.00, unit: 'kg', co2PerKg: 1.8 },
  "kartofler_skrael": { id: "300.120", name: "Øko Skrællede Kartofler", pricePerUnit: 22.50, unit: 'kg', co2PerKg: 0.2 },
  "piskefloede_38": { id: "400.045", name: "Øko Piskefløde 38%", pricePerUnit: 62.00, unit: 'l', co2PerKg: 1.4 },
  "floede_48": { id: "400.048", name: "Øko Fløde 48% (Double Cream)", pricePerUnit: 89.00, unit: 'l', co2PerKg: 1.6 },
  "soedmaelk": { id: "400.012", name: "Øko Sødmælk", pricePerUnit: 16.50, unit: 'l', co2PerKg: 0.8 },
  "smoer": { id: "400.090", name: "Øko Smør (Læsø/Thise)", pricePerUnit: 95.00, unit: 'kg', co2PerKg: 1.5 },
  "saft_dessert": { id: "500.220", name: "Øko Saft Koncentrat 1+4", pricePerUnit: 48.00, unit: 'l', co2PerKg: 0.5 },
  "bønner_hvid_puré": { id: "500.115", name: "Øko Hvide Bønner (MDS Puré-klar)", pricePerUnit: 42.00, unit: 'kg', co2PerKg: 0.4 },
  "fond_okse": { id: "800.010", name: "Øko Oksefond (MDS Koncentrat)", pricePerUnit: 85.00, unit: 'l', co2PerKg: 0.9 }
};

export const getHorkramPrice = (ingredientName: string): number => {
  const name = ingredientName.toLowerCase();
  if (name.includes('okse') || name.includes('naturkvæg')) return horkramDatabase.okse_hakket.pricePerUnit;
  if (name.includes('gris') || name.includes('svin')) return horkramDatabase.gris_fars.pricePerUnit;
  if (name.includes('kylling') || name.includes('fjerkræ')) return horkramDatabase.kylling_bryst.pricePerUnit;
  if (name.includes('fisk') || name.includes('ørred')) return horkramDatabase.fisk_orred.pricePerUnit;
  if (name.includes('kartoffel')) return horkramDatabase.kartofler_skrael.pricePerUnit;
  if (name.includes('fløde 48')) return horkramDatabase.floede_48.pricePerUnit;
  if (name.includes('fløde')) return horkramDatabase.piskefloede_38.pricePerUnit;
  if (name.includes('mælk') || name.includes('sødmælk')) return horkramDatabase.soedmaelk.pricePerUnit;
  if (name.includes('smør') || name.includes('andefedt')) return horkramDatabase.smoer.pricePerUnit;
  if (name.includes('bønner') || name.includes('puré')) return horkramDatabase.bønner_hvid_puré.pricePerUnit;
  if (name.includes('fond') || name.includes('bouillon')) return horkramDatabase.fond_okse.pricePerUnit;
  
  return 60.00; // Økologisk gns. fallback
};

export const getConventionalEquivalentPrice = (price: number): number => {
  return price * 0.65; // Konventionelle varer koster ca. 65% af øko specialvarer
};

export const getCo2Savings = (organic: boolean): number => {
  // Simuleret besparelse i kg CO2 pr. portion ved at skifte til Naturkvæg og øko-planter
  return organic ? 1.2 : 0; 
};
