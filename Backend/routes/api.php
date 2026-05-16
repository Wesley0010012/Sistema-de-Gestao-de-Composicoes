<?php

use App\Modules\Auth\Infra\Controllers\AuthController;
use App\Modules\Composers\Infra\Controllers\ComposersController;
use App\Modules\Composers\Infra\Controllers\NationalitiesController;
use App\Modules\Composers\Infra\Controllers\PeriodsController;
use App\Modules\Works\Infra\Controllers\GenresController;
use App\Modules\Works\Infra\Controllers\InstrumentsController;
use App\Modules\Works\Infra\Controllers\KeysController;
use App\Modules\Works\Infra\Controllers\WorksController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response(['status' => 'active']);
});

Route::prefix('auth')
    ->controller(AuthController::class)
    ->group(function () {
        Route::post('/login', 'login');
    });

Route::prefix('composers')
    ->controller(ComposersController::class)
    ->group(function () {
        Route::post('/', 'add');
        Route::put('/{id}', 'update');
        Route::get('/paginated', 'findAllPaginated');
        Route::get('/{id}', 'findById')->whereNumber('id');
        Route::delete('/{id}', 'deleteById')->whereNumber('id');
        Route::get('/count', 'countAll');
        Route::get('/count/recent', 'countRecent');

        Route::prefix('nationalities')
            ->controller(NationalitiesController::class)
            ->group(function () {
                Route::get('/', 'findAll');
            });

        Route::prefix('periods')
            ->controller(PeriodsController::class)
            ->group(function () {
                Route::get('/', 'findAll');
            });
    });
Route::prefix('works')
    ->controller(WorksController::class)
    ->group(function () {
        Route::post('/', 'add');
        Route::put('/{id}', 'update')->whereNumber('id');
        Route::post('/{workId}/scores/{scoreId}/pdf', 'uploadScorePdf')
            ->whereNumber('workId')
            ->whereNumber('scoreId');
        Route::get('/scores/{scoreId}/pdf', 'viewScorePdf')
            ->whereNumber('scoreId');
        Route::get('/paginated', 'findAllPaginated');
        Route::get('/count', 'countAll');
        Route::get('/count/recent', 'countRecent');
        Route::get('/{id}', 'findById')->whereNumber('id');
        Route::delete('/{id}', 'deleteById')->whereNumber('id');

        Route::prefix('genres')
            ->controller(GenresController::class)
            ->group(function () {
                Route::get('/', 'findAll');
            });
        Route::prefix('instruments')
            ->controller(InstrumentsController::class)
            ->group(function () {
                Route::get('/', 'findAll');
            });
        Route::prefix('keys')
            ->controller(KeysController::class)
            ->group(function () {
                Route::get('/modes', 'getAllModes');
                Route::get('/roots', 'getAllRoots');
            });
    });
