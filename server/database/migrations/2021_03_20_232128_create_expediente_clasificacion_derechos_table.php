<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteClasificacionDerechosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_clas_derecho', function (Blueprint $table) {
            $table->increments('id_expediente_clas_derecho');
            $table->integer('id_expediente')->unsigned();
            $table->integer('id_clasificacion_derecho')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();


            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente')->references('id_expediente')->on('tt_expediente')
                ->onUpdate('cascade')
                ->onDelete('cascade');


            $table->foreign('id_clasificacion_derecho')->references('id_clasificacion_derecho')->on('tc_clasificacion_derecho')
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
        Schema::dropIfExists('tt_expediente_clas_derecho');
    }
}
