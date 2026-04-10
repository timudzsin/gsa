<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Authentikáció
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


// user Don't want essay
Route::get('/user-dont-want-essay', [UserController::class, 'getUserDontWantEssay'])->middleware('auth:sanctum');
Route::put('/user-dont-want-essay', [UserController::class, 'putUserDontWantEssay'])->middleware('auth:sanctum');


// user Want essay
Route::get('/user-want-essay', [UserController::class, 'getUserWantEssay'])->middleware('auth:sanctum');
Route::put('/user-want-essay', [UserController::class, 'putUserWantEssay'])->middleware('auth:sanctum');


// user Not completed goals
Route::get('/user-not-completed-goals', [GoalController::class, 'getUserNotCompletedGoals'])->middleware('auth:sanctum'); // Célok lekérdezése
Route::post('/user-not-completed-goals', [GoalController::class, 'postUserNotCompletedGoal'])->middleware('auth:sanctum'); // Cél létrehozása
Route::patch('/user-not-completed-goals/{goal}', [GoalController::class, 'patchUserNotCompletedGoal'])->middleware('auth:sanctum'); // Cél szerkesztése


// user Completed goals
Route::get('/user-completed-goals', [GoalController::class, 'getUserCompletedGoals'])->middleware('auth:sanctum'); // Célok lekérdezése



















// régi végpontok
Route::get('/user-goals', [GoalController::class, 'getUserGoals'])->middleware('auth:sanctum');
Route::put('/user-goals', [GoalController::class, 'putUserGoals'])->middleware('auth:sanctum');



