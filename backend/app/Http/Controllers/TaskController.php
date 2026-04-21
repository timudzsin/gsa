<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    public function getUserGoalIndependentTasks(Request $request)
    {
        // A kérés JSON-re kényszerítése
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése a Bearer token alapján
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // A felhasználó olyan taskjainak lekérdezése, amik nem tartoznak goal-hoz
        $tasks = $user->tasks()
            ->whereNull('goal_id')
            ->orderBy('rank')
            ->get();

        return response()->json([
            'message' => 'A felhasználó céltól független taskjai sikeresen lekérve',
            'tasks' => $tasks
        ], 200);
    }



    public function patchUserGoalIndependentTasks(Request $request)
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

        // Validáció
        $validated = $request->validate([
            'tasks' => ['required', 'array'],
            'tasks.*.id' => ['nullable', 'integer'],
            'tasks.*.description' => ['required', 'string', 'max:255'],
            'tasks.*.type' => ['required', Rule::in([
                'daily',
                'on_certain_days_of_the_week',
                'x_times_per_week'
            ])],
            'tasks.*.rank' => ['required', 'integer'],
            'tasks.*.is_on_monday' => ['nullable', 'boolean'],
            'tasks.*.is_on_tuesday' => ['nullable', 'boolean'],
            'tasks.*.is_on_wednesday' => ['nullable', 'boolean'],
            'tasks.*.is_on_thursday' => ['nullable', 'boolean'],
            'tasks.*.is_on_friday' => ['nullable', 'boolean'],
            'tasks.*.is_on_saturday' => ['nullable', 'boolean'],
            'tasks.*.is_on_sunday' => ['nullable', 'boolean'],
            'tasks.*.times_per_week' => ['nullable', 'integer', 'min:1'],
        ]);

        DB::transaction(function () use ($validated, $user) {
            $incomingTasks = collect($validated['tasks']);
            $incomingTaskIds = $incomingTasks->pluck('id')->filter()->values()->all();

            $independentTasksQuery = $user->tasks()->whereNull('goal_id');

            // Ami nincs a kérésben, töröljük
            if (count($incomingTaskIds) > 0) {
                $independentTasksQuery->whereNotIn('id', $incomingTaskIds)->delete();
            } else {
                $independentTasksQuery->delete();
            }

            foreach ($incomingTasks as $taskData) {
                $taskPayload = [
                    'description' => $taskData['description'],
                    'type' => $taskData['type'],
                    'rank' => $taskData['rank'],
                    'is_on_monday' => $taskData['is_on_monday'] ?? null,
                    'is_on_tuesday' => $taskData['is_on_tuesday'] ?? null,
                    'is_on_wednesday' => $taskData['is_on_wednesday'] ?? null,
                    'is_on_thursday' => $taskData['is_on_thursday'] ?? null,
                    'is_on_friday' => $taskData['is_on_friday'] ?? null,
                    'is_on_saturday' => $taskData['is_on_saturday'] ?? null,
                    'is_on_sunday' => $taskData['is_on_sunday'] ?? null,
                    'times_per_week' => $taskData['times_per_week'] ?? null,
                    'user_id' => $user->id,
                    'goal_id' => null,
                ];

                if (!empty($taskData['id'])) {
                    $updated = $user->tasks()
                        ->whereNull('goal_id')
                        ->where('id', $taskData['id'])
                        ->update($taskPayload);

                    if (!$updated) {
                        $user->tasks()->create($taskPayload);
                    }
                } else {
                    $user->tasks()->create($taskPayload);
                }
            }
        });

        $tasks = $user->tasks()
            ->whereNull('goal_id')
            ->orderBy('rank')
            ->get();

        return response()->json([
            'message' => 'A céltól független taskok sikeresen szinkronizálva lettek',
            'tasks' => $tasks
        ], 200);
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
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
