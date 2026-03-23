<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserDontWantEssay(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Válasz
        return response()->json([
            'dont_want_essay' => $user->dont_want_essay
        ], 200);
    }



    public function postUserDontWantEssay(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Mentés
        $user->dont_want_essay = $request->dont_want_essay;
        $user->save();

        // Válasz
        return response()->json([
            'message' => 'Mit nem akarok esszé mentve',
            'dont_want_essay' => $user->dont_want_essay
        ], 200);
    }



    public function getUserWantEssay(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Válasz
        return response()->json([
            'want_essay' => $user->want_essay
        ], 200);
    }



    public function postUserWantEssay(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nincs bejelentkezett felhasználó ehhez a tokenhez'
            ], 401);
        }

        // Mentés
        $user->want_essay = $request->want_essay;
        $user->save();

        // Válasz
        return response()->json([
            'message' => 'Mit akarok esszé mentve',
            'want_essay' => $user->want_essay
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
