
import React, { useState } from 'react';
import { yearlyPlan2026, MealDay } from '../services/mealPlanData';
import { Printer, Wand2, CheckSquare, Square, ListPlus, Trash2, Layers, CheckCircle } from 'lucide-react';
import { SelectedComponent } from '../types';

interface MealPlanDisplayProps {
  onBatchGenerate?: (components: SelectedComponent[], params: { portions: string, grams: string }, autoPrint?: boolean) => void;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ onBatchGenerate }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('january');
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponent[]>([]);
  const currentMonth = yearlyPlan2026[selectedMonth] || yearlyPlan2026['january'];

  const getCategoryFromType = (type: SelectedComponent['type'], name: string): string => {
    switch (type) {
      case 'Dish': return 'hovedretter';
      case 'Biret': 
        if (name.toLowerCase().includes('suppe')) return 'supper';
        if (name.toLowerCase().includes('kage') || name.toLowerCase().includes('grød') || name.toLowerCase().includes('fromage') || name.toLowerCase().includes('dessert')) return 'dessert';
        return 'dessert';
      default: return 'delopskrifter';
    }
  };

  const toggleComponent = (dayDate: string, type: SelectedComponent['type'], name: string) => {
    if (!name || name === '-' || name === '(I retten)') return;
    
    setSelectedComponents(prev => {
      const exists = prev.find(c => c.dayDate === dayDate && c.type === type);
      if (exists) {
        return prev.filter(c => !(c.dayDate === dayDate && c.type === type));
      }
      return [...prev, { dayDate, type, name, category: getCategoryFromType(type, name) }];
    });
  };

  const isSelected = (dayDate: string, type: SelectedComponent['type']) => 
    selectedComponents.some(c => c.dayDate === dayDate && c.type === type);

  const selectAllInMonth = () => {
    const all: SelectedComponent[] = [];
    currentMonth.data.forEach(day => {
      if (day.dish) all.push({ dayDate: day.date, type: 'Dish', name: day.dish, category: 'hovedretter' });
      if (day.sauce && day.sauce !== '-' && day.sauce !== '(I retten)') all.push({ dayDate: day.date, type: 'Sauce', name: day.sauce, category: 'delopskrifter' });
      if (day.carb && day.carb !== '-' && day.carb !== '(I retten)') all.push({ dayDate: day.date, type: 'Carb', name: day.carb, category: 'delopskrifter' });
      if (day.veg && day.veg !== '-' && day.veg !== '(I retten)') all.push({ dayDate: day.date, type: 'Veg', name: day.veg, category: 'delopskrifter' });
      if (day.biret && day.biret !== '-' && day.biret !== '(I retten)') all.push({ dayDate: day.date, type: 'Biret', name: day.biret, category: getCategoryFromType('Biret', day.biret) });
    });
    setSelectedComponents(all);
  };

  const selectWeek = (startIndex: number, nextIndex: number | undefined) => {
    const weekDays = currentMonth.data.slice(startIndex, nextIndex);
    const newComponents: SelectedComponent[] = [];
    
    weekDays.forEach(day => {
      if (day.dish) newComponents.push({ dayDate: day.date, type: 'Dish', name: day.dish, category: 'hovedretter' });
      if (day.sauce && day.sauce !== '-' && day.sauce !== '(I retten)') newComponents.push({ dayDate: day.date, type: 'Sauce', name: day.sauce, category: 'delopskrifter' });
      if (day.carb && day.carb !== '-' && day.carb !== '(I retten)') newComponents.push({ dayDate: day.date, type: 'Carb', name: day.carb, category: 'delopskrifter' });
      if (day.veg && day.veg !== '-' && day.veg !== '(I retten)') newComponents.push({ dayDate: day.date, type: 'Veg', name: day.veg, category: 'delopskrifter' });
      if (day.biret && day.biret !== '-' && day.biret !== '(I retten)') newComponents.push({ dayDate: day.date, type: 'Biret', name: day.biret, category: getCategoryFromType('Biret', day.biret) });
    });

    setSelectedComponents(prev => {
      const filtered = prev.filter(p => !weekDays.some(wd => wd.date === p.dayDate));
      return [...filtered, ...newComponents];
    });
  };

  const ComponentCell = ({ day, type, name, className = "" }: { day: MealDay, type: SelectedComponent['type'], name: string, className?: string }) => {
    const active = isSelected(day.date, type);
    const disabled = !name || name === '-' || name === '(I retten)';
    
    return (
      <td 
        onClick={() => !disabled && toggleComponent(day.date, type, name)}
        className={`border-2 border-black px-2 py-1 text-[10px] cursor-pointer transition-all relative group overflow-hidden ${active ? 'bg-blue-600 text-white font-black' : 'hover:bg-slate-100'} ${disabled ? 'bg-slate-50 text-slate-300 cursor-not-allowed' : ''} ${className}`}
      >
        <div className="flex justify-between items-center gap-1">
          <span className="truncate">{name}</span>
          {!disabled && (
            <div className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-300 group-hover:text-blue-500'}`}>
              {active ? <CheckSquare size={12} /> : <Square size={12} />}
            </div>
          )}
        </div>
      </td>
    );
  };

  return (
    <div className="space-y-6 pb-40">
      <div className="bg-white p-6 shadow-xl rounded-2xl border-b-8 border-slate-900 no-print">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Vælg Menuplan</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(yearlyPlan2026).map(([key, info]) => (
                <button 
                  key={key} 
                  onClick={() => setSelectedMonth(key)} 
                  className={`px-4 py-2 rounded-xl font-black uppercase text-[10px] border-2 transition-all ${
                    selectedMonth === key ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {info.label}
                </button>
              ))}
              <button 
                onClick={selectAllInMonth}
                className="px-4 py-2 rounded-xl font-black uppercase text-[10px] border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                <Layers size={14} /> Vælg alle i {currentMonth.label}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border-2 border-slate-200 shadow-inner">
            <div className="text-right">
              <span className="block text-[10px] font-black uppercase text-slate-400">Markerede komponenter</span>
              <span className="text-3xl font-black text-blue-600 leading-none">{selectedComponents.length}</span>
            </div>
            <div className="flex gap-2">
               <button 
                disabled={selectedComponents.length === 0}
                onClick={() => onBatchGenerate?.(selectedComponents, { portions: '450', grams: '150' })}
                className="bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-6 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-3 shadow-lg transition-all active:scale-95"
               >
                 <Wand2 size={18} /> Hent Opskrifter
               </button>
               <button 
                onClick={() => setSelectedComponents([])}
                className="bg-white border-2 border-slate-200 text-slate-400 hover:text-red-600 p-4 rounded-2xl transition-all"
                title="Nulstil alle valg"
               >
                 <Trash2 size={24} />
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY BATCH PRINT BAR */}
      {selectedComponents.length > 0 && (
        <div className="no-print fixed bottom-10 left-1/2 -translate-x-1/2 z-[150] w-full max-w-2xl px-4 animate-in slide-in-from-bottom-8 duration-500">
           <div className="bg-blue-600 p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(37,99,235,0.4)] border-4 border-white flex items-center justify-between gap-6">
              <div className="flex items-center gap-4 pl-4">
                 <div className="bg-white/20 p-3 rounded-2xl text-white">
                    <Printer size={28} />
                 </div>
                 <div>
                    <h4 className="text-white font-black uppercase text-sm leading-none italic">Batch Print Produktion</h4>
                    <p className="text-blue-100 text-[9px] font-bold uppercase tracking-widest mt-1">{selectedComponents.length} MDS Kort i kø</p>
                 </div>
              </div>
              <button 
                onClick={() => onBatchGenerate?.(selectedComponents, { portions: '450', grams: '150' }, true)}
                className="bg-white text-blue-600 px-10 py-5 rounded-[1.5rem] font-black uppercase text-xs shadow-xl hover:bg-slate-50 transition-all active:scale-95 flex items-center gap-3"
              >
                Start Print-Kø <CheckCircle size={18} />
              </button>
           </div>
        </div>
      )}

      <div className="printable-area bg-white shadow-2xl border-4 border-black mx-auto p-4 w-full overflow-x-auto rounded-xl">
        <table className="w-full border-collapse border-2 border-black min-w-[1100px] table-fixed">
          <thead>
            <tr className="bg-slate-900 text-white text-[11px] font-black uppercase h-12 text-center">
              <th className="border-2 border-black w-28">Dato</th>
              <th className="border-2 border-black w-12">#</th>
              <th className="border-2 border-black text-left px-2 w-[25%]">Hovedret</th>
              <th className="border-2 border-black text-left px-2">Sauce (100g)</th>
              <th className="border-2 border-black text-left px-2">Kulhydrat (100g)</th>
              <th className="border-2 border-black text-left px-2">Tilbehør (30-50g)</th>
              <th className="border-2 border-black text-left px-2">Biret (175g)</th>
              <th className="border-2 border-black w-24 no-print">Værktøj</th>
            </tr>
          </thead>
          <tbody>
            {getWeekSlices(currentMonth.data).map((startIndex, i, slices) => {
              const nextIndex = slices[i + 1];
              const weekData = currentMonth.data.slice(startIndex, nextIndex);
              if (weekData.length === 0) return null;
              
              return (
                <React.Fragment key={startIndex}>
                  <tr className="bg-slate-200 text-slate-900 font-black text-[12px] uppercase tracking-widest h-10 border-2 border-black">
                    <td colSpan={7} className="px-4">UGE {i + 1}: {weekData[0].date} - {weekData[weekData.length-1].date}</td>
                    <td className="no-print p-0">
                      <button 
                        onClick={() => selectWeek(startIndex, nextIndex)}
                        className="w-full h-full bg-blue-100 hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2 text-[10px] font-black uppercase"
                      >
                        <ListPlus size={14} /> Vælg Uge
                      </button>
                    </td>
                  </tr>
                  {weekData.map((day, idx) => (
                    <tr key={idx} className={`h-14 border-b-2 border-black ${day.isHoliday ? 'bg-yellow-50' : ''}`}>
                      <td className="border-2 border-black text-center font-black text-[11px] bg-slate-50">
                        {day.date.split(' (')[0]}
                        <span className="block text-[9px] opacity-50 italic">{day.date.match(/\((.*?)\)/)?.[1]}</span>
                      </td>
                      <td className="border-2 border-black text-center text-xl">{day.icon}</td>
                      <ComponentCell day={day} type="Dish" name={`${day.dish} (${day.protein})`} className="font-bold text-[12px]" />
                      <ComponentCell day={day} type="Sauce" name={day.sauce} className="italic" />
                      <ComponentCell day={day} type="Carb" name={day.carb} />
                      <ComponentCell day={day} type="Veg" name={day.veg} />
                      <ComponentCell day={day} type="Biret" name={day.biret} className="text-red-900 font-bold" />
                      <td className="border-2 border-black no-print p-1">
                         <button 
                          onClick={() => {
                            const components: SelectedComponent[] = [
                              { dayDate: day.date, type: 'Dish', name: day.dish, category: 'hovedretter' },
                              { dayDate: day.date, type: 'Sauce', name: day.sauce, category: 'delopskrifter' },
                              { dayDate: day.date, type: 'Carb', name: day.carb, category: 'delopskrifter' },
                              { dayDate: day.date, type: 'Veg', name: day.veg, category: 'delopskrifter' },
                              { dayDate: day.date, type: 'Biret', name: day.biret, category: getCategoryFromType('Biret', day.biret) },
                            ].filter(c => c.name && c.name !== '-' && c.name !== '(I retten)') as SelectedComponent[];
                            setSelectedComponents(prev => [...prev, ...components]);
                          }}
                          className="w-full h-full text-[9px] font-black uppercase text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-100 rounded"
                         >
                           Vælg dag
                         </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper for finding week boundaries
function getWeekSlices(data: MealDay[]) {
    const slices: number[] = [0];
    data.forEach((day, index) => {
        if (day.date.toLowerCase().includes('(man)') && index > 0) {
            slices.push(index);
        }
    });
    return slices;
}

export default MealPlanDisplay;
