<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolTableSeeder::class);
        $this->call(AuxiliaturaCatalogSeeder::class);
        $this->call(DocumentoIdentidadCatalogSeeder::class);
        $this->call(MenuTableSeeder::class);
        $this->call(EstadoCatalogSeeder::class);
        $this->call(SexoCatalogSeeder::class);
        $this->call(GeneroCatalogSeeder::class);
        $this->call(MotivoCatalogSeeder::class);
        $this->call(PrioridadCatalogSeeder::class);
        $this->call(ViaCatalogSeeder::class);
        $this->call(TiposVinculacionCatalogSeeder::class);
        $this->call(ResultadoCatalogSeeder::class);
        $this->call(TipoDireccionCatalogSeeder::class);
    }
}
