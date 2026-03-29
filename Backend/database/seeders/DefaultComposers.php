<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultComposers extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('composers')->truncate();

        $now = Carbon::now();

        $nationalities = DB::table('nationalities')
            ->pluck('id', 'code');

        $periods = DB::table('periods')
            ->pluck('id', 'name');

        $composers = [
            ['name' => 'Johann Sebastian Bach', 'birth_date' => '1685-03-31', 'death_date' => '1750-07-28', 'nationality_code' => 'DE', 'periods' => ['Late Baroque']],
            ['name' => 'Wolfgang Amadeus Mozart', 'birth_date' => '1756-01-27', 'death_date' => '1791-12-05', 'nationality_code' => 'AT', 'periods' => ['Classical']],
            ['name' => 'Ludwig van Beethoven', 'birth_date' => '1770-12-17', 'death_date' => '1827-03-26', 'nationality_code' => 'DE', 'periods' => ['Classical', 'Early Romantic']],
            ['name' => 'Frédéric Chopin', 'birth_date' => '1810-03-01', 'death_date' => '1849-10-17', 'nationality_code' => 'PL', 'periods' => ['Romantic']],
            ['name' => 'Pyotr Tchaikovsky', 'birth_date' => '1840-05-07', 'death_date' => '1893-11-06', 'nationality_code' => 'RU', 'periods' => ['Late Romantic']],
            ['name' => 'Antonio Vivaldi', 'birth_date' => '1678-03-04', 'death_date' => '1741-07-28', 'nationality_code' => 'IT', 'periods' => ['Baroque']],
            ['name' => 'Claude Debussy', 'birth_date' => '1862-08-22', 'death_date' => '1918-03-25', 'nationality_code' => 'FR', 'periods' => ['Impressionism']],
            ['name' => 'Igor Stravinsky', 'birth_date' => '1882-06-17', 'death_date' => '1971-04-06', 'nationality_code' => 'RU', 'periods' => ['Modern']],
            ['name' => 'Johannes Brahms', 'birth_date' => '1833-05-07', 'death_date' => '1897-04-03', 'nationality_code' => 'DE', 'periods' => ['Romantic']],
            ['name' => 'Richard Wagner', 'birth_date' => '1813-05-22', 'death_date' => '1883-02-13', 'nationality_code' => 'DE', 'periods' => ['Romantic']],
            ['name' => 'Gustav Mahler', 'birth_date' => '1860-07-07', 'death_date' => '1911-05-18', 'nationality_code' => 'AT', 'periods' => ['Late Romantic']],
            ['name' => 'Franz Schubert', 'birth_date' => '1797-01-31', 'death_date' => '1828-11-19', 'nationality_code' => 'AT', 'periods' => ['Early Romantic']],
            ['name' => 'Felix Mendelssohn', 'birth_date' => '1809-02-03', 'death_date' => '1847-11-04', 'nationality_code' => 'DE', 'periods' => ['Romantic']],
            ['name' => 'Sergei Rachmaninoff', 'birth_date' => '1873-04-01', 'death_date' => '1943-03-28', 'nationality_code' => 'RU', 'periods' => ['Late Romantic']],
            ['name' => 'Dmitri Shostakovich', 'birth_date' => '1906-09-25', 'death_date' => '1975-08-09', 'nationality_code' => 'RU', 'periods' => ['Modern']],
            ['name' => 'Heitor Villa-Lobos', 'birth_date' => '1887-03-05', 'death_date' => '1959-11-17', 'nationality_code' => 'BR', 'periods' => ['Modern']],
            ['name' => 'Jean Sibelius', 'birth_date' => '1865-12-08', 'death_date' => '1957-09-20', 'nationality_code' => 'FI', 'periods' => ['Late Romantic']],
            ['name' => 'Edvard Grieg', 'birth_date' => '1843-06-15', 'death_date' => '1907-09-04', 'nationality_code' => 'NO', 'periods' => ['Romantic']],
            ['name' => 'George Gershwin', 'birth_date' => '1898-09-26', 'death_date' => '1937-07-11', 'nationality_code' => 'US', 'periods' => ['Modern']],
            ['name' => 'Philip Glass', 'birth_date' => '1937-01-31', 'death_date' => null, 'nationality_code' => 'US', 'periods' => ['Minimalism']],
        ];

        foreach ($composers as $composer) {
            $composerId = DB::table('composers')->insertGetId([
                'name' => $composer['name'],
                'photo_path' => null,
                'birth_date' => $composer['birth_date'],
                'death_date' => $composer['death_date'],
                'nationality_id' => $nationalities[$composer['nationality_code']] ?? null,
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            foreach ($composer['periods'] as $periodName) {
                if (isset($periods[$periodName])) {
                    DB::table('composer_periods')->insert([
                        'composer_id' => $composerId,
                        'period_id' => $periods[$periodName],
                    ]);
                }
            }
        }
    }
}
