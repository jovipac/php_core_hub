<?php

use Illuminate\Database\Seeder;

class TiposVinculacionCatalogSeeder extends Seeder
{
    protected $tiposVinculacion =  [
        [
            'nombre' => 'Abogado defensor',
            'slug' => 'A',
        ],
        [
            'nombre' => 'Actor civil',
            'slug' => 'C',
        ],
        [
            'nombre' => 'Denunciante',
            'slug' => 'D',
        ],
        [
            'nombre' => 'Sindicado',
            'slug' => 'I',
        ],
        [
            'nombre' => 'Antejuiciado',
            'slug' => 'J',
            'borrado' => true,
        ],
        [
            'nombre' => 'Querellante adhesivo',
            'slug' => 'K',
            'borrado' => true,
        ],
        [
            'nombre' => 'Agraviado',
            'slug' => 'O',
        ],
        [
            'nombre' => 'PNC de oficio',
            'slug' => 'R',
        ],
        [
            'nombre' => 'Sospechoso',
            'slug' => 'S',
        ],
        [
            'nombre' => 'Testigo',
            'slug' => 'T',
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->tiposVinculacion as $tipoVinculacion){
            \App\Models\Catalogs\TipoVinculacion::firstOrCreate($tipoVinculacion);
        }
    }
}
