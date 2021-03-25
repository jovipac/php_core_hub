<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClasificacionPlantillasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_clasificacion_plantilla', function (Blueprint $table) {
            $table->increments('id_clasificacion_plantilla');
            $table->string('nombre', 75);
            $table->text('descripcion')->nullable();
            $table->integer('id_parent')->nullable()->unsigned();
            $table->integer('order')->default(0);
            $table->integer('_lft')->nullable()->unsigned();
            $table->integer('_rgt')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();

            $table->foreign('id_parent')->references('id_clasificacion_plantilla')
                ->on('tc_clasificacion_plantilla')
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
        Schema::dropIfExists('tc_clasificacion_plantilla');
    }
}
