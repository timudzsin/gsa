<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\ChecklistItem;

class Checklist extends Model
{
    /** @use HasFactory<\Database\Factories\ChecklistFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
    ];

    // Kapcsolatok
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function checklistItems()
    {
        return $this->hasMany(ChecklistItem::class);
    }
}
