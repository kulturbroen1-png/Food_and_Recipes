
import datetime
import random
import locale

# --- CONFIGURATION ---
START_DATE = datetime.date(2026, 5, 1)
END_DATE = datetime.date(2026, 12, 31)

# Recipe Pools (extracted + expanded for variety)
RECIPES = {
    "Fisk": [
        {"name": "Dampet Ørred (Vejle Ådal)", "sauce": "Sennepsauce", "carb": "Kartofler", "acc": "Dild/Citron", "season": "all"},
        {"name": "Bagt Laks", "sauce": "Hollandaise", "carb": "Kartofler", "acc": "Broccoli", "season": "all"},
        {"name": "Fiskefrikadeller", "sauce": "Remoulade", "carb": "Kartofler", "acc": "Citron/Råkost", "season": "all"},
        {"name": "Stegt Rødspætte", "sauce": "Persillesauce", "carb": "Kartofler", "acc": "Citron", "season": "all"},
        {"name": "Dampet Torsk", "sauce": "Sennepssauce", "carb": "Kartofler", "acc": "Rødbeder/Sennep", "season": "winter"},
        {"name": "Stjerneskud", "sauce": "Dressing", "carb": "Brød", "acc": "Rejer/Asparges", "season": "summer"},
        {"name": "Makrel i Tomat (Varm)", "sauce": "-", "carb": "Kartofler", "acc": "Mayonnaise", "season": "all"},
        {"name": "Fiskefilet", "sauce": "Remoulade", "carb": "Rugbrød", "acc": "Citron", "season": "all"}
    ],
    "Grøn": [
        {"name": "Blomkålsgratin", "sauce": "-", "carb": "Rugbrød", "acc": "Gulerodssalat", "season": "all"},
        {"name": "Porretærte", "sauce": "Fraiche", "carb": "-", "acc": "Tomatsalat", "season": "all"},
        {"name": "Grøntsagslasagne", "sauce": "-", "carb": "Brød", "acc": "Salat", "season": "all"},
        {"name": "Vegetarisk Postej", "sauce": "Skysauce", "carb": "Kartofler", "acc": "Syltede Agurker", "season": "all"},
        {"name": "Spansk Æggekage", "sauce": "-", "carb": "Rugbrød", "acc": "Purløg/Tomat", "season": "summer"},
        {"name": "Gulerodsgratin", "sauce": "-", "carb": "Rugbrød", "acc": "Ærter", "season": "all"},
        {"name": "Spinatbøffer", "sauce": "Tzatziki", "carb": "Kartofler", "acc": "Græsk Salat", "season": "summer"},
        {"name": "Græskarsuppe (Hovedret)", "sauce": "-", "carb": "Brød", "acc": "Ristede Kerner", "season": "autumn"}
    ],
    "Gris": [
        {"name": "Frikadeller", "sauce": "Brun sauce", "carb": "Kartofler", "acc": "Surkål", "season": "all"},
        {"name": "Karbonader", "sauce": "Stuvede ærter", "carb": "Kartofler", "acc": "Gulerødder", "season": "all"},
        {"name": "Mørbradgryde", "sauce": "-", "carb": "Kartoffelmos", "acc": "Asier", "season": "winter"},
        {"name": "Stegt Flæsk", "sauce": "Persillesauce", "carb": "Kartofler", "acc": "Rødbeder", "season": "all"},
        {"name": "Ribbensteg", "sauce": "Brun sauce", "carb": "Kartofler", "acc": "Rødkål", "season": "winter"},
        {"name": "Svensk Pølseret", "sauce": "-", "carb": "Kartofler", "acc": "Purløg", "season": "all"},
        {"name": "Brændende Kærlighed", "sauce": "-", "carb": "Kartoffelmos", "acc": "Rødbeder", "season": "winter"},
        {"name": "Glaseret Skinke", "sauce": "Flødekartofler", "carb": "-", "acc": "Grønne bønner", "season": "all"},
        {"name": "Koteletter i Fad", "sauce": "Tomatfløde", "carb": "Ris", "acc": "Peberfrugt", "season": "all"},
        {"name": "Æggekage m. flæsk", "sauce": "-", "carb": "Rugbrød", "acc": "Tomat/Purløg", "season": "summer"}
    ],
    "Fjerkræ": [
        {"name": "Kylling i Karry", "sauce": "Karrysauce", "carb": "Ris", "acc": "Chutney", "season": "all"},
        {"name": "Tarteletter m. høns", "sauce": "-", "carb": "-", "acc": "Tomat", "season": "all"},
        {"name": "Andebryst", "sauce": "Appelsinsauce", "carb": "Kartofler", "acc": "Rødkål", "season": "winter"},
        {"name": "Unghanebryst", "sauce": "Skysauce", "carb": "Kartofler", "acc": "Agurkesalat", "season": "all"},
        {"name": "Paprikagryde (Kyl)", "sauce": "Paprikasauce", "carb": "Kartoffelmos", "acc": "Peberfrugt", "season": "all"},
        {"name": "Kyllingesteg", "sauce": "Skysauce", "carb": "Kartofler", "acc": "Rabarberkompot", "season": "summer"},
        {"name": "Høns i Asparges", "sauce": "-", "carb": "Kartofler", "acc": "-", "season": "all"},
        {"name": "Grillet Kylling", "sauce": "BBQ", "carb": "Kartoffelsalat", "acc": "Grøn Salat", "season": "summer"}
    ],
    "Okse": [
        {"name": "Gammeldags Oksesteg", "sauce": "Peberrodssauce", "carb": "Kartofler", "acc": "Grønne bønner", "season": "all"},
        {"name": "Kalvesteg", "sauce": "Vildtsauce", "carb": "Kartofler", "acc": "Waldorf", "season": "all"},
        {"name": "Benløse Fugle", "sauce": "Skysauce", "carb": "Kartoffelmos", "acc": "Gulerødder", "season": "winter"},
        {"name": "Engelsk Bøf", "sauce": "Bløde løg", "carb": "Kartofler", "acc": "Survarer", "season": "all"},
        {"name": "Wienerschnitzel", "sauce": "Smørsauce", "carb": "Brasede kart.", "acc": "Ærter", "season": "all"},
        {"name": "Gullasch", "sauce": "-", "carb": "Kartoffelmos", "acc": "-", "season": "winter"},
        {"name": "Hakkebøf", "sauce": "Brun sauce", "carb": "Kartofler", "acc": "Bløde løg", "season": "all"},
        {"name": "Millionbøf", "sauce": "-", "carb": "Kartoffelmos", "acc": "Rødbeder", "season": "all"}
    ]
}

