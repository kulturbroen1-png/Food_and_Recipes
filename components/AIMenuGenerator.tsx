
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
      <div className="space-y-8 pb-40 max-w-7xl mx-auto px-4">

         {/* SIMPLE HEADER */}
         <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-slate-200">
            <div className="flex items-start gap-6">
               <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-2xl shadow-md">
                  <Wand2 size={32} className="text-white" />
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                     <Sparkles size={16} className="text-orange-500" />
                     <span className="text-sm font-semibold text-orange-600">AI Menu Generator</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                     Opret Ugeplan Automatisk
                  </h1>
                  <p className="text-lg text-slate-600">
                     Generér en komplet ugeplan baseret på sæson, E-kost krav og dine ønsker.
                  </p>
               </div>
            </div>

            {/* FORM */}
            <div className="mt-8 space-y-6 bg-slate-50 rounded-2xl p-6">
               <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3" htmlFor="month-select">
                     Vælg Måned
                  </label>
                  <select
                     id="month-select"
                     aria-label="Vælg måned for menuplan"
                     value={month}
                     onChange={(e) => setMonth(e.target.value)}
                     className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl text-lg font-medium text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                  >
                     {months.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
               </div>

               <div>
                  <label className="block text-base font-semibold text-slate-700 mb-3">
                     Specialønsker og Præferencer
                  </label>
                  <textarea
                     value={preferences}
                     onChange={(e) => setPreferences(e.target.value)}
                     className="w-full bg-white border-2 border-slate-300 p-4 rounded-xl text-base text-slate-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none h-28 resize-none"
                     placeholder="F.eks: Mere fisk, ingen svinekød, sommer-tema..."
                  />
               </div>

               <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white py-5 px-8 rounded-xl font-bold text-lg shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed flex items-center justify-center gap-3"
               >
                  {isLoading ? (
                     <>
                        <Loader2 className="animate-spin" size={24} />
                        <span>Genererer ugeplan...</span>
                     </>
                  ) : (
                     <>
                        <Zap size={24} />
                        <span>Generer Ugeplan</span>
                     </>
                  )}
               </button>
            </div>
         </div>

         {/* ERROR MESSAGE */}
         {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
               <div className="flex items-start gap-3">
                  <div className="text-red-500 font-bold text-lg">⚠️</div>
                  <div>
                     <h3 className="font-bold text-red-900 text-lg mb-1">Kunne ikke generere plan</h3>
                     <p className="text-red-700">{error}</p>
                  </div>
               </div>
            </div>
         )}

         {/* GENERATED CONTENT */}
         {generatedPlan && (
            <div className="space-y-6">

               {/* HEADER */}
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-md border-2 border-slate-200">
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 mb-1">Ugeplan Forslag</h2>
                     <p className="text-sm text-slate-600">
                        Sæson: <span className="font-semibold text-slate-900">{month}</span> • E-kost valideret • Økologisk
                     </p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                     <button
                        onClick={() => window.print()}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all"
                     >
                        <Printer size={18} />
                        <span>Print</span>
                     </button>
                     <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-md transition-all">
                        <Save size={18} />
                        <span>Gem</span>
                     </button>
                  </div>
               </div>

               {/* DAYS GRID */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {generatedPlan.map((day, idx) => (
                     <div
                        key={idx}
                        className="bg-white border-2 border-slate-200 rounded-2xl p-6 shadow-md hover:border-orange-400 hover:shadow-lg transition-all group"
                     >
                        {day.isHoliday && (
                           <div className="inline-block bg-yellow-400 text-yellow-900 px-3 py-1 rounded-lg text-xs font-bold mb-3">
                              Helligdag
                           </div>
                        )}

                        <div className="flex items-start justify-between mb-4">
                           <span className="text-4xl">{day.icon}</span>
                           <span className="text-xs font-semibold text-slate-500 px-2 py-1 bg-slate-100 rounded-md">
                              {day.type}
                           </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                           {day.dish}
                        </h3>

                        <div className="space-y-3 mb-4">
                           <InfoLine label="Protein" val={day.protein} />
                           <InfoLine label="Sauce" val={day.sauce} />
                           <InfoLine label="Kulhydrat" val={day.carb} />
                           <InfoLine label="Grønt" val={day.veg} />
                        </div>

                        <div className="pt-4 border-t-2 border-slate-100 mb-4">
                           <span className="text-xs font-semibold text-slate-500 block mb-1">Biret / Dessert</span>
                           <p className="text-sm font-semibold text-blue-600">{day.biret}</p>
                        </div>

                        <div className="text-sm font-semibold text-slate-700 bg-slate-50 -mx-6 -mb-6 px-6 py-3 rounded-b-2xl border-t-2 border-slate-100">
                           {day.date}
                        </div>
                     </div>
                  ))}
               </div>

               {/* SUMMARY CARDS */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 shadow-md">
                     <div className="flex items-center gap-4">
                        <div className="bg-green-600 p-4 rounded-xl shadow-md">
                           <Leaf size={28} className="text-white" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-green-900 mb-1">Miljøprofil</h4>
                           <p className="text-sm font-medium text-green-700">
                              CO2 reduceret med <span className="font-bold">18%</span> via sæson-råvarer
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 shadow-md">
                     <div className="flex items-center gap-4">
                        <div className="bg-blue-600 p-4 rounded-xl shadow-md">
                           <HeartPulse size={28} className="text-white" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-blue-900 mb-1">Sundhedsaudit</h4>
                           <p className="text-sm font-medium text-blue-700">
                              Gennemsnit <span className="font-bold">52 E%</span> fedt på tværs af ugen
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 shadow-md">
                     <div className="flex items-center gap-4">
                        <div className="bg-orange-600 p-4 rounded-xl shadow-md">
                           <Zap size={28} className="text-white" />
                        </div>
                        <div>
                           <h4 className="text-lg font-bold text-orange-900 mb-1">Produktion</h4>
                           <p className="text-sm font-medium text-orange-700">
                              Alle <span className="font-bold">7 retter</span> klar til MDS opskrifter
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* PLACEHOLDER */}
         {!generatedPlan && !isLoading && (
            <div className="py-20 text-center">
               <div className="text-8xl mb-6 opacity-30 grayscale">🍽️</div>
               <h3 className="text-2xl font-bold text-slate-400 mb-2">Klar til Generering</h3>
               <p className="text-base text-slate-400">
                  Vælg måned og tryk på knappen for at starte
               </p>
            </div>
         )}

         {/* LOADING SKELETON */}
         {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
               {[...Array(7)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 h-[380px] border-2 border-slate-100 shadow-md">
                     <div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div>
                     <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                     <div className="space-y-2 mb-4">
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                     </div>
                     <div className="h-10 bg-slate-200 rounded mt-auto"></div>
                  </div>
               ))}
            </div>
         )}

      </div>
   );
};

const InfoLine = ({ label, val }: { label: string, val: string }) => (
   <div className="flex justify-between items-center py-1">
      <span className="text-sm font-medium text-slate-600">{label}:</span>
      <span className="text-sm font-semibold text-slate-900">{val}</span>
   </div>
);

export default AIMenuGenerator;
