<?php

use Illuminate\Database\Seeder;

class TipoAreaLugarCatalogSeeder extends Seeder
{
    protected $tiposArea =  [
        [
            'nombre' => 'Comisión del hecho',
        ],
        [
            'nombre' => 'Lugar de desaparición',
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->tiposArea as $tipoArea){
            \App\Models\Catalogs\TipoAreaLugar::firstOrCreate($tipoArea);
        }
    }
}
