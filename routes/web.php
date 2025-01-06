<?php

use App\Http\Controllers\authentications\LoginBasic;
use App\Http\Controllers\language\LanguageController;
use App\Http\Controllers\pages\Builder;
use App\Http\Controllers\pages\HomePage;
use App\Http\Controllers\pages\MiscError;
use App\Http\Controllers\pages\PageManagement;
use App\Http\Controllers\pages\PublicPage;
use App\Http\Controllers\pages\UserManagement\RolePermission;
use App\Http\Controllers\pages\UserManagement\UserList;
use Illuminate\Support\Facades\Route;

// locale
Route::get('/lang/{locale}', [LanguageController::class, 'swap']);
Route::get('/pages/misc-error', [MiscError::class, 'index'])
    ->name('pages-misc-error');

// authentication
Route::get('/login', [LoginBasic::class, 'index'])->name('login');
// Route::get('/auth/register-basic', [RegisterBasic::class, 'index'])->name('auth-register-basic');
Route::get('/{slug}', [PublicPage::class, 'index']);

// Route With Guard
Route::group(
    ['middleware' => ['web', 'auth:sanctum']],
    function () {
        Route::prefix('admin')->group(
            function () {
                Route::prefix('user-management')->group(
                    function () {
                        Route::get('/list-user', [UserList::class, 'index'])
                            ->name('user-list');
                        Route::get(
                            '/role-dan-permission',
                            [RolePermission::class, 'index']
                        )
                            ->name('role-dan-permission');
                    }
                );
                Route::get('/dashboard', [HomePage::class, 'index'])
                    ->name('dashboard');
                Route::get('/builder/{id}', [Builder::class, 'index']);
                Route::get('/pages-management', [PageManagement::class, 'index'])
                    ->name('pages-management');
            }
        );

    }
);
