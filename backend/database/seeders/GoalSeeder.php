<?php

namespace Database\Seeders;

use App\Models\Goal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GoalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // dorina
        Goal::create([
            'user_id' => 1,

            'title' => '3kg fogyás',
            'deadline' => '2026-09-01',

            'color' => 'LIME',
        ]);
        Goal::create([
            'user_id' => 1,

            'title' => 'C1 angol nyelvvizsga',
            'deadline' => '2026-08-26',

            'color' => 'BLUE',
        ]);
        Goal::create([
            'user_id' => 1,

            'title' => '2 hónapig napi 10 perc meditáció',
            'deadline' => '2026-06-1',

            'color' => 'LIGHT_BLUE',
        ]);

        // alexios
        Goal::create([
            'user_id' => 2,
            'title' => '5 millió Ft megtakarítás',
            'deadline' => '2026-12-31',
            'color' => 'GREEN',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Heti 4 edzés 6 hónapon át',
            'deadline' => '2026-10-01',
            'color' => 'RED',
        ]);


        Goal::create([
            'user_id' => 2,
            'title' => 'Saját vállalkozás bevételének megduplázása',
            'deadline' => '2026-12-31',
            'color' => 'ORANGE',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '10 könyv elolvasása önfejlesztés témában',
            'deadline' => '2026-11-30',
            'color' => 'PURPLE',
        ]);


        Goal::create([
            'user_id' => 2,
            'title' => 'Testzsír százalék 15% alá csökkentése',
            'deadline' => '2026-09-15',
            'color' => 'LIME',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'LinkedIn hálózat bővítése 500 új kapcsolattal',
            'deadline' => '2026-08-31',
            'color' => 'BLUE',
        ]);


        Goal::create([
            'user_id' => 2,
            'title' => 'Passzív jövedelem forrás kiépítése',
            'deadline' => '2026-12-01',
            'color' => 'TEAL',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Maraton lefutása',
            'deadline' => '2026-10-10',
            'color' => 'RED',
        ]);


        Goal::create([
            'user_id' => 2,
            'title' => 'Nyilvános előadás megtartása szakmai témában',
            'deadline' => '2026-10-15',
            'color' => 'DEEP_PURPLE',
        ]);


        Goal::create([
            'user_id' => 2,
            'title' => 'Napi 7 óra alvás 60 napon keresztül',
            'deadline' => '2026-06-30',
            'color' => 'LIGHT_BLUE',
        ]);

        Goal::create([
            'user_id' => 2,
            'title' => 'Új szakmai készség elsajátítása (pl. AI)',
            'deadline' => '2026-09-01',
            'color' => 'CYAN',
        ]);



        /*         Goal::create([
            'user_id' => 2,

            'title' => 'Opel Astra',
            'deadline' => '2026-10-31',

            'icon_url' => 'directions_car.svg',
        ]);
        Goal::create([
            'user_id' => 2,

            'title' => '+2 kg izom',
            'deadline' => '2027-01-01',

            'color' => 'RED',
        ]);
 */
    }
}
