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
        // anna
        Goal::create([
            'user_id' => 1,
            'title' => 'Emma Stone önbizalma',
            'deadline' => '2027-01-15',
            'color' => 'LIGHT_BLUE',
            'icon_url' => 'confidence.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => 'C1 angol nyelvvizsga',
            'deadline' => '2026-08-26',
            'color' => 'BLUE',
            'icon_url' => 'language.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => '2 hónapon át napi 30 perc olvasás',
            'deadline' => '2026-06-15',
            'color' => 'WHITE',
            'icon_url' => 'book.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => 'B2 angol nyelvvizsga',
            'deadline' => '2026-01-25',
            'is_completed' => true,
            'rank' => 21,
            'color' => 'YELLOW',
            'icon_url' => 'language.svg',
        ]);



        // alexios
        Goal::create([
            'user_id' => 2,
            'title' => '5 millió Ft megtakarítás',
            'deadline' => '2026-12-31',
            'color' => 'GREEN',
            'icon_url' => 'savings.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Heti 7 edzés 6 hónapon át',
            'deadline' => '2026-10-01',
            'color' => 'RED',
            'icon_url' => 'workout.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Saját vállalkozás bevételének megduplázása',
            'deadline' => '2026-12-31',
            'color' => 'MAGENTA',
            'icon_url' => 'business-growth.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '2 könyv elolvasása önfejlesztés témában, és még 3 könyv elolvasása önfejlesztés témában, és még 4 könyv elolvasása önfejlesztés témában',
            'deadline' => '2026-11-30',
            'color' => 'PURPLE',
            'icon_url' => 'books.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Testzsír százalék 15% alá csökkentése',
            'deadline' => '2026-09-15',
            'color' => 'BEIGE',
            'icon_url' => 'body-fat.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'LinkedIn hálózat bővítése 500 új kapcsolattal',
            'deadline' => '2026-08-31',
            'color' => 'BLUE',
            'icon_url' => 'network.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Maraton lefutása',
            'deadline' => '2026-10-10',
            'color' => 'CORAL',
            'icon_url' => 'marathon.svg',
        ]);

        Goal::create([
            'user_id' => 2,
            'title' => 'Napi 10 000 lépés 3 hónapon keresztül',
            'deadline' => '2025-12-31',
            'is_completed' => true,
            'rank' => 80,
            'color' => 'GREEN',
            'icon_url' => 'steps.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '3 hónapos vésztartalék felépítése',
            'deadline' => '2025-11-30',
            'is_completed' => true,
            'rank' => 90,
            'color' => 'BLUE',
            'icon_url' => 'savings.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Alap weboldal elkészítése a vállalkozáshoz',
            'deadline' => '2026-02-15',
            'is_completed' => true,
            'rank' => 85,
            'color' => 'CORAL',
            'icon_url' => 'website.svg',
        ]);



        // first8
        Goal::create([
            'user_id' => 3,
            'title' => 'A piros cél címe',
            'deadline' => '2027-05-14',
            'color' => 'RED',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A coral cél címe',
            'deadline' => '2026-11-22',
            'color' => 'CORAL',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A narancssárga cél címe',
            'deadline' => '2028-02-03',
            'color' => 'ORANGE',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A citromsárga cél címe',
            'deadline' => '2027-08-19',
            'color' => 'YELLOW',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A zöld cél címe',
            'deadline' => '2028-01-27',
            'color' => 'GREEN',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A cián cél címe',
            'deadline' => '2027-03-06',
            'color' => 'CYAN',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A világoskék cél címe',
            'deadline' => '2026-10-15',
            'color' => 'LIGHT-BLUE',
        ]);
        Goal::create([
            'user_id' => 3,
            'title' => 'A kék cél címe',
            'deadline' => '2027-06-30',
            'color' => 'BLUE',
        ]);



        // last7
        Goal::create([
            'user_id' => 4,
            'title' => 'Az indigo cél címe',
            'deadline' => '2028-03-12',
            'color' => 'INDIGO',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A lila cél címe',
            'deadline' => '2026-09-28',
            'color' => 'PURPLE',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A magenta cél címe',
            'deadline' => '2027-11-05',
            'color' => 'MAGENTA',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A rózsaszín cél címe',
            'deadline' => '2028-06-17',
            'color' => 'PINK',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A szürke cél címe',
            'deadline' => '2026-08-21',
            'color' => 'GRAY',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A zsályazöld cél címe',
            'deadline' => '2027-01-13',
            'color' => 'SAGE',
        ]);
        Goal::create([
            'user_id' => 4,
            'title' => 'A bézs cél címe',
            'deadline' => '2027-01-13',
            'color' => 'BEIGE',
        ]);
    }
}
