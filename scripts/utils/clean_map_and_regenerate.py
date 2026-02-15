
import json
import os
import subprocess

map_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/recipe_file_map.json'

# 1. Load map
with open(map_path, 'r') as f:
    data = json.load(f)

# 2. Bad keys to remove
bad_keys = [
    "Sprængt Kylling",      # Mapped to Nakkekam (Pork)
    "Kyllingefrikassé",     # Mapped to Frikadeller
    "Kylling i BBQ-sauce"   # Mapped to Perlehøne (Guinea Fowl) - arguably ok but risky
]

for key in bad_keys:
    if key in data:
        print(f"Removing unsafe match: {key} -> {os.path.basename(data[key])}")
        del data[key]

# 3. Save map
with open(map_path, 'w') as f:
    json.dump(data, f, indent=2)

# 4. Run generator
print("Regenerating TypeScript file...")
subprocess.run(["python3", "scripts/generate_recipe_ts.py"], check=True)
