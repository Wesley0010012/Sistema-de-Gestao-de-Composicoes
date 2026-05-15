<?php

namespace App\Providers;

use App\Modules\Composers\Core\Repositories\ComposersRepository;
use App\Modules\Composers\Core\Repositories\NationalitiesRepository;
use App\Modules\Composers\Core\Repositories\PeriodsRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\EloquentComposersRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\EloquentNationaltiesRepository;
use App\Modules\Composers\Infra\Repositories\Eloquent\EloquentPeriodsRepository;
use App\Modules\Works\Core\Repositories\GenresRepository;
use App\Modules\Works\Core\Repositories\InstrumentsRepository;
use App\Modules\Works\Core\Repositories\WorksRepository;
use App\Modules\Works\Infra\Repositories\Eloquent\EloquentGenresRepository;
use App\Modules\Works\Infra\Repositories\Eloquent\EloquentInstrumentsRepository;
use App\Modules\Works\Infra\Repositories\Eloquent\EloquentWorksRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->app->bind(ComposersRepository::class, EloquentComposersRepository::class);
        $this->app->bind(NationalitiesRepository::class, EloquentNationaltiesRepository::class);
        $this->app->bind(PeriodsRepository::class, EloquentPeriodsRepository::class);
        $this->app->bind(GenresRepository::class, EloquentGenresRepository::class);
        $this->app->bind(InstrumentsRepository::class, EloquentInstrumentsRepository::class);
        $this->app->bind(WorksRepository::class, EloquentWorksRepository::class);
    }
}
