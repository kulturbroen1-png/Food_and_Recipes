
import json
import os
import pypdf
import re
from datetime import datetime

# Load the map
map_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/recipe_file_map.json'
missing_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/missing_recipes_list.txt'
output_path = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/march_2026_recipes.md'

with open(map_path, 'r') as f:
    recipe_map = json.load(f)

with open(missing_path, 'r') as f:
    missing_recipes = f.read().splitlines()

markdown_output = f"# Opskriftssamling - Marts 2026\n\nGenereret: {datetime.now().strftime('%Y-%m-%d')}\n\n"

# Helper to extract text from PDF
def extract_text_from_pdf(pdf_path):
    try:
        reader = pypdf.PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        return f"Error reading PDF: {str(e)}"

# Helper to parse text into sections (Naive approach)
def parse_recipe_text(text):
    lines = text.split('\n')
    ingredients = []
    method = []
    current_section = None
    
    # Heuristics for sections
    for line in lines:
        clean_line = line.strip()
        if not clean_line:
            continue
            
        lower_line = clean_line.lower()
        
        if 'ingredienser' in lower_line or 'vare' in lower_line and 'mængde' in lower_line:
            current_section = 'ingredients'
            continue
        elif 'fremgangsmåde' in lower_line or 'metodik' in lower_line or 'tilberedning' in lower_line:
            current_section = 'method'
            continue
        elif 'næringsindhold' in lower_line or 'allergener' in lower_line:
            current_section = 'nutrition' # Skip nutrition for now or handle separately
            # continue # Don't skip, just stop capturing method
        
        if current_section == 'ingredients':
            ingredients.append(clean_line)
        elif current_section == 'method':
            method.append(clean_line)
    
    # Fallback if no sections found (raw dump)
    if not ingredients and not method:
        return {"raw": text}
    
    return {"ingredients": ingredients, "method": method}

# Process each found recipe
found_count = 0
for dish_name, file_path in recipe_map.items():
    print(f"Processing: {dish_name} -> {os.path.basename(file_path)}")
    
    text = extract_text_from_pdf(file_path)
    parsed = parse_recipe_text(text)
    
    markdown_output += f"## {dish_name}\n"
    markdown_output += f"**Kilde:** `{os.path.basename(file_path)}`\n\n"
    
    if "raw" in parsed:
        markdown_output += "### Indhold (Råt udtræk)\n"
        # CLEANUP: limit raw text to reasonable length or format it blockquote
        markdown_output += "```text\n"
        markdown_output += parsed["raw"].strip() + "\n"
        markdown_output += "```\n"
    else:
        if parsed["ingredients"]:
            markdown_output += "### Ingredienser\n"
            for ing in parsed["ingredients"]:
                markdown_output += f"- {ing}\n"
            markdown_output += "\n"
            
        if parsed["method"]:
            markdown_output += "### Fremgangsmåde\n"
            for step in parsed["method"]:
                markdown_output += f"1. {step}\n"
            markdown_output += "\n"
            
    markdown_output += "---\n\n"
    found_count += 1

# Add missing recipes section
markdown_output += "## Manglende Opskrifter\n"
for missing in missing_recipes:
    if missing.strip():
        markdown_output += f"- {missing}\n"

# Write output
with open(output_path, 'w') as f:
    f.write(markdown_output)

print(f"Done. Processed {found_count} recipes. Output: {output_path}")
