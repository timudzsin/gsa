<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Validáció
        $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'password' => 'required|min:1',
        ]);

        // Felhasználó létrehozása
        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        // API Bearer Token létrehozása a felhasználónak (tehát regisztráció után rögtön belépünk)
        $token = $user->createToken('api-token')->plainTextToken;

        // Válasz
        return response()->json([
            'message' => 'Sikeres regisztráció',
            'user' => $user,
            'token' => $token,
        ], 201);
    }



    public function login(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Validáció
        $request->validate([
            'name' => 'required|string|max:255',
            'password' => 'required',
        ]);

        // Hitelesítés
        if (!Auth::attempt(['name' => $request->name, 'password' => $request->password])) {
            return response()->json([
                'message' => 'Hibás felhasználónév vagy jelszó'
            ], 401);
        }
        $user = Auth::user();

        // API Bearer Token létrehozása a felhasználónak
        $token = $user->createToken('api-token')->plainTextToken;

        // Válasz
        return response()->json([
            'message' => 'Sikeres login',
            'user' => $user,
            'token' => $token,
        ], 200);
    }



    public function me(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nem található felhasználó ehhez a Bearer Tokenhez'
            ], 401);
        }

        // Válasz
        return response()->json([
            'message' => 'A Bearer Token felhasználója:',
            'user' => $user,
        ], 200);
    }



    public function logout(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Felhasználó lekérdezése
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'Nem található felhasználó ehhez a Bearer Tokenhez'
            ], 404);
        }

        // A felhasználó Bearer Tokenjét töröljük
        $request->user()->currentAccessToken()->delete();

        // Válasz
        return response()->json([
            'message' => 'Sikeres kijelentkezés',
            'user' => $user,
        ], 200);
    }
}
