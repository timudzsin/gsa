<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Checklist;
use App\Models\Task;


class ChecklistItem extends Model
{
    /** @use HasFactory<\Database\Factories\ChecklistItemFactory> */
    use HasFactory;

    protected $fillable = [
        'checklist_id',
        'task_id',
        'description',
        'rank',
        'is_completed',
        'when',
        'times_this_week',
    ];

    // Kapcsolatok
    public function checklist()
    {
        return $this->belongsTo(Checklist::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
