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

        // anna: 2 hónapig heti 2 edzés
        Task::create([
            'goal_id' => 3,
            'user_id' => 1,

            'description' => '1 óra tanulás',

            'type' => 'on_certain_days_of_the_week',
            'is_on_monday' => true,
            
            'is_on_friday' => true,
            'is_on_saturday' => true,
            'is_on_sunday' => true,
        ]);






        Task::create([
            'goal_id' => 1,
            'user_id' => 1,

            'description' => 'munka',

            'type' => 'on_certain_days_of_the_week',
            'is_on_saturday' => true,
            'is_on_sunday' => true,
        ]);
        Task::create([
            'goal_id' => 2,
            'user_id' => 1,

            'description' => 'edzés',

            'type' => 'x_times_per_week',
            'times_per_week' => 3,
        ]);
        Task::create([
            'goal_id' => 2,
            'user_id' => 1,

            'description' => '150 g protein',

            'type' => 'daily',
        ]);
    }
}
