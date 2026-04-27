<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DefaultWorks extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('works')->insert([
            [
                'title' => 'Symphony No. 5',
                'subtitle' => 'in C minor',
                'catalog_number' => null,
                'opus_number' => 67,
                'year_composition' => 1808,
                'description' => 'Uma das sinfonias mais famosas do repertório clássico.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'The Four Seasons',
                'subtitle' => null,
                'catalog_number' => 269,
                'opus_number' => 8,
                'year_composition' => 1725,
                'description' => 'Conjunto de quatro concertos para violino representando as estações do ano.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Eine kleine Nachtmusik',
                'subtitle' => null,
                'catalog_number' => 525,
                'opus_number' => null,
                'year_composition' => 1787,
                'description' => 'Serenata leve e muito popular do período clássico.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Nocturne Op. 9 No. 2',
                'subtitle' => 'in E-flat major',
                'catalog_number' => null,
                'opus_number' => 9,
                'year_composition' => 1832,
                'description' => 'Uma das peças mais conhecidas para piano solo.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Caprice No. 24',
                'subtitle' => null,
                'catalog_number' => null,
                'opus_number' => 1,
                'year_composition' => 1817,
                'description' => 'Famoso capricho para violino solo extremamente virtuoso.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
