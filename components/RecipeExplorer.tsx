import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid3x3, List, ChefHat, X, Cloud, RefreshCw } from 'lucide-react';
import { CategorizedRecipe, PrimaryCategory, MealType, StyleTag } from '../services/recipeCategorizationService';
import { getAllRecipes } from '../services/firestoreService';

interface RecipeExplorerProps {
    recipes: CategorizedRecipe[];
    onSelectRecipe?: (recipe: CategorizedRecipe) => void;
}

const RecipeExplorer: React.FC<RecipeExplorerProps> = ({ recipes: propRecipes, onSelectRecipe }) => {
    const [cloudRecipes, setCloudRecipes] = useState<CategorizedRecipe[]>([]);
    const [isLoadingCloud, setIsLoadingCloud] = useState(false);
    const [cloudError, setCloudError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPrimary, setSelectedPrimary] = useState<PrimaryCategory | 'Alle'>('Alle');
    const [selectedMealType, setSelectedMealType] = useState<MealType | 'Alle'>('Alle');
    const [selectedStyle, setSelectedStyle] = useState<StyleTag | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedRecipe, setSelectedRecipe] = useState<CategorizedRecipe | null>(null);

    // Use cloud recipes if available, otherwise use prop recipes
    const recipes = cloudRecipes.length > 0 ? cloudRecipes : propRecipes;

    // Fetch recipes from cloud
    const fetchCloudRecipes = async () => {
        setIsLoadingCloud(true);
        setCloudError(null);
        try {
            const fetchedRecipes = await getAllRecipes();
            setCloudRecipes(fetchedRecipes);
        } catch (error) {
            console.error('Failed to fetch cloud recipes:', error);
            setCloudError(error instanceof Error ? error.message : 'Failed to connect to cloud');
        } finally {
            setIsLoadingCloud(false);
        }
    };

    // Try to fetch cloud recipes on mount
    useEffect(() => {
        fetchCloudRecipes();
    }, []);

    // Category icons and colors
    const primaryCategories: { value: PrimaryCategory | 'Alle'; label: string; icon: string; color: string }[] = [
        { value: 'Alle', label: 'Alle Retter', icon: '🍽️', color: 'bg-slate-500' },
        { value: 'Grise', label: 'Grise', icon: '🐷', color: 'bg-pink-500' },
        { value: 'Okse/Kalv', label: 'Okse/Kalv', icon: '🐄', color: 'bg-amber-600' },
        { value: 'Fjerkræ', label: 'Fjerkræ', icon: '🐔', color: 'bg-yellow-500' },
        { value: 'Fisk', label: 'Fisk', icon: '🐟', color: 'bg-blue-500' },
        { value: 'Grønne', label: 'Grønne', icon: '🥗', color: 'bg-green-500' },
        { value: 'Diverse', label: 'Diverse', icon: '🥘', color: 'bg-purple-500' },
    ];

    const mealTypes: { value: MealType | 'Alle'; label: string }[] = [
        { value: 'Alle', label: 'Alle Typer' },
        { value: 'Hovedret', label: 'Hovedret' },
        { value: 'Suppe', label: 'Suppe' },
        { value: 'Dessert', label: 'Dessert' },
        { value: 'Grød', label: 'Grød' },
        { value: 'Kage', label: 'Kage' },
    ];

    const styles: StyleTag[] = ['Klassisk', 'Gammeldags', 'Højtid', 'Modern', 'International'];

    // Filtered recipes
    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            // Search filter
            if (searchQuery && !recipe.recipeName.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }

            // Primary category filter
            if (selectedPrimary !== 'Alle' && recipe.category.primary !== selectedPrimary) {
                return false;
            }

            // Meal type filter
            if (selectedMealType !== 'Alle' && recipe.category.mealType !== selectedMealType) {
                return false;
            }

            // Style filter
            if (selectedStyle && !recipe.category.styles.includes(selectedStyle)) {
                return false;
            }

            return true;
        });
    }, [recipes, searchQuery, selectedPrimary, selectedMealType, selectedStyle]);

    // Count recipes by category
    const getCategoryCount = (category: PrimaryCategory | 'Alle') => {
        if (category === 'Alle') return recipes.length;
        return recipes.filter(r => r.category.primary === category).length;
    };

    const openRecipeModal = (recipe: CategorizedRecipe) => {
        setSelectedRecipe(recipe);
        if (onSelectRecipe) {
            onSelectRecipe(recipe);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
            {/* Header */}
            <div className="bg-white border-b-2 border-slate-200 sticky top-0 z-30 shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-2xl shadow-md">
                            <ChefHat size={32} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold text-slate-900">Opskrifts Explorer</h1>
                                {isLoadingCloud ? (
                                    <div className="flex items-center gap-2 text-sm text-blue-600">
                                        <RefreshCw size={16} className="animate-spin" />
                                        <span>Henter fra sky...</span>
                                    </div>
                                ) : cloudRecipes.length > 0 ? (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <Cloud size={16} />
                                        <span>Sky forbundet</span>
                                    </div>
                                ) : cloudError ? (
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <Cloud size={16} />
                                        <span>Lokal mode</span>
                                    </div>
                                ) : null}
                                <button
                                    onClick={fetchCloudRecipes}
                                    disabled={isLoadingCloud}
                                    className="ml-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Opdater fra sky"
                                    aria-label="Opdater fra sky"
                                >
                                    <RefreshCw size={16} className={isLoadingCloud ? 'animate-spin' : ''} />
                                </button>
                            </div>
                            <p className="text-slate-600">
                                Find den perfekte opskrift til dit køkken
                            </p>
                        </div>
                    </div>
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Søg efter opskrift..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Primary Category Filter */}
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter size={20} className="text-slate-600" />
                        <h2 className="text-lg font-bold text-slate-900">Kategori</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {primaryCategories.map(cat => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedPrimary(cat.value)}
                                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg hover:scale-105 ${selectedPrimary === cat.value
                                    ? `${cat.color} text-white`
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.label}
                                <span className="ml-2 opacity-75">({getCategoryCount(cat.value)})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Meal Type & Style Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Meal Type */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                        <h3 className="text-base font-bold text-slate-900 mb-3">Rettype</h3>
                        <select
                            aria-label="Vælg rettype"
                            value={selectedMealType}
                            onChange={(e) => setSelectedMealType(e.target.value as MealType | 'Alle')}
                            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 font-semibold"
                        >
                            {mealTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Style */}
                    <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                        <h3 className="text-base font-bold text-slate-900 mb-3">Stil</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedStyle(null)}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedStyle === null
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                Alle
                            </button>
                            {styles.map(style => (
                                <button
                                    key={style}
                                    onClick={() => setSelectedStyle(style)}
                                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${selectedStyle === style
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            {filteredRecipes.length} Opskrifter
                        </h2>
                        {searchQuery && (
                            <p className="text-slate-600 text-sm">
                                Søger efter \\"{searchQuery}\\"
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            aria-label="Vis som kort"
                            title="Vis som kort"
                            className={`p-3 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-orange-500 text-white'
                                : 'bg-slate-200 text-slate-700'
                                }`}
                        >
                            <Grid3x3 size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            aria-label="Vis som liste"
                            title="Vis som liste"
                            className={`p-3 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-orange-500 text-white'
                                : 'bg-slate-200 text-slate-700'
                                }`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Recipe Grid/List */}
                {filteredRecipes.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-4 opacity-20">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-400 mb-2">Ingen opskrifter fundet</h3>
                        <p className="text-slate-500">Prøv at justere dine filtre eller søgning</p>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredRecipes.map((recipe, idx) => (
                            <RecipeCard key={idx} recipe={recipe} onClick={() => openRecipeModal(recipe)} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredRecipes.map((recipe, idx) => (
                            <RecipeListItem key={idx} recipe={recipe} onClick={() => openRecipeModal(recipe)} />
                        ))}
                    </div>
                )}
            </div>

            {/* Recipe Modal */}
            {selectedRecipe && (
                <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
            )}
        </div>
    );
};

// Recipe Card Component (Grid View)
const RecipeCard: React.FC<{ recipe: CategorizedRecipe; onClick: () => void }> = ({ recipe, onClick }) => {
    const getCategoryIcon = (primary: PrimaryCategory) => {
        const icons = {
            'Grise': '🐷',
            'Okse/Kalv': '🐄',
            'Fjerkræ': '🐔',
            'Fisk': '🐟',
            'Grønne': '🥗',
            'Diverse': '🥘'
        };
        return icons[primary] || '🍽️';
    };

    const getCategoryColor = (primary: PrimaryCategory) => {
        const colors = {
            'Grise': 'from-pink-400 to-pink-600',
            'Okse/Kalv': 'from-amber-500 to-amber-700',
            'Fjerkræ': 'from-yellow-400 to-yellow-600',
            'Fisk': 'from-blue-400 to-blue-600',
            'Grønne': 'from-green-400 to-green-600',
            'Diverse': 'from-purple-400 to-purple-600'
        };
        return colors[primary] || 'from-slate-400 to-slate-600';
    };

    return (
        <button
            onClick={onClick}
            className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-orange-400 hover:shadow-lg transition-all group text-left w-full"
        >
            <div className={`bg-gradient-to-br ${getCategoryColor(recipe.category.primary)} text-white text-4xl w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                {getCategoryIcon(recipe.category.primary)}
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                {recipe.recipeName}
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                    {recipe.category.primary}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg">
                    {recipe.category.mealType}
                </span>
            </div>

            {recipe.category.styles.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {recipe.category.styles.map(style => (
                        <span key={style} className="text-xs text-slate-500">#{style}</span>
                    ))}
                </div>
            )}
        </button>
    );
};

// Recipe List Item (List View)
const RecipeListItem: React.FC<{ recipe: CategorizedRecipe; onClick: () => void }> = ({ recipe, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-white rounded-xl p-4 border-2 border-slate-200 hover:border-orange-400 transition-all w-full text-left flex items-center gap-4"
        >
            <div className="text-3xl">{recipe.category.primary === 'Grise' ? '🐷' : recipe.category.primary === 'Fisk' ? '🐟' : '🍽️'}</div>
            <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">{recipe.recipeName}</h3>
                <div className="flex gap-2 text-sm text-slate-600">
                    <span>{recipe.category.primary}</span>
                    <span>•</span>
                    <span>{recipe.category.mealType}</span>
                    {recipe.category.styles.length > 0 && (
                        <>
                            <span>•</span>
                            <span>{recipe.category.styles.join(', ')}</span>
                        </>
                    )}
                </div>
            </div>
        </button>
    );
};

// Recipe Modal Component
const RecipeModal: React.FC<{ recipe: CategorizedRecipe; onClose: () => void }> = ({ recipe, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div
                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white border-b-2 border-slate-200 p-6 flex justify-between items-start rounded-t-3xl">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">{recipe.recipeName}</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-semibold rounded-lg">
                                {recipe.category.primary}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg">
                                {recipe.category.mealType}
                            </span>
                            {recipe.category.secondary && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg">
                                    {recipe.category.secondary}
                                </span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Luk"
                        title="Luk vindue"
                    >
                        <X size={24} className="text-slate-600" />
                    </button>
                </div>

                <div className="p-6">
                    {recipe.category.styles.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-slate-700 mb-2">Stil</h3>
                            <div className="flex flex-wrap gap-2">
                                {recipe.category.styles.map(style => (
                                    <span key={style} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                                        {style}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div className="mb-6">
                            <h3 className="font-semibold text-slate-700 mb-2">Ingredienser</h3>
                            <ul className="list-disc list-inside space-y-1 text-slate-600">
                                {recipe.ingredients.map((ing, idx) => (
                                    <li key={idx}>{ing}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">AI Confidence:</span>
                            <span className="font-bold text-slate-900">{recipe.category.confidence}%</span>
                        </div>
                        {recipe.category.autoTagged && (
                            <p className="text-xs text-slate-500 mt-2">
                                Automatisk kategoriseret af AI
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeExplorer;
