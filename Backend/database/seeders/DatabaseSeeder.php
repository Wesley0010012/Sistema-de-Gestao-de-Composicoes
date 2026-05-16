<?php

namespace Database\Seeders;

use App\Modules\Auth\Infra\Security\BcryptEncrypter;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $encrypter = new BcryptEncrypter();

        User::query()->updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => $encrypter->encrypt('password'),
                'active' => true,
            ]
        );

        $this->resetCatalogTables();

        $this->call([
            DefaultNationalities::class,
            DefaultPeriods::class,
            DefaultGenres::class,
            DefaultInstruments::class,
            DefaultComposers::class,
            DefaultWorks::class,
            DefaultSections::class,
            DefaultScores::class,
            DefaultComposersWorksRelation::class,
            DefaultGenresWorks::class,
        ]);
    }

    private function resetCatalogTables(): void
    {
        $tables = [
            'scores',
            'sections',
            'composer_work',
            'genre_work',
            'composer_periods',
            'composers',
            'works',
            'genres',
            'instruments',
            'periods',
            'nationalities',
        ];

        if (DB::getDriverName() === 'pgsql') {
            DB::statement(
                'TRUNCATE TABLE ' . implode(', ', $tables) . ' RESTART IDENTITY CASCADE'
            );

            return;
        }

        foreach ($tables as $table) {
            DB::table($table)->delete();
        }
    }
}
