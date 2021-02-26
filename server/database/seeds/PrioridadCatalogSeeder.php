<?php

use Illuminate\Database\Seeder;

class PrioridadCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Prioridad::firstOrCreate([
            'nombre' => 'Baja',
        ]);
        \App\Models\Catalogs\Prioridad::firstOrCreate([
            'nombre' => 'Normal',
        ]);
        \App\Models\Catalogs\Prioridad::firstOrCreate([
            'nombre' => 'Importante',
        ]);
        \App\Models\Catalogs\Prioridad::firstOrCreate([
            'nombre' => 'Urgente',
        ]);
    }
}
