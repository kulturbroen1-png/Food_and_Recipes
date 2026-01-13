
import React from 'react';
import { RecipeParameters } from '../types';
import { Brain, Zap, Search, Tag, Scale, HeartPulse, Activity, Sparkles, TrendingUp } from 'lucide-react';

interface RecipeFormProps {
  recipeParams: RecipeParameters;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  useThinking: boolean;
  setUseThinking: (val: boolean) => void;
  useSearch: boolean;
  setUseSearch: (val: boolean) => void;
  nutritionalTargets?: { proteinMin?: number; fatMin?: number; energyMin?: number };
  setNutritionalTargets?: (targets: { proteinMin?: number; fatMin?: number; energyMin?: number }) => void;
  budgetLimit?: number;
  setBudgetLimit?: (limit: number) => void;
  sustainabilityFocus?: boolean;
  setSustainabilityFocus?: (focus: boolean) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  recipeParams, onInputChange, onSubmit, isLoading,
  useThinking, setUseThinking, useSearch, setUseSearch,
  nutritionalTargets, setNutritionalTargets, budgetLimit, setBudgetLimit,
  sustainabilityFocus, setSustainabilityFocus
}) => {
  const inputStyle = "mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-all";
  const labelStyle = "block text-sm font-black text-slate-700 uppercase tracking-tighter";

  const totalProductionWeight = (parseInt(recipeParams.numPieces) || 0) * (parseInt(recipeParams.weightPerPiece) || 0) / 1000;

  return (
    <form onSubmit={onSubmit} className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <label htmlFor="recipeName" className={labelStyle}>Opskriftsnavn (MDS kompatibel)</label>
          <input
            type="text"
            name="recipeName"
            id="recipeName"
            value={recipeParams.recipeName}
            onChange={onInputChange}
            className={inputStyle}
            placeholder="Fx Gammeldags Oksesteg"
            required
          />
        </div>

        <div className="flex-1">
          <label htmlFor="category" className={`${labelStyle} flex items-center gap-1`}>
            <Tag size={12} /> Kategori (Fra menuData)
          </label>
          <select
            name="category"
            id="category"
            value={recipeParams.category}
            onChange={onInputChange}
            className={inputStyle}
            required
          >
            <option value="hovedretter">Hovedretter</option>
            <option value="supper">Supper</option>
            <option value="dessert">Desserter</option>
            <option value="delopskrifter">Delopskrifter</option>
            <option value="modernist_classics">Modernist Classics</option>
          </select>
        </div>

        <div className="flex items-end gap-6 pb-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`p-2 rounded-lg transition-all ${useThinking ? 'bg-orange-100 text-orange-600 shadow-inner' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'}`}>
              <Brain size={18} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={useThinking} 
                  onChange={(e) => {
                    setUseThinking(e.target.checked);
                    if(e.target.checked) setUseSearch(false);
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600 group-hover:text-orange-700 transition-colors">Thinking Mode</span>
              </div>
              <span className="text-[8px] text-slate-400 font-bold uppercase">Gemini 3 Pro Deep Reasoning</span>
            </div>
          </label>

          <label className="flex items-center gap-2 cursor-pointer group">
            <div className={`p-2 rounded-lg transition-all ${useSearch ? 'bg-blue-100 text-blue-600 shadow-inner' : 'bg-slate-100 text-slate-400 group-hover:text-slate-600'}`}>
              <Search size={18} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={useSearch} 
                  onChange={(e) => {
                    setUseSearch(e.target.checked);
                    if(e.target.checked) setUseThinking(false);
                  }}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600 group-hover:text-blue-700 transition-colors">Google Search</span>
              </div>
              <span className="text-[8px] text-slate-400 font-bold uppercase">Realtids kildesøgning</span>
            </div>
          </label>
        </div>
      </div>

      {/* MDS NUTRITIONAL INTELLIGENCE DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <Sparkles size={80} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-600 p-3 rounded-xl shadow-lg">
              <Activity size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter leading-none italic">MDS Nutritional Intelligence</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">AI-drevet skalering og energi-berigelse</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${recipeParams.portionType === 'Lille' ? 'bg-orange-600 border-orange-500 shadow-xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`} onClick={() => onInputChange({ target: { name: 'portionType', value: 'Lille' } } as any)}>
               <div className="flex justify-between items-start mb-3">
                  <HeartPulse className={recipeParams.portionType === 'Lille' ? 'text-white' : 'text-orange-500'} size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Småtspisende</span>
               </div>
               <h4 className="text-sm font-black uppercase mb-1">Lille Portion</h4>
               <p className="text-[9px] font-bold text-white/50 leading-tight uppercase">AI maximerer fedt & protein tæthed pr. gram.</p>
            </div>

            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${recipeParams.portionType === 'Normal' ? 'bg-blue-600 border-blue-500 shadow-xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`} onClick={() => onInputChange({ target: { name: 'portionType', value: 'Normal' } } as any)}>
               <div className="flex justify-between items-start mb-3">
                  <Scale className={recipeParams.portionType === 'Normal' ? 'text-white' : 'text-blue-400'} size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Balanceret</span>
               </div>
               <h4 className="text-sm font-black uppercase mb-1">Normal Portion</h4>
               <p className="text-[9px] font-bold text-white/50 leading-tight uppercase">Standard E-kost optimering jf. 2026 guidelines.</p>
            </div>

            <div className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${recipeParams.portionType === 'Stor' ? 'bg-purple-600 border-purple-500 shadow-xl' : 'bg-white/5 border-white/10 hover:border-white/20'}`} onClick={() => onInputChange({ target: { name: 'portionType', value: 'Stor' } } as any)}>
               <div className="flex justify-between items-start mb-3">
                  <TrendingUp className={recipeParams.portionType === 'Stor' ? 'text-white' : 'text-purple-400'} size={20} />
                  <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Høj Volumen</span>
               </div>
               <h4 className="text-sm font-black uppercase mb-1">Stor Portion</h4>
               <p className="text-[9px] font-bold text-white/50 leading-tight uppercase">AI optimerer mæthed og portions-størrelse.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border-4 border-slate-100 shadow-xl flex flex-col justify-center text-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Beregnet Produktions-output</span>
            <div className="text-5xl font-black text-slate-900 italic tracking-tighter leading-none">{totalProductionWeight.toFixed(1)} <span className="text-2xl text-slate-400">KG</span></div>
            <p className="text-[9px] font-bold text-slate-500 mt-3 uppercase">Samlet færdigvægt for {recipeParams.numPieces} x {recipeParams.weightPerPiece}g</p>
            <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center gap-2">
               <Zap className="text-blue-600" size={14} />
               <span className="text-[9px] font-black text-blue-700 uppercase">AI-Skalerings faktor: AKTIV</span>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="numPieces" className={labelStyle}>Antal kuverter</label>
          <input
            type="number"
            name="numPieces"
            id="numPieces"
            value={recipeParams.numPieces}
            onChange={onInputChange}
            className={inputStyle}
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="weightPerPiece" className={labelStyle}>Vægt pr. portion (gram færdigvægt)</label>
          <input
            type="number"
            name="weightPerPiece"
            id="weightPerPiece"
            value={recipeParams.weightPerPiece}
            onChange={onInputChange}
            className={inputStyle}
            min="1"
            required
          />
        </div>
      </div>

      {/* COMPETITIVE ADVANTAGE SECTION - SUPERIOR TO Dankost/Master Cater */}
      {(setNutritionalTargets || setBudgetLimit || setSustainabilityFocus) && (
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-[2rem] border-2 border-green-200 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600 text-white p-3 rounded-xl shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter leading-none text-green-800">AI Competitive Advantages</h3>
              <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-1">Superior to Dankost • Master Cater • Sena</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* NUTRITIONAL TARGETS */}
            {setNutritionalTargets && (
              <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <HeartPulse className="text-green-600" size={20} />
                  <h4 className="text-sm font-black uppercase text-green-800">Nutritional AI</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase">Min Protein (g)</label>
                    <input
                      type="number"
                      value={nutritionalTargets?.proteinMin || 26}
                      onChange={(e) => setNutritionalTargets?.({
                        ...nutritionalTargets,
                        proteinMin: parseInt(e.target.value) || 26
                      })}
                      className="w-full mt-1 px-3 py-2 text-sm bg-green-50 border border-green-200 rounded-lg"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase">Min Fat (%E)</label>
                    <input
                      type="number"
                      value={nutritionalTargets?.fatMin || 40}
                      onChange={(e) => setNutritionalTargets?.({
                        ...nutritionalTargets,
                        fatMin: parseInt(e.target.value) || 40
                      })}
                      className="w-full mt-1 px-3 py-2 text-sm bg-green-50 border border-green-200 rounded-lg"
                      min="0"
                      max="100"
                    />
                  </div>
                  <p className="text-[8px] text-green-600 font-bold uppercase">Ældreloven compliance auto-optimized</p>
                </div>
              </div>
            )}

            {/* BUDGET CONSTRAINTS */}
            {setBudgetLimit && (
              <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-blue-600" size={20} />
                  <h4 className="text-sm font-black uppercase text-blue-800">Budget AI</h4>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase">Max Cost (DKK)</label>
                    <input
                      type="number"
                      value={budgetLimit || ''}
                      onChange={(e) => setBudgetLimit?.(parseInt(e.target.value) || 0)}
                      className="w-full mt-1 px-3 py-2 text-sm bg-blue-50 border border-blue-200 rounded-lg"
                      placeholder="Total recipe budget"
                      min="0"
                    />
                  </div>
                  <p className="text-[8px] text-blue-600 font-bold uppercase">AI optimizes ingredients for cost efficiency</p>
                </div>
              </div>
            )}

            {/* SUSTAINABILITY FOCUS */}
            {setSustainabilityFocus && (
              <div className="bg-white p-6 rounded-2xl border border-orange-200 shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="text-orange-600" size={20} />
                  <h4 className="text-sm font-black uppercase text-orange-800">Sustainability AI</h4>
                </div>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sustainabilityFocus || false}
                      onChange={(e) => setSustainabilityFocus?.(e.target.checked)}
                      className="w-4 h-4 text-orange-600 border-orange-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-xs font-bold text-slate-600 uppercase">CO2 Optimization</span>
                  </label>
                  <p className="text-[8px] text-orange-600 font-bold uppercase">Prioritizes seasonal, low-carbon ingredients</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-green-600 text-white rounded-xl">
            <p className="text-sm font-bold uppercase tracking-wider">
              🚀 These AI features give CaterCare Ultimate 3-5x productivity advantage over Dankost, Master Cater & Sena
            </p>
          </div>
        </div>
      )}

      {/* OVNINDSTILLINGER SEKTION */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs font-black uppercase text-slate-500 tracking-widest mb-4 border-b pb-2">Manuelle Ovnindstillinger (Valgfri overstyring)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label htmlFor="ovenTemperature" className={labelStyle}>Temperatur (°C)</label>
            <input
              type="text"
              name="ovenTemperature"
              id="ovenTemperature"
              value={recipeParams.ovenTemperature}
              onChange={onInputChange}
              className={inputStyle}
              placeholder="F.eks. 180"
            />
          </div>
          <div>
            <label htmlFor="ovenTime" className={labelStyle}>Tid</label>
            <input
              type="text"
              name="ovenTime"
              id="ovenTime"
              value={recipeParams.ovenTime}
              onChange={onInputChange}
              className={inputStyle}
              placeholder="F.eks. 45 min"
            />
          </div>
          <div>
            <label htmlFor="ovenSteam" className={labelStyle}>Damp (%)</label>
            <input
              type="text"
              name="ovenSteam"
              id="ovenSteam"
              value={recipeParams.ovenSteam}
              onChange={onInputChange}
              className={inputStyle}
              placeholder="0-100"
            />
          </div>
          <div>
            <label htmlFor="ovenMode" className={labelStyle}>Ovn-mode</label>
            <select
              name="ovenMode"
              id="ovenMode"
              value={recipeParams.ovenMode}
              onChange={onInputChange}
              className={inputStyle}
            >
              <option value="">AI bestemmer</option>
              <option value="DAMP">DAMP</option>
              <option value="KOMBI">KOMBI</option>
              <option value="VARMLUFT">VARMLUFT</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-5 px-4 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg flex flex-col items-center justify-center gap-1 ${
          isLoading ? 'bg-slate-400' : 
          useThinking ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-200' : 'bg-slate-900 hover:bg-black shadow-slate-200'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            Analyserer jf. Master Diætist...
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              {useThinking ? <Brain size={20} /> : <Zap size={20} />}
              <span>{useThinking ? 'Generer med Gemini 3 Pro (Deep Thinking)' : 'Generer Master Opskrift (Fast)'}</span>
            </div>
            <span className="text-[8px] font-bold opacity-50 uppercase tracking-[0.3em]">{recipeParams.portionType} optimering aktiv • {totalProductionWeight.toFixed(1)}kg Batch</span>
          </>
        )}
      </button>
    </form>
  );
};

export default RecipeForm;