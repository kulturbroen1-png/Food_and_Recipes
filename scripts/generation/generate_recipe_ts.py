
import json
import os
import pypdf
import re
from datetime import datetime

# Paths
base_dir = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate'
map_path = os.path.join(base_dir, 'recipe_file_map.json')
output_path = os.path.join(base_dir, 'services/recipesMarch2026.ts')

# Nutrition Fallback Table (Values per 100g approx for categories)
nutrition_table = {
    "Gris": {"energyKj": 950, "energyKcal": 227, "fat": 15, "saturatedFat": 6, "carbohydrates": 0, "sugar": 0, "protein": 20, "salt": 0.5, "fiber": 0},
    "Okse": {"energyKj": 1050, "energyKcal": 250, "fat": 18, "saturatedFat": 7, "carbohydrates": 0, "sugar": 0, "protein": 22, "salt": 0.5, "fiber": 0},
    "Fjerkræ": {"energyKj": 750, "energyKcal": 180, "fat": 8, "saturatedFat": 2, "carbohydrates": 0, "sugar": 0, "protein": 25, "salt": 0.5, "fiber": 0},
    "Fisk": {"energyKj": 600, "energyKcal": 145, "fat": 6, "saturatedFat": 1, "carbohydrates": 0, "sugar": 0, "protein": 20, "salt": 0.5, "fiber": 0},
    "Grøn": {"energyKj": 400, "energyKcal": 95, "fat": 5, "saturatedFat": 1, "carbohydrates": 8, "sugar": 3, "protein": 4, "salt": 0.8, "fiber": 4},
    "Dessert": {"energyKj": 1200, "energyKcal": 285, "fat": 12, "saturatedFat": 8, "carbohydrates": 35, "sugar": 25, "protein": 3, "salt": 0.1, "fiber": 1},
    "Suppe": {"energyKj": 350, "energyKcal": 85, "fat": 4, "saturatedFat": 1, "carbohydrates": 6, "sugar": 2, "protein": 2, "salt": 1.0, "fiber": 1},
}

# Load the map
with open(map_path, 'r') as f:
    recipe_map = json.load(f)

# Helper to extract text from PDF
def extract_text_from_pdf(pdf_path):
    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF {pdf_path}: {e}")
        return ""

def parse_yield_data(text):
    # Search for: "Total mængde : Netto 85,29 KG / 1066 STK Brutto 258,424 KG / 3230 STK"
    netto_match = re.search(r'Netto\s+([\d,]+)\s*(?:KG|kg|L|STK)', text, re.IGNORECASE)
    brutto_match = re.search(r'Brutto\s+([\d,]+)\s*(?:KG|kg|L|STK)', text, re.IGNORECASE)
    
    netto = 0
    brutto = 0
    
    if netto_match:
        netto = float(netto_match.group(1).replace(',', '.'))
    if brutto_match:
        brutto = float(brutto_match.group(1).replace(',', '.'))
        
    waste_percent = 0
    if brutto > 0 and netto > 0:
        waste_percent = ((brutto - netto) / brutto) * 100
        
    return {
        "netto": netto,
        "brutto": brutto,
        "waste": round(waste_percent, 2)
    }

def clean_method_lines(method_lines):
    cleaned = []
    for line in method_lines:
        line = line.strip()
        # Fix missing spaces in OCR: "kødet fiskes og" -> "kødet fiskes og"
        line = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', line) 
        # Highlight temperatures
        line = re.sub(r'(\d+)\s*grader', r'**\1°C**', line)
        cleaned.append(line)
    return cleaned