BIRET_POOLS = {
    "Dessert": ["Citronfromage 🍋", "Chokolademousse 🍫", "Karamelrand 🍮", "Romfromage", "Sherryfromage", "Ymerfromage", "Is m. chokoladesauce 🍨", "Is med lun bærsauce 🍦", "Panna cotta", "Budding", "Trifli (Makron) 🍧", "Frugtsalat med Råcreme 🍊"],
    "Kage": ["Drømmekage 🥥", "Chokoladekage 🍫", "Gulerodskage 🥕", "Gammeldags Æblekage 🍎", "Æbletærte med creme 🥧", "Banankage 🍌", "Citronmåne 🍋", "Hindbærsnitte", "Lagkage 🎂"],
    "Suppe": ["Tomatsuppe 🥣", "Aspargessuppe 🥣", "Minestronesuppe 🥣", "Karrysuppe 🥣", "Hønsekødssuppe 🥣", "Kartoffel-porresuppe 🥣", "Grøntsagssuppe 🥣", "Klar suppe m. boller 🥣", "Blomkålssuppe 🥣"],
    "Grød": ["Jordbærgrød m. fløde 🍓", "Rødgrød med fløde", "Frugtgrød", "Sveskegrød", "Æblegrød", "Stikkelsbærgrød"],
    "SummerSpecials": ["Koldskål m. kammerjunker 🥣", "Jordbær med fløde 🍓", "Vandmelon", "Hyldebærsuppe"]
}

# --- LOGIC ---
def get_iso_week(date):
    return date.isocalendar()[1]

def get_biret(main_cat, main_dish, date):
    # CHEF RULE: Green -> POPULAR SWEET
    if main_cat == "Grøn":
        return random.choice(BIRET_POOLS["Kage"] + BIRET_POOLS["Dessert"])
    
    # Seasonality
    month = date.month
    
    # Summer Logic (Jun-Aug)
    if 6 <= month <= 8:
        if random.random() < 0.2:
            return random.choice(BIRET_POOLS["SummerSpecials"])
            
    # Soup Logic (Winter = more soup)
    is_soup_season = month <= 3 or month >= 10
    soup_chance = 0.4 if is_soup_season else 0.15
    
    rand = random.random()
    if rand < soup_chance:
        return random.choice(BIRET_POOLS["Suppe"])
    elif rand < soup_chance + 0.3:
        return random.choice(BIRET_POOLS["Kage"])
    elif rand < soup_chance + 0.5:
        return random.choice(BIRET_POOLS["Grød"])
    else:
        return random.choice(BIRET_POOLS["Dessert"])

