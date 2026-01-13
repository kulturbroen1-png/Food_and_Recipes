
import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Zap, Info, ArrowRight, Wallet, PieChart, CheckCircle2, AlertTriangle, TrendingDown, History, Calculator, ArrowUpRight } from 'lucide-react';

const ScenarioAnalysis: React.FC = () => {
   const COVERS = 450;
   const DAYS = 365;
   const TOTAL_PORTIONS = COVERS * DAYS;
   const WASTE_FACTOR = 1.22;
   const [showShockSimulation, setShowShockSimulation] = useState(false);

   // Basistal for Master 2026
   const MASTER_PRICE_2026 = 68.50;
   const SHOCK_PERCENTAGE = 0.05; // 5% stigning
   const SHOCK_PRICE_2026 = MASTER_PRICE_2026 * (1 + SHOCK_PERCENTAGE);

   // Scenarie Definitioner
   const scenarios = [
      {
         id: 'basis',
         name: 'Konventionel Model',
         description: 'Standard institutionskost',
         avgPortionPrice: 32.50,
         color: 'bg-slate-400',
         impact: 'Laveste pris, men lever ikke op til MDS-standard.'
      },
      {
         id: 'ekost-conv',
         name: 'E-Kost (Konv.)',
         description: 'Beriget konventionel',
         avgPortionPrice: 48.00,
         color: 'bg-blue-500',
         impact: 'God klinisk ernæring, men uden grøn profil.'
      },
      {
         id: 'master',
         name: 'MDS Master 2026',
         description: '97,5% Øko & Naturkvæg',
         avgPortionPrice: MASTER_PRICE_2026,
         color: 'bg-purple-600',
         impact: 'Optimal ernæring og maksimal bæredygtighed.',
         isRecommended: true
      }
   ];

   const calculateTotal = (price: number) => price * TOTAL_PORTIONS * WASTE_FACTOR;
   const format = (v: number) => new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      maximumFractionDigits: 0
   }).format(v);

   const formatPrice = (v: number) => new Intl.NumberFormat('da-DK', {
      style: 'currency',
      currency: 'DKK',
      minimumFractionDigits: 2
   }).format(v);

   // Historiske data simulation (Sidste 5 år: 2022-2026)
   const historicalTrend = [
      { year: 2022, price: 58.40, total: calculateTotal(58.40) },
      { year: 2023, price: 61.15, total: calculateTotal(61.15) },
      { year: 2024, price: 63.80, total: calculateTotal(63.80) },
      { year: 2025, price: 66.25, total: calculateTotal(66.25) },
      { year: 2026, price: MASTER_PRICE_2026, total: calculateTotal(MASTER_PRICE_2026), isCurrent: true },
   ];

   const shockTotal = calculateTotal(SHOCK_PRICE_2026);
   const normalTotal = calculateTotal(MASTER_PRICE_2026);
   const shockImpact = shockTotal - normalTotal;

   // Find max værdi til graf-skalering
   const maxVal = showShockSimulation ? shockTotal : Math.max(...historicalTrend.map(d => d.total));

   return (
      <div className="space-y-10 pb-24 animate-in fade-in zoom-in-95 duration-700">

         {/* HEADER WITH TOGGLE */}
         <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-b-[12px] border-purple-600">
            <div className="absolute top-0 right-0 p-12 opacity-10">
               <TrendingUp size={240} />
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-12">
               <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="bg-purple-600 p-3 rounded-2xl shadow-lg">
                        <Calculator size={24} />
                     </div>
                     <span className="text-sm font-black uppercase tracking-[0.4em] text-purple-400 italic">MDS Budget Simulator 2026</span>
                  </div>
                  <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-6 italic">Budget <span className="text-purple-500">Stresstest</span></h2>
                  <p className="text-slate-400 font-serif italic text-2xl leading-relaxed">
                     "Simulering af den årlige drift ved en uforudset prisstigning på <span className="text-white not-italic">5%</span> på tværs af MDS Master-modellen."
                  </p>
               </div>

               <div className="flex flex-col gap-4 min-w-[300px]">
                  <button
                     onClick={() => setShowShockSimulation(!showShockSimulation)}
                     className={`w-full py-6 rounded-[2rem] font-black uppercase text-sm tracking-widest transition-all shadow-2xl flex items-center justify-center gap-3 ${showShockSimulation
                           ? 'bg-red-600 text-white animate-pulse'
                           : 'bg-white text-slate-900 hover:bg-slate-100'
                        }`}
                  >
                     {showShockSimulation ? <AlertTriangle size={24} /> : <Zap size={24} />}
                     {showShockSimulation ? 'Deaktiver Prischok' : 'Simuler +5% Prisstigning'}
                  </button>
                  <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 text-center">
                     <span className="text-[10px] font-black uppercase text-slate-500 block mb-1">Mål: MDS Guld (97,5% Øko)</span>
                     <span className="text-xs font-bold text-slate-400 italic">Standard: 450 kuverter • 365 dage</span>
                  </div>
               </div>
            </div>
         </div>

         {/* SHOCK SUMMARY BOXES */}
         {showShockSimulation && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-4 duration-500">
               <div className="bg-red-50 border-4 border-red-100 p-10 rounded-[3rem] shadow-xl">
                  <span className="block text-[10px] font-black uppercase text-red-400 mb-2 tracking-widest">Ekstra Omkostning (Årlig)</span>
                  <div className="text-5xl font-black text-red-600 tracking-tighter">+{format(shockImpact)}</div>
                  <p className="mt-4 text-xs font-bold text-red-800/60 uppercase">Baseret på 5% stigning fra {formatPrice(MASTER_PRICE_2026)} til {formatPrice(SHOCK_PRICE_2026)}</p>
               </div>
               <div className="bg-white border-2 border-slate-100 p-10 rounded-[3rem] shadow-xl flex items-center gap-6">
                  <div className="bg-orange-100 p-6 rounded-3xl text-orange-600">
                     <ArrowUpRight size={40} />
                  </div>
                  <div>
                     <span className="block text-[10px] font-black uppercase text-slate-400 mb-1">Ny Portionspris</span>
                     <div className="text-4xl font-black text-slate-900 tracking-tighter">{formatPrice(SHOCK_PRICE_2026)}</div>
                     <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Master Model Stress</span>
                  </div>
               </div>
               <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center border-b-8 border-red-600">
                  <h4 className="text-xl font-black uppercase italic mb-2">Budget-Anbefaling</h4>
                  <p className="text-sm font-serif italic text-slate-400">
                     Ved en 5% stigning bør budgetrammen udvides, eller der skal findes besparelser på råvareindkøb.
                  </p>
               </div>
            </div>
         )}

         {/* HISTORICAL BAR GRAPH (5 YEARS) */}
         <div className="bg-white rounded-[4rem] p-12 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12">
               <BarChart3 size={300} />
            </div>

            <div className="flex justify-between items-end mb-16 relative z-10">
               <div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900 italic leading-none">Historisk <span className="text-purple-600">Pris-udvikling</span></h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Pris pr. år jf. MDS Master Standard (2022 - 2026)</p>
               </div>
               <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-slate-800 rounded-full"></div>
                     <span className="text-[10px] font-black uppercase text-slate-400">Standard Master</span>
                  </div>
                  {showShockSimulation && (
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase text-red-600 tracking-widest">Simuleret Chok</span>
                     </div>
                  )}
               </div>
            </div>

            <div className="h-96 flex items-end gap-6 relative px-10">
               {/* Grid Lines */}
               {[0, 25, 50, 75, 100].map(val => (
                  <div key={val} className="absolute left-0 right-0 border-t border-slate-50" style={{ bottom: `${val}%` }}>
                     <span className="absolute -left-4 -top-2 text-[8px] font-black text-slate-200">{val}%</span>
                  </div>
               ))}

               {historicalTrend.map((data, i) => {
                  const heightPct = (data.total / maxVal) * 100;
                  return (
                     <div key={data.year} className="flex-1 flex flex-col items-center group relative z-10">
                        {/* Tooltip */}
                        <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-xl whitespace-nowrap">
                           {format(data.total)}
                        </div>
                        <div
                           className={`w-full rounded-t-3xl transition-all duration-1000 ease-out border-b-0 ${data.isCurrent ? 'bg-purple-600 shadow-2xl shadow-purple-900/20' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                           style={{ height: `${heightPct}%` }}
                        >
                           <div className="h-full w-full bg-gradient-to-t from-black/5 to-transparent flex items-end justify-center pb-4">
                              <span className="text-[10px] font-black text-white/40 rotate-[-90deg] uppercase tracking-widest">{formatPrice(data.price)}</span>
                           </div>
                        </div>
                        <span className={`mt-6 text-sm font-black uppercase tracking-tighter ${data.isCurrent ? 'text-purple-600' : 'text-slate-400'}`}>{data.year}</span>
                     </div>
                  );
               })}

               {/* SHOCK BAR (ONLY IF ACTIVE) */}
               {showShockSimulation && (
                  <div className="flex-1 flex flex-col items-center animate-in slide-in-from-bottom-10 duration-700 relative z-10">
                     <div className="absolute -top-12 bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] font-black shadow-xl whitespace-nowrap">
                        {format(shockTotal)}
                     </div>
                     <div
                        className="w-full bg-red-600 rounded-t-3xl shadow-2xl shadow-red-900/40"
                        style={{ height: '100%' }}
                     >
                        <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent flex items-end justify-center pb-4">
                           <span className="text-[10px] font-black text-white rotate-[-90deg] uppercase tracking-widest animate-pulse">{formatPrice(SHOCK_PRICE_2026)}</span>
                        </div>
                     </div>
                     <span className="mt-6 text-sm font-black uppercase tracking-tighter text-red-600">2026 SHOCK</span>
                  </div>
               )}
            </div>
         </div>

         {/* SCENARIO COMPARISON TABLE */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
               <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic border-b-4 border-slate-900 pb-2">Sammenligning (Basis)</h3>
               <div className="space-y-8">
                  {scenarios.map(s => {
                     const total = calculateTotal(s.avgPortionPrice);
                     const pct = (total / maxVal) * 100;
                     return (
                        <div key={s.id}>
                           <div className="flex justify-between items-end mb-2">
                              <div>
                                 <span className="text-sm font-black uppercase text-slate-800 leading-none block">{s.name}</span>
                                 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{formatPrice(s.avgPortionPrice)} pr. port</span>
                              </div>
                              <span className="text-xl font-black text-slate-900">{format(total)}</span>
                           </div>
                           <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${s.color} rounded-full`} style={{ width: `${pct}%` }}></div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
               <div className="absolute -left-10 -bottom-10 opacity-5 rotate-45"><ShieldCheck size={200} /></div>
               <h3 className="text-2xl font-black uppercase mb-8 tracking-tighter italic border-b-4 border-purple-600 pb-2">Strategisk Overvejelse</h3>
               <p className="text-lg font-serif italic text-slate-400 leading-relaxed mb-8">
                  "For at modstå eksterne prischok på 5-10% i 2026 anbefales det at sikre langsigtede aftaler på <strong>Naturkvæg</strong> og <strong>Øko-Mejeri</strong>.
                  Historikken viser en stigning på ca. 4,5% årligt – Master-modellen sikrer dog en værdiøgning hos borgerne, der overstiger råvareinflation."
               </p>
               <div className="flex items-center gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700">
                  <div className="bg-green-600 p-3 rounded-xl"><CheckCircle2 size={24} /></div>
                  <div>
                     <h4 className="font-black uppercase text-xs">Anbefalet Tiltag</h4>
                     <p className="text-[10px] font-bold text-slate-500 uppercase">Implementer MDS Waste-Tracking (Mål: -4% svind)</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ScenarioAnalysis;
