<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonaDireccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_persona_direccion', function (Blueprint $table) {
            $table->increments('id_persona_direccion');
            $table->integer('id_persona')->unsigned();
            $table->integer('id_tipo_direccion')->nullable()->unsigned();
            $table->integer('id_departamento')->nullable()->unsigned();
            $table->integer('id_municipio')->nullable()->unsigned();
            $table->string('direccion', 255)->nullable();
            $table->string('comentarios', 100)->nullable();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_persona')->references('id_persona')->on('tc_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_tipo_direccion')->references('id_tipo_direccion')->on('tc_tipo_direccion')
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
        Schema::dropIfExists('tc_persona_direccion');
    }
}
