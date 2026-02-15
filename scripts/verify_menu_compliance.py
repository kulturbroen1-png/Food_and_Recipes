
import re
import os

# Define User Criteria
# Weekly: 1 Fisk, 1 Grøn, 2 Gris, 2 Fjerkræ, 1 Okse (Total 7)
# Side Dishes: 2 Kage, 2 Suppe, 2 Dessert, 1 Grød
# Carbs: Balance of Kartofler (various), Ris, Pasta, etc.

def analyze_week(week_num, days):
    print(f"\n--- Analyser Uge {week_num} ---")
    
    stats = {
        "Main": {"Fisk": 0, "Grøn": 0, "Gris": 0, "Fjerkræ": 0, "Okse": 0, "Andet/Lam/Kalv": 0},
        "Biret": {"Kage": 0, "Suppe": 0, "Dessert": 0, "Grød": 0, "Andet": 0},
        "Carbs": []
    }
    
    for day in days:
        date = day.get('day_name', 'Unknown')
        main = day.get('main', '').lower()
        if not main: continue
        
        biret = day.get('biret', '').lower()
        carb = day.get('carb', '').lower()
        
        cat = "?"
        # --- Categorize Main Dish ---
        if any(x in main for x in ['fisk', 'torsk', 'rødspætte', 'laks', 'sej', 'ørred', 'sild']):
            stats["Main"]["Fisk"] += 1
            cat = "Fisk"
        elif any(x in main for x in ['grøntsag', 'vegetar', 'porretærte', 'spinattærte', 'blomkål', 'broccoli', 'linse', 'gule ærter']):
            stats["Main"]["Grøn"] += 1
            cat = "Grøn"
        elif any(x in main for x in ['svin', 'skinke', 'flæsk', 'medister', 'frikadelle', 'kotelet', 'mørbrad', 'karbonade', 'krebinet', 'brændende', 'pølser']):
            stats["Main"]["Gris"] += 1
            cat = "Gris"
        elif any(x in main for x in ['kylling', 'kalkun', 'and', 'høns', 'unghane']):
            stats["Main"]["Fjerkræ"] += 1
            cat = "Fjerkræ"
        elif any(x in main for x in ['okse', 'kalv', 'bøf', 'gullasch', 'bankekød', 'wienerschnitzel', 'biksemad']):
            # Biksemad often mixed but typically beef/pork, count as Beef if primarily beef roast leftovers or 'okse' category
            # Let's check context. If both beef and pork, maybe classify based on main protein.
            # Bankekød = Okse. Wienerschnitzel = Kalv (Okse category usually).
            stats["Main"]["Okse"] += 1
            cat = "Okse"
        else:
            stats["Main"]["Andet/Lam/Kalv"] += 1
            cat = "?"
            
        print(f"  {date}: {day.get('main')} -> {cat}")

        # --- Categorize Biret ---
        if 'kage' in biret:
            stats["Biret"]["Kage"] += 1
        elif 'suppe' in biret:
            stats["Biret"]["Suppe"] += 1
        elif any(x in biret for x in ['grød', 'vælling']):
             stats["Biret"]["Grød"] += 1
        elif any(x in biret for x in ['mousse', 'fromage', 'is', 'budding', 'trifli', 'pandekage', 'frugt']):
             stats["Biret"]["Dessert"] += 1
        elif biret.strip():
             stats["Biret"]["Andet"] += 1
        
        # --- Advanced Rules Check ---
        warnings = []
        is_green = cat == "Grøn"
        is_stew = any(x in main for x in ['gryde', 'gullasch', 'ragout', 'con carne', 'labskovs', 'frikassé'])
        is_soup_side = "suppe" in biret
        is_grod_side = "grød" in biret or "vælling" in biret
        is_grod_main = "grød" in main or "vælling" in main
        
        # Rule 1: Green Dish + POPULAR SWEET DESSERT (NEVER SOUP)
        if is_green:
            if is_soup_side:
                warnings.append(f"⛔ RØDT FLAG: Grøn ret ({main}) serveres med SUPPE ({biret}). SKAL VÆRE EN POPULÆR DESSERT/KAGE!")
            elif not (("kage" in biret) or ("dessert" in biret) or ("mousse" in biret) or ("fromage" in biret) or ("is" in biret) or ("pandekage" in biret)):
                 warnings.append(f"⚠️ Grøn ret ({main}) mangler en tydelig 'populær dessert' (Fandt: {biret})")
            else:
                 print(f"  ✅ Grøn ret + {biret} (Godkendt - Populær Dessert)")

        # Rule 2: Double Porridge
        if is_grod_main and is_grod_side:
            warnings.append("⛔ DOBBELT GRØD ALARM (Hovedret og Biret er grød)")

        # Rule 3: Stew + Light/Delicious Dessert
        if is_stew:
            if is_grod_side:
                 warnings.append(f"⚠️ Gryderet ({main}) serveres med grød ({biret}) - Er det lækkert nok?")
            else:
                 print(f"  ✅ Gryderet + {biret} (Godkendt)")

        if warnings:
            for w in warnings:
                print(f"  {w}")

    # --- Verify Weekly Counts ---
    # Target: 1 Fisk, 1 Grøn, 2 Gris, 2 Fjerkræ, 1 Okse. (Sum 7)
    
    print("\n  [Status ugebalance]:")
    total_days = len(days)
    if total_days >= 5: 
        checks = [
            ("Fisk", 1, stats["Main"]["Fisk"]),
            ("Green", 1, stats["Main"]["Grøn"]),
            ("Gris", 2, stats["Main"]["Gris"]),
            ("Fjerkræ", 2, stats["Main"]["Fjerkræ"]),
            ("Okse", 1, stats["Main"]["Okse"])
        ]
        for name, target, actual in checks:
            status = "OK" if actual == target else f"AFVIGELSE (Mål: {target})"
            print(f"  - {name}: {actual} ({status})")
    
    print("\n  [Biret Balance (Mål: 2 Kage, 2 Suppe, 2 Dessert, 1 Grød)]:")
    print(f"  - Kage: {stats['Biret']['Kage']}")
    print(f"  - Suppe: {stats['Biret']['Suppe']}")
    print(f"  - Dessert: {stats['Biret']['Dessert']}")
    print(f"  - Grød: {stats['Biret']['Grød']}")

    print("\n  [Kulhydrat Variation]:")
    print(f"  - {', '.join(set(stats['Carbs']))}")
    
    # --- Sensory Analysis (Peter Klosse & 3D Taste) ---
    print("\n  [Sensorisk Profil (Peter Klosse & 3D Smag)]:")
    
    sensory_map = {
        "okse": {"flavor": "Umami/Salt", "mouthfeel": "Coating (Fedme)", "texture": "Mør/Fast", "color": "Brun/Rød"},
        "gris": {"flavor": "Salt/Røget", "mouthfeel": "Coating (Fedt)", "texture": "Mør/Sprød", "color": "Lys/Brun"},
        "kylling": {"flavor": "Mild/Umami", "mouthfeel": "Neutral/Coating", "texture": "Mør", "color": "Lys/Gul"},
        "fisk": {"flavor": "Sart/Salt", "mouthfeel": "Blød/Coating", "texture": "Flager/Blød", "color": "Hvid/Lyserød"},
        "grøn": {"flavor": "Sød/Bitter", "mouthfeel": "Contracting (Syre/Crisp)", "texture": "Sprød/Blød", "color": "Grøn/Gul/Rød"},
        "suppe": {"flavor": "Umami/Salt", "mouthfeel": "Flydende/Varm", "texture": "Flydende", "color": "Varieret"},
        "kage": {"flavor": "Sød/Krydret", "mouthfeel": "Coating/Tør", "texture": "Svampet/Sprød", "color": "Brun/Gul"},
        "dessert": {"flavor": "Sød/Syrlig", "mouthfeel": "Coating (Fløde)/Contracting (Frugt)", "texture": "Blød/Glat", "color": "Gul/Rød/Hvid"}
    }
    
    # Sample check for variety in specific attributes
    colors_seen = []
    mouthfeels = []
    
    for day in days:
        main_type = "andet"
        main_lower = day.get('main', '').lower()
        if not main_lower: continue

        if "okse" in main_lower or "kalv" in main_lower or "bøf" in main_lower: main_type = "okse"
        elif "gris" in main_lower or "flæsk" in main_lower or "skinke" in main_lower: main_type = "gris"
        elif "kylling" in main_lower or "høne" in main_lower or "and" in main_lower: main_type = "kylling"
        elif "fisk" in main_lower or "laks" in main_lower or "torsk" in main_lower or "ørred" in main_lower: main_type = "fisk"
        elif "grøn" in main_lower or "blomkål" in main_lower or "porre" in main_lower or "vegetar" in main_lower: main_type = "grøn"
        
        profile = sensory_map.get(main_type, {})
        if profile:
            colors_seen.append(profile.get('color', '?'))
            mouthfeels.append(profile.get('mouthfeel', '?'))
            # print(f"    - {day.get('day_name')}: {day.get('main')} ({profile.get('color')}, {profile.get('mouthfeel')})")

    # Analyze variety
    unique_colors = set(colors_seen)
    unique_mouthfeels = set(mouthfeels)
    
    print(f"  - Farve Variation: {len(unique_colors)} typer fundet {list(unique_colors)}")
    print(f"  - Mundfølelse Variation: {len(unique_mouthfeels)} typer fundet {list(unique_mouthfeels)}")
    
    if "Grøn/Gul/Rød" in unique_colors and "Brun/Rød" in unique_colors and "Hvid/Lyserød" in unique_colors:
        print("  ✅ Visuel Balance: Menuen dækker hele farvespektret (Grønt, Rødt, Hvidt, Brunt).")
    else:
        print("  ⚠️ Visuel Balance: Tjek om der er nok farvekontrast.")

    if "Coating (Fedme)" in unique_mouthfeels and "Contracting (Syre/Crisp)" in unique_mouthfeels: # Simplified logic
         print("  ✅ Peter Klosse Balance: Både Coating (Hygge/Fedme) og Contracting (Friskhed) tilstede.")
    else:
         # Check specific dishes for contracting elements (e.g. pickles, salad)
         print("  ℹ️ Peter Klosse Note: Husk tilbehør (surt/sprødt) til de fede retter for balance.")

