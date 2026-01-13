import React, { useState } from 'react';
import AIMenuGenerator from './components/AIMenuGenerator';
import MenuSelector from './components/MenuSelector';
import KitchenAssistant from './components/KitchenAssistant';
import BudgetDashboard from './components/BudgetDashboard';
import PredictiveHealthDashboard from './components/PredictiveHealthDashboard';
import ProductionPlan from './components/ProductionPlan';
import FullMenuCard from './components/FullMenuCard';
import YearlyMenuCard from './components/YearlyMenuCard';
import MonthlyProductionPackage from './components/MonthlyProductionPackage';
import MasterDataAdmin from './components/MasterDataAdmin';
import { january2026 } from './services/mealPlanData';
import { LayoutDashboard, Wand2, ChefHat, BookOpen, Wallet, Dna, ClipboardList, Calendar, Database } from 'lucide-react';

// Dashboard component (The "Splash" screen)
const Dashboard: React.FC = () => (
  <div className="text-center py-20 animate-in fade-in duration-700">
    <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">CaterCare Ultimate</h1>
    <p className="text-2xl text-slate-500 font-light mb-12">Next-Gen Food Management System</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
      {/* Existing Cards */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-blue-500 transition-all group">
        <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <Wand2 size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">AI Menu Planning</h3>
        <p className="text-slate-400">Generate complete meal plans, optimized for nutrition and seasonality.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-orange-500 transition-all group">
        <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <BookOpen size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Recipe Library</h3>
        <p className="text-slate-400">Manage standard recipes, import from files, and track MDS compliance.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-green-500 transition-all group">
        <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <ChefHat size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Kitchen Ops</h3>
        <p className="text-slate-400">Real-time production assistant, waste tracking, and ingredient management.</p>
      </div>

      {/* New Cards */}
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-emerald-500 transition-all group">
        <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <Wallet size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Budget Control</h3>
        <p className="text-slate-400">Real-time financial dashboard and waste simulation.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-purple-500 transition-all group">
        <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <Dna size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Predictive Health</h3>
        <p className="text-slate-400">Advanced patient-specific nutrition analysis and prevention.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:border-indigo-500 transition-all group">
        <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
          <ClipboardList size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">Production Plan</h3>
        <p className="text-slate-400">Digital production schedules and kitchen management.</p>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'ai-menu' | 'recipes' | 'kitchen' | 'budget' | 'health' | 'production' | 'full-menu' | 'yearly-menu' | 'monthly-production' | 'admin'>('dashboard');

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
        <div className="w-px h-6 bg-slate-700 mx-1"></div>
        <NavButton
          active={activeTab === 'recipes'}
          onClick={() => setActiveTab('recipes')}
          icon={<BookOpen size={20} />}
          label="Library"
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
      </nav>

      <main className="container mx-auto pt-10 px-4">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'ai-menu' && <AIMenuGenerator />}
        {activeTab === 'recipes' && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-black mb-8 px-4">Recipe Library</h2>
            <MenuSelector onSelect={handleRecipeSelect} />
          </div>
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
            <FullMenuCard monthData={january2026} monthName="Januar" />
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
          <div className="max-w-6xl mx-auto">
            <MasterDataAdmin />
          </div>
        )}
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-5 py-3 rounded-full transition-all font-bold text-xs uppercase tracking-wider whitespace-nowrap
      ${active ? 'bg-blue-600 text-white shadow-lg scale-105' : 'hover:bg-slate-800 hover:text-white'}
    `}
  >
    {icon}
    <span className={`${active ? 'block' : 'hidden lg:block'}`}>{label}</span>
  </button>
);

export default App;