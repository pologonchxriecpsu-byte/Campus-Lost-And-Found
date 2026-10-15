<?php

use App\Http\Controllers\TutoringController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Items (products) now live in routes/web.php behind the `auth` middleware.
Route::apiResource('tutoring-requests', TutoringController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
