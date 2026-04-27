<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DefaultSections extends Seeder
{
    public function run(): void
    {
        DB::table('sections')->truncate();

        $now = Carbon::now();

        $works = DB::table('works')->pluck('id', 'title');

        $data = [
            'Symphony No. 5' => [
                ['movement' => 'I', 'key' => ['C', 'minor']],
                ['movement' => 'II', 'key' => ['A', 'major']],
                ['movement' => 'III', 'key' => ['C', 'minor']],
                ['movement' => 'IV', 'key' => ['C', 'major']],
            ],
            'The Four Seasons' => [
                ['movement' => 'Spring', 'key' => ['E', 'major']],
                ['movement' => 'Summer', 'key' => ['G', 'minor']],
            ],
            'Nocturne Op. 9 No. 2' => [
                ['movement' => 'Single', 'key' => ['E', 'major']],
            ],
        ];

        foreach ($data as $workTitle => $sections) {

            if (!isset($works[$workTitle])) continue;

            $workId = $works[$workTitle];

            foreach ($sections as $section) {

                DB::table('sections')->insert([
                    'work_id' => $workId,
                    'key_root' => $section['key'][0],
                    'key_mode' => $section['key'][1],
                    'active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }
}