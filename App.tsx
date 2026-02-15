import React, { useState } from 'react';
import AIMenuGenerator from './components/AIMenuGenerator';
import MenuSelector from './components/MenuSelector';
import RecipeExplorer from './components/RecipeExplorer';
import KitchenAssistant from './components/KitchenAssistant';
import BudgetDashboard from './components/BudgetDashboard';
import PredictiveHealthDashboard from './components/PredictiveHealthDashboard';
import ProductionPlan from './components/ProductionPlan';
import FullMenuCard from './components/FullMenuCard';
import YearlyMenuCard from './components/YearlyMenuCard';
import MonthlyProductionPackage from './components/MonthlyProductionPackage';
import MasterDataAdmin from './components/MasterDataAdmin';
import CategorizationDemo from './components/CategorizationDemo';
import RecipeUploadAdmin from './components/RecipeUploadAdmin';
import BudgetForecastDashboard from './components/BudgetForecastDashboard';
import AIIntegration from './components/AIIntegration';
import { martsTestPlan, martsALaCarte } from './services/martsTestPlan';
import { LayoutDashboard, Wand2, ChefHat, BookOpen, Wallet, Dna, ClipboardList, Calendar, Database, Sparkles, Brain } from 'lucide-react';
// import demoRecipes from './services/demoRecipeData';
import authenticRecipesRaw from './services/authenticRecipes.json';
import { CategorizedRecipe } from './services/recipeCategorizationService';

const authenticRecipes = authenticRecipesRaw as unknown as CategorizedRecipe[];

import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-menu' | 'ai-manager' | 'recipes' | 'explorer' | 'kitchen' | 'budget' | 'health' | 'production' | 'full-menu' | 'yearly-menu' | 'monthly-production' | 'admin' | 'budget-forecast'>('dashboard');

  // Placeholder handlers for Recipe Selector
  const handleRecipeSelect = (name: string, category: string) => {
    console.log(`Selected: ${name} (${category})`);
    alert(`Selected recipe: ${name}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-28">
      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-400 px-2 py-2 rounded-full shadow-2xl z-50 flex items-center gap-1 backdrop-blur-md bg-opacity-95 overflow-x-auto max-w-[95vw]">
        <NavButton
          active={activeTab === 'dashboard'}
          onClick={() => setActiveTab('dashboard')}
          icon={<LayoutDashboard size={20} />}
          label="Home"
        />
        <NavButton
          active={activeTab === 'full-menu'}
          onClick={() => setActiveTab('full-menu')}
          icon={<Calendar size={20} />}
          label="Menu Card"
        />
        <NavButton
          active={activeTab === 'yearly-menu'}
          onClick={() => setActiveTab('yearly-menu')}
          icon={<Calendar size={20} />}
          label="Helårs Menu"
        />
        <NavButton
          active={activeTab === 'ai-menu'}
          onClick={() => setActiveTab('ai-menu')}
          icon={<Wand2 size={20} />}
          label="AI Menu"
        />
        <NavButton
          active={activeTab === 'ai-manager'}
          onClick={() => setActiveTab('ai-manager')}
          icon={<Brain size={20} />}
          label="AI Core"
        />
        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        <NavButton
          active={activeTab === 'recipes'}
          onClick={() => setActiveTab('recipes')}
          icon={<BookOpen size={20} />}
          label="Library"
        />
        <NavButton
          active={activeTab === 'explorer'}
          onClick={() => setActiveTab('explorer')}
          icon={<Sparkles size={20} />}
          label="Explorer"
        />
        <NavButton
          active={activeTab === 'kitchen'}
          onClick={() => setActiveTab('kitchen')}
          icon={<ChefHat size={20} />}
          label="Kitchen"
        />
        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        <NavButton
          active={activeTab === 'budget'}
          onClick={() => setActiveTab('budget')}
          icon={<Wallet size={20} />}
          label="Budget"
        />
        <NavButton
          active={activeTab === 'health'}
          onClick={() => setActiveTab('health')}
          icon={<Dna size={20} />}
          label="Health"
        />
        <NavButton
          active={activeTab === 'production'}
          onClick={() => setActiveTab('production')}
          icon={<ClipboardList size={20} />}
          label="Plan"
        />
        <NavButton
          active={activeTab === 'monthly-production'}
          onClick={() => setActiveTab('monthly-production')}
          icon={<ClipboardList size={20} />}
          label="Produktionspakke"
        />
        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        <NavButton
          active={activeTab === 'admin'}
          onClick={() => setActiveTab('admin')}
          icon={<Database size={20} />}
          label="Data"
        />
        <NavButton
          active={activeTab === 'budget-forecast'}
          onClick={() => setActiveTab('budget-forecast')}
          icon={<Wallet size={20} />}
          label="📊 Forecast"
        />
      </nav>

      <main className="container mx-auto pt-10 px-4">
        {activeTab === 'dashboard' && <Dashboard onNavigate={(tab: any) => setActiveTab(tab)} />}
        {activeTab === 'ai-menu' && <AIMenuGenerator />}
        {activeTab === 'ai-manager' && <AIIntegration />}
        {activeTab === 'recipes' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-8 px-4">Recipe Library</h2>
            <MenuSelector onSelect={handleRecipeSelect} />
          </div>
        )}
        {activeTab === 'explorer' && (
          <RecipeExplorer recipes={authenticRecipes} onSelectRecipe={(recipe) => console.log(recipe)} />
        )}
        {activeTab === 'kitchen' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-8 px-4">Kitchen Production</h2>
            <KitchenAssistant />
          </div>
        )}
        {activeTab === 'budget' && (
          <div className="max-w-6xl mx-auto">
            <BudgetDashboard />
          </div>
        )}
        {activeTab === 'health' && (
          <div className="max-w-6xl mx-auto">
            <PredictiveHealthDashboard recipe={{ recipeName: 'Demo Ret: Brændende Kærlighed', ingredients: [{ name: 'Kartofler' }, { name: 'Bacon' }, { name: 'Løg' }] }} />
          </div>
        )}
        {activeTab === 'production' && (
          <div className="max-w-7xl mx-auto">
            <ProductionPlan />
          </div>
        )}
        {activeTab === 'full-menu' && (
          <div className="max-w-[210mm] mx-auto">
            <FullMenuCard monthData={martsTestPlan} monthName="Marts" aLaCarte={martsALaCarte} />
          </div>
        )}
        {activeTab === 'yearly-menu' && (
          <div className="max-w-[210mm] mx-auto">
            <YearlyMenuCard />
          </div>
        )}
        {activeTab === 'monthly-production' && (
          <div className="max-w-[210mm] mx-auto">
            <MonthlyProductionPackage />
          </div>
        )}
        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <RecipeUploadAdmin />
            <CategorizationDemo />
            <MasterDataAdmin />
          </div>
        )}
        {activeTab === 'budget-forecast' && <BudgetForecastDashboard />}
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-wider whitespace-nowrap
      ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' : 'hover:bg-slate-800 hover:text-white'}
    `}
  >
    {icon}
    <span className={`${active ? 'block' : 'hidden lg:block'}`}>{label}</span>
  </button>
);

export default App;