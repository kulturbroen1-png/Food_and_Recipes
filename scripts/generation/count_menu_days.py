#!/usr/bin/env python3
"""
Quick validator to count menu days in mealPlanData.ts
"""

import re

# Read the TypeScript file
with open('/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/services/mealPlanData.ts', 'r') as f:
    content = f.read()

# Define months
months = [
    ('january', 31), ('february', 28), ('march', 31), ('april', 30),
    ('may', 31), ('june', 30), ('july', 31), ('august', 31),
    ('september', 30), ('october', 31), ('november', 30), ('december', 31)
]

print('\n🔍 2026 MENU SYSTEM STATUS\n')
print('=' * 80)

total_days = 0
complete = True

for month_name, expected_days in months:
    # Find the month export
    pattern = rf'export const {month_name}2026: MealDay\[\] = \[(.*?)\];'
    match = re.search(pattern, content, re.DOTALL)
    
    if match:
        # Count date entries
        days_found = len(re.findall(r'date:', match.group(1)))
        total_days += days_found
        
        status = '✅' if days_found == expected_days else  '⚠️'
        print(f'{status} {month_name.capitalize():12} {days_found:3} / {expected_days:2} days')
        
        if days_found != expected_days:
            complete = False
    else:
        print(f'❌ {month_name.capitalize():12}   MISSING')
        complete = False

print('=' * 80)
print(f'\n📊 TOTAL: {total_days} / 365 days')

if complete and total_days == 365:
    print('\n✅ STATUS: COMPLETE - All 365 days present!\n')
elif total_days == 365:
    print('\n⚠️  STATUS: Day count correct but some months have discrepancies\n')
else:
    print(f'\n❌ STATUS: INCOMPLETE - Missing {365 - total_days} days\n')

print('=' * 80 + '\n')
