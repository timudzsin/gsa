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
        Goal::create([
            'user_id' => 1,

            'title' => 'Opel Astra',
            'deadline' => '2026-10-31',

            'icon_url' => 'car.png',
        ]);
        Goal::create([
            'user_id' => 1,

            'title' => '+2 kg izom',
            'deadline' => '2027-01-01',
            
            'color' => 'RED',
        ]);
    }
}