def generate_full_year():
    current_date = START_DATE
    menu_html = """<!DOCTYPE html>
<html lang="da">
<head>
    <meta charset="UTF-8">
    <title>Menuplan Maj-December 2026</title>
    <style>
         @import url('https://fonts.googleapis.com/css2?family=Verdana:wght@400;700&display=swap');
         body { font-family: 'Verdana', sans-serif; background: #e0e0e0; margin: 0; padding: 20px; }
         .page { background: white; width: 297mm; height: 210mm; margin: 0 auto 20px auto; padding: 15mm; box-shadow: 0 0 10px rgba(0,0,0,0.1); box-sizing: border-box; }
         table { width: 100%; border-collapse: collapse; font-size: 11pt; }
         th { background: #333; color: white; padding: 8px; text-align: left; }
         td { border: 1px solid #ddd; padding: 6px; }
         .week-header { background: #2e7d32; color: white; text-align: center; font-size: 14pt; padding: 10px; }
         .col-icon { font-size: 16pt; text-align: center; width: 40px; }
         .gron { color: green; } .fisk { color: blue; } .gris { color: pink; } .okse { color: brown; } .fugl { color: orange; }
    </style>
</head>
<body>
"""
    
    # Iterate weeks
    week_buffer = []
    last_week_num = -1
    
    week_plan = {
        "Fisk": 1, "Grøn": 1, "Gris": 2, "Fjerkræ": 2, "Okse": 1
    }
    
    # Pre-calculate weeks to ensure full coverage
    # Simple heuristic: Just loop days, when week changes, flush buffer
    
    unique_history = [] 
    
    while current_date <= END_DATE:
        iso_week = get_iso_week(current_date)
        
        if iso_week != last_week_num:
            if week_buffer:
                # Flush buffer to HTML
                # Header row for the week
                menu_html += f'<div class="page"><table>'
                menu_html += f'<tr class="week-header"><th colspan="9">UGE {last_week_num}: {week_buffer[0].split("</td>")[0].split(">")[-1]} - ... </th></tr>'
                menu_html += '<thead><tr><th>Dato</th><th>Art</th><th>Nr</th><th>Hovedret</th><th>Sauce</th><th>Kulhydrat</th><th>Tilbehør</th><th>Nr</th><th>Biret</th></tr></thead><tbody>'
                for day in week_buffer:
                     menu_html += day
                menu_html += '</tbody></table></div>\n'
                week_buffer = []
                
            last_week_num = iso_week
            # Reset weekly counters slots logic
            slots = ["Fisk", "Grøn", "Gris", "Gris", "Fjerkræ", "Fjerkræ", "Okse"]
            random.shuffle(slots)
            
        # Get category for today from slots
        day_idx = current_date.weekday() # 0=Mon, 6=Sun
        
        # Determine category
        if day_idx < len(slots):
            cat = slots[day_idx]
        else:
             # Fallback if list empty (shouldn't happen with 7 list and 7 days)
             cat = "Gris" 

        # Pick dish from pool
        pool = RECIPES.get(cat, [])
        valid_pool = [r for r in pool if r['season'] == 'all' or 
                      (r['season'] == 'summer' and 5 <= current_date.month <= 8) or
                      (r['season'] == 'winter' and (current_date.month >= 10 or current_date.month <= 3))]
        
        if not valid_pool: valid_pool = pool # Fallback
        
        # Try to avoid recent duplicates
        dish = random.choice(valid_pool)
        attempts = 0
        while dish['name'] in unique_history[-14:] and attempts < 5:
            dish = random.choice(valid_pool)
            attempts += 1
            
        unique_history.append(dish['name'])
        
        # Biret
        biret = get_biret(cat, dish['name'], current_date)
        
        # Icon & Class
        icons = {"Fisk":"🐟", "Grøn":"🥦", "Gris":"🐖", "Fjerkræ":"🐓", "Okse":"🐂"}
        classes = {"Fisk":"fisk", "Grøn":"gron", "Gris":"gris", "Fjerkræ":"fugl", "Okse":"okse"}
        
        icon = icons.get(cat, "🍽️")
        css_class = classes.get(cat, "andet")
        
        # Format Date
        da_months = ["", "jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]
        da_days = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]
        date_str = f"{current_date.day}. {da_months[current_date.month]} ({da_days[day_idx]})"
        
        # HTML Row
        row_html = f"""
        <tr>
            <td class="col-dato">{date_str}</td>
            <td class="col-icon {css_class}">{icon}</td>
            <td class="col-nr"></td>
            <td>{dish['name']}</td>
            <td>{dish['sauce']}</td>
            <td>{dish['carb']}</td>
            <td>{dish['acc']}</td>
            <td class="col-nr"></td>
            <td>{biret}</td>
        </tr>
        """
        week_buffer.append(row_html)
        
        current_date += datetime.timedelta(days=1)
        
    # Flush last week
    if week_buffer:
        menu_html += f'<div class="page"><table>'
        menu_html += f'<tr class="week-header"><th colspan="9">UGE {last_week_num}: {week_buffer[0].split("</td>")[0].split(">")[-1]} - ... </th></tr>'
        menu_html += '<thead><tr><th>Dato</th><th>Art</th><th>Nr</th><th>Hovedret</th><th>Sauce</th><th>Kulhydrat</th><th>Tilbehør</th><th>Nr</th><th>Biret</th></tr></thead><tbody>'
        for day in week_buffer:
                menu_html += day
        menu_html += '</tbody></table></div>\n'

    menu_html += "</body></html>"
    
    with open("Generated_Menu_May_Dec_2026.html", "w", encoding="utf-8") as f:
        f.write(menu_html)
    print("Menu generated: Generated_Menu_May_Dec_2026.html")

if __name__ == "__main__":
    generate_full_year()
