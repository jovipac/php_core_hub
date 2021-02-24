<?php

use Illuminate\Database\Seeder;

class GeneroCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Genero::firstOrCreate([
            'nombre' => 'Hombre'
        ]);
        \App\Models\Catalogs\Genero::firstOrCreate([
            'nombre' => 'Mujer'
        ]);
    }
}
