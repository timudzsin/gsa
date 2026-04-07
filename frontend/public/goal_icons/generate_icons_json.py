import os
import json

# 🔹 A script helye: public/goal_icons
CURRENT_FOLDER = os.path.dirname(os.path.abspath(__file__))

# 🔹 Az ikonok mappája (a script jelenlegi mappája)
ICONS_FOLDER = CURRENT_FOLDER

# 🔹 JSON fájl célhelye
OUTPUT_JSON = os.path.join(CURRENT_FOLDER, "../../src/icons.json")

# 🔹 Lekérdezzük az összes .svg fájlt a mappából
icons = [f for f in os.listdir(ICONS_FOLDER) if f.lower().endswith(".svg")]

# 🔹 Biztosítjuk, hogy a target mappa létezik
os.makedirs(os.path.dirname(OUTPUT_JSON), exist_ok=True)

# 🔹 Kiírjuk a JSON-t
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(icons, f, ensure_ascii=False, indent=4)

print(f"{len(icons)} ikon került a {OUTPUT_JSON} fájlba!")