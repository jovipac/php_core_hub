<?php

use Illuminate\Database\Seeder;

class DocumentoIdentidadCatalogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $documentos =  [
            [
                'nombre' => 'CUI',
                'descripcion' => 'Código Único de Identificación',
                'requerido' => true
            ],
            [
                'nombre' => 'Licencia',
                'descripcion' => 'Licencia de conducir vehiculo',
                'requerido' => true
            ],
            [
                'nombre' => 'Pasaporte',
                'descripcion' => 'Identificación de persona extranjera',
                'requerido' => true
            ],
            [
                'nombre' => 'No porta',
                'descripcion' => 'Pendiente de documento personal',
                'requerido' => false
            ],
        ];

        foreach($documentos as $documento){
            \App\Models\Catalogs\DocumentoIdentidad::firstOrCreate($documento);
        }

    }
}
