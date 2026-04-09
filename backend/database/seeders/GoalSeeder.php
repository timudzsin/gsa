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
            'icon_url' => 'person_celebrate.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => 'C1 angol nyelvvizsga',
            'deadline' => '2026-08-26',
            'color' => 'BLUE',
            'icon_url' => 'brand_family_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => '2 hónapon át napi 30 perc olvasás',
            'deadline' => '2026-06-15',
            'color' => 'WHITE',
            'icon_url' => 'book_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 1,
            'title' => 'B2 angol nyelvvizsga',
            'deadline' => '2026-01-25',
            'is_completed' => true,
            'rank' => 21,
            'color' => 'YELLOW',
            'icon_url' => 'brand_family_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);



        // alexios
        Goal::create([
            'user_id' => 2,
            'title' => '5 millió Ft megtakarítás',
            'deadline' => '2026-12-31',
            'color' => 'GREEN',
            'icon_url' => 'payments_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Heti 7 edzés 6 hónapon át',
            'deadline' => '2026-10-01',
            'color' => 'RED',
            'icon_url' => 'fitness_center_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Saját vállalkozás bevételének megduplázása',
            'deadline' => '2026-12-31',
            'color' => 'GREEN',
            'icon_url' => 'paid_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '2 könyv elolvasása önfejlesztés témában, és még 3 könyv elolvasása önfejlesztés témában, és még 4 könyv elolvasása önfejlesztés témában',
            'deadline' => '2026-11-30',
            'color' => 'PURPLE',
            'icon_url' => 'book_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Testzsír százalék 15% alá csökkentése',
            'deadline' => '2026-09-15',
            'color' => 'BEIGE',
            'icon_url' => 'body_fat_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'LinkedIn hálózat bővítése 500 új kapcsolattal',
            'deadline' => '2026-08-31',
            'color' => 'BLUE',
            'icon_url' => 'diversity_2_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Maraton lefutása',
            'deadline' => '2026-10-10',
            'color' => 'CORAL',
            'icon_url' => 'directions_run_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);

        Goal::create([
            'user_id' => 2,
            'title' => 'Napi 10 000 lépés 3 hónapon keresztül',
            'deadline' => '2025-12-31',
            'updated_at' => '2025-12-31 14:30:00', // aznap
            'is_completed' => true,
            'rank' => 80,
            'color' => 'GREEN',
            'icon_url' => 'directions_walk_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '3 hónapos vésztartalék felépítése',
            'deadline' => '2025-11-30',
            'updated_at' => '2025-11-08 09:15:00', // 22 nappal előtte
            'is_completed' => true,
            'rank' => 90,
            'color' => 'BLUE',
            'icon_url' => 'payments_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Alap weboldal elkészítése a vállalkozáshoz',
            'deadline' => '2026-02-15',
            'updated_at' => '2026-01-28 16:45:00', // 18 nappal előtte
            'is_completed' => true,
            'rank' => 85,
            'color' => 'CORAL',
            'icon_url' => 'public_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Első félmaraton teljesítése',
            'deadline' => '2025-09-20',
            'updated_at' => '2025-09-05 08:20:00', // 15 nappal előtte
            'is_completed' => true,
            'rank' => 78,
            'color' => 'CORAL',
            'icon_url' => 'directions_run_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '100 ügyfél megszerzése a vállalkozásban',
            'deadline' => '2025-10-31',
            'updated_at' => '2025-10-12 13:10:00', // 19 nappal előtte
            'is_completed' => true,
            'rank' => 92,
            'color' => 'INDIGO',
            'icon_url' => 'group_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '30 napos cukormentes kihívás teljesítése',
            'deadline' => '2025-08-15',
            'updated_at' => '2025-08-01 18:00:00', // 14 nappal előtte
            'is_completed' => true,
            'rank' => 74,
            'color' => 'ORANGE',
            'icon_url' => 'blur_on_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Angol nyelvvizsga B2 szint megszerzése',
            'deadline' => '2025-06-30',
            'updated_at' => '2025-06-10 11:45:00', // 20 nappal előtte
            'is_completed' => true,
            'rank' => 88,
            'color' => 'BLUE',
            'icon_url' => 'public_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Otthoni iroda teljes berendezése',
            'deadline' => '2025-07-25',
            'updated_at' => '2025-07-03 15:30:00', // 22 nappal előtte
            'is_completed' => true,
            'rank' => 81,
            'color' => 'SAGE',
            'icon_url' => 'potted_plant_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => '50 blogcikk publikálása szakmai témában',
            'deadline' => '2025-12-10',
            'updated_at' => '2025-11-21 09:00:00', // 19 nappal előtte
            'is_completed' => true,
            'rank' => 87,
            'color' => 'PURPLE',
            'icon_url' => 'description_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Új laptop vásárlása vállalkozási célra',
            'deadline' => '2025-05-31',
            'updated_at' => '2025-05-20 17:40:00', // 11 nappal előtte
            'is_completed' => true,
            'rank' => 76,
            'color' => 'GRAY',
            'icon_url' => 'memory_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
        ]);
        Goal::create([
            'user_id' => 2,
            'title' => 'Reggeli rutin kialakítása 60 napon át',
            'deadline' => '2025-09-30',
            'updated_at' => '2025-09-09 06:50:00', // 21 nappal előtte
            'is_completed' => true,
            'rank' => 83,
            'color' => 'YELLOW',
            'icon_url' => 'routine_24dp_E3E3E3_FILL1_wght400_GRAD0_opsz24.svg',
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
