<?php

use Illuminate\Database\Seeder;

class AuxiliaturaCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Catalogs\Auxiliatura::firstOrCreate([
            'nombre' => 'Sede central'
        ]);
    }
}
