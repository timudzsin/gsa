<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // anna: Emma Stone önbizalma
        Task::create([
            'goal_id' => 1,
            'user_id' => 1,

            'description' => 'Szembesülni 1 dologgal ami zavar',

            'type' => 'x_times_per_week',
            'times_per_week' => 1,
        ]);

        // anna: C1 angol nyelvvizsga
        Task::create([
            'goal_id' => 2,
            'user_id' => 1,

            'description' => '1 óra tanulás',

            'type' => 'on_certain_days_of_the_week',
            'is_on_monday' => true,

            'is_on_friday' => true,
            'is_on_saturday' => true,
            'is_on_sunday' => true,
        ]);

        // anna: 2 hónapon át napi 30 perc olvasás
        Task::create([
            'goal_id' => 3,
            'user_id' => 1,

            'description' => '30 perc olvasás',

            'type' => 'daily',
        ]);

        // anna: B2 angol nyelvvizsga (teljesített)
        Task::create([
            'goal_id' => 4,
            'user_id' => 1,

            'description' => '45 perc tanulás',

            'type' => 'on_certain_days_of_the_week',
            'is_on_saturday' => true,
            'is_on_sunday' => true,
        ]);

        // anna: Céltól független feladat
        Task::create([
            'user_id' => 1,

            'description' => 'Fogmosás',

            'type' => 'daily',
        ]);



        // alexios: 5 millió Ft megtakarítás
        Task::create([
            'goal_id' => 5,
            'user_id' => 2,

            'description' => 'Heti költések áttekintése',

            'type' => 'x_times_per_week',
            'times_per_week' => 1,
        ]);

        // alexios: Heti 7 edzés 6 hónapon át
        Task::create([
            'goal_id' => 6,
            'user_id' => 2,

            'description' => 'Edzés megtartása',

            'type' => 'daily',
        ]);

        // alexios: Saját vállalkozás bevételének megduplázása
        Task::create([
            'goal_id' => 7,
            'user_id' => 2,

            'description' => 'Új ügyfelek megkeresése',

            'type' => 'x_times_per_week',
            'times_per_week' => 3,
        ]);

        // alexios: 10 könyv elolvasása önfejlesztés témában
        Task::create([
            'goal_id' => 8,
            'user_id' => 2,

            'description' => '30 perc olvasás',

            'type' => 'daily',
        ]);

        // alexios: Testzsír százalék 15% alá csökkentése
        Task::create([
            'goal_id' => 9,
            'user_id' => 2,

            'description' => 'Kalóriák nyomon követése',

            'type' => 'daily',
        ]);
        Task::create([
            'goal_id' => 9,
            'user_id' => 2,

            'description' => 'Mérlegelés és testösszetétel figyelése',

            'type' => 'x_times_per_week',
            'times_per_week' => 2,
        ]);

        // alexios: LinkedIn hálózat bővítése 500 új kapcsolattal
        Task::create([
            'goal_id' => 10,
            'user_id' => 2,

            'description' => '5 új kapcsolat felvétele',

            'type' => 'x_times_per_week',
            'times_per_week' => 3,
        ]);
        Task::create([
            'goal_id' => 10,
            'user_id' => 2,

            'description' => 'Üzenetek küldése potenciális kapcsolatoknak',

            'type' => 'on_certain_days_of_the_week',
            'is_on_tuesday' => true,
            'is_on_wednesday' => true,
            'is_on_thursday' => true,
        ]);

        // alexios: Maraton lefutása
        Task::create([
            'goal_id' => 11,
            'user_id' => 2,

            'description' => 'Futóedzés',

            'type' => 'on_certain_days_of_the_week',
            'is_on_monday' => true,
            'is_on_wednesday' => true,
            'is_on_saturday' => true,
        ]);
        Task::create([
            'goal_id' => 11,
            'user_id' => 2,

            'description' => 'Hosszú futás',

            'type' => 'x_times_per_week',
            'times_per_week' => 1,
        ]);

        // alexios: Napi 10 000 lépés 3 hónapon keresztül (completed)
        Task::create([
            'goal_id' => 12,
            'user_id' => 2,

            'description' => '10 000 lépés(completed)',

            'type' => 'daily',
        ]);

        // alexios: 3 hónapos vésztartalék felépítése (completed)
        Task::create([
            'goal_id' => 13,
            'user_id' => 2,

            'description' => 'Heti megtakarítás félretétele(completed)',

            'type' => 'x_times_per_week',
            'times_per_week' => 1,
        ]);
        Task::create([
            'goal_id' => 13,
            'user_id' => 2,

            'description' => 'Kiadások csökkentése (nem szükséges vásárlások kerülése)(completed)',

            'type' => 'daily',
        ]);

        // alexios: Alap weboldal elkészítése a vállalkozáshoz (completed)
        Task::create([
            'goal_id' => 14,
            'user_id' => 2,

            'description' => 'Weboldal fejlesztése(completed)',

            'type' => 'on_certain_days_of_the_week',
            'is_on_monday' => true,
            'is_on_wednesday' => true,
            'is_on_sunday' => true,
        ]);
        Task::create([
            'goal_id' => 14,
            'user_id' => 2,

            'description' => 'Weboldal funkciók tesztelése és hibajavítás(completed)',

            'type' => 'x_times_per_week',
            'times_per_week' => 2,
        ]);

        // alexios: Céltól független feladatok
        Task::create([
            'user_id' => 2,

            'description' => 'Napi tervezés',

            'type' => 'daily',
        ]);
        Task::create([
            'user_id' => 2,

            'description' => 'Rendrakás az íróasztalon',

            'type' => 'x_times_per_week',
            'times_per_week' => 1,
        ]);
        Task::create([
            'user_id' => 2,

            'description' => '25 perc Takarítás',

            'type' => 'x_times_per_week',
            'times_per_week' => 3,
        ]);
        Task::create([
            'user_id' => 2,

            'description' => 'Gyógyszert bevenni',

            'type' => 'daily',
        ]);
    }
}