def parse_menu_html(filepath):
    print(f"Læser fil: {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    weeks = {}
    current_week = None
    
    rows = re.findall(r'<tr.*?>(.*?)</tr>', content, re.DOTALL)
    current_week_days = []
    
    for row in rows:
        header_match = re.search(r'UGE\s+(\d+).*?(JAN|FEB|MAR|APR|MAJ|JUN|JUL|AUG|SEP|OKT|NOV|DEC)', row, re.IGNORECASE)
        if header_match:
            if current_week:
                weeks[current_week] = current_week_days
                current_week_days = []
            
            clean_text = re.sub(r'<[^>]+>', '', row).strip()
            current_week = clean_text.split(':')[0] 
            continue
            
        cols = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
        
        if len(cols) >= 6 and current_week:
            cols = [re.sub(r'<[^>]+>', '', c).strip() for c in cols]
            
            if not cols[0]: continue 
            
            main_idx = 3
            carb_idx = 5
            biret_idx = 8 if len(cols) > 8 else 6 
            
            day_data = {
                "day_name": cols[0],
                "main": cols[main_idx] if len(cols) > main_idx else "",
                "carb": cols[carb_idx] if len(cols) > carb_idx else "",
                "biret": cols[biret_idx] if len(cols) > biret_idx else ""
            }
            current_week_days.append(day_data)
            
    if current_week:
         weeks[current_week] = current_week_days
            
    return weeks

if __name__ == "__main__":
    import glob
    import sys
    
    if len(sys.argv) > 1:
        html_files = [sys.argv[1]]
    else:
        search_dir = "/Users/ashisgautam/Documents/Food_and_Recipes/Menus/januar menu/"
        html_files = glob.glob(os.path.join(search_dir, "*menu*.html"))
        html_files.sort()
    
    print(f"Finder {len(html_files)} menufiler...")
    
    for menu_path in html_files:
        print(f"\n==========================================")
        print(f"FILE: {os.path.basename(menu_path)}")
        print(f"==========================================")
        try:
            data = parse_menu_html(menu_path)
            if not data:
                print("⚠️  Ingen data fundet (muligvis forkert format).")
                continue
                
            for week, days in data.items():
                analyze_week(week, days)
        except Exception as e:
            print(f"Fejl ved læsning af {menu_path}: {e}")
