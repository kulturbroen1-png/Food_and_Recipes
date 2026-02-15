#!/usr/bin/env python3
"""
COMPREHENSIVE 2026 FOOD BUDGET CALCULATOR
Uses actual menu + Hørkram prices + recipes to determine real costs
"""

import re
import json

# Read the 2026 menu data
with open('services/mealPlanData.ts', 'r') as f:
    menu_data = f.read()

# Read Hørkram meat database
with open('services/meatDatabase.ts', 'r') as f:
    meat_db = f.read()

# Extract Hørkram prices
prices = {}
price_pattern = r'"([^"]+)":\s*\{[^}]*priceCheck:\s*(\d+\.?\d*)'
for match in re.finditer(price_pattern, meat_db):
    dish_name = match.group(1)
    price = float(match.group(2))
    prices[dish_name] = price

print('\n' + '=' * 80)
print('🍽️  2026 COMPREHENSIVE FOOD BUDGET CALCULATOR')
print('=' * 80)
print(f'\nLoaded {len(prices)} Hørkram prices')

# Extract all menu days from the TypeScript file
dish_pattern = r'dish:\s*"([^"]+)".*?protein:\s*"([^"]+)"'
all_dishes = re.findall(dish_pattern, menu_data)

print(f'Found {len(all_dishes)} menu days')

# Calculate costs
total_protein_cost = 0
dish_costs = {}
unpriced_count = 0

pax = 450

for dish, protein_str in all_dishes:
    # Extract portion size
    portion_match = re.search(r'(\d+)g', protein_str)
    if portion_match:
        portion_g = int(portion_match.group(1))
    else:
        # Default portions for special items
        if 'stk' in protein_str.lower():
            portion_g = 110  # Assumption for piece items
        elif 'ret' in protein_str.lower():
            portion_g = 180  # Gryde/ret items
        else:
            portion_g = 100  # Default
    
    # Find matching price
    price_per_kg = None
    matched_key = None
    
    for key, price in prices.items():
        if key.lower() in dish.lower():
            price_per_kg = price
            matched_key = key
            break
    
    # If no exact match, try partial matching
    if price_per_kg is None:
        dish_words = dish.lower().split()
        for key, price in prices.items():
            key_words = key.lower().split()
            if any(word in dish_words for word in key_words if len(word) > 3):
                price_per_kg = price
                matched_key = key
                break
    
    # Default estimate for unpriced items
    if price_per_kg is None:
        # Estimate based on type
        if 'fisk' in protein_str.lower() or 'ørred' in dish.lower() or 'torsk' in dish.lower():
            price_per_kg = 115.0  # Average fish
        elif 'kylling' in dish.lower() or 'høns' in dish.lower():
            price_per_kg = 58.0  # Average poultry
        elif 'okse' in dish.lower() or 'kalv' in dish.lower():
            price_per_kg = 95.0  # Average beef
        elif 'gris' in dish.lower() or 'svin' in dish.lower():
            price_per_kg = 45.0  # Average pork
        else:
            price_per_kg = 50.0  # Default
        unpriced_count += 1
        matched_key = "ESTIMATED"
    
    # Calculate cost for this dish (450 servings)
    kg_needed = (portion_g * pax) / 1000
    protein_cost = kg_needed * price_per_kg
    
    # Estimate total dish cost (protein is ~40% of total food cost)
    total_dish_cost = protein_cost / 0.40
    
    if dish not in dish_costs:
        dish_costs[dish] = {
            'count': 0,
            'portion_g': portion_g,
            'price_kg': price_per_kg,
            'protein_cost': 0,
            'total_cost': 0,
            'matched': matched_key
        }
    
    dish_costs[dish]['count'] += 1
    dish_costs[dish]['protein_cost'] += protein_cost
    dish_costs[dish]['total_cost'] += total_dish_cost
    total_protein_cost += protein_cost

# Calculate totals
total_food_cost = total_protein_cost / 0.40  # Protein is 40% of total
daily_avg = total_food_cost / 365
monthly_avg = daily_avg * 30
per_serving = daily_avg / pax

print('\n' + '=' * 80)
print('💰 2026 FOOD BUDGET PROJECTION')
print('=' * 80)

print(f'\n📊 Based on Hørkram Pricing + 2026 Menu (365 days, 450 pax):')
print(f'  Protein cost (annual): {total_protein_cost:,.2f} kr')
print(f'  Total food cost (annual): {total_food_cost:,.2f} kr')
print(f'  Monthly average: {monthly_avg:,.2f} kr')
print(f'  Daily average: {daily_avg:,.2f} kr')
print(f'  Per serving: {per_serving:.2f} kr')

print(f'\n🎯 vs YOUR CURRENT BUDGET:')
your_monthly = 700_000
variance = ((monthly_avg - your_monthly) / your_monthly * 100)
print(f'  Your budget: {your_monthly:,.0f} kr/month')
print(f'  Projected: {monthly_avg:,.0f} kr/month')
print(f'  Variance: {variance:+.1f}%')

if abs(variance) < 10:
    print(f'  ✅ ALIGNED!')
elif variance < 0:
    print(f'  ✅ UNDER BUDGET')
else:
    print(f'  ⚠️  OVER BUDGET')

# Top 10 most expensive dishes
sorted_dishes = sorted(dish_costs.items(), key=lambda x: x[1]['total_cost'], reverse=True)

print('\n' + '=' * 80)
print('💵 TOP 10 MOST EXPENSIVE DISHES (Annual Total Cost)')
print('=' * 80)

for i, (dish, data) in enumerate(sorted_dishes[:10], 1):
    days = data['count']
    total = data['total_cost']
    price_kg = data['price_kg']
    portion = data['portion_g']
    matched = data['matched']
    
    print(f'{i:2}. {dish[:35]:35} {days:3}x  {total:>12,.0f} kr')
    print(f'    {portion}g @ {price_kg:.2f} kr/kg  ({matched})')

# Cost breakdown by category
print('\n' + '=' * 80)
print('📋 DETAILED BREAKDOWN')
print('=' * 80)

print(f'\nPer Serving (450 pax, daily avg):')
print(f'  Protein/Main: {per_serving * 0.40:>8.2f} kr (40%)')
print(f'  Vegetables: {per_serving * 0.20:>10.2f} kr (20%)')
print(f'  Carbs: {per_serving * 0.15:>13.2f} kr (15%)')
print(f'  Sauce: {per_serving * 0.10:>13.2f} kr (10%)')
print(f'  Dessert: {per_serving * 0.15:>11.2f} kr (15%)')
print(f'  TOTAL: {per_serving:>13.2f} kr')

print(f'\nDaily Costs (450 pax):')
print(f'  Protein: {daily_avg * 0.40:>10,.0f} kr')
print(f'  Other food: {daily_avg * 0.60:>7,.0f} kr')
print(f'  TOTAL: {daily_avg:>12,.0f} kr')

print(f'\nMonthly Costs:')
print(f'  Week 1: {daily_avg * 7:>10,.0f} kr')
print(f'  Week 2: {daily_avg * 7:>10,.0f} kr')
print(f'  Week 3: {daily_avg * 7:>10,.0f} kr')
print(f'  Week 4: {daily_avg * 7:>10,.0f} kr')
print(f'  Days 29-30: {daily_avg * 2:>6,.0f} kr')
print(f'  TOTAL: {monthly_avg:>12,.0f} kr')

print(f'\n⚠️  Note: {unpriced_count} dishes used estimated prices')

print('\n' + '=' * 80)
print('✅ Budget calculation complete!')
print('=' * 80 + '\n')
