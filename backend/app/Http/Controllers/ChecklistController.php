<?php

namespace App\Http\Controllers;

use App\Models\Checklist;
use App\Models\ChecklistItem;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChecklistRequest;
use App\Http\Requests\UpdateChecklistRequest;

class ChecklistController extends Controller
{
    public function createTodayChecklist(Request $request)
    {
        // A kérés JSON-re kényszerítése
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése token alapján
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Mai nap
        $today = now()->toDateString();

        // Ha már van mai checklist, csak visszaadjuk
        $existingChecklist = Checklist::where('user_id', $user->id)
            ->whereDate('date', $today)
            ->with('checklistItems')
            ->first();
        if ($existingChecklist) {
            return response()->json([
                'message' => 'A mai checklist már létezik.',
                'checklist' => $existingChecklist
            ], 200);
        }

        // Tranzakció a checklist és szükséges checklist_item-ek létrehozására
        $checklist = null;
        $createdItems = [];
        DB::transaction(function () use ($user, $today, &$checklist, &$createdItems) {
            // Checklist létrehozása
            $checklist = Checklist::create([
                'user_id' => $user->id,
                'date' => $today,
            ]);
            // A felhasználó task-jainak lekérdezése
            $tasks = Task::where('user_id', $user->id)
                ->orderBy('rank')
                ->get();
            // Segéd változó: mai nap
            $todayField = match (now()->dayOfWeek) {
                1 => 'is_on_monday',
                2 => 'is_on_tuesday',
                3 => 'is_on_wednesday',
                4 => 'is_on_thursday',
                5 => 'is_on_friday',
                6 => 'is_on_saturday',
                0 => 'is_on_sunday',
            };
            // Végigmegyünk a felhasználó task-jain, eldöntjük, hogy kell-e belőle checklist item, és ha kell létrehozzuk
            foreach ($tasks as $task) {
                $shouldCreate = false;
                // Kell?
                if ($task->type === 'daily') {
                    $shouldCreate = true;
                } elseif ($task->type === 'on_certain_days_of_the_week') {
                    $shouldCreate = (bool) ($task->{$todayField} ?? false);
                } elseif ($task->type === 'x_times_per_week') {
                    $shouldCreate = false;
                }
                // Létrehozás
                if ($shouldCreate) {
                    $createdItems[] = ChecklistItem::create([
                        'checklist_id' => $checklist->id,
                        'task_id' => $task->id,
                        'is_completed' => false,
                        'description' => $task->description,
                        'rank' => $task->rank,
                    ]);
                }
            }
        });

        // Válasz
        return response()->json([
            'message' => 'A mai checklist sikeresen létrehozva.',
            'checklist' => $checklist->load('checklistItems'),
        ], 201);
    }
















    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChecklistRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Checklist $checklist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChecklistRequest $request, Checklist $checklist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Checklist $checklist)
    {
        //
    }
}
