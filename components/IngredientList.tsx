
import React, { useMemo } from 'react';
import { Ingredient } from '../types';
import { getHorkramPrice } from '../services/pricingService';
import { Info, ShieldCheck, AlertTriangle, ArrowRight, Zap, ShoppingCart, Calculator, Wand2 } from 'lucide-react';

interface IngredientListProps {
  ingredients: Ingredient[];
  portions: number;
  optimizedData?: Ingredient[];
}

const IngredientList: React.FC<IngredientListProps> = ({ ingredients, portions, optimizedData }) => {
  const items = useMemo(() => {
    return (ingredients || []).map((ing, idx) => {
      const wastePct = ing.wastePercentage || 0;
      const calculatedGross = ing.grossQuantity || (wastePct > 0 ? Math.round(ing.quantity / (1 - (wastePct/100))) : Math.round(ing.quantity * 1.22));
      const displayWaste = wastePct || Math.round(((calculatedGross - ing.quantity) / calculatedGross) * 100);
      
      const optimized = optimizedData?.[idx] || optimizedData?.find(oi => oi.name.toLowerCase() === ing.name.toLowerCase());

      return { 
        ...ing, 
        gross: calculatedGross, 
        waste: displayWaste,
        optimized: optimized ? {
          quantity: optimized.quantity,
          gross: optimized.grossQuantity || Math.round(optimized.quantity * 1.22)
        } : null
      };
    });
  }, [ingredients, optimizedData]);

  return (
    <div className="w-full relative">
      <div className="flex justify-between items-end border-b-2 border-slate-900 pb-1 mb-4">
        <h3 className="text-xs font-black uppercase tracking-[0.2em]">Ingredienser & Lager</h3>
        {optimizedData && (
          <div className="flex items-center gap-2 text-[8px] font-black uppercase text-blue-600 animate-pulse">
            <Wand2 size={12} /> AI FORSLAG AKTIVT
          </div>
        )}
      </div>
      
      <table className="w-full text-[10px] border-collapse">
        <thead>
          <tr className="text-left font-black uppercase text-slate-400 border-b border-slate-100">
            <th className="pb-2">Vare</th>
            <th className="pb-2 text-right">Netto (g)</th>
            <th className="pb-2 text-right">Brutto (g)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 font-bold">
          {items.map((ing, i) => (
            <tr key={i} className={`hover:bg-slate-50 transition-all ${ing.optimized ? 'bg-blue-50/50' : ''}`}>
              <td className="py-2.5 pr-2 leading-tight uppercase max-w-[140px] truncate" title={ing.name}>
                <div className="flex items-center gap-2">
                   {ing.name}
                   {ing.optimized && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
                </div>
              </td>
              <td className="py-2.5 text-right whitespace-nowrap">
                <div className="flex flex-col items-end">
                   <span className={ing.optimized ? 'text-slate-300 line-through text-[8px]' : 'text-slate-500'}>
                     {ing.quantity.toLocaleString('da-DK')} g
                   </span>
                   {ing.optimized && (
                     <span className="text-blue-600 font-black text-[11px] animate-in slide-in-from-right-2">
                       {ing.optimized.quantity.toLocaleString('da-DK')} g
                     </span>
                   )}
                </div>
              </td>
              <td className="py-2.5 text-right whitespace-nowrap">
                <div className="flex flex-col items-end">
                   <span className={ing.optimized ? 'text-slate-300 line-through text-[8px]' : 'text-slate-900 font-black'}>
                     {ing.gross.toLocaleString('da-DK')} g
                   </span>
                   {ing.optimized && (
                     <span className="text-blue-700 font-black text-[11px] animate-in slide-in-from-right-2">
                       {ing.optimized.gross.toLocaleString('da-DK')} g
                     </span>
                   )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`mt-6 p-4 rounded-xl shadow-lg flex items-center justify-between transition-colors ${optimizedData ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'}`}>
         <div className="flex items-center gap-3">
            <Calculator size={20} className={optimizedData ? 'text-blue-100' : 'text-blue-400'} />
            <span className="text-[10px] font-black uppercase tracking-widest">Total Batch Vægt</span>
         </div>
         <div className="flex flex-col items-end">
            {optimizedData && (
              <span className="text-[8px] font-bold opacity-60 uppercase">Nyt estimat:</span>
            )}
            <span className="text-xl font-black italic">
              {((optimizedData ? items.reduce((sum, i) => sum + (i.optimized?.gross || i.gross), 0) : items.reduce((sum, i) => sum + i.gross, 0)) / 1000).toFixed(1)} KG
            </span>
         </div>
      </div>

      <div className="mt-4 text-[8px] font-bold text-slate-400 uppercase italic leading-tight">
         * Brutto (g) er mængden fra køl. Netto (g) er mængden efter rens/stegning.
         {optimizedData && <span className="block text-blue-500 mt-1 font-black">AI FORSLAG: Blå værdier viser foreslået diæt-skalering.</span>}
      </div>
    </div>
  );
};

export default IngredientList;
