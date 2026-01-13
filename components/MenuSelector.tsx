
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { getAllRecipes } from '../services/authenticRecipes';
import { menuCategories } from '../services/menuData';
import { MenuItem, RecipeData } from '../types';
import { GoogleGenAI } from "@google/genai";
import { parseImportedTextRequest, parseImportedFileRequest } from '../services/geminiService';
import { getUserRecipes, deleteUserRecipe, saveUserRecipe } from '../services/recipeStorage';
import { getHorkramPrice } from '../services/pricingService';
import { dataRelationshipStore, updateRecipeWithCascade } from '../services/dataRelationshipService';
import { Search, Database, Plus, Trash2, Check, Loader2, Hash, Coins, TrendingDown, Users, Upload, FileText, FolderOpen, AlertCircle, CheckCircle2, X, GitBranch, GitMerge } from 'lucide-react';
import mammoth from 'mammoth';
interface MenuSelectorProps {
  onSelect: (name: string, category: string, mdsNumber?: string, sourceReference?: string) => void;
  onImportedRecipe?: (recipe: any) => void;
}

interface BatchJob {
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  errorMessage?: string;
}

const categories = [
  { key: 'hovedretter', label: 'Hovedretter' },
  { key: 'supper', label: 'Supper' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'delopskrifter', label: 'Delopskrifter' },
  { key: 'user', label: 'Mine Gemte' },
];

