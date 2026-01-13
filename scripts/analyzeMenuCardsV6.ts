import * as fs from 'fs/promises';
import * as path from 'path';
import { SHRINKAGE_DATA, getShrinkage, calculateRawWeight } from '../services/cookingShrinkage.ts';
import { PORTION_STANDARDS, getPortionWeight } from '../services/portionStandards.ts';
import { analyzeDishSensory } from '../services/sensoryProfile.ts';
import type { SensoryProfile } from '../services/sensoryProfile.ts';
import { checkCulturalCompliance, isLivret } from '../services/culturalCalendar.ts';
import { checkSeasonality } from '../services/seasonalCompliance.ts';
import { calculateNutritionalCompliance } from '../services/nutritionalCompliance.ts';
import { optimizeDishComposition } from '../services/menuOptimizer.ts';
import type { OptimizedResult } from '../services/menuOptimizer.ts';
import { calculateDysphagiaCost } from '../services/dysphagiaService.ts';
import { estimateDishCO2 } from '../services/climateService.ts';

// --- CONFIGURATION ---
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'yearly_ultimate_budget.json');

// --- INTERFACES ---
interface PriceEntry {
    varenummer: string;
    navn: string;
    pris: number;
    enhed: string;
    kategori: string;
    source: string;
}

interface DishCostV6 {
    dish: string;
    date: string;
    proteinType: string;

    // Costs
    baseOptimizedCost: number; // Cost of 100% Normal (Optimized)
    weightedRealCost: number; // Cost of 60% Normal + 40% Dysphagia
    dysphagiaSurcharge: number; // The difference

    // Climate
    co2PerPortionKg: number;
    climateRating: 'Low' | 'Medium' | 'High';

    // Metadata
    optimizationActions: string[];
    complianceIssues: string[];
}

interface MonthSummaryV6 {
    month: string;
    totalDays: number;
    totalRealCost: number;
    totalDysphagiaSurcharge: number;
    totalCO2Tonnes: number;
    dishes: DishCostV6[];
}

// --- 2025 PRICING ---
async function loadPrices(): Promise<Record<string, PriceEntry>> {
    try {
        const raw = await fs.readFile(path.join(process.cwd(), 'public', 'horkram_2025_prices.json'), 'utf-8');
        const prices: PriceEntry[] = JSON.parse(raw);
        const priceMap: Record<string, PriceEntry> = {};
        for (const p of prices) { priceMap[p.navn.toLowerCase()] = p; }
        return priceMap;
    } catch (error) { return {}; }
}

function findPrice(query: string, prices: Record<string, PriceEntry>): number | null {
    if (!query) return null;
    const lowerQuery = query.toLowerCase();
    if (prices[lowerQuery]) return prices[lowerQuery].pris;
    const keys = Object.keys(prices);
    const match = keys.find(k => k.includes(lowerQuery) || lowerQuery.includes(k));
    return match ? prices[match].pris : null;
}

const BASE_PROTEIN_COSTS_2025: Record<string, number> = {
    'Okse/Kalv': 150, 'Svin': 120, 'Fjerkræ': 120, 'Fisk': 160, 'Indmad': 100, 'Vegetar': 80, 'Grød': 40, 'Suppe': 60
};

interface MealDay {
    date: string;
    dayName: string;
    dish: string;
    type: string;
    biret: string;
    soup: string;
    carb: string;
    veg: string;
    isHoliday: boolean;
}

