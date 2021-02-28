<?php

use Illuminate\Database\Seeder;

class GeneroCatalogSeeder extends Seeder
{

    protected $generos =  [
        [
            'nombre' => 'Cisgénero',
            'descripcion' => 'Persona cuya identidad de género corresponde con el sexo asignado al nacer'
        ],
        [
            'nombre' => 'Transgénero',
            'descripcion' => 'Persona que no se asume dentro del género que le fue asignado al nacer'
        ],
        [
            'nombre' => 'Transexuales',
            'descripcion' => 'Replantean su género y su sexo de manera definitiva. Generalmente, no están conformes con su cuerpo y recurren a cirugías de cambio de sexo'
        ],
        [
            'nombre' => 'Transformistas',
            'descripcion' => 'Personas que ocasionalmente asumen roles del género opuesto.'
        ],
        [
            'nombre' => 'Travestis',
            'descripcion' => 'Expresan su género, de manera permanente, a través de la utilización de prendas de vestir social y culturalmente consideradas propias del otro género.'
        ],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach($this->generos as $genero){
            \App\Models\Catalogs\Genero::firstOrCreate($genero);
        }
    }
}
