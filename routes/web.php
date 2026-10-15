<?php

use App\Http\Controllers\ProductsController;
use App\Http\Controllers\ProfileController;
use App\Models\Products;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Landing page (public). The "Global Item Directory" shows the latest items from the database.
Route::get('/', function () {
    return Inertia::render('Landing/page', [
        'items' => Products::orderByDesc('id')->take(30)->get(),
    ]);
})->name('home');

Route::middleware('auth')->group(function () {
    // Dashboard and Product Management are the same app shell, so they share one data source.
    Route::get('/dashboard', fn () => Inertia::render('Dashboard/page'))->name('dashboard');
    Route::get('/products', fn () => Inertia::render('Products/page'))->name('products');

    // JSON CRUD for the items table (GET/POST /items, GET/PUT/DELETE /items/{product}).
    // Session-authenticated + CSRF-protected, used by the React pages via axios.
    Route::apiResource('items', ProductsController::class)
        ->parameters(['items' => 'product'])
        ->names('items');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/students', fn () => Inertia::render('Student/page'))->name('students');
});

require __DIR__.'/auth.php';
