<?php

use Illuminate\Database\Seeder;

class ResultadoCatalogSeeder extends Seeder
{
    protected $resultados =  [
        [
            'nombre' => 'No violación',
        ],
        [
            'nombre' => 'Recomendación',
        ],
        [
            'nombre' => 'Suspensión',
        ],
        [
            'nombre' => 'Violación y comportamiento administrativo lesivo',
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->resultados as $resultado){
            \App\Models\Catalogs\Resultado::firstOrCreate($resultado);
        }
    }
}
