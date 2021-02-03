<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_usuario_rol', function (Blueprint $table) {
            $table->integer('id_usuario')->unsigned();
            $table->integer('id_rol')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_usuario')->references('id_usuario')->on('ts_usuario')->onDelete('cascade');
            $table->foreign('id_rol')->references('id_rol')->on('ts_rol')->onDelete('cascade');

            //SETTING THE PRIMARY KEYS
            $table->primary(['id_usuario', 'id_rol']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tt_usuario_rol');
    }
}
