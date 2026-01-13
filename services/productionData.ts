
export interface ProductionBatch {
  id: string;
  mdsId: string;
  name: string;
  type: 'Hovedret' | 'Delopskrift' | 'Bageri';
  quantity: string;
  status: 'Planlagt' | 'I gang' | 'Afkøling' | 'Færdig';
  time: string;
}

export interface DailyProduction {
  day: string;
  batches: ProductionBatch[];
  focusArea: string;
  chefNote: string;
}

export const weeklyProductionPlan: DailyProduction[] = [
  {
    day: 'Mandag',
    focusArea: 'Gryderetter & Grund-baser',
    chefNote: 'Fokus på langtidstilberedning af oksekød til ugen og opkogning af ugentlig bouillon.',
    batches: [
      { id: 'm1', mdsId: '1010', name: 'Skipperlabskovs', type: 'Hovedret', quantity: '350 port.', status: 'I gang', time: '07:30' },
      { id: 'm2', mdsId: '8001', name: 'Grund-Bouillon Okse', type: 'Delopskrift', quantity: '150 liter', status: 'Planlagt', time: '08:00' },
      { id: 'm3', mdsId: '2010', name: 'Gulerodssuppe', type: 'Delopskrift', quantity: '80 liter', status: 'Planlagt', time: '10:00' },
      { id: 'm4', mdsId: '8020', name: 'Hvid Bønnepuré (MDS Base)', type: 'Delopskrift', quantity: '20 kg', status: 'Færdig', time: '06:30' }
    ]
  },
  {
    day: 'Tirsdag',
    focusArea: 'Fjerkræ & Dessert-prep',
    chefNote: 'Klargøring af unghanebryst og kogning af frugtkompotter til ugens desserter.',
    batches: [
      { id: 't1', mdsId: '1015', name: 'Sprængt Kylling', type: 'Hovedret', quantity: '300 port.', status: 'Planlagt', time: '08:30' },
      { id: 't2', mdsId: '5018', name: 'Æblekompot m. vanilje', type: 'Delopskrift', quantity: '40 kg', status: 'I gang', time: '09:00' },
      { id: 't3', mdsId: '6030', name: 'Sandkage (MDS Protein)', type: 'Bageri', quantity: '12 plader', status: 'Planlagt', time: '11:00' },
      { id: 't4', mdsId: '8010', name: 'MDS Jævning (Glutenfri)', type: 'Delopskrift', quantity: '15 kg', status: 'Planlagt', time: '07:00' }
    ]
  },
  {
    day: 'Onsdag',
    focusArea: 'Fisk & Sauce-produktion',
    chefNote: 'Håndtering af fersk ørred. Vigtigt med præcis temperaturstyring af saucer.',
    batches: [
      { id: 'o1', mdsId: '1027', name: 'Bagte Ørred (Vejle Ådal)', type: 'Hovedret', quantity: '280 port.', status: 'Planlagt', time: '09:00' },
      { id: 'o2', mdsId: '1340', name: 'Persillesauce (Klassisk)', type: 'Delopskrift', quantity: '60 liter', status: 'Planlagt', time: '10:30' },
      { id: 'o3', mdsId: '5040', name: 'Pannacotta (E-kost)', type: 'Bageri', quantity: '250 stk.', status: 'Afkøling', time: '07:00' },
      { id: 'o4', mdsId: '2001', name: 'Aspargessuppe', type: 'Delopskrift', quantity: '50 liter', status: 'Planlagt', time: '12:00' }
    ]
  },
  {
    day: 'Torsdag',
    focusArea: 'Grønne Retter & Tærter',
    chefNote: 'Vegetarisk fokus. Sørg for korrekt jævning af grøntsagstærter for fast struktur.',
    batches: [
      { id: 'to1', mdsId: '1080', name: 'Pastinakpostej', type: 'Hovedret', quantity: '150 port.', status: 'Planlagt', time: '08:00' },
      { id: 'to2', mdsId: '1150', name: 'Porretærte', type: 'Hovedret', quantity: '200 port.', status: 'I gang', time: '08:30' },
      { id: 'to3', mdsId: '2012', name: 'Græskarsuppe', type: 'Delopskrift', quantity: '70 liter', status: 'Planlagt', time: '10:00' },
      { id: 'to4', mdsId: '6020', name: 'Rugbrød (Eget bageri)', type: 'Bageri', quantity: '25 brød', status: 'Planlagt', time: '06:30' }
    ]
  },
  {
    day: 'Fredag',
    focusArea: 'Weekend-prep & Stegning',
    chefNote: 'Klargøring af weekend-menuer. Natstegning af oksesteg igangsættes kl. 20:00.',
    batches: [
      { id: 'f1', mdsId: '1044', name: 'Frikadeller (Storproduktion)', type: 'Hovedret', quantity: '600 stk.', status: 'I gang', time: '07:30' },
      { id: 'f2', mdsId: '1160', name: 'Forloren Hare', type: 'Hovedret', quantity: '320 port.', status: 'Planlagt', time: '09:30' },
      { id: 'f3', mdsId: '5060', name: 'Drømmekage', type: 'Bageri', quantity: '15 plader', status: 'Planlagt', time: '11:00' },
      { id: 'f4', mdsId: '1005', name: 'Oksesteg (Natstegning)', type: 'Hovedret', quantity: '25 hele stege', status: 'Planlagt', time: '20:00' }
    ]
  }
];
