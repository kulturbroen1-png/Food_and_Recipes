import sqlite3
import json
import re

# Database path
DB_PATH = '/Users/ashisgautam/Documents/Food_and_Recipes/Recipes/recipes.db'
OUTPUT_PATH = '/Users/ashisgautam/Documents/Food_and_Recipes/Projects/CaterCare_Ultimate/services/authenticRecipes.json'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def categorize_recipe(title, ingredients_text):
    title_lower = title.lower()
    ingredients_lower = ingredients_text.lower() if ingredients_text else ""
    combined_text = title_lower + " " + ingredients_lower

    # Primary Category Logic
    primary = "Diverse"
    confidence = 80

    # Keywords (Priority order matters)
    if any(k in combined_text for k in ['fisk', 'laks', 'torsk', 'rødspætte', 'ørred', 'reje', 'tun', 'sild', 'seafood', 'skaldyr', 'musling']):
        primary = "Fisk"
        confidence = 95
    elif any(k in combined_text for k in ['kylling', 'and', 'kalkun', 'hane', 'bryst', 'lår', 'fjerkræ', 'chicken', 'duck']):
        primary = "Fjerkræ"
        confidence = 95
    elif any(k in combined_text for k in ['okse', 'kalv', 'bøf', 'steg', 'burger', 'kødsovs', 'lasagne', 'beef', 'veal', 'cow']):
        primary = "Okse/Kalv"
        confidence = 95
    elif any(k in combined_text for k in ['flæsk', 'svin', 'skinke', 'bacon', 'medister', 'kotelet', 'mørbrad', 'pork', 'pig', 'ribben']):
        primary = "Grise"
        confidence = 95
    elif any(k in combined_text for k in ['vegetar', 'vegan', 'salat', 'linser', 'bønner', 'kål', 'rodfrugt', 'grønsag', 'vegetable']):
        primary = "Grønne"
        confidence = 90

    # Meal Type Logic
    meal_type = "Hovedret" # Default
    if any(k in title_lower for k in ['suppe', 'soup']):
        meal_type = "Suppe"
    elif any(k in title_lower for k in ['kage', 'cake', 'cookie', 'muffin']):
        meal_type = "Kage"
    elif any(k in title_lower for k in ['dessert', 'is', 'mousse', 'budding', 'trifli']):
        meal_type = "Dessert"
    elif any(k in title_lower for k in ['grød', 'havregryn', 'risengrød']):
        meal_type = "Grød"
    
    # Style Logic
    styles = []
    if any(k in title_lower for k in ['klassisk', 'gammeldags', 'mormor']):
        styles.append('Gammeldags')
    elif any(k in title_lower for k in ['fransk', 'italiensk', 'spansk', 'mexicansk', 'asiatisk', 'thai', 'indisk']):
        styles.append('International')
    elif any(k in title_lower for k in ['ny', 'moderne', 'fusion']):
        styles.append('Modern')
    else:
        styles.append('Klassisk') # Default style

    # Secondary Category (Simplified)
    secondary = primary 

    return {
        "primary": primary,
        "secondary": secondary,
        "mealType": meal_type,
        "styles": styles,
        "confidence": confidence,
        "autoTagged": True,
        "taggedAt": "2026-02-14T12:00:00.000Z"
    }

def clean_ingredients(ing_text):
    if not ing_text:
        return []
    # Split by pipe or newline
    if '|' in ing_text:
        return [i.strip() for i in ing_text.split('|') if i.strip()]
    return [i.strip() for i in ing_text.split('\n') if i.strip()]

def main():
    conn = get_db_connection()
    recipes = conn.execute('SELECT id, title, ingredients, content FROM recipes').fetchall()
    conn.close()

    output_recipes = []
    
    print(f"Processing {len(recipes)} recipes...")

    for row in recipes:
        title = row['title'] or "Uden navn"
        ingredients_text = row['ingredients']
        
        # Skip empty recipes if needed, but user asked for ALL
        
        category_data = categorize_recipe(title, ingredients_text)
        ingredients_list = clean_ingredients(ingredients_text)

        # Map to CategorizedRecipe interface
        recipe_obj = {
            "recipeId": str(row['id']),
            "recipeName": title,
            "category": category_data,
            "ingredients": ingredients_list
            # content can be huge, maybe omit for list view or keep if needed?
            # Let's keep it minimal for the JSON file to ensure performance
        }
        output_recipes.append(recipe_obj)

    # Write to JSON
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(output_recipes, f, ensure_ascii=False, indent=2)

    print(f"Successfully exported {len(output_recipes)} recipes to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
