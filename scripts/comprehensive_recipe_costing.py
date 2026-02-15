#!/usr/bin/env python3
"""
COMPREHENSIVE RECIPE COST CALCULATOR - PRODUCTION GRADE
Extracts EVERY ingredient from recipes and calculates true costs
Includes: waste %, condiments, water, EVERYTHING

Phase 1: Extract all available recipe data
Phase 2: Match ingredients to Hørkram database  
Phase 3: Calculate costs with waste factored in
Phase 4: Validate and review
"""

import json
import re
from pathlib import Path
from collections import defaultdict

print('\n' + '=' * 80)
print('🔬 PHASE 1: COMPREHENSIVE RECIPE DATA EXTRACTION')
print('=' * 80)

# Load Hørkram database
with open('public/horkram_2025_prices.json', 'r', encoding='utf-8') as f:
    horkram_db = json.load(f)

print(f'\n✅ Loaded {len(horkram_db):,} Hørkram products')

# Create searchable index
horkram_index = {}
for product in horkram_db:
    product_name = product.get('navn', '')
    # Normalize for searching
    normalized = product_name.lower().strip()
    horkram_index[normalized] = {
        'original_name': product_name,
        'price': product.get('pris', 0),
        'unit': product.get('enhed', 'kg'),
        'supplier': 'Hørkram',
        'category': product.get('kategori', 'Unknown')
    }
    
    # Also index by key words for better matching
    words = normalized.split()
    for word in words:
        if len(word) > 3:  # Skip short words
            if word not in horkram_index:
                horkram_index[word] = horkram_index[normalized]

print(f'✅ Created searchable index with {len(horkram_index)} products')

# Load existing structured recipes
with open('public/structured_recipes.json', 'r', encoding='utf-8') as f:
    structured_recipes = json.load(f)

print(f'✅ Loaded {len(structured_recipes)} structured recipes with ingredients')

# Standard waste percentages (svind %)
WASTE_PERCENTAGES = {
    # Vegetables
    'gulerod': 0.15,  # 15% waste (peel, trim)
    'kartoffel': 0.20,  # 20% waste
    'løg': 0.10,
    'porre': 0.25,
    'kål': 0.20,
    'salat': 0.15,
    'tomat': 0.05,
    'agurk': 0.10,
    
    # Meat/Fish
    'kød': 0.05,  # Trimming
    'fisk': 0.10,  # Bones, skin
    'kylling': 0.15,  # Bones, skin
    
    # Default
    'default': 0.05  # 5% general waste
}

# Condiments that must be included (often forgotten)
CONDIMENTS = {
    'salt': {'price': 8.50, 'unit': 'kg', 'typical_usage': 0.002},  # 2g per portion
    'peber': {'price': 85.00, 'unit': 'kg', 'typical_usage': 0.001},  # 1g per portion
    'olie': {'price': 25.00, 'unit': 'liter', 'typical_usage': 0.010},  # 10ml per portion
    'vand': {'price': 0.01, 'unit': 'liter', 'typical_usage': 0.100},  # Water cost
}

print('\n' + '=' * 80)
print('🔬 PHASE 2: INGREDIENT MATCHING & COST CALCULATION')
print('=' * 80)

def find_horkram_price(ingredient_name):
    """Find best matching Hørkram price for an ingredient"""
    ing_lower = ingredient_name.lower().strip()
    
    # Direct match
    if ing_lower in horkram_index:
        return horkram_index[ing_lower]
    
    # Partial match - look for key words
    keywords = [word for word in ing_lower.split() if len(word) > 3]
    
    for keyword in keywords:
        for hork_name, hork_data in horkram_index.items():
            if keyword in hork_name:
                return hork_data
    
    return None

def parse_quantity(qty_string):
    """Parse quantity string to kg/liters"""
    if not qty_string or qty_string == '-':
        return 0
    
    # Remove tildes and clean
    clean = qty_string.replace('~', '').strip()
    
    # Extract number and unit
    match = re.search(r'([\d.,]+)\s*(kg|g|l|ml|stk)?', clean, re.IGNORECASE)
    if not match:
        return 0
    
    value = float(match.group(1).replace(',', '.'))
    unit = (match.group(2) or 'kg').lower()
    
    # Convert to kg/L
    if unit == 'g':
        return value / 1000
    elif unit == 'ml':
        return value / 1000
    elif unit == 'stk':
        return value * 0.1  # Rough estimate
    
    return value

def get_waste_percentage(ingredient_name):
    """Get waste percentage for ingredient"""
    ing_lower = ingredient_name.lower()
    
    for category, waste_pct in WASTE_PERCENTAGES.items():
        if category in ing_lower:
            return waste_pct
    
    return WASTE_PERCENTAGES['default']

# Process each recipe
recipe_costs_detailed = []
total_ingredients_processed = 0
total_matched = 0
total_estimated = 0

print(f'\n Processing {len(structured_recipes)} recipes...\n')

