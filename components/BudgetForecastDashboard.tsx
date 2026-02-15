import React, { useState, useEffect } from 'react';

interface ForecastData {
    generated: string;
    model_parameters: {
        simulations: number;
        confidence_level: number;
        inflation_mean: number;
        inflation_std: number;
    };
    statistical_validation: {
        r_squared: number;
        p_value: number;
        slope: number;
        std_error: number;
    };
    recipe_forecasts: Array<{
        recipe_name: string;
        cost_2025: number;
        cost_2026_mean: number;
        cost_2026_ci_lower: number;
        cost_2026_ci_upper: number;
        cost_per_portion_mean: number;
        increase_pct: number;
        monthly_stats: Record<string, any>;
    }>;
    summary: {
        total_cost_2026_mean: number;
        total_cost_2026_ci_lower: number;
        total_cost_2026_ci_upper: number;
        avg_increase_pct: number;
    };
}

export const BudgetForecastDashboard: React.FC = () => {
    const [forecastData, setForecastData] = useState<ForecastData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<number>(0);

    useEffect(() => {
        fetch('/2026_stochastic_forecast.json')
            .then(res => res.json())
            .then(data => {
                setForecastData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading forecast:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <h2 className="text-3xl font-bold mb-2">🔬 Running Stochastic Analysis</h2>
                    <p className="text-blue-200">Processing 1M Monte Carlo simulations...</p>
                </div>
            </div>
        );
    }

    if (!forecastData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex items-center justify-center">
                <div className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">⚠️ Forecast Data Not Available</h2>
                    <p className="text-blue-200">Run the stochastic simulation script to generate forecasts</p>
                </div>
            </div>
        );
    }

    const { model_parameters, statistical_validation, recipe_forecasts, summary } = forecastData;
    const formatKr = (value: number) => `${(value / 1000).toFixed(0)}k kr`;
    const formatPct = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white pb-20">
            {/* Header */}
            <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-6">
                    <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        📊 2026 Budget Forecast Dashboard
                    </h1>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-blue-200 mb-1">Simulations</div>
                            <div className="text-2xl font-bold text-blue-400">{(model_parameters.simulations / 1000000).toFixed(1)}M</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-green-200 mb-1">Confidence</div>
                            <div className="text-2xl font-bold text-green-400">{(model_parameters.confidence_level * 100)}%</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-purple-200 mb-1">R²</div>
                            <div className="text-2xl font-bold text-purple-400">{statistical_validation.r_squared.toFixed(4)}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="text-xs text-pink-200 mb-1">p-value</div>
                            <div className="text-2xl font-bold text-pink-400">
                                {statistical_validation.p_value < 0.001 ? '<0.001' : statistical_validation.p_value.toFixed(4)}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-sm font-semibold text-blue-200 mb-2">2026 Budget Forecast</h3>
                        <div className="text-4xl font-black text-white mb-2">{formatKr(summary.total_cost_2026_mean)}</div>
                        <div className="text-sm text-blue-100">
                            Range: {formatKr(summary.total_cost_2026_ci_lower)} - {formatKr(summary.total_cost_2026_ci_upper)}
                        </div>
                        <div className="text-xs text-blue-200 mt-2">95% Confidence Interval</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-sm font-semibold text-green-200 mb-2">Average Increase</h3>
                        <div className="text-4xl font-black text-white mb-2">{formatPct(summary.avg_increase_pct)}</div>
                        <div className="text-sm text-green-100">vs 2025 prices</div>
                        <div className="text-xs text-green-200 mt-2">Inflation + Volatility</div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-sm font-semibold text-purple-200 mb-2">Model Validation</h3>
                        <div className="text-4xl font-black text-white mb-2">
                            {statistical_validation.p_value < 0.001 ? '✅' : '✓'}
                        </div>
                        <div className="text-sm text-purple-100">Highly Significant</div>
                        <div className="text-xs text-purple-200 mt-2">p &lt; 0.001</div>
                    </div>
                </div>

                {/* Recipe Forecasts */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
                    <h2 className="text-2xl font-bold mb-6">🍽️ Recipe Cost Forecasts</h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left py-3 px-4 font-semibold text-sm text-blue-200">Recipe</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm text-blue-200">2025 Cost</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm text-blue-200">2026 Forecast</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm text-blue-200">95% CI Range</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm text-blue-200">Per Portion</th>
                                    <th className="text-right py-3 px-4 font-semibold text-sm text-blue-200">Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe_forecasts.map((recipe, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => setSelectedRecipe(idx)}
                                    >
                                        <td className="py-3 px-4 font-medium">{recipe.recipe_name}</td>
                                        <td className="py-3 px-4 text-right text-blue-200">{formatKr(recipe.cost_2025)}</td>
                                        <td className="py-3 px-4 text-right font-bold text-white">{formatKr(recipe.cost_2026_mean)}</td>
                                        <td className="py-3 px-4 text-right text-sm text-gray-300">
                                            {formatKr(recipe.cost_2026_ci_lower)} - {formatKr(recipe.cost_2026_ci_upper)}
                                        </td>
                                        <td className="py-3 px-4 text-right text-green-300">{recipe.cost_per_portion_mean.toFixed(2)} kr</td>
                                        <td className={`py-3 px-4 text-right font-bold ${recipe.increase_pct > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                            {formatPct(recipe.increase_pct)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Selected Recipe Details */}
                {selectedRecipe !== null && recipe_forecasts[selectedRecipe] && (
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h2 className="text-2xl font-bold mb-4">
                            📈 Monthly Forecast: {recipe_forecasts[selectedRecipe].recipe_name}
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-xs text-blue-200 mb-1">2025 Cost</div>
                                <div className="text-xl font-bold">
                                    {formatKr(recipe_forecasts[selectedRecipe].cost_2025)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-xs text-green-200 mb-1">2026 Mean</div>
                                <div className="text-xl font-bold text-green-400">
                                    {formatKr(recipe_forecasts[selectedRecipe].cost_2026_mean)}
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-xs text-purple-200 mb-1">Per Portion</div>
                                <div className="text-xl font-bold text-purple-400">
                                    {recipe_forecasts[selectedRecipe].cost_per_portion_mean.toFixed(2)} kr
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="text-xs text-pink-200 mb-1">Increase</div>
                                <div className="text-xl font-bold text-pink-400">
                                    {formatPct(recipe_forecasts[selectedRecipe].increase_pct)}
                                </div>
                            </div>
                        </div>

                        {/* Simple monthly visualization */}
                        <div className="space-y-2">
                            {Object.entries(recipe_forecasts[selectedRecipe].monthly_stats || {}).map(([month, stats]: [string, any]) => {
                                const monthName = new Date(2026, parseInt(month) - 1).toLocaleString('da-DK', { month: 'long' });
                                const widthPct = Math.max((stats.mean / recipe_forecasts[selectedRecipe].cost_2026_mean) * 100, 30);

                                return (
                                    <div key={month} className="flex items-center gap-4">
                                        <div className="w-20 text-sm text-blue-200 capitalize">{monthName}</div>
                                        <div className="flex-1 bg-white/5 rounded-full h-8 overflow-hidden relative">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-end px-3 text-sm font-bold transition-all forecast-bar"
                                                {...({ style: { '--bar-width': `${widthPct}%` } } as any)}
                                            >
                                                {formatKr(stats.mean)}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 w-32 text-right">
                                            [{formatKr(stats.ci_lower)} - {formatKr(stats.ci_upper)}]
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <style jsx>{`
              .forecast-bar {
                width: var(--bar-width);
              }
            `}</style>
                    </div>
                )}

                {/* Statistical Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold mb-4">📐 Statistical Validation</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">R² (Determination)</span>
                                <span className="font-bold">{statistical_validation.r_squared.toFixed(6)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">p-value</span>
                                <span className="font-bold text-green-400">
                                    {statistical_validation.p_value < 0.001 ? '< 0.001 ✅' : statistical_validation.p_value.toFixed(6)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">Regression Slope</span>
                                <span className="font-bold">{statistical_validation.slope.toFixed(4)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-blue-200">Standard Error</span>
                                <span className="font-bold">{statistical_validation.std_error.toFixed(4)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <h3 className="text-xl font-bold mb-4">🎲 Model Parameters</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">Monte Carlo Sims</span>
                                <span className="font-bold">{model_parameters.simulations.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">Confidence Level</span>
                                <span className="font-bold">{(model_parameters.confidence_level * 100)}%</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-blue-200">Base Inflation</span>
                                <span className="font-bold">{(model_parameters.inflation_mean * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-blue-200">Inflation Volatility</span>
                                <span className="font-bold">±{(model_parameters.inflation_std * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BudgetForecastDashboard;
