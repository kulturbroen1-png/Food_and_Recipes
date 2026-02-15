
import React, { useState } from 'react';
import AIService from '../../services/aiService';
import { RecipeData } from '../../types';
import { Sparkles, ChefHat, ArrowRight } from 'lucide-react';

const RecipeGenerator: React.FC = () => {
    const [ingredients, setIngredients] = useState('');
    const [suggestions, setSuggestions] = useState<RecipeData[]>([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        const result = await AIService.getInstance().suggestRecipes({}, ingredients.split(','));
        setSuggestions(result);
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-black text-slate-900 mb-2">AI Recipe Generator</h2>
                <p className="text-slate-500">Enter ingredients you have, and let AI suggest recipes.</p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex gap-2">
                <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="e.g. chicken, tomato, basil..."
                    className="flex-1 px-4 py-3 bg-transparent outline-none text-lg"
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Sparkles className="animate-spin" /> : <Sparkles />}
                    Generate
                </button>
            </div>

            <div className="space-y-4">
                {suggestions.map((recipe, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow cursor-pointer flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                                <ChefHat size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors">{recipe.recipeName}</h4>
                                <p className="text-sm text-slate-500">{recipe.category} • {recipe.timeEstimate || '30 min'}</p>
                            </div>
                        </div>
                        <ArrowRight className="text-slate-300 group-hover:text-indigo-600" />
                    </div>
                ))}
                {suggestions.length === 0 && !loading && ingredients && (
                    <p className="text-center text-slate-400">No suggestions found. Try different ingredients.</p>
                )}
            </div>
        </div>
    );
};

export default RecipeGenerator;
