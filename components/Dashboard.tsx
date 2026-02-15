
import React, { useState } from 'react';
import {
    ClipboardList,
    Printer,
    ShoppingCart,
    CalendarDays,
    Clock,
    ChefHat,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    Package
} from 'lucide-react';
import { martsTestPlan } from '../services/martsTestPlan';
import { getMeatOrder } from '../services/meatDatabase';
import { MealDay } from '../services/mealPlanData';

interface DashboardProps {
    onNavigate?: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    const [simulatedDate, setSimulatedDate] = useState<Date>(new Date('2026-03-02T12:00:00'));

    const productionDate = new Date(simulatedDate);
    productionDate.setDate(simulatedDate.getDate() + 2);

    const orderDate = new Date(simulatedDate);
    orderDate.setDate(simulatedDate.getDate() + 6);

    const findMeal = (date: Date): MealDay | undefined => {
        const day = date.getDate();
        const dateStr = `${day}. mar`;
        return martsTestPlan.find(m => m.date.startsWith(dateStr));
    };

    const productionMeal = findMeal(productionDate);
    const orderMeal = findMeal(orderDate);
    const meatDetails = orderMeal ? getMeatOrder(orderMeal.dish) : null;
    const estimatedMeatAmount = orderMeal && meatDetails ? (parseFloat(orderMeal.protein) || 120) * 450 / 1000 : 0;

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 px-4 py-6 animate-in fade-in duration-500">

