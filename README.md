# *[LINK A DOKUMENTÁCIÓHOZ](https://docs.google.com/document/d/1VTaurLMwOshJRTh83sCHWm3pjS5-mS59yrQJPQiQALk/edit?usp=sharing)*





# 💻 Hátralévő fejlesztések
- ✅ backend: inicializálás, api csomag, key, .env
- ✅ frontend: inicializálás, axios csomag, react-router-dom csomag
- ✅ backend: adatbázis migrációk és modellek
- ✅ backend: teszt adatok seederekel
- ✅ backend: register, login, logout, me API végpontok
- ✅ frontend: react projekt előkészítése
- ✅ frontend: react-router-dom navigáció, és Page komponensek elkészítése
- ✅ frontend: register form
- ✅ frontend: login form
- ✅ backend: get UserDontWantEssay route
- ✅ backend: post UserDontWantEssay route
- ✅ frontend: egy UserContext, ami get-eli és post-olja a "mit nem akarok" esszéket (és state-ben tárolja)
- ✅ frontend: UserDontWantEssay komponens, ami a UserContext get és post függvényeit használja
- ✅ frontend: a UserContext "loading" state-jét használva egy töltőképernyő van a UserPage-en.
- ✅ backend: user-want-essay post és get végpontok
- ✅ frontend: UserWantEssay komponens
- ✅ frontend: Egy jó UI font keresése: MARAD A LEXEND.
- ✅ backend: Route a felhasználó céljainak lekérdezésére.: getUserGoals kész.
- ✅ backend: putUserGoals controller és route (frontenden majd ki kell szedni a getUserGoals válaszából az id-ket és f_id-ket)
- ✅ backend: néhány végpont valójában PUT, ezt megváltoztatni
- ✅ backend: tesztadatok átdolgozása legalább nagyjából (seederek), ami:
    - ✅ Bemutat két embert: egy reál beállítottságú, és egy humán beállítottságú.
    - ✅ A reál beállítottságú esszéit és céljait mi írjuk meg, hogy ennek a folyamatát bemutassuk.
    - ✅ A humán beállítottságú esszéi és céljai már kész vannak, hogy bemutassuk milyen mindennapi használatban az app.
    - ✅ Demonstrálni kell a 3 féle Task típust (és a célok színét és ikonját).
    - ✅ Egy felhasználó akinek sok teljesített célja, nem teljesített célja, és céltól független feladata van.
    - ✅ Két felhasználó, akinél tesztelem a 16 cél színt.
    - 
    - ✅ marci dont want esszéje .txt fájlban
    - ✅ marci want esszéje .txt fájlban
    - ✅ marci célja (feladatokkal) .txt fájlban
    - ✅ anna dont want esszéje
    - ✅ anna want esszéje
    - ✅ anna céljai (feladatokkal)
    - ✅ anna 1 teljesített célja (feladatokkal)
    - ✅ anna 1 céltól független feladata
    - ✅ alexios dont want esszéje
    - ✅ alexios want esszéje
    - ✅ alexios céljai (feladatokkal)
    - ✅ alexios teljesített céljai (feladatokkal)
    - ✅ alexios 2 céltól független feladata
    - ✅ first8 8 színes teszt céllal
    - ✅ last8 8 színes teszt céllal
