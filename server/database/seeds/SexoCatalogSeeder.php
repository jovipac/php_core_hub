<?php

use Illuminate\Database\Seeder;

class SexoCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Sexo::firstOrCreate([
            'nombre' => 'Masculino',
            'slug' => 'M'
        ]);
        \App\Models\Catalogs\Sexo::firstOrCreate([
            'nombre' => 'Femenino',
            'slug' => 'F'
        ]);
    }
}