            {/* Professional Header */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 rounded-2xl p-8 shadow-2xl border border-blue-500/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-5xl font-black text-white tracking-tight mb-2">
                            Produktions<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">oversigt</span>
                        </h1>
                        <div className="flex items-center gap-3 text-slate-300">
                            <CalendarDays size={20} className="text-blue-400" />
                            <span className="text-lg font-medium capitalize">
                                {simulatedDate.toLocaleDateString('da-DK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        </div>
                    </div>

                    {/* Simulation Control */}
                    <div className="bg-slate-800/50 backdrop-blur-sm px-5 py-3 rounded-xl border border-slate-700/50 flex items-center gap-4 shadow-lg">
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-blue-400 animate-pulse" />
                            <span className="text-sm font-bold text-blue-400 uppercase tracking-wide">Simulering</span>
                        </div>
                        <select
                            aria-label="Vælg dato for simulering"
                            value={simulatedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSimulatedDate(new Date(e.target.value))}
                            className="bg-transparent border-none text-white text-sm font-semibold focus:ring-0 cursor-pointer hover:text-blue-300 transition-colors pr-8"
                        >
                            {Array.from({ length: 25 }, (_, i) => i + 1).map(day => (
                                <option key={day} value={`2026-03-${day.toString().padStart(2, '0')}`} className="bg-slate-900 text-white">
                                    2. Marts + {day - 2} dage
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* LEFT: PRODUCTION CARD - Redesigned */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Animated gradient border */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                        <ChefHat size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white mb-1">Dagens Produktion</h2>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
                                                COOK & CHILL +2 DAGE
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Serveres: <span className="text-white font-semibold">{productionDate.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric' })}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {productionMeal && (
                                    <div className="text-right bg-gradient-to-br from-blue-500/10 to-purple-500/10 px-5 py-3 rounded-xl border border-blue-400/20 backdrop-blur-sm">
                                        <div className="text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">Volumen</div>
                                        <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            450 <span className="text-lg text-slate-500">kuv.</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {productionMeal ? (
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                        <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                                            Hovedret
                                        </div>
                                        <h3 className="text-4xl font-black text-white leading-tight mb-4 tracking-tight">
                                            {productionMeal.dish}
                                        </h3>
                                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/30 backdrop-blur-sm">
                                            <span className="text-2xl">{productionMeal.icon}</span>
                                            <span className="text-sm font-semibold text-slate-200 capitalize">{productionMeal.type} menu</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {[
                                            { label: 'Tilbehør', value: productionMeal.carb, color: 'from-amber-500/20 to-orange-500/20 border-amber-400/20' },
                                            { label: 'Grønt', value: productionMeal.veg, color: 'from-green-500/20 to-emerald-500/20 border-green-400/20' },
                                            { label: 'Sauce', value: productionMeal.sauce, color: 'from-red-500/20 to-rose-500/20 border-red-400/20' },
                                            { label: 'Biret', value: productionMeal.biret, color: 'from-purple-500/20 to-pink-500/20 border-purple-400/20' },
                                        ].map((item, idx) => (
                                            <div key={idx} className={`p-4 rounded-xl bg-gradient-to-br ${item.color} border backdrop-blur-sm hover:scale-105 transition-transform duration-200`}>
                                                <div className="text-xs font-bold text-slate-400 uppercase mb-2">{item.label}</div>
                                                <div className="text-white font-semibold text-sm leading-snug">{item.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            onClick={() => onNavigate && onNavigate('monthly-production')}
                                            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-bold py-4 rounded-xl border border-slate-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                        >
                                            <Package size={20} />
                                            Se Pakkeliste
                                        </button>
                                        <button
                                            onClick={() => window.print()}
                                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl shadow-blue-900/50 flex items-center justify-center gap-2"
                                        >
                                            <Printer size={20} />
                                            Print Produktion
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-16 flex flex-col items-center justify-center text-slate-500">
                                    <AlertCircle size={56} className="mb-4 opacity-30" />
                                    <p className="font-semibold text-lg">Ingen produktion på denne dag</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: ORDERING CARD - Redesigned */}
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-pulse"></div>

                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                                        <ShoppingCart size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-white mb-1">Varebestilling</h2>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-sm">
                                                DEADLINE +6 DAGE
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                Anvendes: <span className="text-white font-semibold">{orderDate.toLocaleDateString('da-DK', { weekday: 'long', day: 'numeric' })}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {orderMeal ? (
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                                        <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                            Ret på dagen
                                        </div>
                                        <div className="text-xl text-white font-bold">{orderMeal.dish}</div>
                                    </div>

                                    {meatDetails ? (
                                        <div className="bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm shadow-xl">
                                            <div className="absolute -right-12 -bottom-12 opacity-5 text-emerald-400">
                                                <ShoppingCart size={180} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="text-sm text-emerald-300 font-bold mb-3 flex items-center gap-2">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                                    Anbefalet Bestilling
                                                </div>
                                                <div className="text-3xl font-black text-white mb-2 tracking-tight">{meatDetails.name}</div>
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-400/30 backdrop-blur-sm">
                                                        #{meatDetails.varenummer}
                                                    </span>
                                                    <span className="text-sm text-slate-300 font-medium">{meatDetails.supplier}</span>
                                                </div>

                                                <div className="flex items-end justify-between pt-5 border-t-2 border-emerald-500/30">
                                                    <div>
                                                        <div className="text-xs text-emerald-400 font-bold uppercase mb-2">Mængde</div>
                                                        <div className="text-4xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                                                            {estimatedMeatAmount.toFixed(1)} <span className="text-xl text-emerald-500/60">{meatDetails.unit}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right bg-white/5 px-4 py-3 rounded-xl backdrop-blur-sm">
                                                        <div className="text-xs text-emerald-400 font-bold uppercase mb-1">Est. Pris</div>
                                                        <div className="text-2xl font-black text-white">
                                                            {(estimatedMeatAmount * meatDetails.priceCheck).toFixed(0)},-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-5 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 text-orange-300 flex gap-3 items-center backdrop-blur-sm">
                                            <AlertCircle size={24} />
                                            <span className="text-sm font-semibold">Kunne ikke matche varenummer automatisk.</span>
                                        </div>
                                    )}

                                    <button className="w-full group bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl shadow-emerald-900/50 flex items-center justify-center gap-2">
                                        <span>Gå til Hørkram Shop</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                                    </button>
                                </div>
                            ) : (
                                <div className="py-16 flex flex-col items-center justify-center text-slate-500">
                                    <p className="font-semibold text-lg">Ingen bestilling nødvendig</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Quick Navigation Cards - Redesigned */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {[
                    { icon: ClipboardList, label: 'Produktionsplan', action: 'monthly-production', gradient: 'from-indigo-600 to-purple-600', glow: 'indigo' },
                    { icon: TrendingUp, label: 'Opskrifts-database', action: 'recipes', gradient: 'from-orange-600 to-red-600', glow: 'orange' },
                    { icon: Package, label: 'Varemodtagelse', action: 'kitchen', gradient: 'from-green-600 to-emerald-600', glow: 'green' },
                    { icon: AlertCircle, label: 'Kvalitets-svigt', action: 'health', gradient: 'from-rose-600 to-pink-600', glow: 'rose' },
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={() => onNavigate && onNavigate(item.action)}
                        className="group relative overflow-hidden p-6 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl hover:border-slate-600 transition-all duration-300 text-left shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon size={24} className="text-white" />
                        </div>
                        <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-sm leading-snug">{item.label}</div>
                        <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}></div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
