<?php

namespace Database\Seeders;

use App\Models\Motivation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MotivationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // anna: Emma Stone önbizalma
        Motivation::create([
            'goal_id' => 1,
            'description' => 'Hogy bátrabban kiálljak magamért.',
        ]);
        Motivation::create([
            'goal_id' => 1,
            'description' => 'Hogy ne féljek mások véleményétől.',
        ]);

        // anna: C1 angol nyelvvizsga
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy jobb munkalehetőségeim legyenek.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy magabiztosan kommunikálhassak külföldiekkel.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy külföldön is tudjak tanulni vagy dolgozni.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy megértsem az angol nyelvű tartalmakat.',
        ]);

        // anna: 2 hónapig heti 2 edzés
        Motivation::create([
            'goal_id' => 3,
            'description' => 'Hogy jobb formába kerüljek.',
        ]);
        Motivation::create([
            'goal_id' => 3,
            'description' => 'Hogy egészségesebb legyek.',
        ]);

        // alexios: 5 millió Ft megtakarítás
        Motivation::create([
            'goal_id' => 4,
            'description' => 'Hogy pénzügyi biztonságban érezzem magam.',
        ]);
        Motivation::create([
            'goal_id' => 4,
            'description' => 'Hogy legyen tartalékom váratlan helyzetekre.',
        ]);
        Motivation::create([
            'goal_id' => 4,
            'description' => 'Hogy közelebb kerüljek a hosszú távú céljaimhoz.',
        ]);

        // alexios: Heti 7 edzés 6 hónapon át
        Motivation::create([
            'goal_id' => 5,
            'description' => 'Hogy fegyelmezettebb legyek.',
        ]);
        Motivation::create([
            'goal_id' => 5,
            'description' => 'Hogy javuljon az állóképességem.',
        ]);
        Motivation::create([
            'goal_id' => 5,
            'description' => 'Hogy erősebbnek érezzem magam testileg és mentálisan.',
        ]);

        // alexios: Saját vállalkozás bevételének megduplázása
        Motivation::create([
            'goal_id' => 6,
            'description' => 'Hogy növeljem a bevételemet.',
        ]);
        Motivation::create([
            'goal_id' => 6,
            'description' => 'Hogy stabilabb üzletet építsek.',
        ]);
        Motivation::create([
            'goal_id' => 6,
            'description' => 'Hogy több szabadságom legyen anyagilag.',
        ]);

        // alexios: 10 könyv elolvasása önfejlesztés témában
        Motivation::create([
            'goal_id' => 7,
            'description' => 'Hogy fejlesszem a gondolkodásomat.',
        ]);
        Motivation::create([
            'goal_id' => 7,
            'description' => 'Hogy új nézőpontokat ismerjek meg.',
        ]);
        Motivation::create([
            'goal_id' => 7,
            'description' => 'Hogy jobb döntéseket hozzak az életben.',
        ]);

        // alexios: Testzsír százalék 15% alá csökkentése
        Motivation::create([
            'goal_id' => 8,
            'description' => 'Hogy egészségesebb legyek.',
        ]);
        Motivation::create([
            'goal_id' => 8,
            'description' => 'Hogy jobban nézzek ki.',
        ]);
        Motivation::create([
            'goal_id' => 8,
            'description' => 'Hogy magabiztosabb legyek a testemmel kapcsolatban.',
        ]);

        // alexios: LinkedIn hálózat bővítése 500 új kapcsolattal
        Motivation::create([
            'goal_id' => 9,
            'description' => 'Hogy több szakmai lehetőséghez jussak.',
        ]);
        Motivation::create([
            'goal_id' => 9,
            'description' => 'Hogy erősebb szakmai hálózatot építsek.',
        ]);
        Motivation::create([
            'goal_id' => 9,
            'description' => 'Hogy új együttműködéseket találjak.',
        ]);

        // alexios: Maraton lefutása
        Motivation::create([
            'goal_id' => 10,
            'description' => 'Hogy legyőzzem a saját határaimat.',
        ]);
        Motivation::create([
            'goal_id' => 10,
            'description' => 'Hogy bizonyítsak magamnak.',
        ]);
        Motivation::create([
            'goal_id' => 10,
            'description' => 'Hogy kitartóbb legyek.',
        ]);

        // alexios: Napi 10 000 lépés 3 hónapon keresztül
        Motivation::create([
            'goal_id' => 11,
            'description' => 'Hogy aktívabb életmódot éljek.',
        ]);
        Motivation::create([
            'goal_id' => 11,
            'description' => 'Hogy javítsam az általános egészségemet.',
        ]);

        // alexios: 3 hónapos vésztartalék felépítése
        Motivation::create([
            'goal_id' => 12,
            'description' => 'Hogy biztonságban érezzem magam anyagilag.',
        ]);
        Motivation::create([
            'goal_id' => 12,
            'description' => 'Hogy csökkentsem a pénzügyi stresszt.',
        ]);

        // alexios: Alap weboldal elkészítése a vállalkozáshoz
        Motivation::create([
            'goal_id' => 13,
            'description' => 'Hogy online jelenlétem legyen.',
        ]);
        Motivation::create([
            'goal_id' => 13,
            'description' => 'Hogy több ügyfelet szerezzek.',
        ]);
    }
}