// Wrapper function that runs the V5 Logic THEN the V6 Polish
function analyzeDishV6(day: MealDay, prices: Record<string, PriceEntry>, portions: number = 450): DishCostV6 {
    const typeKey = day.type || 'Svin';
    const baseProteinPrice = BASE_PROTEIN_COSTS_2025[typeKey] || 100;

    // 1. Identify Prices
    const proteinPrice = findPrice(day.dish, prices) || baseProteinPrice;
    const carbPrice = findPrice(day.carb, prices) || 15;
    const vegPrice = findPrice(day.veg, prices) || 30;
    const saucePrice = 45;
    const biretPrice = 30;

    // 2. Weights & Svind
    const isMash = day.carb ? day.carb.toLowerCase().includes('mos') : false;
    const isSoup = day.type === 'Suppe';

    const portionsServed = {
        protein: getPortionWeight('protein', isSoup),
        carb: getPortionWeight('carb', isSoup, isMash),
        veg: getPortionWeight('veg', isSoup),
        sauce: getPortionWeight('sauce', isSoup),
        biret: getPortionWeight('biret', isSoup)
    };

    const shrinkageProtein = getShrinkage(day.dish);
    const rawWeights = {
        protein: calculateRawWeight(portionsServed.protein, shrinkageProtein),
        carb: calculateRawWeight(portionsServed.carb, 0),
        veg: calculateRawWeight(portionsServed.veg, 15),
        sauce: calculateRawWeight(portionsServed.sauce, 15),
        biret: portionsServed.biret
    };

    // 3. Costs (V4 Original)
    const costPerPortion = {
        protein: (proteinPrice * rawWeights.protein) / 1000,
        carb: (carbPrice * rawWeights.carb) / 1000,
        veg: (vegPrice * rawWeights.veg) / 1000,
        sauce: (saucePrice * rawWeights.sauce) / 1000,
        biret: (biretPrice * rawWeights.biret) / 1000
    };
    const v4CostPerPortion = Object.values(costPerPortion).reduce((a, b) => a + b, 0);

    // 4. Compliance Check & Optimization (V5)
    const ingredients = [day.dish, day.carb, day.veg, day.biret].filter(Boolean) as string[];
    const nutriCheck = calculateNutritionalCompliance(day.dish, rawWeights.protein, day.carb || 'Kartofler', portionsServed.carb, portionsServed.sauce);
    const sensoryProfile = analyzeDishSensory(ingredients);
    const baseCompliance = {
        protein: nutriCheck.isCompliant,
        energy: nutriCheck.profile.energyKJ > 2000,
        sensory: sensoryProfile.isBalanced
    };

    const optimization = optimizeDishComposition(baseCompliance, rawWeights.protein, proteinPrice, day.dish);
    const v5OptimizedCostPerPortion = v4CostPerPortion + optimization.costImpactPerPortion;

    // --- 5. THE 1% POLISH (V6) ---

    // A. Dysphagia Multiplier
    // Assume: 60% eats the V5 Optimized Normal Menu, 40% eats a Texture-Modified version (Gratin/Blendet) which costs MORE.
    const dysphagiaCalc = calculateDysphagiaCost(day.dish, v5OptimizedCostPerPortion, { normal: 0.60, dysphagia: 0.40 });
    const realWeightedCostPerPortion = dysphagiaCalc.weightedTotalCost;

    // B. Climate Impact
    const climateCalc = estimateDishCO2(
        day.dish, rawWeights.protein,
        day.carb || 'Kartofler', rawWeights.carb,
        rawWeights.veg, rawWeights.sauce
    );

    return {
        dish: day.dish,
        date: day.date,
        proteinType: day.type,

        baseOptimizedCost: v5OptimizedCostPerPortion * portions,
        weightedRealCost: realWeightedCostPerPortion * portions,
        dysphagiaSurcharge: dysphagiaCalc.dysphagiaSurcharge * portions,

        co2PerPortionKg: climateCalc.totalCO2,
        climateRating: climateCalc.rating,

        optimizationActions: optimization.actions,
        complianceIssues: dysphagiaCalc.textureMode === 'Gratin-Required' ? ['Requires Gratin Production'] : []
    };
}

interface MonthData { label: string; data: MealDay[]; }

async function main() {
    console.log('Analyzing yearly menu cards (V6 ULTIMATE - Dysphagia & CO2)...\n');

    const prices = await loadPrices();
    const mealPlanModule = await import('../services/mealPlanData.ts');
    const yearlyPlan: Record<string, MonthData> = mealPlanModule.yearlyPlan2026;

    const monthlyResults: MonthSummaryV6[] = [];
    let totalRealCost = 0;
    let totalDysphagiaSurcharge = 0;
    let totalCO2Tonnes = 0;
    let totalDays = 0;

    for (const [monthKey, monthData] of Object.entries(yearlyPlan)) {
        const dishes: DishCostV6[] = [];
        let mCost = 0;
        let mSurcharge = 0;
        let mCO2 = 0; // kg

        for (const day of monthData.data) {
            const res = analyzeDishV6(day, prices);
            dishes.push(res);

            mCost += res.weightedRealCost;
            mSurcharge += res.dysphagiaSurcharge;
            mCO2 += (res.co2PerPortionKg * 450); // Total kg for all portions
        }

        monthlyResults.push({
            month: monthData.label,
            totalDays: monthData.data.length,
            totalRealCost: mCost,
            totalDysphagiaSurcharge: mSurcharge,
            totalCO2Tonnes: mCO2 / 1000,
            dishes
        });

        totalRealCost += mCost;
        totalDysphagiaSurcharge += mSurcharge;
        totalCO2Tonnes += (mCO2 / 1000);
        totalDays += monthData.data.length;

        console.log(`${monthData.label}: Cost ${(mCost / 1000000).toFixed(2)}M. CO2: ${(mCO2 / 1000).toFixed(1)} tonnes.`);
    }

    // Write results
    const results = {
        generatedAt: new Date().toISOString(),
        standard: "2025_ULTIMATE_V6",
        yearSummary: {
            totalDays,
            totalRealCost,
            totalDysphagiaSurcharge,
            totalCO2Tonnes,
            avgCO2PerPortionKg: (totalCO2Tonnes * 1000) / (totalDays * 450)
        },
        months: monthlyResults
    };

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(results, null, 2));

    console.log('='.repeat(50));
    console.log('YEARLY SUMMARY 2025 (ULTIMATE)');
    console.log('='.repeat(50));
    console.log(`REAL BUDGET (Optimized + Dysphagia): ${totalRealCost.toLocaleString('da-DK', { maximumFractionDigits: 0 })} kr`);
    console.log(`  - Of which Dysphagia Surcharge: ${totalDysphagiaSurcharge.toLocaleString('da-DK', { maximumFractionDigits: 0 })} kr`);
    console.log(`CLIMATE IMPACT: ${totalCO2Tonnes.toFixed(1)} tonnes CO2e`);
    console.log(`  - Avg per meal: ${results.yearSummary.avgCO2PerPortionKg.toFixed(2)} kg CO2e`);

    console.log(`\n✅ "The 1% Polish" Complete.`);
}

main().catch(console.error);
