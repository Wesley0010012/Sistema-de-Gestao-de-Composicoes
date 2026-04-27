<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DefaultComposersWorksRelation extends Seeder
{
    public function run(): void
    {
        DB::table('composer_work')->truncate();

        $now = Carbon::now();

        $composers = DB::table('composers')
            ->pluck('id', 'name');

        $works = DB::table('works')
            ->pluck('id', 'title');

        $relations = [
            'Ludwig van Beethoven' => [
                'Symphony No. 5',
            ],
            'Antonio Vivaldi' => [
                'The Four Seasons',
            ],
            'Wolfgang Amadeus Mozart' => [
                'Eine kleine Nachtmusik',
            ],
            'Frédéric Chopin' => [
                'Nocturne Op. 9 No. 2',
            ],
            'Niccolò Paganini' => [
                'Caprice No. 24',
            ],
        ];

        foreach ($relations as $composerName => $worksTitles) {
            if (!isset($composers[$composerName])) {
                continue;
            }

            $composerId = $composers[$composerName];

            foreach ($worksTitles as $workTitle) {
                if (!isset($works[$workTitle])) {
                    continue;
                }

                DB::table('composer_work')->insert([
                    'composer_id' => $composerId,
                    'work_id' => $works[$workTitle],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}
