
export interface HorkramItem {
  id: string; // MDS Varenummer
  name: string;
  pricePerUnit: number;
  unit: 'kg' | 'l' | 'stk';
  co2PerKg?: number; // Kg CO2 pr. kg vare
}

// Priser og CO2 aftryk baseret på Breelteparken 2026 standard
export const horkramDatabase: Record<string, HorkramItem> = {
  // KØD & FISK
  "okse_hakket": { id: "110.234", name: "Hakket Naturkvæg (Øko) 8-12%", pricePerUnit: 112.50, unit: 'kg', co2PerKg: 13.5 },
  "okse_steg": { id: "110.115", name: "Naturkvæg Yderlår (Øko)", pricePerUnit: 145.00, unit: 'kg', co2PerKg: 14.2 },
  "okse_mørbrad": { id: "110.550", name: "Naturkvæg Mørbrad (Øko)", pricePerUnit: 485.00, unit: 'kg', co2PerKg: 15.0 },
  "gris_kam": { id: "100.567", name: "Øko Svinekam m. svær", pricePerUnit: 98.00, unit: 'kg', co2PerKg: 4.2 },
  "gris_fars": { id: "100.440", name: "Øko Hakket Svinekød 8-12%", pricePerUnit: 78.00, unit: 'kg', co2PerKg: 3.8 },
  "kylling_bryst": { id: "100.772", name: "Øko Kyllingebryst filet", pricePerUnit: 124.00, unit: 'kg', co2PerKg: 2.1 },
  "fisk_orred": { id: "200.112", name: "Naturskånsom Ørred (Vejle Å)", pricePerUnit: 185.00, unit: 'kg', co2PerKg: 1.8 },

  // GRØNTSAGER & FRUGT
  "kartofler_skrael": { id: "300.120", name: "Øko Skrællede Kartofler", pricePerUnit: 22.50, unit: 'kg', co2PerKg: 0.2 },
  "loeg": { id: "300.200", name: "Øko Løg (Danmark)", pricePerUnit: 18.50, unit: 'kg', co2PerKg: 0.3 },
  "gulerodder": { id: "300.210", name: "Øko Gulerødder (Danmark)", pricePerUnit: 24.00, unit: 'kg', co2PerKg: 0.2 },
  "broccoli": { id: "300.220", name: "Øko Broccoli (Danmark)", pricePerUnit: 45.00, unit: 'kg', co2PerKg: 0.4 },
  "hvidloeg": { id: "300.230", name: "Øko Hvidløg (Danmark)", pricePerUnit: 85.00, unit: 'kg', co2PerKg: 0.5 },
  "persille": { id: "300.240", name: "Øko Persille (Danmark)", pricePerUnit: 125.00, unit: 'kg', co2PerKg: 0.6 },
  "basilikum": { id: "300.250", name: "Øko Basilikum (Danmark)", pricePerUnit: 145.00, unit: 'kg', co2PerKg: 0.7 },

  // TOMATER & KONSERVER
  "tomater_hakkede": { id: "500.100", name: "Øko Hakkede Tomater (Italien)", pricePerUnit: 28.00, unit: 'kg', co2PerKg: 0.8 },
  "tomatpure": { id: "500.110", name: "Øko Tomatpuré (Italien)", pricePerUnit: 35.00, unit: 'kg', co2PerKg: 0.9 },
  "bønner_hvid_puré": { id: "500.115", name: "Øko Hvide Bønner (MDS Puré-klar)", pricePerUnit: 42.00, unit: 'kg', co2PerKg: 0.4 },

  // MEJERI
  "piskefloede_38": { id: "400.045", name: "Øko Piskefløde 38%", pricePerUnit: 62.00, unit: 'l', co2PerKg: 0.8 },
  "floede_48": { id: "400.048", name: "Øko Fløde 48% (Double Cream)", pricePerUnit: 89.00, unit: 'l', co2PerKg: 1.6 },
  "soedmaelk": { id: "400.012", name: "Øko Sødmælk", pricePerUnit: 16.50, unit: 'l', co2PerKg: 0.8 },
  "smoer": { id: "400.090", name: "Øko Smør (Læsø/Thise)", pricePerUnit: 95.00, unit: 'kg', co2PerKg: 1.5 },
  "ost_mozzarella": { id: "400.200", name: "Øko Mozzarella (Italien)", pricePerUnit: 145.00, unit: 'kg', co2PerKg: 2.1 },
  "ost_parmesan": { id: "400.210", name: "Øko Parmesan (Italien)", pricePerUnit: 285.00, unit: 'kg', co2PerKg: 2.5 },

  // MEL & BAGVÆRK
  "hvedemel": { id: "600.100", name: "Øko Hvedemel (Danmark)", pricePerUnit: 32.00, unit: 'kg', co2PerKg: 0.3 },
  "lasagneplader": { id: "600.110", name: "Øko Lasagneplader (Italien)", pricePerUnit: 65.00, unit: 'kg', co2PerKg: 0.8 },
  "ris_langkornet": { id: "600.120", name: "Øko Ris Langkornet (Italien)", pricePerUnit: 38.00, unit: 'kg', co2PerKg: 0.6 },

  // OLIER & DRESSINGER
  "olivenolie": { id: "700.100", name: "Øko Olivenolie (Spanien)", pricePerUnit: 125.00, unit: 'l', co2PerKg: 1.2 },
  "soja": { id: "700.110", name: "Øko Sojasauce (Kina)", pricePerUnit: 85.00, unit: 'l', co2PerKg: 2.8 },

  // FONDER & SAUCER
  "fond_okse": { id: "800.010", name: "Øko Oksefond (MDS Koncentrat)", pricePerUnit: 85.00, unit: 'l', co2PerKg: 0.9 },

  // SÆSONVARER & SÆRLIGT
  "saft_dessert": { id: "500.220", name: "Øko Saft Koncentrat 1+4", pricePerUnit: 48.00, unit: 'l', co2PerKg: 0.5 },
  "salt": { id: "900.100", name: "Øko Havsalt (Danmark)", pricePerUnit: 25.00, unit: 'kg', co2PerKg: 0.1 },
  "muskatnoed": { id: "900.110", name: "Øko Muskatnød (Indonesien)", pricePerUnit: 450.00, unit: 'kg', co2PerKg: 3.2 },
  "olie": { id: "700.120", name: "Øko Rapsolie (Danmark)", pricePerUnit: 75.00, unit: 'l', co2PerKg: 0.8 },
  "vand": { id: "999.001", name: "Vand (Ledningsvand)", pricePerUnit: 0.01, unit: 'l', co2PerKg: 0.001 }
};

