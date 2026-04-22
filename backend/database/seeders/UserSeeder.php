<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // marci ...



        User::create([
            'name' => 'anna',
            'password' => 'anna',

            'dont_want_essay' => '😔🥀 NEM LESZEK ELÉG JÓ
 
😓 Alacsony önbizalmam lesz
- Félni fogok az emberektől.
- Nem fogok tudni önmagam lenni.





💔😢 25 ÉVESEN MÉG MINDIG NEM LESZ SENKIM
- Találkozni fogok egy csodálatos sráccal, de nem leszek elég jó.





👤🕯️ NEM LESZEK ELÉG JÓ BARÁTOKHOZ',
            'want_essay' => '😎 Magabiztos vagyok
- Tudom magamról, hogy remek vagyok.
- Teljesen önmagam tudok lenni.
- Nem félek az emberek ítéletétől.





💖💞 VAN EGY CSODÁLATOS PÁROM
- A párommal bármit elmondhatunk egymásnak.
- A párommal bármikor számíthatunk egymásra.
- A párommal legjobb barátok vagyunk.





🤗👫 REMEK BARÁTAIM VANNAK
- Van 1-3 barátom, aki olyan mint egy testvér.
- Része vagyok egy baráti körnek, ami olyan mint egy család.',
        ]);



        User::create([
            'name' => 'alexios',
            'password' => 'alexios',

            'dont_want_essay' => '🌪 Mit Nem Akarok

Az élet tele van döntésekkel, és ahhoz, hogy valami igazán naggyá váljon, nemcsak azt kell tudni, mit akarok, hanem azt is, mit nem akarok. A céljaim tükrében világos, hogy bizonyos szokásokat, helyzeteket és hozzáállásokat egyszerűen el kell kerülnöm.




💸 Nem akarok pénzügyi káoszt

Mivel a célom 5 millió Ft megtakarítás elérése, nem engedhetem meg magamnak, hogy felelőtlenül költsek. Nem akarok impulzusvásárlások rabja lenni, nem akarok olyan hónapokat, amikor a bankszámlám mínuszban van. A pénz a szabadságot jelenti számomra, és minden forint, amit okosan teszek félre, közelebb visz ahhoz, hogy a vállalkozásom bevételét meg tudjam duplázni. 🏦




🏋️‍♂️ Nem akarok lustaságot

A heti 7 edzés és a testzsír 15% alá csökkentése nem vicc. Nem akarok kifogásokat keresni, nem akarok elhalasztani egyetlen edzést sem. Nem akarok visszatérni a régi szokásaimhoz, amikor egyetlen kanapén töltött este sokkal vonzóbbnak tűnt, mint a céljaim. A fizikai kitartás és a rendszeresség elengedhetetlen, ha maratont is szeretnék lefutni. 🏃‍♂️💪




📚 Nem akarok tudás hiányában élni

A 10 önfejlesztő könyv elolvasása azt jelenti, hogy nem akarok tudás nélkül haladni. Nem akarok megmaradni a komfortzónámban, nem akarok elutasítani új nézőpontokat vagy lemaradni a fejlődésben. A könyvek a stratégia, az inspiráció és a bölcsesség forrásai, amik hozzásegítenek a vállalkozásom növekedéséhez. 📖✨




🏢 Nem akarok szakmai elszigeteltséget

A LinkedIn hálózatom bővítése 500 új kapcsolattal azt jelenti, hogy nem akarok bezárkózni. Nem akarok kimaradni lehetőségekből, nem akarok lemaradni azokról az inspiráló emberekről, akik hozzáadhatnak az életemhez vagy az üzletemhez. A kapcsolatok az egyik legerősebb tőke, amit fejleszteni kell. 🌐🤝




⏳ Nem akarok időpazarlást

Minden perc számít. Nem akarok napokat vesztegetni halogatással vagy céltalan tevékenységekkel. Nem akarok olyan életet élni, ahol a legfontosabb dolgokra nincs időm. A napi 10 000 lépés már megtanított arra, hogy a rendszeresség és az apró szokások nagy változást hoznak. ⏱️🚶‍♂️




🔥 Nem akarok kompromisszumot a céljaimmal

Vállalkozás, pénzügyek, egészség, tudás – ezek mind fontosak. Nem akarok kompromisszumot kötni a céljaimmal, nem akarok beérni kevesebbel, mint amire képes vagyok. Nem akarok félúton megállni. Ha valamit el akarok érni, azt teljes szívvel, teljes energiával kell csinálnom. 🚀',
            'want_essay' => '🌟 Mit Akarok

Az élet értelme nem csak abban rejlik, hogy elkerüljük a problémákat, hanem abban is, hogy tisztán lássuk, mit akarunk elérni. A céljaim világos irányt adnak, és minden döntésem, minden napom ehhez kapcsolódik.




💰 Anyagi biztonság és növekedés

Az elsődleges célom 5 millió Ft megtakarítás felhalmozása. Ez nem csak szám, hanem szabadság és lehetőség is. A megtakarítás lehetővé teszi, hogy nyugodtan és magabiztosan építsem a saját vállalkozásomat, és a bevételeit megduplázhassam. Tudom, hogy a pénzügyi tudatosság, a rendszeres megtakarítás és az okos döntések elengedhetetlenek ehhez a sikerhez. 🏦💹




🏋️‍♂️ Testi erő és kitartás

A céljaim között szerepel a heti 7 edzés, a testzsír 15% alá csökkentése és egy maraton lefutása. Azt akarom, hogy a testem erős, egészséges és állóképessége maximális legyen. A fizikai erő növelése nem csak külső megjelenésről szól, hanem arról is, hogy a céljaim eléréséhez szükséges energiát és kitartást megadja. 💪🏃‍♂️




📚 Tudás és önfejlesztés

A 10 önfejlesztő könyv elolvasása azt jelenti, hogy azt akarom, hogy az elmém folyamatosan fejlődjön. A tudás a stratégiához, a kreativitáshoz és a személyes fejlődéshez szükséges. Azt akarom, hogy minden nap tanuljak valami újat, hogy jobb döntéseket hozzak, és folyamatosan inspirációt szerezzek. 📖✨




🌐 Kapcsolatok és hálózatépítés

500 új LinkedIn kapcsolat azt jelenti, hogy azt akarom, hogy a szakmai hálózatom erős és támogató legyen. A kapcsolatépítés lehetőségeket teremt, új ötleteket hoz, és segít abban, hogy a vállalkozásom növekedjen. Azt akarom, hogy körülöttem olyan emberek legyenek, akik inspirálnak és motiválnak a további fejlődésre. 🤝🌍




⏱️ Rendszeresség és következetesség

A napi 10 000 lépés és a rendszeres edzés mind azt szolgálja, hogy a következetességet és a kitartást beépítsem az életembe. Azt akarom, hogy minden apró lépés számítson, hogy minden nap közelebb vigyen a céljaimhoz. A kis, folyamatos erőfeszítések összeadódnak, és hosszú távon hatalmas eredményeket hoznak. 🚶‍♂️🔥




🚀 Vállalkozói növekedés és kreativitás

A vállalkozásom bevételének megduplázása és az alap weboldal létrehozása azt jelenti, hogy azt akarom, hogy a kreativitásom és az üzleti képességeim a lehető legmagasabb szintre emelkedjenek. Azt akarom, hogy a munkám értéket teremtsen, és lehetőségeket nyisson mások számára is. 💻📈',
        ]);



        User::create([
            'name' => 'first8',
            'password' => 'first8',
        ]);



        User::create([
            'name' => 'last7',
            'password' => 'last7',
        ]);
    }
}
