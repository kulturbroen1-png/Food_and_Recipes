import React, { useState } from 'react';
import { Play, Check, Sparkles, Clock } from 'lucide-react';
import { getCategorizationService, CategorizedRecipe, CategorizationProgress } from '../services/recipeCategorizationService';

const sampleRecipes = [
    { name: 'Frikadeller med kartofler og brun sovs', ingredients: ['Svinekød', 'Kartofler', 'Brun sovs'] },
    { name: 'Gammeldags ris à l\'amande', ingredients: ['Ris', 'Fløde', 'Mandler'] },
    { name: 'Stegt rødspætte med persillesovs', ingredients: ['Rødspætte', 'Kartofler', 'Persillesovs'] },
    { name: 'Hakkebøf med løg', ingredients: ['Oksekød', 'Løg', 'Brun sovs'] },
    { name: 'Kyllingesuppe med grønsager', ingredients: ['Kylling', 'Gulerødder', 'Porrer'] },
    { name: 'Bønner i tomatsauce', ingredients: ['Hvide bønner', 'Tomat', 'Løg'] },
    { name: 'Flæskesteg med rødkål', ingredients: ['Svinekød', 'Rødkål', 'Kartofler'] },
    { name: 'Gulerodskage', ingredients: ['Gulerødder', 'Mel', 'Sukker'] },
    { name: 'Risengrød', ingredients: ['Ris', 'Mælk', 'Kanel'] },
    { name: 'Kalvesteg med sky', ingredients: ['Kalvekød', 'Kartofler', 'Sky'] },
];

const CategorizationDemo: React.FC = () => {
    const [categorizedRecipes, setCategorizedRecipes] = useState<CategorizedRecipe[]>([]);
    const [progress, setProgress] = useState<CategorizationProgress | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const runCategorization = async () => {
        setIsRunning(true);
        setIsDone(false);
        setCategorizedRecipes([]);

        try {
            const service = getCategorizationService();

            const results = await service.categorizeBatch(sampleRecipes, (p) => {
                setProgress(p);
            });

            setCategorizedRecipes(results);
            setIsDone(true);
        } catch (error) {
            console.error('Categorization failed:', error);
            alert(`Fejl: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8 space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 p-3 rounded-xl">
                        <Sparkles size={32} />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold">AI Kategoriserings Demo</h1>
                        <p className="text-orange-100">
                            Test Gemini AI's evne til at kategorisere danske opskrifter automatisk
                        </p>
                    </div>
                </div>
            </div>

            {/* Demo Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Sådan Virker Det</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">1</div>
                        <div>
                            <h3 className="font-bold text-slate-900">AI Analyserer</h3>
                            <p className="text-sm text-slate-600">Gemini læser opskriftsnavn og ingredienser</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">2</div>
                        <div>
                            <h3 className="font-bold text-slate-900">Intelligent Kategorisering</h3>
                            <p className="text-sm text-slate-600">Tildeler kategori, rettype, og stil</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">3</div>
                        <div>
                            <h3 className="font-bold text-slate-900">Klar til Brug</h3>
                            <p className="text-sm text-slate-600">Resultater kan bruges i Recipe Explorer</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sample Recipes */}
            <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Demo Opskrifter ({sampleRecipes.length} stk)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {sampleRecipes.slice(0, 6).map((recipe, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-slate-50 p-3 rounded-lg">
                            <span className="text-2xl">📝</span>
                            <span className="text-sm font-medium text-slate-700">{recipe.name}</span>
                        </div>
                    ))}
                </div>

                {/* Run Button */}
                <button
                    onClick={runCategorization}
                    disabled={isRunning}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 ${isRunning
                        ? 'bg-slate-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl hover:scale-105'
                        }`}
                >
                    {isRunning ? (
                        <>
                            <Clock className="animate-spin" size={24} />
                            Kategoriserer... ({progress?.processed || 0}/{progress?.total || 0})
                        </>
                    ) : isDone ? (
                        <>
                            <Check size={24} />
                            Færdig! Kør Igen
                        </>
                    ) : (
                        <>
                            <Play size={24} />
                            Start AI Kategorisering
                        </>
                    )}
                </button>
            </div>

            {/* Progress */}
            {progress && isRunning && (
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-orange-200">
                    <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-slate-900">Progress</span>
                        <span className="text-slate-600">
                            {Math.round((progress.processed / progress.total) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-300"
                            style={{ width: `${(progress.processed / progress.total) * 100}%` }}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-center text-sm">
                        <div>
                            <div className="text-2xl font-bold text-slate-900">{progress.processed}</div>
                            <div className="text-slate-600">Behandlet</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{progress.successful}</div>
                            <div className="text-slate-600">Succesfuld</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-red-600">{progress.failed}</div>
                            <div className="text-slate-600">Fejlet</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Results */}
            {categorizedRecipes.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Kategoriserede Resultater ✅
                    </h2>
                    <div className="space-y-4">
                        {categorizedRecipes.map((recipe, idx) => (
                            <div key={idx} className="bg-slate-50 rounded-xl p-4 border-2 border-slate-200">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-slate-900">{recipe.recipeName}</h3>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-semibold">
                                        {recipe.category.confidence}% sikker
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-lg">
                                        {recipe.category.primary}
                                    </span>
                                    {recipe.category.secondary && (
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg">
                                            {recipe.category.secondary}
                                        </span>
                                    )}
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-lg">
                                        {recipe.category.mealType}
                                    </span>
                                    {recipe.category.styles.map(style => (
                                        <span key={style} className="px-3 py-1 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg">
                                            {style}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(
                            categorizedRecipes.reduce((acc, r) => {
                                acc[r.category.primary] = (acc[r.category.primary] || 0) + 1;
                                return acc;
                            }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                            <div key={category} className="bg-white border-2 border-slate-200 rounded-xl p-4 text-center">
                                <div className="text-2xl font-bold text-orange-600">{count}</div>
                                <div className="text-sm text-slate-600">{category}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategorizationDemo;
