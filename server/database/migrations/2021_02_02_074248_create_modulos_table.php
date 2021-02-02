<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ts_modulo', function (Blueprint $table) {
            $table->increments('id_modulo');
            $table->string('nombre');
            $table->string('nombre_corto', 50)->nullable();
            $table->string('url')->nullable();
            $table->string('tipo', 10)->nullable();
            $table->string('icono', 25)->nullable();
            $table->integer('id_parent')->nullable()->unsigned();
            $table->integer('order');
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();

            $table->foreign('id_parent')->references('id_modulo')
                ->on('ts_modulo')
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
        Schema::dropIfExists('ts_modulo');
    }
}
