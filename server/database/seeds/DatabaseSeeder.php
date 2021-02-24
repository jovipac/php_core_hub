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
        $this->call(UsuarioTableSeeder::class);
        $this->call(MenuTableSeeder::class);
        $this->call(EstadoCatalogSeeder::class);
        $this->call(SexoCatalogSeeder::class);
        $this->call(GeneroCatalogSeeder::class);
    }
}
