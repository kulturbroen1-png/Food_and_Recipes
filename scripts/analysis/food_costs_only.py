#!/usr/bin/env python3
"""
Clean analysis - FOOD COSTS ONLY
Filters out equipment, electricity, transport, etc.
"""

import pandas as pd
import glob
import os

data_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/scripts/DATA_2026_FEB'
csv_file = glob.glob(os.path.join(data_dir, '*.csv'))[0]

df = pd.read_csv(csv_file, encoding='utf-8', sep=';')

def clean_kr(val):
    if pd.isna(val) or val == '':
        return 0
    return float(str(val).replace('.', '').replace(',', '.'))

df['NettoKR'] = df['Nettobeløb'].apply(clean_kr)
df['BeløbKR'] = df['Beløb'].apply(clean_kr)

actual_data = df[df['Kontonr'].notna()].copy()

print('\n' + '=' * 80)
print('🍽️  FOOD COSTS ONLY - FILTERED ANALYSIS')
print('=' * 80)

# FOOD SUPPLIERS (primary indicators)
food_keywords = [
    'hørkram',
    'varekøb',
    'vare produktion',
    'varer produktion',
    'fødevare',
    'kød',
    'fisk',
    'grønt',
    'frugt',
    'mejeri',
    'bageri'
]

# NON-FOOD (to exclude)
exclude_keywords = [
    'kørsel',  # Transport
    'ørsted',  # Electricity
    'el ',
    'emballage',  # Packaging
    'printer',
    'iphone',
    'inventar',  # Equipment
    'service',
    'rengøring',  # Cleaning
    'tørre',  # Laundry
    'vaskeri',
    'gebyr',  # Fees
    'reparation',
    'rep ',
    'lift',
    'telefon',
    'komfur',
    'maskine',
    'udsugning',
    'skralde',  # Trash
    'toilet',
    'vaskepulver',
    'abonnement',
    'styrelsen',
    'fedtudskiller'
]

# Filter to food only
def is_food_cost(row):
    text = str(row['Posteringstekst']).lower() + ' ' + str(row['Navn']).lower()
    
    # Exclude non-food
    for exclude in exclude_keywords:
        if exclude in text:
            return False
    
    # Include food suppliers
    for food in food_keywords:
        if food in text:
            return True
    
    # Hørkram Foods products (starts with ØKO, specific ingredients)
    if 'hørkram foods' in text or text.startswith('øko '):
        return True
    
    return False

food_data = actual_data[actual_data.apply(is_food_cost, axis=1)].copy()

print(f'\n📊 Data Filtering:')
print(f'  Total transactions: {len(actual_data):,}')
print(f'  Food transactions: {len(food_data):,}')
print(f'  Filtered out: {len(actual_data) - len(food_data):,}')

# Calculate costs
monthly_food = food_data.groupby('Posteringstekst')['NettoKR'].sum()

print(f'\n💰 FOOD COSTS by Category:')
for cat, amount in monthly_food.items():
    if abs(amount) > 1000:  # Only significant amounts
        print(f'  {cat:40} {amount:>15,.2f} kr')

total_food = food_data['NettoKR'].sum()

print(f'\n' + '=' * 80)
print(f'💵 TOTAL FOOD COSTS: {total_food:,.2f} kr')
print(f'=' * 80)

# Try to separate by month
oct_food = food_data[food_data['Posteringstekst'].str.contains('okt', case=False, na=False)]['NettoKR'].sum()
nov_food = food_data[food_data['Posteringstekst'].str.contains('nov', case=False, na=False)]['NettoKR'].sum()
dec_food = food_data[food_data['Posteringstekst'].str.contains('dec', case=False, na=False)]['NettoKR'].sum()

print(f'\n📅 Monthly Food Costs:')
if oct_food != 0:
    print(f'  October:  {abs(oct_food):>12,.2f} kr')
if nov_food != 0:
    print(f'  November: {abs(nov_food):>12,.2f} kr')
if dec_food != 0:
    print(f'  December: {abs(dec_food):>12,.2f} kr')

# Calculate per-serving costs (assuming 450 pax, 30 days)
avg_monthly = abs(total_food) / 3  # Rough average over 3 months
daily_cost = avg_monthly / 30
per_serving = daily_cost / 450

print(f'\n📊 Cost per Serving Analysis:')
print(f'  Average monthly: {avg_monthly:,.2f} kr')
print(f'  Daily (450 pax): {daily_cost:,.2f} kr')
print(f'  Per serving: {per_serving:,.2f} kr')

# Compare to projection
projected_per_serving = 15.69
variance = ((per_serving - projected_per_serving) / projected_per_serving * 100)

print(f'\n🎯 vs Projected:')
print(f'  Projected: 15.69 kr/serving')
print(f'  Actual: {per_serving:.2f} kr/serving')
print(f'  Variance: {variance:+.1f}%')

# Annual projection
annual_food = avg_monthly * 12

print(f'\n📈 Annual Projection (FOOD ONLY):')
print(f'  {annual_food:,.2f} kr')

print('\n' + '=' * 80)

# Show sample of filtered data
print(f'\n📋 Sample FOOD transactions:')
print(food_data[['Posteringstekst', 'NettoKR']].head(20).to_string())

print('\n' + '=' * 80 + '\n')
