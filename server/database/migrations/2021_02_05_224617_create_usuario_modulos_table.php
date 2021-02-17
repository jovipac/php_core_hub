<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuarioModulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_usuario_modulo', function (Blueprint $table) {
            $table->increments('id_usuario_modulo');
            $table->integer('id_usuario')->unsigned();
            $table->integer('id_modulo')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_usuario')->references('id_usuario')->on('ts_usuario')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_modulo')->references('id_modulo')->on('ts_modulo')
                ->onUpdate('cascade')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tt_usuario_modulo');
    }
}