const MenuSelector: React.FC<MenuSelectorProps> = ({ onSelect, onImportedRecipe }) => {
  const [activeCategory, setActiveCategory] = useState<string>('hovedretter');
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userRecipesFull, setUserRecipesFull] = useState<RecipeData[]>([]);
  const [tempMdsNumbers, setTempMdsNumbers] = useState<Record<string, string>>({});
  const [batchJobs, setBatchJobs] = useState<BatchJob[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadUserRecipes = () => {
    const saved = getUserRecipes();
    setUserRecipesFull(saved);
    const mapping: Record<string, string> = { ...tempMdsNumbers };
    saved.forEach(r => { mapping[r.recipeName] = r.recipeNumber || ''; });
    Object.values(menuCategories).flat().forEach(item => {
      if (!mapping[item.name]) { mapping[item.name] = item.id.toString(); }
    });
    setTempMdsNumbers(mapping);
  };

  useEffect(() => { if (isOpen) { loadUserRecipes(); } }, [isOpen]);

  const filteredItems = useMemo(() => {
    // 1. Get Authentic Recipes
    const authenticRecipes = getAllRecipes().map(r => ({
      id: r.id || r.recipeNumber,
      name: r.recipeName,
      category: r.category,
      portions: r.yield_net,
      fullData: r,
      isAuthentic: true
    }));

    let allItems = [];

    if (activeCategory === 'user') {
      const userItems = userRecipesFull.map(r => ({
        id: r.recipeNumber,
        name: r.recipeName,
        category: r.category || 'user',
        portions: r.yield?.portions,
        fullData: r,
        isAuthentic: false
      }));
      allItems = userItems;
    } else {
      // Filter authentic recipes based on broad category matching
      const mappedAuthentic = authenticRecipes.filter(r => {
        if (activeCategory === 'hovedretter' && (r.category.includes('Hovedret') || r.category.includes('kød') || r.category.includes('retter') || r.category.includes('Fisk'))) return true;
        if (activeCategory === 'supper' && r.category.includes('Suppe')) return true;
        if (activeCategory === 'dessert' && (r.category.includes('Dessert') || r.category.includes('Kage'))) return true;
        if (activeCategory === 'delopskrifter' && (r.category.includes('Delopskrift') || r.category.includes('Grund') || r.category.includes('Pålæg'))) return true;
        return false;
      });

      const authenticIds = new Set(mappedAuthentic.map(r => String(r.id)));

      const staticList = (menuCategories[activeCategory] || [])
        .filter(item => !authenticIds.has(String(item.id)))
        .map(item => ({
          ...item,
          category: activeCategory,
          portions: null,
          fullData: null,
          isAuthentic: false
        }));

      allItems = [...mappedAuthentic, ...staticList];
    }

    return searchQuery ? allItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())) : allItems;
  }, [activeCategory, searchQuery, userRecipesFull]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    // Fix: cast to any or explicitly typed File to avoid 'unknown' errors with Array.from
    const newJobs: BatchJob[] = Array.from(files).map((f: any) => ({ fileName: f.name, status: 'pending' }));
    setBatchJobs(prev => [...prev, ...newJobs]);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Fix: Null check for file access from FileList indexer
      if (!file) continue;

      try {
        setBatchJobs(prev => prev.map(j => j.fileName === file.name ? { ...j, status: 'processing' } : j));

        let request;
        if (file.name.toLowerCase().endsWith('.docx')) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          request = parseImportedTextRequest(result.value);
        } else if (file.name.toLowerCase().endsWith('.pdf') || file.type.includes('image/')) {
          // Native PDF/Image parsing is much better for Gemini
          const base64 = await fileToBase64(file);
          request = parseImportedFileRequest(base64, file.type || 'application/pdf');
        } else {
          const text = await file.text();
          request = parseImportedTextRequest(text);
        }

        const result = await ai.models.generateContent(request);

        if (result.text) {
          const jsonMatch = result.text.match(/\[[\s\S]*\]/) || result.text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const recipesToSave: RecipeData[] = Array.isArray(parsed) ? parsed : [parsed];

            recipesToSave.forEach(recipe => {
              recipe.category = recipe.category || 'user';
              recipe.sourceReference = file.name;
              updateRecipeWithCascade(recipe); // Use cascade update for proper relationship handling
              if (onImportedRecipe) onImportedRecipe(recipe);
            });
          }
        }

        setBatchJobs(prev => prev.map(j => j.fileName === file.name ? { ...j, status: 'completed' } : j));
      } catch (err: any) {
        console.error("Fejl ved import af", file.name, err);
        setBatchJobs(prev => prev.map(j => j.fileName === file.name ? { ...j, status: 'error', errorMessage: err.message } : j));
      }
    }

    setIsUploading(false);
    loadUserRecipes();
  };

  const libraryStats = useMemo(() => {
    const prices = filteredItems.map(item => getHorkramPrice(item.name));
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    return { avgPrice, totalCount: filteredItems.length };
  }, [filteredItems]);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mb-8 border border-slate-200 no-print">
      <div
        className="bg-slate-900 px-10 py-8 flex flex-wrap justify-between items-center cursor-pointer hover:bg-slate-800 transition-all border-b-8 border-blue-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-6">
          <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg ring-4 ring-blue-500/20">
            <Database size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none">Opskrifts-Bibliotek</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-2 italic leading-none">AI-drevet bulk import & MDS arkiv</p>
          </div>
        </div>
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all border border-slate-700">
          {isOpen ? 'Luk Bibliotek' : 'Åben Oversigt & Import'}
        </button>
      </div>

      {isOpen && (
        <div className="p-10 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-4 duration-500">

          {/* IMPORT SECTION */}
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center group hover:border-blue-500 transition-all cursor-pointer relative" onClick={() => fileInputRef.current?.click()}>
              <input type="file" ref={fileInputRef} className="hidden" multiple accept=".docx,.txt,.pdf,image/*" onChange={handleFileUpload} />
              <div className="bg-blue-100 text-blue-600 p-6 rounded-3xl mb-4 group-hover:scale-110 transition-transform">
                <Upload size={40} />
              </div>
              <h4 className="text-xl font-black uppercase text-slate-800">Importér Opskrifter</h4>
              <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Træk filer hertil eller klik for at uploade<br />(PDF, Word, Billeder eller Tekst)</p>
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[2.5rem] flex flex-col items-center justify-center z-10">
                  <Loader2 className="animate-spin text-blue-600 mb-2" size={48} />
                  <span className="font-black uppercase text-blue-600 text-xs">Arbejder...</span>
                </div>
              )}
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-6 opacity-10"><FileText size={120} /></div>
              <h4 className="text-xs font-black uppercase text-blue-400 tracking-[0.3em] mb-4">Batch Job Status</h4>
              <div className="space-y-3 max-h-[180px] overflow-y-auto custom-scrollbar pr-2">
                {batchJobs.length > 0 ? batchJobs.map((job, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {job.status === 'processing' ? <Loader2 size={14} className="animate-spin text-orange-400" /> :
                        job.status === 'completed' ? <CheckCircle2 size={14} className="text-green-400" /> :
                          job.status === 'error' ? <AlertCircle size={14} className="text-red-400" /> :
                            <div className="w-3.5 h-3.5 border-2 border-white/20 rounded-full"></div>}
                      <span className="text-[10px] font-bold truncate uppercase tracking-tighter">{job.fileName}</span>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${job.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      job.status === 'error' ? 'bg-red-500/20 text-red-400' : 'text-slate-500'
                      }`}>
                      {job.status}
                    </span>
                  </div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center opacity-30 py-8">
                    <p className="text-[10px] font-black uppercase tracking-widest">Ingen aktive jobs</p>
                  </div>
                )}
              </div>
              {batchJobs.length > 0 && (
                <button onClick={() => setBatchJobs([])} className="mt-4 text-[8px] font-black uppercase text-slate-500 hover:text-white transition-colors underline">Ryd liste</button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-[2rem] shadow-md border-2 border-slate-100 flex items-center gap-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl"><Coins size={28} /></div>
              <div>
                <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest">Gns. Råvarepris / kg</span>
                <span className="text-2xl font-black text-slate-900 italic">{new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(libraryStats.avgPrice)}</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-md border-2 border-slate-100 flex items-center gap-6">
              <div className="bg-green-100 text-green-600 p-4 rounded-2xl"><Database size={28} /></div>
              <div>
                <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest">Database Portefølje</span>
                <span className="text-2xl font-black text-slate-900 italic">{libraryStats.totalCount} Opskrifter</span>
              </div>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-xl flex items-center gap-6">
              <div className="bg-orange-600 p-4 rounded-2xl"><TrendingDown size={28} /></div>
              <div>
                <span className="block text-[8px] font-black uppercase text-slate-500 tracking-widest">AI Validering</span>
                <span className="text-2xl font-black text-white italic">100% MDS-Sikret</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <div className="flex-1 relative group">
              <input
                type="text"
                placeholder="Søg i biblioteket efter navn eller nr..."
                className="block w-full pl-14 pr-6 py-5 border-2 border-slate-200 rounded-[2rem] bg-white font-bold text-slate-700 focus:border-blue-600 focus:outline-none shadow-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-6 top-5 text-slate-400 group-hover:text-blue-600 transition-colors">
                <Search size={24} />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase border-2 transition-all flex items-center gap-3 ${activeCategory === cat.key
                  ? 'bg-orange-600 text-white border-orange-700 shadow-xl scale-105'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-orange-200'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? filteredItems.map((item) => {
              const isUserItem = activeCategory === 'user';

              // Determine relationship type using DataRelationshipStore
              const recipeId = item.id || item.fullData?.recipeNumber;
              const children = recipeId ? dataRelationshipStore.getChildren(recipeId) : [];
              const parents = recipeId ? dataRelationshipStore.getParents(recipeId) : [];
              const hasChildren = children.length > 0;
              const hasParents = parents.length > 0;
              const isParent = hasChildren;
              const isChild = hasParents;

              return (
                <div key={item.id} className={`p-6 border border-slate-100 rounded-[2.5rem] bg-white hover:border-blue-50 hover:shadow-2xl transition-all flex flex-col justify-between min-h-[250px] shadow-sm group relative ${isParent ? 'ring-2 ring-green-200 bg-green-50/30' : ''} ${isChild ? 'ring-2 ring-blue-200 bg-blue-50/30' : ''}`}>
                  {/* Relationship Indicators */}
                  {isParent && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white p-1 rounded-full" title="Parent Recipe - Has Sub-recipes">
                      <GitBranch size={12} />
                    </div>
                  )}
                  {isChild && (
                    <div className="absolute top-4 right-12 bg-blue-600 text-white p-1 rounded-full" title="Child Recipe - Used in Other Recipes">
                      <GitMerge size={12} />
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-3">{item.category || activeCategory}</span>
                    <span className="text-xl font-black text-slate-900 leading-tight block group-hover:text-blue-600 transition-colors mb-2">{item.name}</span>

                    {/* Relationship Info */}
                    {(isParent || isChild) && (
                      <div className="mb-3 text-[9px] font-bold uppercase tracking-widest">
                        {isParent && <span className="text-green-600">Parent • {children.length} sub-recipes</span>}
                        {isParent && isChild && <span className="mx-2 text-slate-400">|</span>}
                        {isChild && <span className="text-blue-600">Child • {parents.length} parents</span>}
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-4 bg-slate-50 rounded-xl p-2 border border-slate-100 w-fit">
                      <Hash size={14} className="text-slate-400" />
                      <span className="text-[10px] font-black text-slate-600 uppercase">#{tempMdsNumbers[item.name] || item.id}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-6 pt-6 border-t border-slate-50">
                    <button
                      onClick={() => onSelect(item.name, item.category as string || activeCategory, tempMdsNumbers[item.name], isUserItem ? item.fullData?.sourceReference : undefined)}
                      className="flex-1 bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-lg"
                    >
                      <Check size={16} /> Vælg
                    </button>
                    {isUserItem && (
                      <button
                        onClick={(e) => { e.stopPropagation(); if (confirm('Slet opskrift?')) { deleteUserRecipe(item.name); loadUserRecipes(); } }}
                        className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-full py-20 text-center opacity-20">
                <Database className="mx-auto mb-6" size={64} />
                <h4 className="text-xl font-black uppercase tracking-widest">Biblioteket er tomt</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuSelector;