
import json
import os

map_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/recipe_file_map.json'

# 1. Load current map
with open(map_path, 'r') as f:
    data = json.load(f)

# 2. Define removals (incorrect fuzzy matches)
removals = [
    "Kylling i Peberrod (180g)",
    "Minestronesuppe (180g)",
    "Abrikosgrød m. fløde (150g)",
    "Broccoligratin (160g)",
    "Kyllingefrikassé (180g)",
    "Lammekølle" # Removing the bad one first
]

for key in removals:
    if key in data:
        print(f"Removing incorrect mapping: {key} -> {os.path.basename(data[key])}")
        del data[key]

# 3. Add corrections
corrections = {
    "Lammekølle": "/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling/Booklets_Split/Hovedretter/Lammesteg_1.pdf",
    "Budding m. saft (100g)": "/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling/Booklets_Split/100 Pax A B/Rombudding.pdf" 
}

for key, path in corrections.items():
    print(f"Adding/Updating: {key} -> {os.path.basename(path)}")
    data[key] = path

# 4. Save
with open(map_path, 'w') as f:
    json.dump(data, f, indent=2)

print("Map updated successfully.")
