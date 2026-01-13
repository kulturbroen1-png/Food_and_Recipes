import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertTriangle, ShieldCheck, Leaf, PieChart, Coins, Calendar, Info, ChevronDown, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';

interface UltimateBudget {
    standard: string;
    yearSummary: {
        totalRealCost: number;
        totalDysphagiaSurcharge: number;
        totalCO2Tonnes: number;
        avgCO2PerPortionKg: number;
    };
    months: Array<{
        month: string;
        totalRealCost: number;
        totalDysphagiaSurcharge: number;
    }>;
}

interface MonteCarloStats {
    baseline: number;
    p50_Median: number;
    p90_RiskAdjusted: number;
    p99_WorstCase: number;
}

interface ProcurementCategory {
    category: string;
    totalKg: number;
    cost2025: number;
    cost2026: number;
    inflationRate: number;
    topIngredients: Record<string, number>;
}

interface ProcurementForecast {
    totalCost2025: number;
    totalCost2026: number;
    overallInflation: number;
    categories: ProcurementCategory[];
}

type ViewMode = 'overview' | 'details' | 'procurement';

const BudgetCalculator: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
    const [budget, setBudget] = useState<UltimateBudget | null>(null);
    const [risk, setRisk] = useState<MonteCarloStats | null>(null);
    const [procurement, setProcurement] = useState<ProcurementForecast | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('overview');
    const [showDysphagiaInfo, setShowDysphagiaInfo] = useState(false);

    useEffect(() => {
        fetch('/yearly_ultimate_budget.json')
            .then(res => res.json())
            .then(data => setBudget(data))
            .catch(err => console.error('Failed to load V6 budget', err));

        fetch('/monte_carlo_results.json')
            .then(res => res.json())
            .then(data => setRisk(data))
            .catch(err => console.error('Failed to load risk stats', err));

        fetch('/procurement_forecast_2026.json')
            .then(res => res.json())
            .then(data => setProcurement(data))
            .catch(err => console.error('Failed to load procurement', err));
    }, []);

    const formatMoney = (val: number) => (val / 1000000).toFixed(2) + ' M';
    const formatMoneyFull = (val: number) => val.toLocaleString('da-DK', { maximumFractionDigits: 0 });

    if (!budget || !risk || !procurement) return <div className="p-10 text-white flex items-center justify-center min-h-screen">Loading Strategic Data...</div>;

    const riskPremium = risk.p90_RiskAdjusted - risk.baseline;

    return (
        <div className="bg-slate-900 min-h-screen text-white p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-900/50">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                Bestyrelses-Dashboard 2025
                            </h1>
                            <p className="text-indigo-300 font-medium">V6 Ultimate Model & Monte Carlo Risk Analysis</p>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
                        <button
                            onClick={() => setViewMode('overview')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${viewMode === 'overview' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Strategisk Overblik
                        </button>
                        <button
                            onClick={() => setViewMode('procurement')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${viewMode === 'procurement' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Indkøbs-Forecast (Råvarer)
                        </button>
                        <button
                            onClick={() => setViewMode('details')}
                            className={`px-6 py-2 rounded-lg font-medium transition-all ${viewMode === 'details' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            Måneds-Detaljer
                        </button>
                    </div>
                </div>

                {viewMode === 'overview' && (
                    <>
                        {/* THE BIG NUMBER (Board Focus) */}
                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                            <div className="col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 shadow-2xl relative overflow-hidden group hover:border-slate-600 transition-all">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

                                <h2 className="text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                    Anbefalet Budget-Loft (P90)
                                </h2>
                                <div className="text-7xl font-black text-white mb-4 tracking-tighter">
                                    {formatMoney(risk.p90_RiskAdjusted)} <span className="text-3xl text-slate-500">DKK</span>
                                </div>

                                <div className="flex items-center gap-6 mt-6">
                                    <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex-1">
                                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">Baseline Drift (V6)</div>
                                        <div className="text-2xl font-bold text-white">{formatMoney(budget.yearSummary.totalRealCost)}</div>
                                    </div>
                                    <div className="bg-indigo-900/30 rounded-xl p-4 border border-indigo-500/30 flex-1 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-indigo-500/10 animate-pulse"></div>
                                        <div className="text-xs text-indigo-300 font-bold uppercase mb-1 relative z-10">Markeds-Buffer</div>
                                        <div className="text-2xl font-bold text-indigo-300 relative z-10">+{formatMoney(riskPremium)}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Climate Badge */}
                            <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-950/50 rounded-3xl p-8 border border-emerald-800/50 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mb-10 pointer-events-none"></div>
                                <div>
                                    <h2 className="text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <Leaf className="w-5 h-5" />
                                        Klimaaftryk 2025
                                    </h2>
                                    <div className="text-5xl font-black text-white mb-2">
                                        {budget.yearSummary.totalCO2Tonnes.toFixed(0)} <span className="text-2xl text-emerald-500/70">Ton</span>
                                    </div>
                                    <div className="text-emerald-200/60 font-medium">
                                        {budget.yearSummary.avgCO2PerPortionKg.toFixed(2)} kg CO2e pr. måltid
                                    </div>
                                </div>
                                <div className="w-full bg-emerald-900/50 rounded-full h-3 mt-6 overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[60%] rounded-full"></div>
                                </div>
                                <div className="flex justify-between text-xs text-emerald-400/50 mt-2 font-mono">
                                    <span>0 kg</span>
                                    <span>Mål: 0.8 kg</span>
                                    <span>2.0 kg</span>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Cost Drivers */}
                            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <PieChart className="w-6 h-6 text-violet-400" />
                                    Hvorfor 9.08 Mio? (Cost Drivers)
                                </h3>

                                <div className="space-y-6">
                                    {/* Base */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-slate-300">Råvarebasis (V3)</span>
                                            <span className="font-mono text-slate-400">7.33 M</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div className="bg-slate-500 h-full rounded-full w-[80%]"></div>
                                        </div>
                                    </div>

                                    {/* Compliance */}
                                    <div>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-amber-400 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                Ældreloven (Berigelse)
                                            </span>
                                            <span className="font-mono text-amber-400">+0.69 M</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div className="bg-amber-500 h-full rounded-full w-[10%] ml-[80%]"></div>
                                        </div>
                                    </div>

                                    {/* Interactive Compliance Section */}
                                    <div
                                        className="cursor-pointer group"
                                        onClick={() => setShowDysphagiaInfo(!showDysphagiaInfo)}
                                    >
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="font-bold text-rose-400 flex items-center gap-2">
                                                <AlertTriangle className="w-4 h-4" />
                                                Lovpligtig Ernæring (Ældreloven)
                                                {showDysphagiaInfo ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                            </span>
                                            <span className="font-mono text-rose-400 group-hover:underline">+1.06 M</span>
                                        </div>
                                        <div className="w-full bg-slate-700 rounded-full h-2">
                                            <div className="bg-rose-500 h-full rounded-full w-[15%] ml-[90%]"></div>
                                        </div>

                                        {showDysphagiaInfo && (
                                            <div className="mt-4 p-4 bg-rose-900/20 border border-rose-500/30 rounded-xl text-sm text-rose-200 animate-in fade-in slide-in-from-top-2">
                                                <div className="flex gap-2 mb-2 font-bold uppercase text-xs">
                                                    <Info className="w-4 h-4" />
                                                    Lovkrav: Energi- & Proteintæt Kost
                                                </div>
                                                <p>Dækker meromkostning til opfyldelse af <strong>Bekendtgørelse om fødevarer</strong>:</p>
                                                <ul className="list-disc list-inside mt-2 text-rose-200/70">
                                                    <li>Krav om energi-tæthed (Smør/Fløde berigelse)</li>
                                                    <li>Krav om proteintæthed (til småtspisende)</li>
                                                    <li>Tekstur-tilpasning (Gratin/Gelé)</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Monte Carlo Stats */}
                            <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Coins className="w-6 h-6 text-blue-400" />
                                    Monte Carlo Risiko-Analyse
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
                                        <div className="w-12 h-12 bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-500 font-bold text-xs">P50</div>
                                        <div>
                                            <div className="font-bold text-white">{formatMoney(risk.p50_Median)}</div>
                                            <div className="text-xs text-slate-500">Median (Mest sandsynlige)</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/50 relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
                                        <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500"></div>
                                        <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-400 font-bold text-xs">P90</div>
                                        <div>
                                            <div className="font-bold text-indigo-300 text-xl">{formatMoney(risk.p90_RiskAdjusted)}</div>
                                            <div className="text-xs text-indigo-400/70">SAFE CAP (Anbefalet)</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700 opacity-60">
                                        <div className="w-12 h-12 bg-rose-900/30 rounded-full flex items-center justify-center text-rose-500 font-bold text-xs">P99</div>
                                        <div>
                                            <div className="font-bold text-white">{formatMoney(risk.p99_WorstCase)}</div>
                                            <div className="text-xs text-slate-500">Worst Case (Krise)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {viewMode === 'procurement' && (
                    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 animate-in fade-in zoom-in-95">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    <ShoppingCart className="w-6 h-6 text-teal-400" />
                                    Indkøbs-Forecast (Råvarer) - 2026
                                </h3>
                                <p className="text-slate-400">
                                    Detaljeret specifikation af råvarer til <strong>Det Varme Måltid (Menuplan)</strong>.
                                    <br /> NB: Dette er basisproduktionen (før Frokost/Morgenmad/Non-Food tillæg).
                                </p>
                            </div>
                            <div className="bg-indigo-900/50 p-4 rounded-xl border border-indigo-500/30 text-right">
                                <div className="text-xs text-indigo-300 uppercase font-bold">Total Råvare (Varm Mad)</div>
                                <div className="text-2xl font-bold text-white">{formatMoney(procurement.totalCost2026)}</div>
                                <div className="text-xs text-emerald-400 mt-1">+{procurement.overallInflation.toFixed(1)}% ift. 2025</div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-600 text-slate-400 text-sm uppercase">
                                        <th className="p-4 w-1/4">Kategori</th>
                                        <th className="p-4 w-1/4">Est. Forbrug (Kg)</th>
                                        <th className="p-4 w-1/4">Top Ingredienser</th>
                                        <th className="p-4 w-1/4 text-right">Budget 2026 (Forventet)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {procurement.categories.map((cat) => (
                                        <tr key={cat.category} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-white text-lg">{cat.category}</div>
                                                <div className="text-xs text-slate-500 mt-1">Inflation: +{Math.round((cat.inflationRate - 1) * 100)}%</div>
                                            </td>
                                            <td className="p-4 text-slate-300 font-mono text-lg">
                                                {cat.totalKg.toLocaleString('da-DK', { maximumFractionDigits: 0 })} kg
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {Object.entries(cat.topIngredients).slice(0, 3).map(([ing, qty]) => (
                                                        <span key={ing} className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300">
                                                            {ing} <span className="text-slate-500">({(qty as number).toFixed(0)}kg)</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="font-bold text-emerald-400 text-lg">{formatMoneyFull(cat.cost2026)} kr</div>
                                                <div className="text-xs text-slate-500">2025: {formatMoneyFull(cat.cost2025)} kr</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {viewMode === 'details' && (
                    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 animate-in fade-in zoom-in-95">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-teal-400" />
                            Månedlig Drifts-Opgørelse (V6)
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase">
                                        <th className="p-4">Måned</th>
                                        <th className="p-4">Basis Råvarer</th>
                                        <th className="p-4">Lovpligtig Kost (Ældreloven)</th>
                                        <th className="p-4 text-right">Total (V6)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {budget.months.map((m, i) => (
                                        <tr key={m.month} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                            <td className="p-4 font-bold capitalize text-white">{m.month}</td>
                                            <td className="p-4 text-slate-300">{formatMoneyFull(m.totalRealCost - m.totalDysphagiaSurcharge)} kr</td>
                                            <td className="p-4 text-rose-300">+{formatMoneyFull(m.totalDysphagiaSurcharge)} kr</td>
                                            <td className="p-4 text-right font-bold text-emerald-400">{formatMoneyFull(m.totalRealCost)} kr</td>
                                        </tr>
                                    ))}
                                    <tr className="bg-slate-900/50 font-bold text-lg border-t-2 border-slate-600">
                                        <td className="p-4">Total 2025</td>
                                        <td className="p-4 text-slate-300">{formatMoneyFull(budget.yearSummary.totalRealCost - budget.yearSummary.totalDysphagiaSurcharge)} kr</td>
                                        <td className="p-4 text-rose-400">+{formatMoneyFull(budget.yearSummary.totalDysphagiaSurcharge)} kr</td>
                                        <td className="p-4 text-right text-emerald-400">{formatMoneyFull(budget.yearSummary.totalRealCost)} kr</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {onClose && (
                    <div className="mt-8 text-center">
                        <button onClick={onClose} className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors font-medium">
                            Luk Dashboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetCalculator;