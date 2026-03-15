<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
    /** @use HasFactory<\Database\Factories\ChecklistFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
    ];
}
