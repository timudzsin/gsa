<?php

use App\Http\Controllers\AuthController;
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

// User don't want essay
Route::get('/user-dont-want-essay', [UserController::class, 'getUserDontWantEssay'])->middleware('auth:sanctum');
Route::post('/user-dont-want-essay', [UserController::class, 'postUserDontWantEssay'])->middleware('auth:sanctum');

// User want essay
Route::get('/user-want-essay', [UserController::class, 'getUserWantEssay'])->middleware('auth:sanctum');
Route::post('/user-want-essay', [UserController::class, 'postUserWantEssay'])->middleware('auth:sanctum');



