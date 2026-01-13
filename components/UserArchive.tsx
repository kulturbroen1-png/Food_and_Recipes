
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { RecipeData } from '../types';
import { getUserRecipes, deleteUserRecipe, exportDatabase, importDatabase } from '../services/recipeStorage';
import { menuCategories } from '../services/menuData';
import {
  Search, FolderOpen, Trash2, BookOpen,
  Database, Plus, CheckCircle2, Download, Upload, ShieldCheck,
  AlertTriangle, Info, FileText, List, LayoutGrid,
  SearchCode, RefreshCw, BarChart, ChevronDown, ChevronUp,
  FileCheck2, FileWarning, X, File, ChevronRight, Menu, Hash, ShieldAlert
} from 'lucide-react';

interface IndexedFile {
  id: string;
  name: string;
  filename: string;
  path: string;
  category: string;
  subCategory: string;
  type: string;
  size: number;
  modified: string;
}

interface StructuredRecipe {
  recipeName: string;
  date: string;
  portions: string;
  totalWeight: string;
  portionSize: string;
  protein: string;
  carbohydrate: string;
  source: string;
  components: {
    title: string;
    ingredients: {
      name: string;
      grossQuantity: string;
      wastePercentage: string;
      nettoQuantity: string;
    }[];
    steps: string[];
  }[];
}

interface UserArchiveProps {
  onViewRecipe: (recipe: RecipeData) => void;
  onSendToProduction: (recipes: RecipeData[]) => void;
  onNewRecipe: () => void;
}