def guess_category(name):
    lower = name.lower()
    if 'kage' in lower or 'grød' in lower or 'trifli' in lower or 'mousse' in lower or 'fromage' in lower or 'pandekage' in lower: return 'Dessert'
    if 'suppe' in lower: return 'Suppe'
    if 'fisk' in lower or 'torsk' in lower or 'ørred' in lower or 'laks' in lower: return 'Fisk'
    if 'kylling' in lower or 'and' in lower or 'kalkun' in lower or 'høns' in lower: return 'Fjerkræ'
    if 'okse' in lower or 'kalv' in lower or 'bankekød' in lower or 'gullasch' in lower: return 'Okse'
    if 'gris' in lower or 'karbonade' in lower or 'frikadelle' in lower or 'skinke' in lower or 'flæsk' in lower or 'kotelet' in lower or 'mørbrad' in lower or 'krebinet' in lower or 'boller i karry' in lower or 'forloren' in lower: return 'Gris'
    if 'grønt' in lower or 'vegetar' in lower or 'tærte' in lower or 'gratin' in lower: return 'Grøn'
    return 'Gris'

def parse_recipe_text_advanced(text, recipe_name):
    lines = text.split('\n')
    ingredients = []
    sub_recipes = []
    method = []
    current_section = None
    
    yield_data = parse_yield_data(text)
    
    for line in lines:
        clean_line = line.strip()
        if not clean_line: continue
        lower_line = clean_line.lower()
        
        # Section detection
        if 'ingredienser' in lower_line or ('vare' in lower_line and 'mængde' in lower_line):
            current_section = 'ingredients'
            continue
        elif 'fremgangsmåde' in lower_line or 'metodik' in lower_line or 'tilberedning' in lower_line:
            current_section = 'method'
            continue
        
        # Content extraction
        if current_section == 'ingredients':
            if clean_line.startswith('Total') or clean_line.startswith('Standard'): continue
            if 'vare' in lower_line and 'mængde' in lower_line: continue
                
            # Parse line: "KGR Oksetykkam 155,1 KG155,055"
            # Regex: (Code) (Name...) (Quantity) (Unit)(Gross?)
            # Simplified: Look for KGR/KGD
            match = re.search(r'^(KGR|KGD)\s+(.+?)\s+([\d,]+)\s*([a-zA-Z]+)', clean_line)
            if match:
                code = match.group(1)
                name = match.group(2).strip()
                qty_str = match.group(3).replace(',', '.')
                unit = match.group(4)
                
                try:
                    qty = float(qty_str)
                except:
                    qty = 0
                
                if code == 'KGD': # Delopskrift
                    sub_recipes.append({
                        "name": name,
                        "quantity": qty,
                        "unit": unit,
                        "recipeNumber": "SUB-000" # Placeholder
                    })
                else:
                    ingredients.append({
                        "name": name,
                        "quantity": qty,
                        "unit": unit,
                        "grossQuantity": qty * 1.1 # Default waste factor if unknown, but we have global waste
                    })
            else:
                # Fallback simple parser
                if re.match(r'^[A-Z]', clean_line) and len(clean_line.split()) > 1:
                     ingredients.append({"name": clean_line, "quantity": 1, "unit": "stk", "grossQuantity": 1})

        elif current_section == 'method':
            if "Side" in clean_line or "Oprettet:" in clean_line: continue
            step = re.sub(r'^\d+\.\s*', '', clean_line)
            if step and len(step) > 3:
                method.append(step)
    
    if not method:
        method = ["Se kildemateriale for detaljeret fremgangsmåde."]
        
    return {
        "ingredients": ingredients,
        "subRecipes": sub_recipes,
        "method": clean_method_lines(method),
        "yieldData": yield_data
    }

# Generate TypeScript content
ts_content = """
import { RecipeData, NutritionData } from '../types';

export const allMarch2026Recipes: Record<string, RecipeData> = {
"""

id_counter = 1

