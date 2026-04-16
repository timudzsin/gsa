<?php

namespace App\Http\Controllers;

use App\Models\ChecklistItem;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChecklistItemRequest;
use App\Http\Requests\UpdateChecklistItemRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChecklistItemController extends Controller
{
    public function toggle(Request $request, ChecklistItem $checklistItem)
    {
        // A kérés JSON-re kényszerítése
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése token alapján
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez.'
            ], 401);
        }

        // A kapcsolt checklistet is beolvassuk
        $checklistItem->load('checklist');

        // 1) Csak a saját checklist item-jét módosíthatja
        if ($checklistItem->checklist->user_id !== $user->id) {
            return response()->json([
                'message' => 'Nincs jogosultságod ehhez a checklist itemhez.'
            ], 403);
        }

        // 2) Csak a mai checklisthez tartozó item toggle-ölhető
        $today = now()->toDateString();
        if ($checklistItem->checklist->date !== $today) {
            return response()->json([
                'message' => 'Csak a mai checklist elemei toggle-ölhetők.'
            ], 403);
        }

        // Tranzakció: a checklist_item-et toggle-öljük
        DB::transaction(function () use ($checklistItem) {
            $checklistItem->update([
                'is_completed' => ! $checklistItem->is_completed,
            ]);
        });

        // Válasz
        return response()->json([
            'message' => 'A checklist item állapota sikeresen frissítve.',
            'checklist_item' => $checklistItem->fresh(),
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
    public function store(StoreChecklistItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ChecklistItem $checklistItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChecklistItemRequest $request, ChecklistItem $checklistItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChecklistItem $checklistItem)
    {
        //
    }
}
