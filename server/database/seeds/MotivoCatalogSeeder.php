<?php

use Illuminate\Database\Seeder;

class MotivoCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Motivo::firstOrCreate([
            'nombre' => 'Denuncias',
        ]);
        \App\Models\Catalogs\Motivo::firstOrCreate([
            'nombre' => 'Visita personal',
        ]);

    }
}
