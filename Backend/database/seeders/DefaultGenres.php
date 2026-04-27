<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DefaultGenres extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('genres')->insert([
            [
                'name' => 'Sonata',
                'description' => 'Composição instrumental geralmente em vários movimentos, muito comum no período clássico.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Symphony',
                'description' => 'Obra orquestral extensa, normalmente dividida em movimentos.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Concerto',
                'description' => 'Composição para instrumento solo acompanhado por orquestra.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Caprice',
                'description' => 'Peça virtuosa, geralmente curta e com caráter livre.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Opera',
                'description' => 'Obra dramática encenada com música, canto e orquestra.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Suite',
                'description' => 'Conjunto de peças instrumentais baseadas em danças.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Etude',
                'description' => 'Peça curta focada no desenvolvimento técnico do instrumentista.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'name' => 'Prelude',
                'description' => 'Peça introdutória ou independente, geralmente curta.',
                'active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}
