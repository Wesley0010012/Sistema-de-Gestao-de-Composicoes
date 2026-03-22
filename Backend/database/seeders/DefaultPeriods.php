<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultPeriods extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('periods')->insert([
            ['name' => 'Medieval', 'start_year' => 500, 'end_year' => 1400, 'description' => 'Período inicial da música ocidental.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ars Antiqua', 'start_year' => 1170, 'end_year' => 1310, 'description' => 'Primeiras formas de polifonia.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Ars Nova', 'start_year' => 1310, 'end_year' => 1377, 'description' => 'Avanço rítmico e notacional.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Renascimento', 'start_year' => 1400, 'end_year' => 1600, 'description' => 'Polifonia vocal refinada.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Barroco Inicial', 'start_year' => 1600, 'end_year' => 1650, 'description' => 'Nascimento da ópera.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Barroco Médio', 'start_year' => 1650, 'end_year' => 1700, 'description' => 'Estilo instrumental crescente.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Barroco Tardio', 'start_year' => 1700, 'end_year' => 1750, 'description' => 'Complexidade e contraponto.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Clássico', 'start_year' => 1750, 'end_year' => 1820, 'description' => 'Equilíbrio e forma.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Romântico Inicial', 'start_year' => 1820, 'end_year' => 1850, 'description' => 'Expressividade crescente.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Romântico Tardio', 'start_year' => 1850, 'end_year' => 1910, 'description' => 'Expansão orquestral.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Impressionismo', 'start_year' => 1890, 'end_year' => 1920, 'description' => 'Cores e atmosferas.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Expressionismo', 'start_year' => 1905, 'end_year' => 1925, 'description' => 'Intensidade emocional.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Moderno', 'start_year' => 1910, 'end_year' => 1975, 'description' => 'Ruptura com tradição.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Serialismo', 'start_year' => 1920, 'end_year' => 1970, 'description' => 'Organização por séries.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Neoclassicismo', 'start_year' => 1920, 'end_year' => 1950, 'description' => 'Retorno às formas clássicas.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Minimalismo', 'start_year' => 1960, 'end_year' => null, 'description' => 'Repetição e simplicidade.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Contemporâneo', 'start_year' => 1975, 'end_year' => null, 'description' => 'Diversidade musical.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Pós-moderno', 'start_year' => 1970, 'end_year' => null, 'description' => 'Mistura de estilos.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Eletroacústico', 'start_year' => 1950, 'end_year' => null, 'description' => 'Uso de tecnologia sonora.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
            ['name' => 'Espectral', 'start_year' => 1970, 'end_year' => null, 'description' => 'Baseado em espectros sonoros.', 'active' => true, 'created_at' => $now, 'updated_at' => $now],
        ]);
    }
}
