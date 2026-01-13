import React, { useRef, useMemo } from 'react';
import { january2026 } from '../services/mealPlanData';
import { MASTER_CHECKLIST } from '../services/instructionManifest';
import { getAllRecipes } from '../services/authenticRecipes';
import { getUserRecipes } from '../services/recipeStorage';
import { getHorkramPrice } from '../services/pricingService';
import { dataRelationshipStore } from '../services/dataRelationshipService';
import { Printer, ChefHat, ShoppingCart, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';
import './MenuPrintStyles.css';

const MonthlyProductionPackage: React.FC = () => {
  const contact = MASTER_CHECKLIST.DESIGN_LAYOUT.KONTAKT;
  const year = "2026";
  const monthName = "Januar";
  const monthData = january2026;

  const handlePrint = () => window.print();

  // Get all recipes used in this month
  const recipesUsed = useMemo(() => {
    const allRecipes = [...getAllRecipes(), ...getUserRecipes()];
    const recipeMap = new Map(allRecipes.map(r => [r.recipeName || r.name, r]));

    const uniqueRecipes = new Set<string>();
    monthData.forEach(day => {
      uniqueRecipes.add(day.dish);
      if (day.biret && !day.biret.includes('grød') && !day.biret.includes('kompot')) {
        // Try to extract recipe names from biret
        const biretMatch = day.biret.match(/([^,(]+)(?:\s*\([^)]*\))?/);
        if (biretMatch) {
          uniqueRecipes.add(biretMatch[1].trim());
        }
      }
    });

    return Array.from(uniqueRecipes)
      .map(recipeName => recipeMap.get(recipeName))
      .filter(recipe => recipe)
      .sort((a, b) => (a?.recipeName || a?.name || '').localeCompare(b?.recipeName || b?.name || ''));
  }, [monthData]);

  // Calculate procurement list
  const procurementList = useMemo(() => {
    const ingredientTotals: Record<string, { quantity: number, unit: string, cost: number, recipes: string[] }> = {};

    recipesUsed.forEach(recipe => {
      const ingredients = recipe?.ingredients || recipe?.recipeIngredients || [];
      const portions = recipe?.yield?.portions ? parseInt(recipe.yield.portions) : 1;

      ingredients.forEach((ing: any) => {
        const name = ing.name || ing.ingredientName;
        const quantity = (ing.quantity || ing.amount || 0) * portions;
        const unit = ing.unit || 'g';
        const cost = getHorkramPrice(name) * (quantity / 1000); // Convert to kg for pricing

        if (!ingredientTotals[name]) {
          ingredientTotals[name] = { quantity: 0, unit, cost: 0, recipes: [] };
        }

        ingredientTotals[name].quantity += quantity;
        ingredientTotals[name].cost += cost;
        if (!ingredientTotals[name].recipes.includes(recipe?.recipeName || recipe?.name)) {
          ingredientTotals[name].recipes.push(recipe?.recipeName || recipe?.name);
        }
      });
    });

    return Object.entries(ingredientTotals)
      .sort(([, a], [, b]) => b.cost - a.cost)
      .map(([name, data]) => ({ name, ...data }));
  }, [recipesUsed]);

  // Generate production schedule
  const productionSchedule = useMemo(() => {
    const schedule: Record<string, any[]> = {};

    monthData.forEach(day => {
      const dayKey = day.date.split(' (')[0];
      if (!schedule[dayKey]) schedule[dayKey] = [];

      // Main dish
      schedule[dayKey].push({
        time: '08:00',
        type: 'Hovedret',
        name: day.dish,
        quantity: '450 portioner',
        notes: `${day.protein}, ${day.sauce}, ${day.carb}, ${day.veg}`
      });

      // Biret
      if (day.biret) {
        schedule[dayKey].push({
          time: '11:00',
          type: 'Biret',
          name: day.biret,
          quantity: '450 portioner',
          notes: 'Dessert eller suppe'
        });
      }

      // Vegetarian option
      schedule[dayKey].push({
        time: '08:30',
        type: 'Vegetarisk',
        name: 'Vegetarisk alternativ',
        quantity: '25 portioner',
        notes: 'Særlig diæt'
      });
    });

    return schedule;
  }, [monthData]);

  const totalCost = procurementList.reduce((sum, item) => sum + item.cost, 0);
  const totalRecipes = recipesUsed.length;
  const totalIngredients = procurementList.length;

  return (
    <div className="flex flex-col items-center gap-10 bg-slate-200 p-10 print-bg-reset">

      {/* CONTROL PANEL */}
      <div className="no-print bg-white p-6 rounded-xl shadow-xl flex items-center justify-between w-full max-w-4xl fixed top-6 z-50 border border-slate-300">
        <h2 className="text-xl font-bold text-slate-700">Print Preview: {monthName} {year} Produktionspakke</h2>
        <button onClick={handlePrint} className="bg-[#1b5e20] text-white px-6 py-2 rounded font-bold shadow hover:bg-[#2e7d32] flex items-center gap-2">
          <Printer size={18} /> Print Produktionspakke
        </button>
      </div>
      <div className="h-20 no-print"></div>

      {/* COVER PAGE */}
      <div className="a4-page-landscape">
        <div className="header-box" style={{ background: 'linear-gradient(to right, #1b5e20, #2e7d32)' }}>
          <h1>{monthName.toUpperCase()} {year} - PRODUKTIONSPAKKE</h1>
          <h2>Breelteparken • Komplet månedlig produktionsplan</h2>
        </div>

        <div className="info-bar" style={{ background: '#e8f5e9', border: '2px solid #2e7d32' }}>
          <span className="contact-highlight" style={{ color: '#2e7d32' }}>📞 Køkkenet: {contact}</span> | Produktionsperiode: Hele {monthName.toLowerCase()} {year}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl border-2 border-slate-200 text-center">
            <div className="text-3xl font-black text-slate-800 mb-2">{totalRecipes}</div>
            <div className="text-sm font-bold text-slate-600 uppercase">Opskrifter</div>
            <div className="text-xs text-slate-500 mt-1">Alle retter i måneden</div>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-slate-200 text-center">
            <div className="text-3xl font-black text-slate-800 mb-2">{totalIngredients}</div>
            <div className="text-sm font-bold text-slate-600 uppercase">Ingredienser</div>
            <div className="text-xs text-slate-500 mt-1">Unikke råvarer</div>
          </div>
          <div className="bg-white p-6 rounded-xl border-2 border-slate-200 text-center">
            <div className="text-3xl font-black text-slate-800 mb-2">{new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(totalCost)}</div>
            <div className="text-sm font-bold text-slate-600 uppercase">Samlet Kost</div>
            <div className="text-xs text-slate-500 mt-1">Månedlig råvarebudget</div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-slate-50 rounded-xl border-2 border-slate-200">
          <h3 className="text-lg font-black text-slate-800 mb-4">📋 PAKKE INDEHOLDER:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <ChefHat className="text-blue-600" size={20} />
              <span className="font-bold">Daglig Produktionsplan</span>
            </div>
            <div className="flex items-center gap-3">
              <BookOpen className="text-green-600" size={20} />
              <span className="font-bold">Komplet Opskriftsamling</span>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-orange-600" size={20} />
              <span className="font-bold">Indkøbsliste & Budget</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-purple-600" size={20} />
              <span className="font-bold">Kvalitetskontrol & Tjeklister</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTION SCHEDULE */}
      <div className="a4-page-landscape">
        <div className="header-box" style={{ background: 'linear-gradient(to right, #1976d2, #2196f3)' }}>
          <h1>🗓️ DAGLIG PRODUKTIONSPLAN</h1>
          <h2>{monthName} {year} • Detaljeret køkkenplanlægning</h2>
        </div>


        {Object.entries(productionSchedule).map(([day, tasks]: [string, any[]]) => (
          <div key={day} className="mb-8">

            <h3 className="text-xl font-black text-slate-800 mb-4 border-b-2 border-slate-300 pb-2">
              {day} - Produktionsplan
            </h3>
            <div className="space-y-3">
              {tasks.map((task, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-100 px-3 py-1 rounded font-bold text-sm">{task.time}</div>
                    <div>
                      <div className="font-bold text-slate-800">{task.name}</div>
                      <div className="text-sm text-slate-600">{task.type} • {task.quantity}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-500 italic max-w-md">{task.notes}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RECIPES SECTION */}
      {recipesUsed.map((recipe, index) => (
        <div key={index} className="a4-page-landscape">
          <div className="header-box" style={{ background: 'linear-gradient(to right, #388e3c, #4caf50)' }}>
            <h1>📖 OPSKRIFT {index + 1}: {recipe?.recipeName || recipe?.name}</h1>
            <h2>MDS Standard • {recipe?.category || 'Hovedret'}</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-lg font-black mb-4">🥘 Ingredienser</h3>
              <div className="space-y-2">
                {(recipe?.ingredients || recipe?.recipeIngredients || []).map((ing: any, i: number) => (
                  <div key={i} className="flex justify-between py-1 border-b border-slate-100">
                    <span>{ing.name || ing.ingredientName}</span>
                    <span className="font-bold">{ing.quantity || ing.amount} {ing.unit || 'g'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black mb-4">📋 Tilberedning</h3>
              <div className="space-y-3">
                {(recipe?.steps || recipe?.instructions || []).map((step: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <div className="bg-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                    <div className="text-sm">{typeof step === 'string' ? step : step.description}</div>
                  </div>
                ))}
              </div>

              {recipe?.timeEstimate && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-800">⏱️ Tid: {recipe.timeEstimate}</div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><strong>Portioner:</strong> {recipe?.yield?.portions || 'N/A'}</div>
              <div><strong>Vægt/portion:</strong> {recipe?.yield?.finishedWeightPerPortion || 'N/A'}</div>
              <div><strong>Sværhedsgrad:</strong> {recipe?.difficulty || 'N/A'}</div>
              <div><strong>MDS ID:</strong> {recipe?.recipeNumber || recipe?.id || 'N/A'}</div>
            </div>
          </div>
        </div>
      ))}

      {/* PROCUREMENT LIST */}
      <div className="a4-page-landscape">
        <div className="header-box" style={{ background: 'linear-gradient(to right, #f57c00, #ff9800)' }}>
          <h1>🛒 INDKØBSLISTE & BUDGET</h1>
          <h2>{monthName} {year} • Komplet råvareoversigt</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
            <div className="text-2xl font-black text-orange-800">{totalIngredients}</div>
            <div className="text-sm font-bold text-orange-700">Unikke Ingredienser</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <div className="text-2xl font-black text-green-800">{new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(totalCost)}</div>
            <div className="text-sm font-bold text-green-700">Samlet Budget</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="text-2xl font-black text-blue-800">{totalRecipes}</div>
            <div className="text-sm font-bold text-blue-700">Opskrifter Dækket</div>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3 text-left font-bold border border-slate-300">Ingrediens</th>
              <th className="p-3 text-right font-bold border border-slate-300">Mængde</th>
              <th className="p-3 text-right font-bold border border-slate-300">Est. Pris</th>
              <th className="p-3 text-left font-bold border border-slate-300">Bruges i</th>
            </tr>
          </thead>
          <tbody>
            {procurementList.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="p-3 border border-slate-300 font-medium">{item.name}</td>
                <td className="p-3 border border-slate-300 text-right">{item.quantity.toLocaleString('da-DK')} {item.unit}</td>
                <td className="p-3 border border-slate-300 text-right font-bold text-green-600">
                  {new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(item.cost)}
                </td>
                <td className="p-3 border border-slate-300 text-sm">{item.recipes.slice(0, 2).join(', ')}{item.recipes.length > 2 ? '...' : ''}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-200 font-bold">
              <td className="p-3 border border-slate-300" colSpan={2}>TOTAL</td>
              <td className="p-3 border border-slate-300 text-right text-lg">
                {new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(totalCost)}
              </td>
              <td className="p-3 border border-slate-300"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* QUALITY CONTROL & CHECKLISTS */}
      <div className="a4-page-landscape">
        <div className="header-box" style={{ background: 'linear-gradient(to right, #7b1fa2, #9c27b0)' }}>
          <h1>✅ KVALITETSKONTROL & TJEKLISTER</h1>
          <h2>{monthName} {year} • HACCP & MDS Standarder</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              Daglig Klargøring
            </h3>
            <div className="space-y-3">
              {[
                'Tjek køleskabstemperaturer før start',
                'Klargør kantiner og låg til dagens afkøling',
                'MDS-ID mærkning skal ske straks ved pakning',
                'Kontrol af råvarekvalitet og holdbarhed',
                'Værktøj og udstyr rengøres og desinficeres'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-slate-300 rounded flex items-center justify-center">
                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-slate-200">
            <h3 className="text-lg font-black mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} />
              Hygiejne & Rengøring
            </h3>
            <div className="space-y-3">
              {[
                'Afspritning af bordoverflader efter kød-håndtering',
                'Opvask skal ske løbende for at undgå ophobning',
                'Affaldshåndtering: Husk sortering af plastik/pap',
                'Håndvask og desinfektion før fødevarehåndtering',
                'Slutrengøring og temperaturkontrol ved lukning'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-slate-300 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                    </div>
                    <span className="text-sm">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-50 rounded-xl border-2 border-red-200">
          <h3 className="text-lg font-black text-red-800 mb-4">🚨 Kritisk Information</h3>
          <ul className="space-y-2 text-red-700">
            <li><strong>Weekend & Helligdage:</strong> Køkkenet lukket. Hørsholm Beredskab leverer.</li>
            <li><strong>Fejl ved levering:</strong> Ring 45 80 33 55 omgående.</li>
            <li><strong>Pakkefejl:</strong> Kan ikke rettes på dagen. Anbefales at have nødret i fryseren.</li>
            <li><strong>Ændringer:</strong> Meddel køkkenet straks ved behov for tilpasninger.</li>
          </ul>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <div className="a4-page-landscape">
        <div className="contact-hero" style={{ background: 'linear-gradient(to right, #1b5e20, #2e7d32)' }}>
          <div className="contact-title">📋 {monthName.toUpperCase()} {year} - PRODUKTIONSOVERSIGT</div>
          <div className="contact-subtitle">Breelteparkens Køkken • Alt til månedlig succes</div>
        </div>

        <div className="info-container">
          <div className="info-col">
            <div className="info-card card-green">
              <span className="card-header" style={{ color: '#2e7d32' }}>🎯 PRODUKTIONSMÅL</span>
              <ul>
                <li><strong>100% Levering:</strong> Alle måltider til tiden</li>
                <li><strong>0 Fejl:</strong> Kvalitet og hygiejne i top</li>
                <li><strong>Budgetoverholdelse:</strong> Økonomisk ansvarlighed</li>
                <li><strong>Kundetilfredshed:</strong> Smil og glæde ved måltiderne</li>
              </ul>
            </div>
          </div>

          <div className="info-col">
            <div className="info-card card-blue">
              <span className="card-header" style={{ color: '#1565c0' }}>📞 KONTAKT & SUPPORT</span>
              <div className="text-center py-4">
                <div className="text-2xl font-black text-blue-800 mb-2">{contact}</div>
                <div className="text-sm text-blue-600">Telefontid: Hverdage kl. 12:00 - 13:00</div>
                <div className="text-sm text-blue-600 mt-2">Akut support: 45 80 33 55</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-greeting">
          <h2>👨‍🍳 Held og lykke med {monthName}!</h2>
          <div>Vi er klar til at støtte jer hele måneden</div>
        </div>
      </div>

    </div>
  );
};

export default MonthlyProductionPackage;