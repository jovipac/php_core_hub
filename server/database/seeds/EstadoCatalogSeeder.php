<?php

use Illuminate\Database\Seeder;

class EstadoCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Estado::firstOrCreate([
            'nombre' => 'Abierto'
        ]);
        \App\Models\Catalogs\Estado::firstOrCreate([
            'nombre' => 'Cerrado'
        ]);
        \App\Models\Catalogs\Estado::firstOrCreate([
            'nombre' => 'Retirado'
        ]);
    }
}
