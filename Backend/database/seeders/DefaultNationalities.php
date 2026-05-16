<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DefaultNationalities extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('nationalities')->delete();

        $now = Carbon::now();

        DB::table('nationalities')->insert([
            ['name' => 'Brasileiro', 'code' => 'BR'],
            ['name' => 'Alemão', 'code' => 'DE'],
            ['name' => 'Austríaco', 'code' => 'AT'],
            ['name' => 'Italiano', 'code' => 'IT'],
            ['name' => 'Francês', 'code' => 'FR'],
            ['name' => 'Russo', 'code' => 'RU'],
            ['name' => 'Polonês', 'code' => 'PL'],
            ['name' => 'Americano', 'code' => 'US'],
            ['name' => 'Inglês', 'code' => 'GB'],
            ['name' => 'Espanhol', 'code' => 'ES'],
            ['name' => 'Tcheco', 'code' => 'CZ'],
            ['name' => 'Húngaro', 'code' => 'HU'],
            ['name' => 'Argentino', 'code' => 'AR'],
            ['name' => 'Mexicano', 'code' => 'MX'],
            ['name' => 'Canadense', 'code' => 'CA'],
            ['name' => 'Finlandês', 'code' => 'FI'],
            ['name' => 'Norueguês', 'code' => 'NO'],
            ['name' => 'Sueco', 'code' => 'SE'],
            ['name' => 'Holandês', 'code' => 'NL'],
            ['name' => 'Japonês', 'code' => 'JP'],
        ]);
    }
}
