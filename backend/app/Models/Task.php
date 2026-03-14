<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $fillable = [
        'goal_id',
        'user_id',
        'description',
        'type',
        'is_on_monday',
        'is_on_tuesday',
        'is_on_wednesday',
        'is_on_thursday',
        'is_on_friday',
        'is_on_saturday',
        'is_on_sunday',
        'times_per_week',
    ];
}