const UserArchive: React.FC<UserArchiveProps> = ({ onViewRecipe, onSendToProduction, onNewRecipe }) => {
  const [recipes, setRecipes] = useState<RecipeData[]>([]);
  const [files, setFiles] = useState<IndexedFile[]>([]);
  const [structuredRecipes, setStructuredRecipes] = useState<StructuredRecipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('alle');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [storageSize, setStorageSize] = useState<string>('0 KB');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  // Default closed on mobile (< 768px), open on desktop
  const [isSidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth > 768 : true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic categories structure
  const categoryStructure = useMemo(() => {
    const structure: Record<string, Set<string>> = {
      'alle': new Set(),
      'user': new Set(),
      'hovedretter': new Set(),
      'supper': new Set(),
      'dessert': new Set(),
      'delopskrifter': new Set()
    };

    files.forEach(f => {
      const mainCat = f.category?.toLowerCase() || 'uncategorized';
      if (!structure[mainCat]) {
        structure[mainCat] = new Set();
      }
      if (f.subCategory) {
        structure[mainCat].add(f.subCategory);
      }
    });

    return structure;
  }, [files]);

  const categories = useMemo(() => Object.keys(categoryStructure).sort(), [categoryStructure]);

  const refreshRecipes = () => {
    const saved = getUserRecipes();
    setRecipes(saved);

    // Beregn lagerplads brugt
    const stringData = localStorage.getItem('breelte_user_recipes') || '';
    const bytes = new Blob([stringData]).size;
    const size = (bytes / 1024).toFixed(1);
    setStorageSize(size + ' KB');
  };

  useEffect(() => {
    refreshRecipes();

    // Load indexed files - prefer deduplicated data
    const loadFiles = async () => {
      // Try deduplicated file first (much smaller, faster)
      try {
        const dedupeRes = await fetch('/deduplicated_recipes.json');
        if (dedupeRes.ok) {
          const data = await dedupeRes.json();
          console.log("Loaded " + data.length + " deduplicated files");
          setFiles(data);
          return;
        }
      } catch (err) {
        console.warn("Deduplicated file not available, trying manifest...", err);
      }

      // Fallback to chunked manifest
      try {
        const manifestRes = await fetch('/recipe_manifest.json');
        if (!manifestRes.ok) throw new Error("Manifest not found");
        const manifest = await manifestRes.json();

        console.log(`Loading ${manifest.totalFiles} files from ${manifest.chunks.length} chunks...`);

        const allFiles: IndexedFile[] = [];

        const chunkPromises = manifest.chunks.map((url: string) =>
          fetch(url).then(res => res.json())
        );

        const chunks = await Promise.all(chunkPromises);
        chunks.forEach(chunk => {
          if (Array.isArray(chunk)) {
            allFiles.push(...chunk);
          }
        });

        console.log("Loaded total " + allFiles.length + " files from manifest");
        setFiles(allFiles);

      } catch (err) {
        console.error("Could not load local recipes index", err);
        // Last resort: try local_recipes.json
        try {
          const res = await fetch('/local_recipes.json');
          if (res.ok) {
            const data = await res.json();
            console.log("Loaded " + data.length + " files from local_recipes.json");
            setFiles(data);
          }
        } catch (fbErr) { console.error("All fallbacks failed", fbErr); }
      }
    };

    loadFiles();

    // Also load structured recipes (actual parsed recipe content)
    const loadStructured = async () => {
      try {
        const res = await fetch('/structured_recipes.json');
        if (res.ok) {
          const data = await res.json();
          console.log("Loaded " + data.length + " structured recipes");
          setStructuredRecipes(data);
        }
      } catch (err) {
        console.warn("No structured recipes available", err);
      }
    };
    loadStructured();
  }, []);

  const auditData = useMemo(() => {
    const allOfficialItems = Object.values(menuCategories).flat();
    const inventory = recipes.map(r => r.recipeName.toLowerCase());

    const matched = allOfficialItems.filter(item => inventory.includes(item.name.toLowerCase()));
    const missing = allOfficialItems.filter(item => !inventory.includes(item.name.toLowerCase()));

    return { matched, missing, totalOfficial: allOfficialItems.length };
  }, [recipes]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();

    // Filter DB Recipes
    const matchedRecipes = recipes.filter(r => {
      const matchesSearch = r.recipeName.toLowerCase().includes(query) ||
        (r.recipeNumber && r.recipeNumber.includes(query));
      const matchesCat = selectedCategory === 'alle' || r.category === selectedCategory;
      // DB recipes don't strictly have subcategories yet, so we ignore subcat filter or treat 'user' as main
      return matchesSearch && matchesCat;
    }).map(r => ({ ...r, type: 'db' as const }));

    // Filter Files
    const matchedFiles = files.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(query) ||
        f.filename.toLowerCase().includes(query);

      let matchesCat = selectedCategory === 'alle';
      if (!matchesCat) {
        matchesCat = f.category.toLowerCase() === selectedCategory;
      }

      let matchesSub = true;
      if (selectedSubCategory) {
        matchesSub = f.subCategory === selectedSubCategory;
      }

      return matchesSearch && matchesCat && matchesSub;
    }).map(f => ({ ...f, type: 'file' as const }));

    return [...matchedRecipes, ...matchedFiles];
  }, [recipes, files, searchQuery, selectedCategory, selectedSubCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const totalCount = recipes.length + files.length;
    counts['alle'] = totalCount;

    recipes.forEach(r => {
      const cat = r.category || 'user';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    files.forEach(f => {
      const cat = f.category?.toLowerCase() || 'uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [recipes, files]);

  const handleDelete = (name: string) => {
    if (confirm(`Er du sikker på, at du vil slette "${name}" permanent fra databasen?`)) {
      deleteUserRecipe(name);
      refreshRecipes();
    }
  };

  const handleImportDatabase = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        if (importDatabase(text)) {
          // Refresh
          setRecipes(getUserRecipes());
        } else {
          alert("Kunne ikke importere filen. Ukendt format.");
        }
      }
    };
    input.click();
  };

  const handleLoadAutoImported = async () => {
    try {
      const res = await fetch('/imported_recipes.json');
      if (!res.ok) throw new Error("Fandt ingen importerede opskrifter via script.");
      const text = await res.text();
      if (importDatabase(text)) {
        alert("Succes! Importerede opskrifter fra script-kørsel.");
        refreshRecipes();
      }
    } catch (e: any) {
      alert("Kunne ikke hente data: " + e.message + "\n\nHusk at køre 'npm run ingest' i terminalen først (kræver API Key).");
    }
  };

  const runMigrationFix = () => {
    const raw = localStorage.getItem('breelte_user_recipes');
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      if (Array.isArray(data)) {
        const fixed = data.map(r => ({
          ...r,
          yield: r.yield || { portions: "450", rawWeightPerPortion: "150g", finishedWeightPerPortion: "150g" },
          ingredients: r.ingredients || [],
          steps: r.steps || []
        }));
        localStorage.setItem('breelte_user_recipes', JSON.stringify(fixed));
        alert("Migration fuldført: " + fixed.length + " opskrifter blev optimeret til nyeste format.");
        refreshRecipes();
      }
    } catch (e) { alert("Kunne ikke køre migration."); }
  };

  return (
    <div className="flex bg-[#f1f5f9] h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-white border-r border-slate-200 h-full overflow-y-auto transition-all duration-300 flex-shrink-0 relative flex flex-col`}>
        <div className="p-6 space-y-8 flex-1">
          <h2 className="text-xl font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
            <Database className="text-blue-600" /> Master Arkiv
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <span className="block text-xl font-black text-blue-600">{recipes.length}</span>
              <span className="text-[9px] font-bold uppercase text-blue-400">Database</span>
            </div>
            <div className="bg-green-50 p-3 rounded-2xl">
              <span className="block text-xl font-black text-green-600">{structuredRecipes.length}</span>
              <span className="text-[9px] font-bold uppercase text-green-400">Opskrifter</span>
            </div>
            <div className="bg-teal-50 p-3 rounded-2xl">
              <span className="block text-xl font-black text-teal-600">{files.length}</span>
              <span className="text-[9px] font-bold uppercase text-teal-400">Filer</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest px-2">Kategorier</h3>
            <div className="space-y-1">
              {categories.map(cat => {
                const isSelected = selectedCategory === cat;
                const subCats = Array.from(categoryStructure[cat] || []);
                const count = categoryCounts[cat] || 0;
                if (count === 0 && cat !== 'alle') return null;

                return (
                  <div key={cat}>
                    <button
                      onClick={() => { setSelectedCategory(cat); setSelectedSubCategory(null); }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all ${isSelected ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <span className="text-xs font-black uppercase truncate max-w-[140px]">{cat}</span>
                      <span className={`text-[9px] font-bold px-2 py-1 rounded-md ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>{count}</span>
                    </button>

                    {/* Subcategories */}
                    {isSelected && subCats.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-100 pl-2">
                        {subCats.map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubCategory(sub === selectedSubCategory ? null : sub)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all ${selectedSubCategory === sub ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                          >
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedSubCategory === sub ? 'bg-blue-500' : 'bg-slate-300'}`} />
                            <span className="text-[10px] font-bold uppercase truncate">{sub}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Tools Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="space-y-2">
            <button onClick={handleLoadAutoImported} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white hover:text-blue-600 transition-colors">
              <RefreshCw size={16} />
              <span className="text-xs font-bold uppercase">Indlæs scannede filer</span>
            </button>
            <button onClick={handleImportDatabase} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white hover:text-blue-600 transition-colors">
              <Upload size={16} />
              <span className="text-xs font-bold uppercase">Importer Database (JSON)</span>
            </button>
            <button onClick={() => setShowDiagnostics(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white hover:text-blue-600 transition-colors">
              <SearchCode size={16} />
              <span className="text-xs font-bold uppercase">System Diagnostik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 mr-4">
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder={`Søg i ${recipes.length + files.length} opskrifter...`}
              className="w-full bg-slate-100 border-none rounded-xl pl-12 pr-4 py-3 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pl-4">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutGrid size={20} /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-50'}`}><List size={20} /></button>
            <button onClick={onNewRecipe} className="bg-slate-900 text-white px-5 py-3 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:bg-blue-600 transition-colors">
              <Plus size={16} /> Ny
            </button>
            <button onClick={() => exportDatabase()} className="bg-slate-100 text-slate-500 px-3 py-3 rounded-xl hover:bg-slate-200 transition-colors">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {showDiagnostics && (
            <div className="mb-8 bg-blue-900 text-white p-6 rounded-[2rem] shadow-xl flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase mb-2">System Status</h3>
                <p className="opacity-70 text-sm">Storage: {storageSize} • Files: {files.length}</p>
              </div>
              <button onClick={() => setShowDiagnostics(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><X size={20} /></button>
            </div>
          )}

          <div className="mb-6 flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span className="bg-slate-200 text-slate-600 px-2 py-1 rounded">{selectedCategory}</span>
            {selectedSubCategory && (
              <>
                <ChevronRight size={12} />
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">{selectedSubCategory}</span>
              </>
            )}
            <span className="ml-auto text-slate-300">{filteredItems.length} Resultater</span>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-2'}>
            {filteredItems.length > 0 ? filteredItems.map((item: any) => (
              viewMode === 'grid' ? (
                <div key={item.id || item.recipeName} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group flex flex-col h-full relative overflow-hidden">
                  {/* Type Badge */}
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${item.type === 'file' ? 'bg-teal-500' : 'bg-blue-500'}`} />

                  <div className="mb-4 pl-3">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] font-black uppercase px-2 py-1 rounded ${item.type === 'file' ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'}`}>
                        {item.type === 'file' ? 'FIL' : 'DB'}
                      </span>
                      {item.subCategory && <span className="text-[9px] font-bold text-slate-400 uppercase truncate max-w-[80px]">{item.subCategory}</span>}
                    </div>
                    <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-blue-600 transition-colors break-words">
                      {item.recipeName || item.name}
                    </h3>
                  </div>

                  <div className="mt-auto pl-3 pt-4 border-t border-slate-50 flex gap-2">
                    {item.type === 'file' ? (
                      <a href={item.path} target="_blank" rel="noreferrer" className="flex-1 bg-teal-50 text-teal-700 py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-teal-600 hover:text-white transition-all">
                        <File size={14} /> Åben
                      </a>
                    ) : (
                      <>
                        <button onClick={() => onViewRecipe(item)} className="flex-1 bg-slate-50 text-slate-700 py-3 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all">
                          <BookOpen size={14} /> Vis
                        </button>
                        <button onClick={() => handleDelete(item.recipeName)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div key={item.id || item.recipeName} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${item.type === 'file' ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'}`}>
                      {item.type === 'file' ? <File size={16} /> : <BookOpen size={16} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black uppercase text-slate-700 text-xs truncate">{item.recipeName || item.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold text-slate-400 uppercase truncate">{item.category}</span>
                        {item.subCategory && <span className="text-[9px] font-bold text-slate-400 uppercase">/ {item.subCategory}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {item.type === 'file' ? (
                      <a href={item.path} target="_blank" rel="noreferrer" className="px-4 py-2 bg-teal-50 text-teal-700 rounded-lg text-[10px] font-black uppercase hover:bg-teal-600 hover:text-white transition-all">Åben</a>
                    ) : (
                      <>
                        <button onClick={() => onViewRecipe(item)} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-lg text-[10px] font-black uppercase hover:bg-slate-900 hover:text-white transition-all">Vis</button>
                        <button onClick={() => handleDelete(item.recipeName)} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={14} /></button>
                      </>
                    )}
                  </div>
                </div>
              )
            )) : (
              <div className="text-center py-20 opacity-40">
                <FolderOpen size={64} className="mx-auto mb-4 text-slate-300" />
                <p className="font-black uppercase text-slate-400">Ingen resultater</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserArchive;
