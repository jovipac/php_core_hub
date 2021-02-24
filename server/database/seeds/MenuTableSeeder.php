<?php

use Illuminate\Database\Seeder;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Entities\Menu::firstOrCreate([
            'nombre' => 'Menu lateral izquierdo',
            'target' => 'left'
        ]);
        \App\Models\Entities\Menu::firstOrCreate([
            'nombre' => 'Menu Superior',
            'target' => 'top'
        ]);
    }
}
