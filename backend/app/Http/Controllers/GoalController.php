<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class GoalController extends Controller
{
    public function getUserNotCompletedGoals(Request $request)
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

        // Felhasználó nem teljesített céljainak lekérdezése
        $goals = $user->goals()
            ->where('is_completed', false) // csak a nem teljesített célok
            ->with(['motivations', 'tasks'])
            ->orderBy('rank')
            ->get();

        // Válasz
        return response()->json([
            'message' => 'A felhasználó nem teljesített céljai sikeresen lekérve',
            'goals' => $goals
        ], 200);
    }



    public function postUserNotCompletedGoal(Request $request)
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
            'title' => ['required', 'string', 'max:255'],
            'deadline' => ['required', 'date'],
            'rank' => ['required', 'integer'],
            'color' => ['required', 'string', 'max:50'],
            'icon_url' => ['required', 'string', 'max:255'],

            'motivations' => ['required', 'array'],
            'motivations.*.description' => ['required', 'string', 'max:255'],

            'tasks' => ['required', 'array'],
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

        $goal = null;

        // Tranzakció
        DB::transaction(function () use ($validated, $user, &$goal) {

            // Goal létrehozása
            $goal = $user->goals()->create([
                'title' => $validated['title'],
                'deadline' => $validated['deadline'],
                'rank' => $validated['rank'],
                'color' => $validated['color'],
                'icon_url' => $validated['icon_url'],
                'is_completed' => false,
            ]);

            // Motivációk létrehozása
            foreach ($validated['motivations'] as $motivationData) {
                $goal->motivations()->create([
                    'description' => $motivationData['description'],
                ]);
            }

            // Taskok létrehozása
            foreach ($validated['tasks'] as $taskData) {
                $goal->tasks()->create([
                    'user_id' => $user->id,
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
                ]);
            }
        });

        // Válasz
        return response()->json([
            'message' => 'A cél sikeresen létrehozva',
            'goal' => $goal->fresh(['motivations', 'tasks']),
        ], 201);
    }



    public function patchUserNotCompletedGoal(Request $request, Goal $goal)
    {
        // A kérés JSON-re kényszerítése
        $request->headers->set('Accept', 'application/json');

        // Ha a cél nem a felhasználóhoz tartozik, akkor megtagadjuk
        $user = $request->user();
        if (!$user || $goal->user_id !== $user->id) {
            return response()->json([
                'message' => 'Nincs jogosultságod ennek a célnak a módosításához.'
            ], 403);
        }

        // Validáció   (a goal id  route paraméterből jön)
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'deadline' => ['required', 'date'],
            'rank' => ['required', 'integer'],
            'color' => ['required', 'string', 'max:50'],
            'icon_url' => ['required', 'string', 'max:255'],

            'motivations' => ['required', 'array'],
            'motivations.*.id' => ['nullable', 'integer'],
            'motivations.*.description' => ['required', 'string', 'max:255'],

            'tasks' => ['required', 'array'],
            'tasks.*.id' => ['nullable', 'integer'],
            'tasks.*.description' => ['required', 'string', 'max:255'],
            'tasks.*.type' => ['required', Rule::in(['daily', 'on_certain_days_of_the_week', 'x_times_per_week'])],
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

        // Minden adatbázis-módosítást tranzakcióba teszünk, ha valami rossz, rollback
        DB::transaction(function () use ($goal, $validated) {
            // Cél rekord frissítése
            $goal->update([
                'title' => $validated['title'],
                'deadline' => $validated['deadline'],
                'rank' => $validated['rank'],
                'color' => $validated['color'],
                'icon_url' => $validated['icon_url'],
            ]);

            /*
                Motivációk szinkronizálása:
                - amelyikhez van id backenden, azt frissítjük
                - amelyikhez nincs id backenden, azt új rekordként létrehozzuk
                - amelyik eltűnt a frontendről, azt töröljük
            */
            $incomingMotivations = collect($validated['motivations']);
            $incomingMotivationIds = $incomingMotivations->pluck('id')->filter()->values()->all();
            // Amelyik motivácó eltűnt a frontend-ről, azt töröljük
            if (count($incomingMotivationIds) > 0) {
                $goal->motivations()->whereNotIn('id', $incomingMotivationIds)->delete();
            } else {
                $goal->motivations()->delete();
            }

            foreach ($incomingMotivations as $motivationData) {
                if (!empty($motivationData['id'])) {
                    // Létező motiváció frissítése
                    $goal->motivations()
                        ->where('id', $motivationData['id'])
                        ->update([
                            'description' => $motivationData['description'],
                        ]);
                } else {
                    // Új motiváció létrehozása ha nincs ilyen id
                    $goal->motivations()->create([
                        'description' => $motivationData['description'],
                    ]);
                }
            }

            /*
                Taskok szinkronizálása ugyanígy:
                - meglévők frissítése
                - újak létrehozása
                - töröltek eltávolítása
            */
            $incomingTasks = collect($validated['tasks']);
            $incomingTaskIds = $incomingTasks->pluck('id')->filter()->values()->all();
            // Törölt task eltávolítása
            if (count($incomingTaskIds) > 0) {
                $goal->tasks()->whereNotIn('id', $incomingTaskIds)->delete();
            } else {
                $goal->tasks()->delete();
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
                    'user_id' => $goal->user_id,
                ];

                if (!empty($taskData['id'])) {
                    // Létező task frissítése
                    $goal->tasks()
                        ->where('id', $taskData['id'])
                        ->update($taskPayload);
                } else {
                    // Új task létrehozása
                    $goal->tasks()->create($taskPayload);
                }
            }
        });

        // A frissített célt visszaadjuk, együtt a kapcsolt motivációkkal és taskokkal.
        return response()->json([
            'message' => 'A cél sikeresen frissítve',
            'goal' => $goal->fresh(['motivations', 'tasks']),
        ], 200);
    }










    public function getUserCompletedGoals(Request $request)
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

        // Felhasználó teljesített céljainak lekérdezése
        $goals = $user->goals()
            ->where('is_completed', true) // csak a teljesített célok
            ->with(['motivations', 'tasks'])
            ->orderBy('updated_at')
            ->get();

        // Válasz
        return response()->json([
            'message' => 'A felhasználó teljesített céljai sikeresen lekérve',
            'goals' => $goals
        ], 200);
    }
















































    // régi dolgok
    public function getUserGoals(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése a Bearer token alapján
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Felhasználó céljainak lekérdezése. Ez a rész olyan mint egy SQL query
        $goals = $user->goals()
            ->with(['motivations', 'tasks'])
            ->orderBy('rank')
            ->get();

        // Válasz
        return response()->json([
            'message' => 'A felhasználó céljai sikeresen lekérve',
            'goals' => $goals
        ], 200);
    }



    public function putUserGoals(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése a Bearer token alapján
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Bejövő adatok validálása (ellenőrizzük a struktúrát)
        $validated = $request->validate([
            'goals' => 'required|array|min:1',
            'goals.*.title' => 'required|string|max:255',
            'goals.*.deadline' => 'required|date',
            'goals.*.color' => 'sometimes|string|max:255',
            'goals.*.icon_url' => 'sometimes|string|max:255',

            'goals.*.motivations' => 'sometimes|array',
            'goals.*.motivations.*.description' => 'required|string|max:1000',

            'goals.*.tasks' => 'sometimes|array',
            'goals.*.tasks.*.description' => 'required|string|max:1000',
            'goals.*.tasks.*.type' => 'required|in:daily,on_certain_days_of_the_week,x_times_per_week',
            'goals.*.tasks.*.is_on_monday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_tuesday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_wednesday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_thursday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_friday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_saturday' => 'sometimes|boolean',
            'goals.*.tasks.*.is_on_sunday' => 'sometimes|boolean',
            'goals.*.tasks.*.times_per_week' => 'sometimes|nullable|integer',
        ]);

        // Adatbázis tranzakció → ha bármi hiba van, minden visszagörgetődik
        $createdGoals = [];
        DB::transaction(function () use ($validated, $user, &$createdGoals) {
            // Régi adatok törlése (Ez a céltól független taskokat nem törli, és pont ezt akarjuk)
            $user->goals()->delete();

            // Végigmegyünk a beküldött célokon
            foreach ($validated['goals'] as $goalData) {
                // Cél létrehozása (a felhasználóhoz)
                $goal = Goal::create([
                    'user_id' => $user->id,
                    'title' => $goalData['title'],
                    'deadline' => $goalData['deadline'],
                    'color' => $goalData['color'] ?? 'GRAY',
                    'icon_url' => $goalData['icon_url'] ?? 'default.png',
                ]);

                // Motivációk létrehozása a célhoz (ha vannak)
                if (!empty($goalData['motivations'])) {
                    foreach ($goalData['motivations'] as $motivationData) {
                        $goal->motivations()->create([
                            'description' => $motivationData['description'],
                        ]);
                    }
                }

                // Feladatok létrehozása a célhoz (ha vannak)
                if (!empty($goalData['tasks'])) {
                    foreach ($goalData['tasks'] as $taskData) {
                        $goal->tasks()->create([
                            'user_id' => $user->id,
                            'description' => $taskData['description'],
                            'type' => $taskData['type'],
                            'is_on_monday' => $taskData['is_on_monday'] ?? null,
                            'is_on_tuesday' => $taskData['is_on_tuesday'] ?? null,
                            'is_on_wednesday' => $taskData['is_on_wednesday'] ?? null,
                            'is_on_thursday' => $taskData['is_on_thursday'] ?? null,
                            'is_on_friday' => $taskData['is_on_friday'] ?? null,
                            'is_on_saturday' => $taskData['is_on_saturday'] ?? null,
                            'is_on_sunday' => $taskData['is_on_sunday'] ?? null,
                            'times_per_week' => $taskData['times_per_week'] ?? null,
                        ]);
                    }
                }

                // Betöltjük a célokat és kapcsolódó adatokat (motivations + tasks)
                $createdGoals[] = $goal->load(['motivations', 'tasks']);
            }
        });

        // Válasz
        return response()->json([
            'message' => 'A célok sikeresen mentve',
            'goals' => $createdGoals,
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
    public function store(StoreGoalRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Goal $goal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoalRequest $request, Goal $goal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goal $goal)
    {
        //
    }
}
