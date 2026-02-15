
import React, { useState } from 'react';
import NutritionTracker from './ai/NutritionTracker';
import MealPlanner from './ai/MealPlanner';
import RecipeGenerator from './ai/RecipeGenerator';
import { ChefHat, Calendar, Activity, Sparkles } from 'lucide-react';

const AIIntegration: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'planner' | 'generator' | 'nutrition'>('planner');

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="text-center py-10 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-3xl shadow-2xl mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-black tracking-tight mb-4">CaterCare AI Core</h1>
                    <p className="text-lg text-indigo-200 max-w-2xl mx-auto font-medium">
                        Next-gen kitchen intelligence. Plan meals, analyze nutrition, and generate recipes with advanced AI.
                    </p>
                </div>
            </header>

            <div className="flex justify-center gap-4 mb-8">
                <TabButton
                    active={activeSection === 'planner'}
                    onClick={() => setActiveSection('planner')}
                    icon={<Calendar size={20} />}
                    label="Meal Planner"
                />
                <TabButton
                    active={activeSection === 'generator'}
                    onClick={() => setActiveSection('generator')}
                    icon={<Sparkles size={20} />}
                    label="AI Generator"
                />
                <TabButton
                    active={activeSection === 'nutrition'}
                    onClick={() => setActiveSection('nutrition')}
                    icon={<Activity size={20} />}
                    label="Nutrition Lab"
                />
            </div>

            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl min-h-[600px]">
                {activeSection === 'planner' && <MealPlanner />}
                {activeSection === 'generator' && <RecipeGenerator />}
                {activeSection === 'nutrition' && (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-4">Nutrition Analysis Lab</h3>
                        <p className="mb-8 text-slate-500">Select a recipe to analyze its nutritional breakdown.</p>
                        <NutritionTracker recipe={{
                            recipeName: 'Demo Analysis: Grilled Salmon',
                            recipeNumber: '001',
                            category: 'Demo',
                            levnedsmiddelNr: '',
                            yield: { portions: '1', rawWeightPerPortion: '200g', finishedWeightPerPortion: '180g' },
                            timeEstimate: '20m',
                            difficulty: 'Medium',
                            storageNotes: '',
                            specialRequirements: '',
                            varedeklaration: '',
                            productionNotes: '',
                            ingredients: [
                                { name: 'Salmon', quantity: 150, unit: 'g', grossQuantity: 150, scaling: '100%' },
                                { name: 'Olive Oil', quantity: 10, unit: 'ml', grossQuantity: 10, scaling: '100%' },
                                { name: 'Lemon', quantity: 20, unit: 'g', grossQuantity: 20, scaling: '100%' },
                                { name: 'Asparagus', quantity: 100, unit: 'g', grossQuantity: 100, scaling: '100%' }
                            ],
                            steps: []
                        }} />
                    </div>
                )}
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
    <button
        onClick={onClick}
        className={`
            flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold
            ${active
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}
        `}
    >
        {icon}
        <span>{label}</span>
    </button>
);

export default AIIntegration;
