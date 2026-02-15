
import React, { useState } from 'react';
import MealPlanningService, { WeeklyMealPlan } from '../../services/mealPlanningService';
import { Calendar, RefreshCw, ShoppingCart } from 'lucide-react';

const MealPlanner: React.FC = () => {
    const [plan, setPlan] = useState<WeeklyMealPlan | null>(null);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {
        setLoading(true);
        const newPlan = await MealPlanningService.getInstance().generateWeeklyMealPlan(new Date());
        setPlan(newPlan);
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">Weekly Meal Plan</h3>
                    <p className="text-slate-500">AI-generated schedule based on preferences.</p>
                </div>
                <button
                    onClick={generatePlan}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    Generate New Plan
                </button>
            </div>

            {!plan && !loading && (
                <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
                    <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">No meal plan active. Generate one to get started!</p>
                </div>
            )}

            {plan && (
                <div className="grid lg:grid-cols-7 gap-4">
                    {Object.entries(plan.meals).map(([date, meals]) => (
                        <div key={date} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2">
                            <div className="font-bold text-center border-b pb-2 mb-2 text-slate-700">
                                {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                                <span className="block text-xs font-normal text-slate-400">
                                    {new Date(date).getDate()}
                                </span>
                            </div>
                            {(meals as any).dinner && (
                                <div className="bg-orange-50 p-2 rounded border border-orange-100">
                                    <div className="text-xs font-bold text-orange-800 uppercase mb-1">Dinner</div>
                                    <div className="text-sm font-medium text-slate-800 leading-tight">
                                        {(meals as any).dinner.recipe.recipeName}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {plan && plan.shoppingList.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-slate-200 mt-8">
                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <ShoppingCart size={20} className="text-indigo-600" />
                        Shopping List
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {plan.shoppingList.map((item, idx) => (
                            <label key={idx} className="flex items-center gap-2 text-sm p-2 hover:bg-slate-50 rounded cursor-pointer">
                                <input type="checkbox" className="rounded border-slate-300 text-indigo-600" />
                                <span className="truncate">{item.quantity} {item.unit} {item.ingredientName}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanner;
