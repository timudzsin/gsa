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
        User::create([
            'name' => 'marci',
            'password' => 'marci',
            'dont_want_essay' => 'Egy vesztes leszek.',
            'want_essay' => 'Gazdag, izmos és sikeres vagyok.',
        ]);
    }
}
