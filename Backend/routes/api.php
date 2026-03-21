<?php

use App\Modules\Composers\Infra\Controllers\ComposersController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response(['status' => 'active']);
});

Route::prefix('composers')
    ->controller(ComposersController::class)
    ->group(function () {
        Route::get('/', 'findAll');
        Route::get('/{id}', 'findById');
        Route::delete('/{id}', 'deleteById');
    });
