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
        factory(\App\Models\Catalogs\Genero::class)->create([
            'nombre' => 'Hombre'
        ]);
        factory(\App\Models\Catalogs\Genero::class)->create([
            'nombre' => 'Mujer'
        ]);
    }
}
