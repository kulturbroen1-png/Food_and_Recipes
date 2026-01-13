/**
 * MONTE CARLO RISK SIMULATION
 * 
 * Objective: Stress-test the V6 Budget (9.08 M DKK) against market and operational volatility.
 * Iterations: 10,000
 * 
 * Variables:
 * 1. Market Volatility (Price):
 *    - Meat: +/- 15% (High Risk)
 *    - Fish: +/- 12%
 *    - Veg/Dairy: +/- 8% (Medium Risk)
 * 
 * 2. Operational Volatility (Volume):
 *    - Dysphagia Population: Base 40% +/- 10% (i.e. 36% - 44% residents).
 */

import * as fs from 'fs/promises';
import * as path from 'path';

const INPUT_FILE = path.join(process.cwd(), 'public', 'yearly_ultimate_budget.json');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'monte_carlo_results.json');
const ITERATIONS = 10000;

// Risk Profiles (Standard Deviation as decimal, e.g. 0.15 = 15%)
const VOLATILITY = {
    MEAT: 0.15,
    FISH: 0.12,
    DAIRY_VEG: 0.08,
    SHELF: 0.05,
    DYSPHAGIA_POP: 0.10 // Variation in the Surhcarge component
};

interface DishV6 {
    proteinType: string;
    dyshagiaSurcharge: number; // Note: Typo in interface vs likely JSON structure, checking below
    weightedRealCost: number;
    // We need to support whatever the JSON actually has.
    // Based on analyzeMenuCardsV6: { dysphagiaSurcharge: number, weightedRealCost: number, proteinType: string ... }
}

interface UltimateBudget {
    yearSummary: { totalRealCost: number };
    months: { dishes: any[] }[];
}

// Box-Muller Transform for Normal Distribution
function randomNormal(mean: number, stdDev: number): number {
    const u1 = Math.random();
    const u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return mean + z0 * stdDev;
}

function getPriceVolatility(proteinType: string): number {
    const type = proteinType ? proteinType.toLowerCase() : '';
    if (type.includes('okse') || type.includes('svin') || type.includes('kalv')) return VOLATILITY.MEAT;
    if (type.includes('fisk')) return VOLATILITY.FISH;
    if (type.includes('vegetar') || type.includes('grød') || type.includes('suppe')) return VOLATILITY.DAIRY_VEG;
    return VOLATILITY.DAIRY_VEG; // Default
}

async function main() {
    console.log(`Initializing Monte Carlo Simulation (${ITERATIONS} runs)...`);

    // 1. Load Data
    const rawData = await fs.readFile(INPUT_FILE, 'utf-8');
    const budget: UltimateBudget = JSON.parse(rawData);

    // Flatten all dishes for faster iteration
    const allDishes = budget.months.flatMap(m => m.dishes);
    const baseTotal = budget.yearSummary.totalRealCost;

    console.log(`Baseline Budget: ${(baseTotal / 1000000).toFixed(2)} M DKK`);
    console.log(`Total Dishes: ${allDishes.length}`);

    // 2. Simulation Loop
    const results: number[] = [];

    for (let i = 0; i < ITERATIONS; i++) {
        let runTotal = 0;

        // Global Market Factors for this Year (Assumption: Prices trend together per category)
        const marketMeat = randomNormal(1.0, VOLATILITY.MEAT);
        const marketFish = randomNormal(1.0, VOLATILITY.FISH);
        const marketVeg = randomNormal(1.0, VOLATILITY.DAIRY_VEG);

        // Operational Factor (Did we get more dysphagia patients this year?)
        const opDysphagia = randomNormal(1.0, VOLATILITY.DYSPHAGIA_POP);

        for (const dish of allDishes) {
            // Price Factor Selection
            let priceFactor = marketVeg;
            const pType = dish.proteinType?.toLowerCase() || '';
            if (pType.includes('okse') || pType.includes('svin')) priceFactor = marketMeat;
            else if (pType.includes('fisk')) priceFactor = marketFish;

            // Calculate Base Cost (w/o surcharge)
            const basePart = dish.weightedRealCost - dish.dysphagiaSurcharge;

            // Apply Price Volatility to Base
            const simulatedBase = basePart * priceFactor;

            // Apply Price AND Volume Volatility to Surcharge
            // (The surcharge gets more expensive if ingredients up, AND if volume up)
            const simulatedSurcharge = dish.dysphagiaSurcharge * priceFactor * opDysphagia;

            runTotal += (simulatedBase + simulatedSurcharge);
        }
        results.push(runTotal);
    }

    // 3. Analysis
    results.sort((a, b) => a - b);

    const p50 = results[Math.floor(ITERATIONS * 0.50)];
    const p90 = results[Math.floor(ITERATIONS * 0.90)];
    const p99 = results[Math.floor(ITERATIONS * 0.99)];
    const min = results[0];
    const max = results[results.length - 1];

    const stats = {
        generatedAt: new Date().toISOString(),
        iterations: ITERATIONS,
        baseline: baseTotal,
        p50_Median: p50,
        p90_RiskAdjusted: p90,
        p99_WorstCase: p99,
        min,
        max,
        volatilityParams: VOLATILITY
    };

    console.log('='.repeat(50));
    console.log('MONTE CARLO RESULTS');
    console.log('='.repeat(50));
    console.log(`Baseline (V6):  ${(baseTotal / 1000000).toFixed(2)} M DKK`);
    console.log(`P50 (Median):   ${(p50 / 1000000).toFixed(2)} M DKK`);
    console.log(`P90 (Safe Cap): ${(p90 / 1000000).toFixed(2)} M DKK  <-- REC. BUDGET CEILING`);
    console.log(`P99 (Crisis):   ${(p99 / 1000000).toFixed(2)} M DKK`);

    await fs.writeFile(OUTPUT_FILE, JSON.stringify(stats, null, 2));
    console.log(`\nSimulation Saved to ${OUTPUT_FILE}`);
}

main().catch(console.error);
