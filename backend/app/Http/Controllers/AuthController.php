<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // A kérés JSON-re kényszerítése (hogy ne HTML választ kapjunk, ha nincs beállítva)
        $request->headers->set('Accept', 'application/json');

        // Validálása
        $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'password' => 'required|min:1',
        ]);

        // Felhasználó létrehozása
        $user = User::create([
            'name' => $request->name,
            'password' => Hash::make($request->password),
        ]);

        // API (bearer) token létrehozása a felhasználónak (tehát regisztráció után rögtön belépünk)
        $token = $user->createToken('api-token')->plainTextToken;

        // Válasz
        return response()->json([
            'message' => 'Sikeres regisztráció',
            'user' => $user,
            'token' => $token,
        ], 201);
    }



    public function register_old(Request $request)
    {
        // Validálása
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users,name',
            'password' => 'required|min:1',
        ]);
        if ($validator->fails()) {
            return response()->json(
                $validator->errors(),
                422
            );
        }
        $validated = $validator->validated();

        // Felhasználó létrehozása
        $user = User::create([
            'name' => $validated['name'],
            'password' => Hash::make($validated['password']),
        ]);

        // API (bearer) token létrehozása a felhasználónak (tehát regisztráció után rögtön belépünk)
        $token = $user->createToken('api-token')->plainTextToken;

        // Válasz
        return response()->json([
            'message' => 'Sikeres regisztráció',
            'user' => $user,
            'token' => $token
        ], 201);
    }
}
