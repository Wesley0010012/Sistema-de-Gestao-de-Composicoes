<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DefaultGenresWorks extends Seeder
{
    public function run(): void
    {
        DB::table('genre_work')->truncate();

        $now = Carbon::now();

        // Mapear works por título
        $works = DB::table('works')
            ->pluck('id', 'title');

        // Mapear genres por nome
        $genres = DB::table('genres')
            ->pluck('id', 'name');

        $relations = [
            'Symphony No. 5' => ['Symphony'],
            'The Four Seasons' => ['Concerto'],
            'Eine kleine Nachtmusik' => ['Suite'],
            'Nocturne Op. 9 No. 2' => ['Prelude'],
            'Caprice No. 24' => ['Caprice'],
        ];

        foreach ($relations as $workTitle => $genreNames) {

            if (!isset($works[$workTitle])) {
                continue;
            }

            $workId = $works[$workTitle];

            foreach ($genreNames as $genreName) {

                if (!isset($genres[$genreName])) {
                    continue;
                }

                DB::table('genre_work')->insert([
                    'work_id' => $workId,
                    'genre_id' => $genres[$genreName],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
