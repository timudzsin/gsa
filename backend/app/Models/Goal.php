<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Motivation;
use App\Models\Task;

class Goal extends Model
{
    /** @use HasFactory<\Database\Factories\GoalFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'deadline',
        'color',
        'icon_url',
    ];

    // Kapcsolatok
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function motivations()
    {
        return $this->hasMany(Motivation::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