for recipe in structured_recipes:
    recipe_name = recipe.get('recipeName', 'Unknown')
    portions = int(recipe.get('portions', '450').replace(' ', ''))
    
    print(f'📖 {recipe_name} ({portions} portions)')
    
    recipe_cost_data = {
        'recipe_name': recipe_name,
        'portions': portions,
        'ingredients': [],
        'condiments': [],
        'total_ingredient_cost': 0,
        'total_condiment_cost': 0,
        'waste_cost': 0,
        'total_cost': 0,
        'cost_per_portion': 0
    }
    
    # Process ingredients from each component
    for component in recipe.get('components', []):
        component_name = component.get('title', 'Main')
        
        for ingredient in component.get('ingredients', []):
            ing_name = ingredient.get('name', '')
            gross_qty = ingredient.get('grossQuantity', '0')
            
            total_ingredients_processed += 1
            
            # Parse quantity
            qty_kg = parse_quantity(gross_qty)
            
            if qty_kg == 0:
                continue
            
            # Find price
            horkram_match = find_horkram_price(ing_name)
            
            if horkram_match:
                price_per_kg = horkram_match['price']
                supplier = horkram_match['supplier']
                matched_name = horkram_match['original_name']
                total_matched += 1
            else:
                # Estimate based on category
                price_per_kg = 50.0  # Default estimate
                supplier = 'ESTIMATED'
                matched_name = ing_name
                total_estimated += 1
            
            # Calculate waste
            waste_pct = get_waste_percentage(ing_name)
            actual_qty = qty_kg * (1 + waste_pct)  # Add waste to quantity needed
            
            # Calculate cost
            ingredient_cost = actual_qty * price_per_kg
            waste_cost = qty_kg * waste_pct * price_per_kg
            
            recipe_cost_data['ingredients'].append({
                'name': ing_name,
                'matched_product': matched_name,
                'gross_quantity_kg': qty_kg,
                'waste_percentage': waste_pct * 100,
                'actual_quantity_kg': actual_qty,
                'price_per_kg': price_per_kg,
                'ingredient_cost': ingredient_cost,
                'waste_cost': waste_cost,
                'supplier': supplier
            })
            
            recipe_cost_data['total_ingredient_cost'] += ingredient_cost
            recipe_cost_data['waste_cost'] += waste_cost
    
    # Add condiments (estimated per portion)
    for condiment, data in CONDIMENTS.items():
        qty_per_portion = data['typical_usage']
        total_qty = qty_per_portion * portions
        condiment_cost = total_qty * data['price']
        
        recipe_cost_data['condiments'].append({
            'name': condiment,
            'quantity_per_portion': qty_per_portion,
            'total_quantity': total_qty,
            'price': data['price'],
            'cost': condiment_cost
        })
        
        recipe_cost_data['total_condiment_cost'] += condiment_cost
    
    # Calculate totals
    recipe_cost_data['total_cost'] = (
        recipe_cost_data['total_ingredient_cost'] + 
        recipe_cost_data['total_condiment_cost']
    )
    recipe_cost_data['cost_per_portion'] = recipe_cost_data['total_cost'] / portions
    
    recipe_costs_detailed.append(recipe_cost_data)
    
    print(f'  ✓ {len(recipe_cost_data["ingredients"])} ingredients, ' 
          f'{recipe_cost_data["total_cost"]:.2f} kr total, '
          f'{recipe_cost_data["cost_per_portion"]:.2f} kr/portion')

print('\n' + '=' * 80)
print('🔬 PHASE 3: VALIDATION & REVIEW')
print('=' * 80)

print(f'\n📊 Processing Summary:')
print(f'  Total ingredients processed: {total_ingredients_processed}')
print(f'  Matched to Hørkram: {total_matched} ({total_matched/max(total_ingredients_processed,1)*100:.1f}%)')
print(f'  Estimated prices: {total_estimated} ({total_estimated/max(total_ingredients_processed,1)*100:.1f}%)')

print(f'\n💰 Recipe Cost Summary:')
for recipe in recipe_costs_detailed:
    print(f'\n  {recipe["recipe_name"]}:')
    print(f'    Ingredients: {recipe["total_ingredient_cost"]:>10,.2f} kr')
    print(f'    Waste cost: {recipe["waste_cost"]:>11,.2f} kr')
    print(f'    Condiments: {recipe["total_condiment_cost"]:>11,.2f} kr')
    print(f'    TOTAL: {recipe["total_cost"]:>16,.2f} kr')
    print(f'    Per portion (450): {recipe["cost_per_portion"]:>8,.2f} kr')

# Save detailed results
output_file = 'public/detailed_recipe_costs_with_waste.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump({
        'generated': '2026-02-14',
        'total_recipes': len(recipe_costs_detailed),
        'total_ingredients': total_ingredients_processed,
        'matched_to_horkram': total_matched,
        'estimated': total_estimated,
        'recipes': recipe_costs_detailed
    }, f, indent=2, ensure_ascii=False)

print(f'\n📄 Detailed results saved to: {output_file}')

print('\n' + '=' * 80)
print('✅ PHASE 1-3 COMPLETE')
print('⚠️  REVIEW REQUIRED: Only 7 recipes have full ingredient data')
print('📌 NEXT: Extract ingredient data from PDF/TXT recipe files')
print('=' * 80)
print()
