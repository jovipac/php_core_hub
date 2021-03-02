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
                'descripcion' => 'Código Único de Identificación'
            ],
            [
                'nombre' => 'Licencia',
                'descripcion' => 'Licencia de conducir vehiculo'
            ],
            [
                'nombre' => 'Pasaporte',
                'descripcion' => 'Identificación de persona extranjera'
            ],
            [
                'nombre' => 'No porta',
                'descripcion' => 'Pendiente de documento personal'
            ],
        ];

        foreach($documentos as $documento){
            \App\Models\Catalogs\DocumentoIdentidad::firstOrCreate($documento);
        }

    }
}
