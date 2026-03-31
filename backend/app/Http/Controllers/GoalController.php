<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        // Felhasználó teljesítetlen céljainak lekérdezése
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
