#!/usr/bin/env python3
"""
Compare ACTUAL vs PROJECTED costs
"""

import pandas as pd
import glob
import os

data_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/scripts/DATA_2026_FEB'
csv_file = glob.glob(os.path.join(data_dir, '*.csv'))[0]

df = pd.read_csv(csv_file, encoding='utf-8', sep=';')

# Clean numeric columns
def clean_kr(val):
    if pd.isna(val) or val == '':
        return 0
    return float(str(val).replace('.', '').replace(',', '.'))

df['NettoKR'] = df['Nettobeløb'].apply(clean_kr)
df['BeløbKR'] = df['Beløb'].apply(clean_kr)

# Get monthly totals (excluding header row)
actual_data = df[df['Kontonr'].notna()].copy()

print('\n' + '=' * 80)
print('💰 ACTUAL VS PROJECTED - BUDGET COMPARISON')
print('=' * 80)

print('\n📊 ACTUAL DATA (from Posteringer):\n')

# Group by month from description
monthly_costs = actual_data.groupby('Posteringstekst')['NettoKR'].sum()
print(monthly_costs.to_string())

total_actual = actual_data['NettoKR'].sum()
transactions = len(actual_data)

print(f'\n📈 Summary:')
print(f'  Total Transactions: {transactions:,}')
print(f'  Total Amount: {total_actual:,.2f} kr')
print(f'  Average per transaction: {total_actual/transactions:,.2f} kr')

# Our projection from budget analysis
projected_monthly = 7_060 * 30  # Daily cost × 30 days
projected_annual = 2_577_052

print(f'\n' + '=' * 80)
print('📊 COMPARISON')
print('=' * 80)

print(f'\n🎯 PROJECTED (from our analysis):')
print(f'  Monthly (30 days): {projected_monthly:,.2f} kr')
print(f'  Daily: 7,060.00 kr')
print(f'  Per serving (450 pax): 15.69 kr')

# Try to extract monthly costs from actual data
monthly_actuals = {}
for text, amount in monthly_costs.items():
    if 'nov' in str(text).lower():
        monthly_actuals['November'] = abs(amount)
    elif 'okt' in str(text).lower():
        monthly_actuals['October'] = abs(amount)
    elif 'dec' in str(text).lower():
        monthly_actuals['December'] = abs(amount)

if monthly_actuals:
    print(f'\n💵 ACTUAL MONTHLY COSTS:')
    for month, cost in monthly_actuals.items():
        print(f'  {month}: {cost:,.2f} kr')
        days_in_month = 30  # Rough estimate
        daily_actual = cost / days_in_month
        pax_cost = daily_actual / 450
        
        variance = ((cost - projected_monthly) / projected_monthly * 100)
        
        print(f'    Daily: {daily_actual:,.2f} kr')
        print(f'    Per serving: {pax_cost:,.2f} kr')
        print(f'    Variance from projection: {variance:+.1f}%\n')

# Overall comparison
avg_monthly_actual = sum(monthly_actuals.values()) / len(monthly_actuals) if monthly_actuals else 0
if avg_monthly_actual > 0:
    variance_pct = ((avg_monthly_actual - projected_monthly) / projected_monthly * 100)
    print('=' * 80)
    print(f'\n🎯 OVERALL ACCURACY:')
    print(f'  Projected monthly: {projected_monthly:,.2f} kr')
    print(f'  Actual avg monthly: {avg_monthly_actual:,.2f} kr')
    print(f'  Variance: {variance_pct:+.1f}%')
    
    if abs(variance_pct) < 10:
        print(f'  ✅ EXCELLENT - Within 10% accuracy')
    elif abs(variance_pct) < 20:
        print(f'  ✅ GOOD - Within 20% accuracy')
    else:
        print(f'  ⚠️  NEEDS ADJUSTMENT - Over 20% variance')
    
    # Adjust annual projection
    adjusted_annual = avg_monthly_actual * 12
    print(f'\n📊 ADJUSTED ANNUAL PROJECTION:')
    print(f'  Original: {projected_annual:,.2f} kr')
    print(f'  Adjusted: {adjusted_annual:,.2f} kr')
    print(f'  Difference: {(adjusted_annual - projected_annual):+,.2f} kr')

print('\n' + '=' * 80 + '\n')
