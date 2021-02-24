<?php

use Illuminate\Database\Seeder;

class UsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Entities\User::firstOrCreate([
            'username' => 'superadmin',
            'password' => 'secret'
        ]);
    }
}
