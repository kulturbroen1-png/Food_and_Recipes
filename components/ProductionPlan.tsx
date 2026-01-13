
import React, { useState, useMemo } from 'react';
import { weeklyProductionPlan as staticPlan, DailyProduction, ProductionBatch } from '../services/productionData';
import { january2026 } from '../services/mealPlanData';
import { getSubRecipesForDish, getAllRecipes } from '../services/authenticRecipes';
import { subscribeToDataChanges, dataRelationshipStore } from '../services/dataRelationshipService';

const ProductionPlan: React.FC = () => {
  const [selectedWorkDay, setSelectedWorkDay] = useState<string>('Mandag');



  /* 
    DYNAMIC PRODUCTION ENGINE v2.0
    - Uses DataRelationshipStore to resolve sub-recipes and dependencies.
    - Reacts to changes in the RecipeLibrary instantly.
  */

  // Trigger state for re-rendering when store updates
  const [lastUpdate, setLastUpdate] = useState(new Date().getTime());

  // Subscribe to store changes
  React.useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      console.log('ProductionPlan: Data updated, refreshing view...');
      setLastUpdate(new Date().getTime());
    });
    return unsubscribe;
  }, []);

  const generatedWeeklyPlan = useMemo(() => {
    // Generate 5 days of production from January 2026
    const sourceDays = january2026.slice(0, 5);
    const daysMap = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];

    const dynamicPlan: DailyProduction[] = sourceDays.map((mealDay, index) => {
      const dayName = daysMap[index] || 'Lørdag';
      const batches: ProductionBatch[] = [];

      // 1. Resolve Main Dish from DataRelationshipStore (Authentic + User Overrides)
      // We assume the mealDay.dish string matches a recipe name or ID.
      // In a real scenario we'd fuzzy match, but for now we look for exact.
      let mainRecipeId = 'UNKNOWN';
      const allRecipes = getAllRecipes(); // Fallback to raw listing if not in graph (though store should have it)
      // Ideally we query the store. The store is indexed by ID.
      // For this demo, we assume we find the ID via name search if needed.

      const match = allRecipes.find(r => r.recipeName === mealDay.dish) || { id: '100' + index };
      mainRecipeId = match.id || match.recipeNumber;

      batches.push({
        id: `main-${index}`,
        mdsId: mainRecipeId,
        name: mealDay.dish,
        type: 'Hovedret',
        quantity: '450 port.',
        status: index === 0 ? 'I gang' : 'Planlagt',
        time: '08:00'
      });

      // 2. Dynamic Sub-recipe Resolution via Graph Store
      // getChildren returns { type, id }
      const children = dataRelationshipStore.getChildren(mainRecipeId);
      const subRecipes = children.filter(c => c.type === 'sub_recipe');

      if (subRecipes.length > 0) {
        subRecipes.forEach((sub, subIdx) => {
          // Fetch details for the sub-recipe to get its name
          const subDetails = dataRelationshipStore.getEntity(sub.id, 'recipe');
          const subName = subDetails ? subDetails.recipeName : `Sub-recipe ${sub.id}`;

          batches.push({
            id: `sub-${index}-${subIdx}`,
            mdsId: sub.id,
            name: `Prep: ${subName}`,
            type: 'Delopskrift',
            quantity: 'Basis', // Could calculate dynamic scaling here based on parent yield
            status: 'Planlagt',
            time: '09:00'
          });
        });
      } else {
        // Fallback to static mapping if relationship not yet defined in graph (for old data compatibility)
        const staticSubs = getSubRecipesForDish(mealDay.dish);
        staticSubs.forEach((subId, subIdx) => {
          batches.push({
            id: `sub-${index}-${subIdx}-static`,
            mdsId: subId,
            name: `Prep: ${subId}`,
            type: 'Delopskrift',
            quantity: 'Basis',
            status: 'Planlagt',
            time: '09:00'
          });
        });
      }

      // 3. Bi-ret (Soup/Dessert)
      if (mealDay.biret) {
        batches.push({
          id: `bi-${index}`,
          mdsId: '200' + index,
          name: mealDay.biret,
          type: mealDay.biret.toLowerCase().includes('kage') ? 'Bageri' : 'Delopskrift',
          quantity: '450 port.',
          status: 'Planlagt',
          time: '11:00'
        });
      }

      // 4. Skeleton Vegetarian
      batches.push({
        id: `veg-${index}`,
        mdsId: '300' + index,
        name: 'Vegetarisk Alternativ',
        type: 'Hovedret',
        quantity: '25 port.',
        status: 'Planlagt',
        time: '08:30'
      });

      return {
        day: dayName,
        batches: batches,
        focusArea: mealDay.type === 'Fisk' ? 'Fisk & Skaldyr' : mealDay.type === 'Gris' ? 'Svinekød & Farsering' : 'Generel Produktion',
        chefNote: `Husk fokus på ${mealDay.dish} i dag. ${mealDay.sauce ? 'Vær obs på saucen.' : ''}`
      };
    });

    return dynamicPlan;
  }, [lastUpdate]); // Re-run when store updates

  const currentDayData = useMemo(() =>
    generatedWeeklyPlan.find(d => d.day === selectedWorkDay) || generatedWeeklyPlan[0]
    , [selectedWorkDay, generatedWeeklyPlan]);

  const workDays = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag'];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-300">
        <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-black uppercase text-orange-500 tracking-widest">Live Produktions-overblik</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Arbejdsseddel: Køkken-Rytme</h2>
            <p className="text-slate-400 text-sm font-serif italic">Produktionstidsrum: 06:30 - 14:30 | Ansvarlig: Køkkenchef</p>
          </div>
          <div className="bg-slate-800 px-6 py-4 rounded-xl border border-slate-700 flex gap-8">
            <div className="text-center">
              <span className="block text-[10px] font-black uppercase text-slate-500">Fokus i dag</span>
              <span className="text-lg font-bold text-orange-400">{currentDayData.focusArea}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-3 mb-10 no-print">
            {workDays.map(d => (
              <button
                key={d}
                onClick={() => setSelectedWorkDay(d)}
                className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${selectedWorkDay === d
                  ? 'bg-orange-600 text-white shadow-xl scale-105'
                  : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-200'
                  }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
            <div className="xl:col-span-3 space-y-6">
              <h3 className="text-xl font-black border-b-4 border-slate-100 pb-3 flex justify-between items-center text-slate-800">
                <span>Batch Produktion - {selectedWorkDay}</span>
                <span className="text-xs font-bold text-slate-400 uppercase">MDS Produktions-modul</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentDayData.batches.map(batch => (
                  <div key={batch.id} className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-orange-500 transition-all group relative overflow-hidden shadow-sm">
                    <div className={`absolute top-0 right-0 px-4 py-1 text-[9px] font-black uppercase rounded-bl-xl text-white ${batch.type === 'Delopskrift' ? 'bg-sky-600' :
                      batch.type === 'Bageri' ? 'bg-purple-600' : 'bg-slate-800'
                      }`}>
                      {batch.type}
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-50 w-20 h-20 rounded-xl border-2 border-slate-100 flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                        <span className="text-[9px] font-black text-slate-400 mb-1">MDS ID</span>
                        <span className="font-mono font-black text-slate-800 group-hover:text-orange-600 text-lg">#{batch.mdsId}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-black text-slate-800 text-lg leading-tight mb-1">{batch.name}</h4>
                          <span className="text-xs font-mono font-bold text-slate-400">{batch.time}</span>
                        </div>
                        <p className="text-sm text-slate-500 font-bold mb-4">{batch.quantity}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${batch.status === 'I gang' ? 'bg-orange-100 text-orange-700' :
                            batch.status === 'Færdig' ? 'bg-green-100 text-green-700' :
                              batch.status === 'Afkøling' ? 'bg-blue-100 text-blue-700' :
                                'bg-slate-100 text-slate-500'
                            }`}>
                            {batch.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-white border-2 border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-blue-900 p-4 text-white flex items-center gap-3">
                  <span className="text-xl">📋</span>
                  <h4 className="font-black uppercase text-sm tracking-widest">Dagens Køkkeninstruks - {selectedWorkDay}</h4>
                </div>
                <div className="p-8">
                  <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded text-blue-900 font-serif italic italic leading-relaxed">
                    "{currentDayData.chefNote}"
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h5 className="font-black text-xs uppercase text-slate-400 border-b pb-1">Klargøring & Egenkontrol</h5>
                      <ul className="text-sm space-y-2 text-slate-600">
                        <li className="flex gap-2"><span>✅</span> Tjek køleskabstemperaturer før start.</li>
                        <li className="flex gap-2"><span>✅</span> Klargør kantiner og låg til dagens afkøling.</li>
                        <li className="flex gap-2"><span>✅</span> MDS-ID mærkning skal ske straks ved pakning.</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-black text-xs uppercase text-slate-400 border-b pb-1">Hygiejne & Rengøring</h5>
                      <ul className="text-sm space-y-2 text-slate-600">
                        <li className="flex gap-2"><span>🧽</span> Afspritning af bordoverflader efter kød-håndtering.</li>
                        <li className="flex gap-2"><span>🧽</span> Opvask skal ske løbende for at undgå ophobning.</li>
                        <li className="flex gap-2"><span>🧽</span> Affaldshåndtering: Husk sortering af plastik/pap.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500 opacity-10 rounded-full"></div>
                <h3 className="text-xs font-black uppercase text-orange-400 mb-6 tracking-[0.2em] border-b border-slate-800 pb-2">Uge-Dashboard</h3>
                <div className="space-y-6">
                  <div>
                    <span className="block text-[10px] font-black uppercase text-slate-500 mb-1">Status på ugeplan</span>
                    <div className="w-full bg-slate-800 h-2 rounded-full">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <span className="text-[10px] text-right block mt-1 font-bold">65% Gennemført</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <span className="block text-[10px] font-black uppercase text-slate-500">MDS Batches</span>
                      <span className="text-2xl font-black">42</span>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                      <span className="block text-[10px] font-black uppercase text-slate-500">Timer planlagt</span>
                      <span className="text-2xl font-black">160</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-black text-xs transition-all uppercase tracking-widest shadow-lg active:scale-95">
                  Eksporter Produktionsliste
                </button>
              </div>

              <div className="bg-white border-2 border-slate-100 p-6 rounded-3xl shadow-sm">
                <h4 className="font-black uppercase text-xs text-slate-400 mb-4 tracking-widest">Køkken-noter</h4>
                <textarea
                  className="w-full h-40 bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm font-medium focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Tilføj noter til teamet her..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionPlan;