export const getHorkramPrice = (ingredientName: string): number => {
  const name = ingredientName.toLowerCase();

  // KØD & FISK
  if (name.includes('okse') || name.includes('naturkvæg') || name.includes('hakket oksekød')) return horkramDatabase.okse_hakket.pricePerUnit;
  if (name.includes('gris') || name.includes('svin') || name.includes('svinekød')) return horkramDatabase.gris_fars.pricePerUnit;
  if (name.includes('kylling') || name.includes('fjerkræ')) return horkramDatabase.kylling_bryst.pricePerUnit;
  if (name.includes('fisk') || name.includes('ørred')) return horkramDatabase.fisk_orred.pricePerUnit;

  // GRØNTSAGER & FRUGT
  if (name.includes('kartoffel') || name.includes('skrællet')) return horkramDatabase.kartofler_skrael.pricePerUnit;
  if (name.includes('løg, hakket') || name.includes('løg')) return horkramDatabase.loeg.pricePerUnit;
  if (name.includes('gulerødder') || name.includes('revet')) return horkramDatabase.gulerodder.pricePerUnit;
  if (name.includes('broccoli') || name.includes('buketter')) return horkramDatabase.broccoli.pricePerUnit;
  if (name.includes('hvidløg')) return horkramDatabase.hvidloeg.pricePerUnit;
  if (name.includes('persille')) return horkramDatabase.persille.pricePerUnit;
  if (name.includes('basilikum')) return horkramDatabase.basilikum.pricePerUnit;

  // TOMATER & KONSERVER
  if (name.includes('hakkede tomater') || name.includes('tomater')) return horkramDatabase.tomater_hakkede.pricePerUnit;
  if (name.includes('tomatpuré') || name.includes('tomatpure')) return horkramDatabase.tomatpure.pricePerUnit;
  if (name.includes('bønner') || name.includes('puré')) return horkramDatabase.bønner_hvid_puré.pricePerUnit;

  // MEJERI
  if (name.includes('fløde 48')) return horkramDatabase.floede_48.pricePerUnit;
  if (name.includes('fløde') || name.includes('piskefløde')) return horkramDatabase.piskefloede_38.pricePerUnit;
  if (name.includes('mælk') || name.includes('sødmælk') || name.includes('varm')) return horkramDatabase.soedmaelk.pricePerUnit;
  if (name.includes('smør') || name.includes('andefedt')) return horkramDatabase.smoer.pricePerUnit;
  if (name.includes('mozzarella') || name.includes('revet')) return horkramDatabase.ost_mozzarella.pricePerUnit;
  if (name.includes('parmesan')) return horkramDatabase.ost_parmesan.pricePerUnit;

  // MEL & BAGVÆRK
  if (name.includes('hvedemel') || name.includes('mel')) return horkramDatabase.hvedemel.pricePerUnit;
  if (name.includes('lasagneplader') || name.includes('tørrede')) return horkramDatabase.lasagneplader.pricePerUnit;
  if (name.includes('ris') || name.includes('langkornet')) return horkramDatabase.ris_langkornet.pricePerUnit;

  // OLIER & DRESSINGER
  if (name.includes('olivenolie') || name.includes('olie')) return horkramDatabase.olivenolie.pricePerUnit;
  if (name.includes('soja')) return horkramDatabase.soja.pricePerUnit;

  // FONDER & SAUCER
  if (name.includes('fond') || name.includes('bouillon') || name.includes('oksefond')) return horkramDatabase.fond_okse.pricePerUnit;

  // SÆSONVARER & SÆRLIGT
  if (name.includes('salt')) return horkramDatabase.salt.pricePerUnit;
  if (name.includes('muskatnød') || name.includes('muskatnoed')) return horkramDatabase.muskatnoed.pricePerUnit;
  if (name.includes('vand')) return horkramDatabase.vand.pricePerUnit;

  return 60.00; // Økologisk gns. fallback
};

export const getConventionalEquivalentPrice = (price: number): number => {
  return price * 0.65; // Konventionelle varer koster ca. 65% af øko specialvarer
};

export const getCo2Savings = (organic: boolean): number => {
  // Simuleret besparelse i kg CO2 pr. portion ved at skifte til Naturkvæg og øko-planter
  return organic ? 1.2 : 0; 
};