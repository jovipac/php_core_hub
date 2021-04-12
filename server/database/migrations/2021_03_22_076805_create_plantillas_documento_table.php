<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlantillasDocumentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_plantilla_documento', function (Blueprint $table) {
            $table->increments('id_plantilla_documento');
            $table->string('titulo', 255)->nullable();
            $table->mediumText('texto')->nullable();
            $table->integer('id_clasificacion_plantilla')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_clasificacion_plantilla')->references('id_clasificacion_plantilla')
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
        Schema::dropIfExists('tc_plantilla_documento');
    }
}
