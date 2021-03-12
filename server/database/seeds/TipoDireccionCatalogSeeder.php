<?php

use Illuminate\Database\Seeder;

class TipoDireccionCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\TipoDireccion::firstOrCreate([
            'nombre' => 'Residencia',
        ]);
        \App\Models\Catalogs\TipoDireccion::firstOrCreate([
            'nombre' => 'Laboral',
        ]);
    }
}
