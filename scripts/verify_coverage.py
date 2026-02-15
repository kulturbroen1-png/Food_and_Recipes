
import re
import os

# Paths
base_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate'
plan_path = os.path.join(base_dir, 'services/martsTestPlan.ts')
recipes_path = os.path.join(base_dir, 'services/recipesMarch2026.ts')

# 1. Extract Menu Items
menu_items = []
with open(plan_path, 'r') as f:
    content = f.read()
    # Look for dish: "Name"
    matches = re.findall(r'dish:\s*"(.*?)"', content)
    for m in matches:
        # Ignore holidays if they don't have a real dish (though current plan has dishes for holidays)
        if "Palmesøndag" in m:
             # Extract the actual dish name if format is "Palmesøndag: Lammekølle"
             parts = m.split(':')
             if len(parts) > 1:
                 menu_items.append({"date": "Holiday", "dish": parts[1].strip()})
             else:
                 menu_items.append({"date": "Holiday", "dish": m})
        else:
            menu_items.append({"date": "Day", "dish": m})

print(f"Found {len(menu_items)} menu items in plan.")

# 2. Extract Available Recipes
recipe_names = []
with open(recipes_path, 'r') as f:
    content = f.read()
    # Look for recipeName: "Name"
    matches = re.findall(r'recipeName:\s*"(.*?)"', content)
    recipe_names = matches

print(f"Found {len(recipe_names)} generated recipes.")

# 3. Compare
found_count = 0
missing_count = 0

print("\n--- COVERAGE REPORT ---")

for item in menu_items:
    dish_name = item['dish']
    
    # Normalize for matching
    # Remove portion info e.g. (90g)
    clean_target = re.sub(r'\s*\(\d+.*?\)', '', dish_name).lower().strip()
    
    match = None
    for r_name in recipe_names:
        clean_source = re.sub(r'\s*\(\d+.*?\)', '', r_name).lower().strip()
        
        if clean_target in clean_source or clean_source in clean_target:
            match = r_name
            break
            
    if match:
        found_count += 1
        # print(f"[OK] {dish_name} -> {match}")
    else:
        missing_count += 1
        print(f"[MISSING] {dish_name}")

print("\n--- SUMMARY ---")
print(f"Total Menu Items: {len(menu_items)}")
print(f"Found: {found_count}")
print(f"Missing: {missing_count}")
print(f"Coverage: {round((found_count / len(menu_items)) * 100)}%")
