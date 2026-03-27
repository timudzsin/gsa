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
        // dávid ...
        
        User::create([
            'name' => 'dorina',
            'password' => 'dorina',
            
            'dont_want_essay' => 'Dorina "mit nem akarok" esszéje.😔 Ez majd egy teljesen megírt esszé lesz.',
            'want_essay' => 'Dorina "mit akarok" esszéje.🤗  Ez majd egy teljesen megírt esszé lesz.',
        ]);

        User::create([
            'name' => 'alexios',
            'password' => 'alexios',
            
            'dont_want_essay' => 'Alexios "mit nem akarok" esszéje.😔',
            'want_essay' => 'Alexios "mit akarok" esszéje.🤗',
        ]);

        User::create([
            'name' => 'first8',
            'password' => 'first8',
        ]);

        User::create([
            'name' => 'last8',
            'password' => 'last8',
        ]);
    }
}
