
import os
import json
import difflib

# Configuration
base_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate'
pdf_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Opskrifter_Komplet_Samling'
map_path = os.path.join(base_dir, 'recipe_file_map.json')

# New Missing List from Approved Menu
missing_items = [
    "Gl.dags Blomkålsgratin",
    "Hjerter i flødesauce",
    "Dagens Tærte",
    "Sprængt Kylling",
    "Ovnæggekage",
    "Kylling i BBQ-sauce",
    "Kyllingefrikassé",
    "Broccoligratin",
    "Ungarsk Gullasch"
]

print(f"Searching for {len(missing_items)} missing items...")

# Index PDF files
pdf_files = []
for root, dirs, files in os.walk(pdf_dir):
    for file in files:
        if file.lower().endswith('.pdf'):
            full_path = os.path.join(root, file)
            pdf_files.append(full_path)

print(f"Indexed {len(pdf_files)} PDF files.")

found_map = {}

for item in missing_items:
    search_term = item.lower().split('(')[0].strip() # Normalized
    
    # Custom Keywords for tough ones
    if "tærte" in search_term: keywords = ["tærte"]
    elif "gullasch" in search_term: keywords = ["gullasch", "ungarsk"]
    elif "hjerter" in search_term: keywords = ["hjerter"]
    elif "sprængt" in search_term: keywords = ["sprængt"]
    elif "bbq" in search_term: keywords = ["bbq"]
    else: keywords = search_term.split()
    
    match = None
    
    # Search
    for pdf_path in pdf_files:
        filename = os.path.basename(pdf_path).lower()
        if all(k in filename for k in keywords):
            match = pdf_path
            break
    
    if match:
        print(f"[MATCH] '{item}' -> '{os.path.basename(match)}'")
        found_map[item] = match
    else:
        # Try Fuzzy
        descriptions = {p: os.path.basename(p).lower() for p in pdf_files}
        matches = difflib.get_close_matches(search_term, descriptions.values(), n=1, cutoff=0.6)
        if matches:
             for path, name in descriptions.items():
                if name == matches[0]:
                    print(f"[FUZZY] '{item}' -> '{os.path.basename(path)}'")
                    found_map[item] = path
                    break
        else:
            print(f"[MISSING] '{item}'")

# Update map
if found_map:
    with open(map_path, 'r') as f:
        current = json.load(f)
    current.update(found_map)
    with open(map_path, 'w') as f:
        json.dump(current, f, indent=2)
    print("Updated recipe_file_map.json")
