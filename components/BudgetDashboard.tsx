
import React, { useMemo, useState } from 'react';
import { yearlyPlan2026 } from '../services/mealPlanData';
import { horkramDatabase, getConventionalEquivalentPrice, getHorkramPrice } from '../services/pricingService';
import { MASTER_CHECKLIST } from '../services/instructionManifest';
import { TrendingUp, BarChart3, PieChart, Wallet, ShieldAlert, ArrowUpRight, Calendar, Download, Printer, Info, CheckCircle2, AlertCircle, Calculator, Leaf, Target, Sparkles, TrendingDown, Clock, Activity, ArrowRight, Zap, RefreshCcw, Landmark, Percent } from 'lucide-react';

const BudgetDashboard: React.FC = () => {
  const COVERS = 450; 
  const [wastePercent, setWastePercent] = useState<number>(22); // Dynamisk svind %
  const WASTE_FACTOR = 1 + (wastePercent / 100);
  const [shockPercent, setShockPercent] = useState<number>(0);

  // DYNAMISK BEREGNING AF PORTIONSPRIS BASERET PÅ HØRKRAM LIVE DATA
  const calculatedMasterPrice = useMemo(() => {
    const components = [
      { name: 'okse_hakket', qty: 0.110 }, // 110g kød
      { name: 'piskefloede_38', qty: 0.100 }, // 100ml fløde
      { name: 'kartofler_skrael', qty: 0.150 }, // 150g kartofler
      { name: 'bønner_hvid_puré', qty: 0.050 }, // 50g grønt/puré
      { name: 'fond_okse', qty: 0.100 }, // 1 dl fond
    ];

    const baseCost = components.reduce((sum, comp) => {
      const item = horkramDatabase[comp.name];
      return sum + (item ? item.pricePerUnit * comp.qty : 0);
    }, 0);

    return baseCost * 1.15; // +15% kolonial/diverse
  }, []);

  const AVG_PORTION_PRICE_MASTER = calculatedMasterPrice;
  const AVG_PORTION_PRICE_SHOCKED = AVG_PORTION_PRICE_MASTER * (1 + (shockPercent / 100));

  const financialData = useMemo(() => {
    const monthlyCosts: Record<string, number> = {};
    const monthlyShockCosts: Record<string, number> = {};
    let yearlyTotal = 0;
    let yearlyShockTotal = 0;

    Object.entries(yearlyPlan2026).forEach(([id, month]) => {
      const days = month.data.length;
      const monthTotal = AVG_PORTION_PRICE_MASTER * COVERS * WASTE_FACTOR * days;
      const monthShockTotal = AVG_PORTION_PRICE_SHOCKED * COVERS * WASTE_FACTOR * days;
      
      monthlyCosts[id] = monthTotal;
      monthlyShockCosts[id] = monthShockTotal;
      yearlyTotal += monthTotal;
      yearlyShockTotal += monthShockTotal;
    });

    const maxMonthlyCost = Math.max(...(Object.values(monthlyShockCosts) as number[]), 1);
    const yearlyWasteCost = yearlyShockTotal * (wastePercent / 100);

    return { monthlyCosts, monthlyShockCosts, yearlyTotal, yearlyShockTotal, maxMonthlyCost, yearlyWasteCost };
  }, [COVERS, WASTE_FACTOR, AVG_PORTION_PRICE_MASTER, AVG_PORTION_PRICE_SHOCKED, wastePercent]);

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

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
      
      {/* REAL-TIME ORDER VALUE HEADER */}
      <div className="bg-slate-950 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-b-[12px] border-green-600">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Landmark size={240} />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-600 p-2 rounded-lg shadow-lg shadow-green-900/50">
                <Activity size={20} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.4em] text-green-400 italic">Hørkram Finansielt Dashboard</span>
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-4 italic">Total <span className="text-green-500">Ordreværdi</span></h2>
            <p className="text-slate-400 font-serif italic text-2xl max-w-xl">
              "Baseret på aktuelle Hørkram priser og en svind-faktor på <span className="text-white not-italic">{wastePercent}%</span>."
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 text-right shadow-2xl min-w-[380px]">
            <span className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest italic">Estimeret Årlig Investering 2026</span>
            <div className="text-6xl font-black tracking-tighter mb-2 text-green-500 transition-all">
              {format(financialData.yearlyShockTotal)}
            </div>
            <div className="flex justify-end gap-6 mt-4 pt-4 border-t border-white/5">
                <div className="text-right">
                    <span className="block text-[8px] font-black uppercase text-slate-500">Heraf Svind</span>
                    <span className="text-lg font-black text-orange-500">{format(financialData.yearlyWasteCost)}</span>
                </div>
                <div className="text-right">
                    <span className="block text-[8px] font-black uppercase text-slate-500">Netto Råvarer</span>
                    <span className="text-lg font-black text-blue-400">{format(financialData.yearlyShockTotal - financialData.yearlyWasteCost)}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SIMULATOR: PRISSTIGNING */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-slate-50">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="text-orange-500" size={32} />
              <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">Markeds-Simulator</h3>
            </div>
            <div className="space-y-10">
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Simuleret prisændring (%)</span>
                        <span className={`text-4xl font-black italic tracking-tighter ${shockPercent > 0 ? 'text-red-600' : shockPercent < 0 ? 'text-green-600' : 'text-slate-400'}`}>
                            {shockPercent > 0 ? '+' : ''}{shockPercent}%
                        </span>
                    </div>
                    <input 
                        type="range" min="-20" max="50" step="1" value={shockPercent}
                        onChange={(e) => setShockPercent(Number(e.target.value))}
                        className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-purple-600"
                    />
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-slate-500">Ny Master Portionspris:</span>
                    <span className="text-2xl font-black text-slate-900">{formatPrice(AVG_PORTION_PRICE_SHOCKED)}</span>
                </div>
            </div>
          </div>

          {/* SIMULATOR: SVIND (WASTE) */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border-4 border-orange-50">
            <div className="flex items-center gap-3 mb-8">
              <Percent className="text-orange-600" size={32} />
              <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">Svind-Optimering</h3>
            </div>
            <div className="space-y-10">
                <div>
                    <div className="flex justify-between items-end mb-4">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Aktuel Svindprocent (MDS Mål: 22%)</span>
                        <span className={`text-4xl font-black italic tracking-tighter ${wastePercent > 22 ? 'text-red-600' : 'text-green-600'}`}>
                            {wastePercent}%
                        </span>
                    </div>
                    <input 
                        type="range" min="10" max="35" step="0.5" value={wastePercent}
                        onChange={(e) => setWastePercent(Number(e.target.value))}
                        className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-600"
                    />
                </div>
                <div className="bg-orange-50 border-2 border-orange-100 p-6 rounded-2xl flex justify-between items-center">
                    <div>
                        <span className="block text-[8px] font-black uppercase text-orange-400">Besparelses-potentiale</span>
                        <p className="text-[10px] font-bold text-orange-900 uppercase">Hver 1% reduktion sparer {format(financialData.yearlyShockTotal * 0.01)} årligt.</p>
                    </div>
                    <button onClick={() => setWastePercent(22)} className="text-[10px] font-black uppercase text-orange-400 hover:text-orange-600 flex items-center gap-1">
                        <RefreshCcw size={12} /> Nulstil
                    </button>
                </div>
            </div>
          </div>
      </div>

      {/* MONTHLY BAR CHART */}
      <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-100">
        <div className="flex justify-between items-end mb-12 border-b-4 border-slate-900 pb-4">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 italic">Likviditets-planlægning</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Månedlig ordreværdi jf. simulation</p>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(yearlyPlan2026).map(([id, month]) => {
            const cost = financialData.monthlyShockCosts[id] || 0;
            const pct = (cost / financialData.maxMonthlyCost) * 100;

            return (
              <div key={id} className="group">
                <div className="flex justify-between items-end mb-2 px-4">
                  <span className="text-xs font-black uppercase text-slate-400 group-hover:text-slate-900 transition-colors uppercase tracking-widest">{month.label} ({month.data.length} dage)</span>
                  <span className="font-mono font-black text-lg text-slate-900">{format(cost)}</span>
                </div>
                <div className="h-10 w-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 p-1.5 shadow-inner relative">
                  <div 
                    className={`h-full rounded-xl transition-all duration-1000 ease-out flex items-center justify-end px-4 shadow-lg ${wastePercent > 22 ? 'bg-red-500' : 'bg-green-600'}`}
                    style={{ width: `calc(${pct}% - 12px)` }}
                  >
                    <span className="text-[9px] font-black text-white/70 uppercase tracking-widest">
                      {Math.round(pct)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BudgetDashboard;
