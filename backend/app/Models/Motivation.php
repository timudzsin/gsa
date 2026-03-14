<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motivation extends Model
{
    /** @use HasFactory<\Database\Factories\MotivationFactory> */
    use HasFactory;

    protected $fillable = [
        'goal_id',
        'description',
    ];
}
