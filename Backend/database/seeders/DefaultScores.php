<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Dompdf\Dompdf;

class DefaultScores extends Seeder
{
    public function run(): void
    {
        DB::table('scores')->truncate();

        $now = Carbon::now();

        $sections = DB::table('sections')->get();
        $instruments = DB::table('instruments')->pluck('id', 'name');
        $works = DB::table('works')->pluck('title', 'id');

        foreach ($sections as $section) {

            $workTitle = $works[$section->work_id] ?? 'unknown';

            // Estratégia simples: cada section recebe alguns instrumentos
            $instrumentList = $this->resolveInstruments($workTitle);

            foreach ($instrumentList as $instrumentName) {

                if (!isset($instruments[$instrumentName])) continue;

                $filePath = $this->generateFakeScore(
                    $workTitle,
                    $section->id,
                    $instrumentName
                );

                DB::table('scores')->insert([
                    'section_id' => $section->id,
                    'instrument_id' => $instruments[$instrumentName],
                    'path' => $filePath,
                    'active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }
    }

    private function resolveInstruments(string $workTitle): array
    {
        return match ($workTitle) {
            'Symphony No. 5' => ['Violin', 'Viola', 'Cello'],
            'The Four Seasons' => ['Violin'],
            'Nocturne Op. 9 No. 2' => ['Piano'],
            default => ['Piano'],
        };
    }

    private function generateFakeScore(string $work, int $sectionId, string $instrument): string
    {
        $dompdf = new Dompdf();

        $color = sprintf('#%06X', mt_rand(0, 0xFFFFFF));

        $html = "
            <div style='width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:$color; color:white; font-size:20px;'>
                <div>
                    <p><strong>$work</strong></p>
                    <p>Section ID: $sectionId</p>
                    <p>Instrument: $instrument</p>
                </div>
            </div>
        ";

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4');
        $dompdf->render();

        $fileName = strtolower(str_replace(' ', '_', "{$work}_section_{$sectionId}_{$instrument}.pdf"));
        $path = storage_path("app/public/scores/$fileName");

        if (!file_exists(dirname($path))) {
            mkdir(dirname($path), 0777, true);
        }

        file_put_contents($path, $dompdf->output());

        return "scores/$fileName";
    }
}