
import React, { useState, useEffect } from 'react';
import NutritionService, { NutritionAnalysis } from '../../services/nutritionService';
import { RecipeData } from '../../types';
import { PieChart, Activity, Heart, AlertTriangle } from 'lucide-react';

interface Props {
    recipe?: RecipeData;
}

const NutritionTracker: React.FC<Props> = ({ recipe }) => {
    const [analysis, setAnalysis] = useState<NutritionAnalysis | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (recipe) {
            loadAnalysis();
        }
    }, [recipe]);

    const loadAnalysis = async () => {
        if (!recipe) return;
        setLoading(true);
        const data = await NutritionService.getInstance().analyzeRecipe(recipe);
        setAnalysis(data);
        setLoading(false);
    };

    if (!recipe) return <div className="p-4 text-center text-gray-500">Select a recipe to view nutrition analysis.</div>;
    if (loading) return <div className="p-4 text-center">Analyzing nutrition...</div>;
    if (!analysis) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                    <Activity size={24} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Nutrition Analysis</h3>
                    <p className="text-sm text-slate-500">Per portion (approx.)</p>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <NutrientCard label="Calories" value={`${Math.round(analysis.energyKcal)}`} unit="kcal" color="blue" />
                <NutrientCard label="Protein" value={`${analysis.protein.toFixed(1)}`} unit="g" color="green" />
                <NutrientCard label="Carbs" value={`${analysis.carbohydrates.toFixed(1)}`} unit="g" color="orange" />
                <NutrientCard label="Fat" value={`${analysis.fat.toFixed(1)}`} unit="g" color="red" />
            </div>

            <div className="space-y-4">
                <h4 className="font-semibold text-slate-700 flex items-center gap-2">
                    <Heart size={16} className="text-red-500" /> Health Insights
                </h4>
                <div className="grid gap-2">
                    {analysis.protein > 20 && <Badge type="success">High Protein</Badge>}
                    {analysis.fiber > 5 && <Badge type="success">High Fiber</Badge>}
                    {analysis.salt < 1 && <Badge type="success">Low Sodium</Badge>}
                    {analysis.saturatedFat > 5 && <Badge type="warning">High Saturated Fat</Badge>}
                </div>
            </div>
        </div>
    );
};

const NutrientCard = ({ label, value, unit, color }: any) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-700',
        green: 'bg-green-50 text-green-700',
        orange: 'bg-orange-50 text-orange-700',
        red: 'bg-red-50 text-red-700',
    };
    return (
        <div className={`p-4 rounded-lg ${colors[color]}`}>
            <div className="text-2xl font-bold">{value}<span className="text-xs ml-1">{unit}</span></div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-70">{label}</div>
        </div>
    );
};

const Badge = ({ children, type }: any) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {children}
    </span>
);

export default NutritionTracker;
