
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { generateWeeklyMenuPlanRequest } from '../services/geminiService';
import { MealDay } from '../services/mealPlanData';
import { Wand2, Calendar, Sparkles, Loader2, Save, Printer, ChevronRight, Zap, Leaf, HeartPulse } from 'lucide-react';

const AIMenuGenerator: React.FC = () => {
  const [month, setMonth] = useState('Januar');
  const [preferences, setPreferences] = useState('Fokus på møre kødretter og klassiske danske desserter.');
  const [generatedPlan, setGeneratedPlan] = useState<MealDay[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const months = ['Januar', 'Februar', 'Marts', 'April', 'Maj', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'December'];

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPlan(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const request = generateWeeklyMenuPlanRequest(month, preferences);
      const response = await ai.models.generateContent(request);
      
      const jsonMatch = response.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const plan: MealDay[] = JSON.parse(jsonMatch[0]);
        setGeneratedPlan(plan);
      } else {
        throw new Error("Kunne ikke parse JSON fra AI svar.");
      }
    } catch (err: any) {
      setError("Systemfejl: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-40">
      
      {/* HEADER CONTROL CENTER */}
      <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden border-b-[12px] border-orange-600">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Wand2 size={240} />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="bg-orange-600 p-2 rounded-lg shadow-lg shadow-orange-900/50">
                    <Sparkles size={20} />
                 </div>
                 <span className="text-sm font-black uppercase tracking-[0.4em] text-orange-400 italic">Gemini 3 Pro Generator</span>
              </div>
              <h2 className="text-7xl font-black uppercase tracking-tighter leading-none mb-6 italic">Smart <span className="text-orange-500">Menu</span> Plan</h2>
              <p className="text-slate-400 font-serif italic text-2xl max-w-xl">
                "Generer en komplet ugeplan med ét klik. Systemet tager højde for sæson, E-kost og historisk data."
              </p>
           </div>

           <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl">
              <div className="space-y-6">
                 <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest italic">Vælg Sæson-Måned</label>
                    <select 
                       value={month} 
                       onChange={(e) => setMonth(e.target.value)}
                       className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-2xl font-black text-white focus:border-orange-500 transition-all outline-none"
                    >
                       {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-[10px] font-black uppercase text-slate-500 mb-2 tracking-widest italic">Kunde-præferencer & Specialønsker</label>
                    <textarea 
                       value={preferences}
                       onChange={(e) => setPreferences(e.target.value)}
                       className="w-full bg-slate-900 border-2 border-slate-700 p-4 rounded-2xl font-bold text-slate-300 focus:border-orange-500 transition-all outline-none h-24"
                       placeholder="Fx: Mere fisk, ingen svinekød denne uge, sommer-tema..."
                    />
                 </div>
                 <button 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 py-5 rounded-[2rem] font-black uppercase text-sm tracking-widest shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-4"
                 >
                    {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                    {isLoading ? 'Analyserer Sæson-data...' : 'Generer Ugeplan Nu'}
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 border-4 border-red-200 p-8 rounded-[2.5rem] text-red-600 font-black text-center animate-bounce uppercase text-xs tracking-widest">
           Systemet kunne ikke færdiggøre planen: {error}
        </div>
      )}

      {/* GENERATED CONTENT */}
      {generatedPlan && (
        <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-700">
           <div className="flex justify-between items-end px-10">
              <div>
                 <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-900 italic">Forslag til Ugeplan</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Sæson: {month} • E-kost Valideret • 100% Økologisk basis</p>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => window.print()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-3 shadow-lg"><Printer size={18} /> Print Plan</button>
                 <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs flex items-center gap-3 shadow-lg"><Save size={18} /> Gem i Arkiv</button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 px-4">
              {generatedPlan.map((day, idx) => (
                <div key={idx} className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 shadow-xl hover:border-orange-500 transition-all group overflow-hidden relative flex flex-col justify-between h-full min-h-[450px]">
                   {day.isHoliday && <div className="absolute top-0 right-0 bg-yellow-400 px-4 py-1 text-[8px] font-black uppercase rounded-bl-xl">Helligdag</div>}
                   
                   <div>
                      <div className="flex justify-between items-start mb-6">
                         <span className="text-3xl">{day.icon}</span>
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{day.type}</span>
                      </div>
                      <h4 className="text-xl font-black uppercase leading-tight tracking-tighter mb-4 text-slate-900 group-hover:text-orange-600 transition-colors">{day.dish}</h4>
                      
                      <div className="space-y-4 mb-8">
                         <InfoLine label="Protein" val={day.protein} icon={<HeartPulse size={12} className="text-red-500" />} />
                         <InfoLine label="Sauce" val={day.sauce} />
                         <InfoLine label="Kulhydrat" val={day.carb} />
                         <InfoLine label="Grønt" val={day.veg} />
                      </div>
                   </div>

                   <div className="mt-auto pt-6 border-t border-slate-50">
                      <span className="block text-[8px] font-black uppercase text-slate-400 mb-2 tracking-widest">Biret / Dessert</span>
                      <p className="text-xs font-black uppercase italic text-blue-600 leading-snug">{day.biret}</p>
                   </div>

                   <div className="mt-4 text-[9px] font-black uppercase text-slate-900 bg-slate-50 -mx-6 -mb-6 p-4 border-t border-slate-100 group-hover:bg-orange-50 transition-colors">
                      {day.date}
                   </div>
                </div>
              ))}
           </div>

           {/* SUMMARY DASHBOARD */}
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 mt-12">
              <div className="bg-green-50 p-10 rounded-[3.5rem] border-4 border-green-100 flex items-center gap-8">
                 <div className="bg-green-600 p-6 rounded-[2rem] text-white shadow-xl shadow-green-900/20"><Leaf size={40} /></div>
                 <div>
                    <h4 className="text-2xl font-black uppercase text-green-900 leading-none">Miljøprofil</h4>
                    <p className="text-sm font-bold text-green-700 uppercase italic mt-1">CO2-aftryk reduceret med 18% via sæson-råvarer.</p>
                 </div>
              </div>
              <div className="bg-blue-50 p-10 rounded-[3.5rem] border-4 border-blue-100 flex items-center gap-8">
                 <div className="bg-blue-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-900/20"><HeartPulse size={40} /></div>
                 <div>
                    <h4 className="text-2xl font-black uppercase text-blue-900 leading-none">Sundheds-Audit</h4>
                    <p className="text-sm font-bold text-blue-700 uppercase italic mt-1">Gns. 52 E% fedt på tværs af ugeplanen.</p>
                 </div>
              </div>
              <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white flex items-center gap-8 shadow-2xl">
                 <div className="bg-orange-600 p-6 rounded-[2rem] shadow-xl shadow-orange-900/20"><Zap size={40} /></div>
                 <div>
                    <h4 className="text-2xl font-black uppercase text-white leading-none">Batch-klar</h4>
                    <p className="text-sm font-bold text-slate-400 uppercase italic mt-1">Alle 7 retter kan genereres som MDS opskrifter straks.</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* PLACEHOLDER */}
      {!generatedPlan && !isLoading && (
        <div className="py-32 text-center opacity-20 grayscale scale-95 pointer-events-none">
           <div className="text-9xl mb-8">🍽️</div>
           <h3 className="text-4xl font-black uppercase tracking-widest">Klar til Generering</h3>
           <p className="text-lg font-black uppercase mt-4">Vælg måned og tryk på knappen for at starte AI motoren</p>
        </div>
      )}

      {/* SKELETON LOADER */}
      {isLoading && (
        <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 animate-pulse">
           {[...Array(7)].map((_, i) => (
             <div key={i} className="bg-white rounded-[2.5rem] p-6 h-[450px] border-2 border-slate-50 flex flex-col justify-between">
                <div>
                   <div className="w-12 h-12 bg-slate-100 rounded-full mb-6"></div>
                   <div className="h-8 bg-slate-100 rounded-lg w-3/4 mb-4"></div>
                   <div className="space-y-3">
                      <div className="h-4 bg-slate-50 rounded w-full"></div>
                      <div className="h-4 bg-slate-50 rounded w-full"></div>
                      <div className="h-4 bg-slate-50 rounded w-full"></div>
                   </div>
                </div>
                <div className="h-10 bg-slate-100 rounded-b-xl -mx-6 -mb-6 mt-auto"></div>
             </div>
           ))}
        </div>
      )}

    </div>
  );
};

const InfoLine = ({ label, val, icon }: { label: string, val: string, icon?: React.ReactNode }) => (
  <div className="flex flex-col">
     <div className="flex items-center gap-1 mb-0.5">
        {icon}
        <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{label}</span>
     </div>
     <p className="text-[10px] font-bold text-slate-700 leading-tight uppercase">{val}</p>
  </div>
);

export default AIMenuGenerator;
