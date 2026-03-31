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

        // anna: B2 angol nyelvvizsga
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




    }
}
