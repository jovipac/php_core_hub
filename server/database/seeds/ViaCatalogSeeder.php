<?php

use Illuminate\Database\Seeder;

class ViaCatalogSeeder extends Seeder
{
    protected $vias =  [
        [
            'nombre' => 'Verbal',
            'slug' => "PE",
        ],
        [
            'nombre' => 'Telefónica',
        ],
        [
            'nombre' => 'Escrita',
        ],
        [
            'nombre' => 'Prevensión policial',
            'borrado' => true,
        ],
        [
            'nombre' => 'Conocimiento de oficio',
            'borrado' => true,
        ],
        [
            'nombre' => 'De juzgado',
            'borrado' => true,
        ],
        [
            'nombre' => 'Electrónica',
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->vias as $via){
            \App\Models\Catalogs\Via::firstOrCreate($via);
        }
    }
}
