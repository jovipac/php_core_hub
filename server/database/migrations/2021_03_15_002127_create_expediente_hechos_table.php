<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteHechosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_hecho', function (Blueprint $table) {
            $table->increments('id_expediente_hecho');
            $table->integer('id_expediente')->unsigned();
            $table->datetime('fecha_hora')->nullable();
            $table->integer('id_tipo_area_lugar')->nullable()->unsigned();
            $table->integer('id_departamento')->nullable()->unsigned();
            $table->integer('id_municipio')->nullable()->unsigned();
            $table->string('direccion', 255)->nullable();
            $table->text('hecho')->nullable();
            $table->text('peticion')->nullable();
            $table->text('prueba')->nullable();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente')->references('id_expediente')->on('tt_expediente')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_tipo_area_lugar')->references('id_tipo_area_lugar')->on('tc_tipo_area_lugar')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_departamento')->references('id_departamento')->on('tc_departamento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_municipio')->references('id_municipio')->on('tc_municipio')
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
        Schema::dropIfExists('tt_expediente_hecho');
    }
}
