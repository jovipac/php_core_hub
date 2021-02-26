<?php

use Illuminate\Database\Seeder;

class ViaCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Via::firstOrCreate([
            'nombre' => 'Personal',
        ]);
        \App\Models\Catalogs\Via::firstOrCreate([
            'nombre' => 'Telefónica',
        ]);
        \App\Models\Catalogs\Via::firstOrCreate([
            'nombre' => 'Electrónica',
        ]);

    }
}