- ✅ frontend: a felhasználó céljainak lekérdezése és eltárolása a UserContext-ben. (ki kell szedni a válaszból az id-ket és f_id-ket)
- ✅ backend: getUserNotCompletedGoals route
- ✅ backend: getUserCompletedGoals route
- ✅ frontend: UserContext-ben, szétválasztva lekérdezni a nem teljesített és teljesített célokat.
- ✅ frontend: A célok színeinek css-ét javítani olyanra mint az ios shortcuts app-ban
- ✅ frontend: Célon belüli elemek elrendezésének változtatása
- ✅ frontend: user ↩️ Kilépés és ℹ️ Információ gomb alap
- ✅ frontend: user ↩️ Kilépés popup
- ✅ frontend: user ℹ️ Információ popup (placeholder szöveggel)
- ✅ frontend: user ↩️ Kilépés és ℹ️ Információ pupup animációk?
- ✅ frontend: user ↩️ Kilépés és ℹ️ Információ pupup animációk finomítása
- ✅ frontend: Egy jó UI font keresése.
- ✅ frontend: UserNotCompletedGoals komponens megjeleníti a felhasználó lekérdezett nem teljesített céljait.
- ✅ backend: patch '/user-not-completed-goal/{goal}'
- ✅ frontend: A célokat popup ablakkal lehet szerkeszteni.
- ✅ frontend: a teljesített célokat meg lehet nézni, a teljesítésük dátumának sorrendjében.
- ✅ backend: lehet új célokat létrehozni.
- ✅ frontend: lehet új célokat létrehozni.
- ✅ backend: A nem teljesített célokat lehet teljesíteni.
- ✅ frontend: A nem teljesített célokat lehet teljesíteni. (confirmation dialog nélkül, és csúnyán)
- ✅ frontend: Confirmation dialog a célok teljesítéséhez.
- ✅ backend: Egy route a mai checklist létrehozására ha nincs még ma.
- ✅ frontend: A UserContext lekérdezi és eltárolja a mai checklist-et.
- ✅ backend: Lehet checklist_item-eket teljsíteni. (patch). https://chatgpt.com/share/69e0059e-df74-832d-9896-5c041ca9c3e1
- ❌ frontend: Ha nincs teljesített célja a felhasználónak, akkor a TrophyButton nem jelenik meg.
- ❌ frontend: Ha 8 célja van a felhasználónak, az AddGoalButton nem jelenik meg.
- ❌ frontend: A navbar ki van emelve ott ahol éppen vagyunk.
- ❌ frontend: A navbar-on nem jelenik meg a célok menü, ha nincs megírva a felhasználó "nem akarok" és "akarok" esszéi.
- ❌ frontend: A navbar-on nem jelenik meg a feladatok menü, ha nincs célja a felhasználónak.
- ❌ 
- ❌ backend: Lehet céltól független feladatokat létrehozni.
- ❌ frontend: Lehet céltól független feladatokat létrehozni.
- ❌ 
- ❌ 
- ❌ backend: A nem teljesített célokat lehet törölni.
- ❌ frontend: A nem teljesített célokat lehet törölni.
- ❌ github project page: elkezdése (ez olyan mint a trello)
- ❌ dokumentáció: dokumentáció elkezdése a sablon alapján





# 💡 Ötletek
- Üveg elemek: A képernyőn fix helyen van (az üveg gombok ikon és font színe 100% fehér)
- Opak elemek: Az oldalon fix helyen van
- Egy feladatra hosszan nyomva fel-le lehet mozgatni a listán, ezzel változtatva a rankját
- Egy feladatra hosszan nyomva megjelennek a beállítása, ha egy céltól független feladat akkor felugróablakban, ha célhoz kapcsolódó feladat akkor a megfelelő célt megnyitja
- Valami menő téma: festék vagy cybersigilism





# ℹ️ Információ
### 🎯 Miért fontos, hogy legyen célod?
...





# 🔳 Mik a legfontosabb menük, és ott miket tudsz csinálni?
### 🪵 Mit nem akarok?
- "Mit nem akarok?" esszé megírása
- ℹ️ Információ
- ↩️ Kilépés

### 🥕 Mit akarok?
- "Mit akarok?" esszé megírása
- ℹ️ Információ
- ↩️ Kilépés

### 🎯 CÉLOK
- Célok szerkesztése
- ➕ Új cél létrehozása
- 🏆 Teljesített célok megtekintése
- ℹ️ Információ
- ↩️ Kilépés

### ✅ FELADATOK
- Feladatok teljesítése a mai checklisten
- ➕ Új céltól független feladat létrehozása (today only, daily, on certain days of the week, x times a week) (és ezek szerkesztése)
- ⭕ Céltól független feladatok szerkesztése
- 📋 Előző checklistek megtekintése
- ℹ️ Információ
- ↩️ Kilépés





# ***Ha a legtöbbet hoznád ki az életből, az hogyan nézne ki?***
# ***Kaptál egy életet, és te tényleg úgy fogsz dönteni, hogy elpazarlod?***
# ***Van lehetőséged küzdeni.***