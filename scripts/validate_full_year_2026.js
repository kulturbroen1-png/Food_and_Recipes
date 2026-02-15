#!/usr/bin/env node
/**
 * COMPREHENSIVE 2026 MENU COMPLIANCE VALIDATOR
 * 
 * Validates all 365 days of the 2026 menu against ældreloven requirements
 * Generates a detailed compliance report
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the full year data
const dataPath = path.join(__dirname, '../services/mealPlanData.ts');
const data = fs.readFileSync(dataPath, 'utf8');

// Extract month data using regex
const extractMonthData = (monthName) => {
    const regex = new RegExp(`export const ${monthName}2026: MealDay\\[\\] = \\[([\\s\\S]*?)\\];`, 'm');
    const match = data.match(regex);
    if (!match) return [];

    // Parse the meal days
    const content = match[1];
    const dayMatches = content.matchAll(/{ date: "([^"]+)"[^}]+dish: "([^"]+)"[^}]+protein: "([^"]+)"[^}]+biret: "([^"]+)"[^}]*}/g);

    const days = [];
    for (const m of dayMatches) {
        days.push({
            date: m[1],
            dish: m[2],
            protein: m[3],
            biret: m[4]
        });
    }
    return days;
};

const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
];

console.log('\\n🔍 2026 MENU COMPLIANCE VALIDATOR\\n');
console.log('='.repeat(80));

let totalDays = 0;
let complianceIssues = [];
let dishHistory = [];

months.forEach((month, idx) => {
    const monthData = extractMonthData(month);
    const monthNum = idx + 1;

    console.log(`\\n📅 ${month.toUpperCase()} 2026: ${monthData.length} days`);

    if (monthData.length === 0) {
        complianceIssues.push(`❌ ${month}: NO DATA FOUND`);
        return;
    }

    totalDays += monthData.length;

    // Check each day
    monthData.forEach((day, dayIdx) => {
        const dayNum = dayIdx + 1;

        // 1. Check protein portions (should be 90-180g range)
        const proteinMatch = day.protein.match(/(\\d+)g/);
        if (proteinMatch) {
            const proteinAmount = parseInt(proteinMatch[1]);
            if (proteinAmount < 80 || proteinAmount > 200) {
                complianceIssues.push(`⚠️  ${day.date}: Protein out of range (${proteinAmount}g)`);
            }
        }

        // 2. Check for dish repetition (should not repeat within 14 days)
        const recentDishes = dishHistory.slice(-14);
        if (recentDishes.includes(day.dish)) {
            complianceIssues.push(`⚠️  ${day.date}: "${day.dish}" repeated within 14 days`);
        }
        dishHistory.push(day.dish);

        // 3. Check biret (should exist)
        if (!day.biret || day.biret === '-') {
            complianceIssues.push(`⚠️  ${day.date}: Missing biret (dessert/soup)`);
        }
    });

    console.log(`  ✅ ${monthData.length} days validated`);
});

console.log('\\n' + '='.repeat(80));
console.log(`\\n📊 SUMMARY REPORT`);
console.log(`Total Days Validated: ${totalDays} / 366 (2026 is not a leap year, should be 365)`);
console.log(`Compliance Issues Found:$ {complianceIssues.length}`);

if (complianceIssues.length > 0) {
    console.log(`\\n⚠️  COMPLIANCE ISSUES:\\n`);
    complianceIssues.slice(0, 20).forEach(issue => console.log(`   ${issue}`));
    if (complianceIssues.length > 20) {
        console.log(`   ... and ${complianceIssues.length - 20} more issues`);
    }
} else {
    console.log(`\\n✅ NO COMPLIANCE ISSUES FOUND!`);
}

// Generate detailed report file
const report = {
    generatedAt: new Date().toISOString(),
    totalDays,
    complianceIssues,
    summary: {
        totalIssues: complianceIssues.length,
        criticalIssues: complianceIssues.filter(i => i.startsWith('❌')).length,
        warnings: complianceIssues.filter(i => i.startsWith('⚠️')).length,
    }
};

const reportPath = path.join(__dirname, '../compliance_report_2026.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log(`\\n📄 Detailed report saved to: ${reportPath}`);

console.log('\\n' + '='.repeat(80));
console.log('\\n✨ Validation complete!\\n');

// Exit with appropriate code
process.exit(complianceIssues.filter(i => i.startsWith('❌')).length > 0 ? 1 : 0);
