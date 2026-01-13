
import React, { useState, useEffect, useMemo } from 'react';
import { RecipeData, Ingredient, RecipeNutrition } from '../types';
import { saveUserRecipe } from '../services/recipeStorage';
import { exportComponentToPDF } from '../services/pdfService';
import { getHorkramPrice } from '../services/pricingService';
import { updateRecipeWithCascade, subscribeToDataChanges, dataRelationshipStore } from '../services/dataRelationshipService';
import { GoogleGenAI, Type } from "@google/genai";
import IngredientList from './IngredientList';
import { Edit2, Database, Scale, Tag, FileText, Clock, Thermometer, FileDown, Save, Calculator, Check, X, RefreshCw, Activity, Zap, Layers, Wand2, Sparkles, ShieldAlert } from 'lucide-react';

interface RecipeDisplayProps {
  initialRecipe: RecipeData;
  onRecipeUpdate?: (newRecipe: RecipeData) => void;
}

type OptimizationMode = 'calories' | 'allergens' | null;

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ initialRecipe, onRecipeUpdate }) => {
  const [r, setR] = useState<RecipeData>(initialRecipe);
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // AI Optimization State
  const [optMode, setOptMode] = useState<OptimizationMode>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedIngredients, setOptimizedIngredients] = useState<Ingredient[] | null>(null);

  // Sub-recipe editing state
  const [newSubRecipe, setNewSubRecipe] = useState({ recipeNumber: '', quantity: 0, unit: 'kg', name: '' });

  // Subscribe to data relationship changes
  useEffect(() => {
    const unsubscribe = subscribeToDataChanges(() => {
      // Refresh data when relationships change - get fresh data from localStorage
      const allRecipes = JSON.parse(localStorage.getItem('breelte_user_recipes') || '[]');
      const updatedRecipe = allRecipes.find((recipe: RecipeData) => recipe.recipeNumber === r.recipeNumber);
      if (updatedRecipe && JSON.stringify(updatedRecipe) !== JSON.stringify(r)) {
        console.log('[RELATIONSHIP] Recipe updated via cascade:', updatedRecipe.recipeName);
        setR(updatedRecipe);
        onRecipeUpdate?.(updatedRecipe);
      }
    });

    return unsubscribe;
  }, [r.recipeNumber, onRecipeUpdate]);

  useEffect(() => {
    setR(initialRecipe);
    setOptimizedIngredients(null);
    setOptMode(null);
  }, [initialRecipe]);

  const recipeId = `recipe-${r.recipeName.replace(/\s+/g, '-').toLowerCase()}`;

  const totalOutputKg = useMemo(() => {
    const portions = parseInt(r.yield?.portions || "0");
    const weight = parseInt(r.yield?.finishedWeightPerPortion || "0");
    return ((portions * weight) / 1000).toFixed(1);
  }, [r]);

  const handleOptimize = async (mode: OptimizationMode) => {
    if (!mode) return;
    setIsOptimizing(true);
    setOptMode(mode);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        🔐 MDS PRODUKTIONS-OPTIMERING: ${mode.toUpperCase()}
        Giv et forslag til en optimeret ingrediensliste for opskriften "${r.recipeName}".
        
        NUVÆRENDE INGREDIENSER: ${JSON.stringify(r.ingredients)}
        MÅL: ${mode === 'calories' ? 'Reducer fedt/kalorier m. 20% ved at justere smør/fløde mængder, men bevar den synkevenlige MDS-tekstur.' :
          'Identificer og erstat/fjern alle laktose- eller glutenholdige ingredienser med præcise MDS-godkendte alternativer.'
        }
        
        KRAV:
        1. Juster "quantity" (netto) og "grossQuantity" (brutto).
        2. Behold portionstallet på ${r.yield?.portions}.
        3. Returner KUN et JSON objekt med en "ingredients" array.
      `;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    quantity: { type: Type.NUMBER },
                    grossQuantity: { type: Type.NUMBER },
                    wastePercentage: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      });

      const parsed = JSON.parse(result.text);
      setOptimizedIngredients(parsed.ingredients);
    } catch (err) {
      console.error("AI Optimization failed:", err);
      alert("Kunne ikke optimere opskriften via AI.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimization = () => {
    if (optimizedIngredients) {
      setR({ ...r, ingredients: optimizedIngredients });
      setOptimizedIngredients(null);
      setOptMode(null);
      alert("Optimering anvendt på produktionskortet!");
    }
  };

  return (
    <div id={recipeId} className="bg-white min-h-[297mm] w-[210mm] mx-auto p-10 text-slate-900 shadow-2xl printable-area relative font-sans border border-slate-300 mb-20">

      {/* Toolbar (No-print) */}
      <div className="no-print absolute -left-16 top-0 flex flex-col gap-3">
        <button title="Rediger" onClick={() => setIsEditing(!isEditing)} className="p-3 bg-white border rounded-full shadow-md hover:bg-slate-50">
          <Edit2 size={18} />
        </button>
        <button title="Eksporter til PDF" onClick={async () => { setIsExporting(true); await exportComponentToPDF(recipeId, r.recipeName); setIsExporting(false); }} disabled={isExporting} className="p-3 bg-slate-900 text-white rounded-full shadow-md hover:bg-black">
          <FileDown size={18} />
        </button>
        <button title="Gem ændringer" onClick={() => { updateRecipeWithCascade(r); alert("Gemt med relations-opdatering!"); }} className="p-3 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700">
          <Save size={18} />
        </button>
      </div>

      {/* AI OPTIMIZATION PANEL (No-print) */}
      <div className="no-print mb-8 bg-blue-50 border-2 border-blue-100 p-6 rounded-3xl shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Sparkles size={100} /></div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg"><Wand2 size={20} /></div>
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-900 leading-none">MDS Smart-Skalering</h3>
              <p className="text-[10px] font-bold text-blue-500 uppercase mt-1">AI-drevet diæt-optimering</p>
            </div>
          </div>
          {optMode && (
            <button onClick={() => { setOptMode(null); setOptimizedIngredients(null); }} className="text-slate-400 hover:text-red-600 transition-colors">
              <X size={18} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleOptimize('calories')}
            disabled={isOptimizing}
            className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all flex items-center gap-2 border-2 ${optMode === 'calories' ? 'bg-blue-600 text-white border-blue-700 shadow-md' : 'bg-white text-slate-500 border-blue-100 hover:border-blue-300'}`}
          >
            {isOptimizing && optMode === 'calories' ? <RefreshCw size={14} className="animate-spin" /> : <Activity size={14} />}
            Kalorie-Reduktion
          </button>

          <button
            onClick={() => handleOptimize('allergens')}
            disabled={isOptimizing}
            className={`px-5 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all flex items-center gap-2 border-2 ${optMode === 'allergens' ? 'bg-amber-600 text-white border-amber-700 shadow-md' : 'bg-white text-slate-500 border-blue-100 hover:border-blue-300'}`}
          >
            {isOptimizing && optMode === 'allergens' ? <RefreshCw size={14} className="animate-spin" /> : <ShieldAlert size={14} />}
            Allergen-Optimering
          </button>

          {optimizedIngredients && (
            <button
              onClick={applyOptimization}
              className="ml-auto bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 hover:bg-black transition-all shadow-xl animate-bounce"
            >
              <Check size={14} /> Anvend Forslag på Kortet
            </button>
          )}
        </div>
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-start border-b-4 border-slate-900 pb-6 mb-8">
        <div className="max-w-[60%]">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2 leading-none">{r.recipeName}</h1>
          <div className="flex gap-4 text-[10px] font-black uppercase text-slate-500 tracking-widest">
            <span className="flex items-center gap-1"><Scale size={12} /> {r.yield?.portions || "---"} PORTIONER</span>
            <span className="flex items-center gap-1"><Tag size={12} /> {r.recipeNumber || 'PROD-ID'}</span>
          </div>
        </div>

        {/* UDPORTIONERING MASTER BOX */}
        <div className="bg-slate-950 text-white p-6 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] border-b-8 border-blue-600 min-w-[220px]">
          <span className="block text-[10px] font-black uppercase text-blue-400 tracking-[0.2em] mb-1">UDPORTIONERING</span>
          <div className="text-6xl font-black italic tracking-tighter leading-none">{r.yield?.finishedWeightPerPortion || '---'} <span className="text-xl">g</span></div>
          <p className="text-[9px] font-bold uppercase mt-2 opacity-50">Færdigvægt pr. tallerken</p>
        </div>
      </div>

      {/* PRODUKTIONS DASHBOARD */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Layers size={24} /></div>
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Output</span>
            <span className="text-2xl font-black text-slate-900">{totalOutputKg} KG</span>
          </div>
        </div>
        <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="bg-orange-100 text-orange-600 p-3 rounded-xl"><Thermometer size={24} /></div>
          <div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Ovn</span>
            <span className="text-2xl font-black text-slate-900">{r.ovenSettings?.temperature || '180'}°C / {r.ovenSettings?.steamPercentage || '0'}%</span>
          </div>
        </div>
        <div className="bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl flex items-center gap-4">
          <div className="bg-slate-900 text-white p-3 rounded-xl"><Clock size={24} /></div>
          <div>
            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Est. Tid</span>
            <span className="text-xl font-black">{r.timeEstimate || 'Standard'}</span>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-2 gap-12">
        <div className="border-r-2 border-slate-100 pr-12">
          {/* Sub-Recipes Section */}
          {(r.subRecipes && r.subRecipes.length > 0) && (
            <div className="mb-8">
              <h3 className="text-sm font-black uppercase border-b-4 border-slate-900 pb-1 mb-4 tracking-[0.2em]">Delopskrifter / Komponenter</h3>
              <div className="space-y-3">
                {r.subRecipes.map((subRecipe, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-black uppercase text-slate-800">{subRecipe.name || subRecipe.recipeNumber}</span>
                      <span className="text-xs font-bold text-slate-500 ml-2">(#{subRecipe.recipeNumber})</span>
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {subRecipe.quantity} {subRecipe.unit}
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => {
                          const updatedSubRecipes = r.subRecipes?.filter((_, idx) => idx !== i);
                          setR({ ...r, subRecipes: updatedSubRecipes });
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Sub-Recipe Form (when editing) */}
          {isEditing && (
            <div className="mb-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <h4 className="text-xs font-black uppercase text-blue-800 mb-3 tracking-widest">Tilføj Delopskrift</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Opskriftsnummer (fx MDS-001)"
                  value={newSubRecipe.recipeNumber}
                  onChange={(e) => setNewSubRecipe({ ...newSubRecipe, recipeNumber: e.target.value })}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Navn (valgfri)"
                  value={newSubRecipe.name}
                  onChange={(e) => setNewSubRecipe({ ...newSubRecipe, name: e.target.value })}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Mængde"
                  value={newSubRecipe.quantity || ''}
                  onChange={(e) => setNewSubRecipe({ ...newSubRecipe, quantity: parseFloat(e.target.value) || 0 })}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                />
                <select
                  value={newSubRecipe.unit}
                  onChange={(e) => setNewSubRecipe({ ...newSubRecipe, unit: e.target.value })}
                  className="px-3 py-2 text-sm border border-slate-300 rounded-lg"
                >
                  <option value="kg">kg</option>
                  <option value="liter">liter</option>
                  <option value="portions">portions</option>
                  <option value="stk">stk</option>
                </select>
              </div>
              <button
                onClick={() => {
                  if (!newSubRecipe.recipeNumber.trim()) return;
                  const updatedSubRecipes = [...(r.subRecipes || []), newSubRecipe];
                  setR({ ...r, subRecipes: updatedSubRecipes });
                  setNewSubRecipe({ recipeNumber: '', quantity: 0, unit: 'kg', name: '' });
                }}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-lg hover:bg-blue-700"
              >
                Tilføj Delopskrift
              </button>
            </div>
          )}

          <IngredientList
            ingredients={r.ingredients || []}
            portions={parseInt(r.yield?.portions || "1") || 1}
            optimizedData={optimizedIngredients || undefined}
          />
        </div>

        <div>
          <h3 className="text-sm font-black uppercase border-b-4 border-slate-900 pb-1 mb-6 tracking-[0.2em]">Metodik / Fremgangsmåde</h3>
          <div className="space-y-6">
            {(r.steps || []).map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-2xl font-black text-slate-200 leading-none">0{i + 1}</span>
                <p className="text-[12.5px] font-bold uppercase leading-snug text-slate-800">{step.description}</p>
              </div>
            ))}
          </div>

          {r.productionNotes && (
            <div className="mt-10 p-6 bg-yellow-50 border-l-8 border-yellow-400 rounded-r-2xl shadow-inner">
              <h4 className="text-[10px] font-black uppercase text-yellow-700 mb-2 tracking-widest">Vigtige Produktions-noter</h4>
              <p className="text-[11px] font-bold text-yellow-900 italic leading-snug uppercase tracking-tight">{r.productionNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-10">
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Lovpligtig Varedeklaration & Allergener</span>
          <p className="text-[10px] font-bold text-slate-600 leading-relaxed italic">{r.varedeklaration || "Ikke defineret"}</p>
        </div>
        <div className="flex justify-between items-center mt-6 text-[9px] font-black uppercase text-slate-300 tracking-[0.3em]">
          <span>PRODUKTIONSKORT V2.0 - MDS BREELTEPARKEN</span>
          <span>UDPRINTET: {new Date().toLocaleDateString('da-DK')}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeDisplay;
