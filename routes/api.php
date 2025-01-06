<?php

use App\Http\Controllers\authentications\AuthController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Open Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::prefix('user')->group(function () {
        // Permission
        Route::post('/add-permission', [UserController::class, 'addPermission']);
        Route::get('/list-permission', [UserController::class, 'listPermission']);
        Route::delete('/delete-permission/{id}', [UserController::class, 'deletePermission']);
        Route::put('/update-permission/{id}', [UserController::class, 'updatePermission']);
        // Role
        Route::post('/add-role', [UserController::class, 'addRole']);
        Route::get('/list-role', [UserController::class, 'listRole']);
        Route::put('/update-role/{id}', [UserController::class, 'updateRole']);
        Route::delete('/delete-role/{id}', [UserController::class, 'deleteRole']);
        // User
        Route::get('/list-user', [UserController::class, 'listUser']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/add-user', [UserController::class, 'addUser']);
        Route::delete('/delete-user/{id}', [UserController::class, 'deleteUser']);
        Route::put('/update-user/{id}', [UserController::class, 'updateUser']);
    });
    Route::prefix('page')->group(function () {
        Route::post('/store-page', [PageController::class, 'storePage']);
        Route::get('/list-page', [PageController::class, 'listPage']);
        Route::delete('/delete-page/{id}', [PageController::class, 'deletePage']);
        Route::put('/update-page/{id}', [PageController::class, 'updatePage']);
        Route::get('/data-page/{id}', [PageController::class, 'dataPage']);
        Route::put('/update-data-page/{id}', [PageController::class, 'updateDataPage']);
    });
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});