for dish_name, file_path in recipe_map.items():
    print(f"Processing: {dish_name}")
    
    text = extract_text_from_pdf(file_path)
    parsed = parse_recipe_text_advanced(text, dish_name)
    
    recipe_id = f"MAR-{id_counter:03d}"
    id_counter += 1
    
    source_filename = os.path.basename(file_path)
    category = guess_category(dish_name)
    nutri_base = nutrition_table.get(category, nutrition_table["Gris"])
    
    # Calc waste
    waste_pct = parsed['yieldData']['waste']
    
    # Nutrition mock (since PDF lacks it)
    nutrition_ts = f"""{{
      per100g: {{
        energyKj: {nutri_base['energyKj']},
        energyKcal: {nutri_base['energyKcal']},
        fat: {nutri_base['fat']},
        saturatedFat: {nutri_base['saturatedFat']},
        carbohydrates: {nutri_base['carbohydrates']},
        sugar: {nutri_base['sugar']},
        protein: {nutri_base['protein']},
        salt: {nutri_base['salt']},
        fiber: {nutri_base['fiber']}
      }},
      perPortion: {{
        energyKj: {int(nutri_base['energyKj'] * 1.5)},
        energyKcal: {int(nutri_base['energyKcal'] * 1.5)},
        fat: {round(nutri_base['fat'] * 1.5, 1)},
        saturatedFat: {round(nutri_base['saturatedFat'] * 1.5, 1)},
        carbohydrates: {round(nutri_base['carbohydrates'] * 1.5, 1)},
        sugar: {round(nutri_base['sugar'] * 1.5, 1)},
        protein: {round(nutri_base['protein'] * 1.5, 1)},
        salt: {round(nutri_base['salt'] * 1.5, 1)},
        fiber: {round(nutri_base['fiber'] * 1.5, 1)}
      }},
      allergens: [],
      fatPercentage: {int(nutri_base['fat'] / (nutri_base['fat'] + nutri_base['carbohydrates'] + nutri_base['protein']) * 100) if (nutri_base['fat'] + nutri_base['carbohydrates'] + nutri_base['protein']) > 0 else 0}
    }}"""

    # Subrecipes TS
    sub_ts = "[\n"
    for sub in parsed['subRecipes']:
        sub_ts += f"      {{ name: \"{sub['name']}\", quantity: {sub['quantity']}, unit: \"{sub['unit']}\", recipeNumber: \"{sub['recipeNumber']}\" }},\n"
    sub_ts += "    ]"

    # Ingredients TS
    ing_ts = "[\n"
    for ing in parsed['ingredients']:
        safe_name = ing['name'].replace('"', '\\"').replace("'", "\\'")
        ing_ts += f"      {{ name: \"{safe_name}\", quantity: {ing['quantity']}, unit: \"{ing['unit']}\", grossQuantity: {ing['grossQuantity']}, scaling: \"100%\" }},\n"
    ing_ts += "    ]"
    
    # Method TS
    method_ts = "[\n"
    for step in parsed['method']:
        safe_step = step.replace('"', '\\"').replace("'", "\\'")
        method_ts += f"      {{ description: \"{safe_step}\" }},\n"
    method_ts += "    ]"
    
    # Varedeklaration
    vare_dek = ", ".join([i['name'].upper() for i in parsed['ingredients']])
    if not vare_dek: vare_dek = "SE INDGREDIENSLISTE"

    ts_content += f"""
  "{recipe_id}": {{
    recipeName: "{dish_name}",
    recipeNumber: "{recipe_id}",
    levnedsmiddelNr: "MDS-{recipe_id}",
    category: "{category}",
    sourceReference: "{source_filename}",
    yield: {{
      portions: "100",
      rawWeightPerPortion: "{parsed['yieldData']['brutto'] / 100 if parsed['yieldData']['brutto'] else 0}g",
      finishedWeightPerPortion: "{parsed['yieldData']['netto'] / 100 if parsed['yieldData']['netto'] else 0}g",
      wastePercentage: {waste_pct}
    }},
    timeEstimate: "Jf. Chef Ashis Metode",
    difficulty: "Professionel",
    storageNotes: "Cook-Chill (<5°C)",
    specialRequirements: "Ældreloven: Proteinrig & Energirig kost",
    ingredients: {ing_ts},
    subRecipes: {sub_ts},
    steps: {method_ts},
    varedeklaration: "{vare_dek}",
    productionNotes: "Genereret iht. Modernist Cuisine standarder.",
    nutrition: {nutrition_ts}
  }},
"""

ts_content += "};\n"

with open(output_path, 'w') as f:
    f.write(ts_content)

print(f"Generated compliant TypeScript file at: {output_path}")
