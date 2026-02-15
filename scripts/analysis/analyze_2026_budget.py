#!/usr/bin/env python3
"""
2026 FULL YEAR BUDGET ANALYZER
Calculates costs based on menu plan, 450 pax, and Hørkram pricing
"""

import re

# Hørkram Meat Prices (from meatDatabase.ts)
MEAT_PRICES = {
    # Pork
    "Ribbensteg": 45.00,
    "Mørbrad": 69.95,
    "Koteletter": 55.00,
    "Frikadeller": 38.00,
    "Forloren Hare": 38.00,
    "Boller i karry": 38.00,
    "Stegt Flæsk": 52.00,
    "Karbonader": 38.00,
    "Krebinet": 38.00,
    "Gule Ærter": 48.00,
    # Beef
    "Millionbøf": 65.00,
    "Kalvesteg": 110.00,
    "Oksesteg": 95.00,
    "Bankekød": 85.00,
    "Ungarsk Gullasch": 88.00,
    "Wienerschnitzel": 135.00,
    "Lammekølle": 125.00,
    # Poultry
    "Kylling i Karry": 58.00,
    "Høns i asparges": 62.00,
    "Andebryst": 120.00,
    "Kalkungryde": 65.00,
    "Kylling i Peberrod": 58.00,
    "Kyllingelår BBQ": 28.00,
    "Kyllingefrikassé": 58.00,
    "Sprængt Kylling": 58.00,
    # Fish
    "Stegt Rødspætte": 75.00,
    "Dampet Torsk": 140.00,
    "Bagt Torsk": 140.00,
    "Ovnbagt Laks": 125.00,
    "Dampet Ørred": 115.00,
    "Bagt Ørred": 115.00,
    "Stegt Ørred": 115.00,
    "Ovnbagt Ørred": 115.00,
}

# Average portion sizes (grams of raw protein per serving)
PORTION_SIZES = {
    "low": 90,    # Fish, most pork/beef
    "medium": 110,  # Larger cuts
    "high": 180,    # Stews/gryderetter
}

# Read menu data
with open('/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/services/mealPlanData.ts', 'r') as f:
    content = f.read()

# Extract all dishes from the year
dish_pattern = r'dish: "([^"]+)".*?protein: "([^"]+)"'
matches = re.findall(dish_pattern, content)

print('\n' + '=' * 80)
print('💰 2026 FULL YEAR BUDGET ANALYSIS')
print('=' * 80)
print(f'\n📊 Production Volume: 450 covers/day')
print(f'📅 Days: 365')
print(f'🍽️  Total servings: {450 * 365:,}\n')

# Calculate costs
protein_costs = {}
total_protein_cost = 0
unpriced_dishes = set()

for dish, protein_str in matches:
    # Extract portion size
    portion_match = re.search(r'(\d+)g', protein_str)
    if portion_match:
        portion_g = int(portion_match.group(1))
    else:
        portion_g = 100  # Default
    
    # Find matching price
    price_per_kg = None
    for key, price in MEAT_PRICES.items():
        if key.lower() in dish.lower():
            price_per_kg = price
            break
    
    if price_per_kg is None:
        unpriced_dishes.add(dish)
        price_per_kg = 50.00  # Estimate for missing items
    
    # Calculate cost for this dish (1 day, 450 servings)
    kg_needed = (portion_g * 450) / 1000
    day_cost = kg_needed * price_per_kg
    
    if dish not in protein_costs:
        protein_costs[dish] = {
            'count': 0,
            'portion_g': portion_g,
            'price_kg': price_per_kg,
            'total_cost': 0
        }
    
    protein_costs[dish]['count'] += 1
    protein_costs[dish]['total_cost'] += day_cost
    total_protein_cost += day_cost

# Sort by total cost
sorted_dishes = sorted(protein_costs.items(), key=lambda x: x[1]['total_cost'], reverse=True)

print('=' * 80)
print('🥩 TOP 10 MOST EXPENSIVE DISHES (Annual Cost)')
print('=' * 80)
for i, (dish, data) in enumerate(sorted_dishes[:10], 1):
    days = data['count']
    total = data['total_cost']
    price_kg = data['price_kg']
    portion = data['portion_g']
    print(f'{i:2}. {dish:30} - {days:3} days × {price_kg:6.2f} kr/kg = {total:10,.2f} kr')
    print(f'    ({portion}g portions, ~{(portion * 450) / 1000:.1f} kg/day)')

print('\n' + '=' * 80)
print('💵 BUDGET SUMMARY')
print('=' * 80)
print(f'Protein Cost (Annual):        {total_protein_cost:15,.2f} kr')
print(f'Protein Cost (Daily avg):     {total_protein_cost / 365:15,.2f} kr')
print(f'Protein Cost (Per serving):   {total_protein_cost / (450 * 365):15,.2f} kr')

# Estimate total food cost (protein is typically 40-50% of total food cost)
estimated_total_food = total_protein_cost / 0.45  # Assume protein is 45%
print(f'\n📦 ESTIMATED TOTAL FOOD COST')
print(f'Total Food Cost (Annual):     {estimated_total_food:15,.2f} kr')
print(f'Total Food Cost (Daily):      {estimated_total_food / 365:15,.2f} kr')
print(f'Total Food Cost (Per serving):{estimated_total_food / (450 * 365):15,.2f} kr')

print('\n' + '=' * 80)
print('📋 COST BREAKDOWN BY PROTEIN TYPE')
print('=' * 80)

categories = {
    'Pork': ['Ribbensteg', 'Mørbrad', 'Koteletter', 'Frikadeller', 'Stegt Flæsk', 'Karbonader', 'Krebinet', 'Forloren Hare', 'Boller i karry'],
    'Beef': ['Kalvesteg', 'Oksesteg', 'Bankekød', 'Ungarsk Gullasch', 'Wienerschnitzel', 'Lammekølle'],
    'Poultry': ['Kylling', 'Høns', 'Andebryst', 'Kalkun'],
    'Fish': ['Ørred', 'Torsk', 'Laks', 'Rødspætte']
}

for category, keywords in categories.items():
    cat_cost = sum(
        data['total_cost']
        for dish, data in protein_costs.items()
        if any(kw.lower() in dish.lower() for kw in keywords)
    )
    cat_days = sum(
        data['count']
        for dish, data in protein_costs.items()
        if any(kw.lower() in dish.lower() for kw in keywords)
    )
    if cat_days > 0:
        print(f'{category:15} {cat_days:3} days  {cat_cost:12,.2f} kr  ({(cat_cost/total_protein_cost*100):5.1f}%)')

print('\n' + '=' * 80)

if unpriced_dishes:
    print('\n⚠️  DISHES WITHOUT PRICING DATA (estimated at 50 kr/kg):')
    for dish in sorted(unpriced_dishes)[:10]:
        print(f'  • {dish}')
    if len(unpriced_dishes) > 10:
        print(f'  ... and {len(unpriced_dishes) - 10} more')

print('\n' + '=' * 80)
print('✅ Budget analysis complete!\n')
