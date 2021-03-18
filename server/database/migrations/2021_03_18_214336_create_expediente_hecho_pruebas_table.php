<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteHechoPruebasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_hecho_prueba', function (Blueprint $table) {
            $table->increments('id_expediente_hecho_prueba');
            $table->integer('id_expediente_hecho')->unsigned();
            $table->integer('id_expediente')->unsigned();
            $table->string('ubicacion', 255)->nullable();
            $table->string('nombre', 255)->nullable();
            $table->integer('tamanio')->nullable();
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente_hecho')->references('id_persona')->on('tc_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_expediente')->references('id_tipo_direccion')->on('tc_tipo_direccion')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('created_by')->references('id_usuario')->on('ts_usuario')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('updated_by')->references('id_usuario')->on('ts_usuario')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('deleted_by')->references('id_usuario')->on('ts_usuario')
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
        Schema::dropIfExists('tt_expediente_hecho_prueba');
    }
}
