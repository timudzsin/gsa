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
        Motivation::create([
            'goal_id' => 1,
            'description' => 'Hogy könnyebben eljuthassak bárhova.',
        ]);
        Motivation::create([
            'goal_id' => 1,
            'description' => 'Mert menő.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy vonzóbb legyek.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy erősebb legyek.',
        ]);
        Motivation::create([
            'goal_id' => 2,
            'description' => 'Hogy egészségesebb legyek.',
        ]);
    }
}
