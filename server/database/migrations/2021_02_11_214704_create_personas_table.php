<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_persona', function (Blueprint $table) {
            $table->increments('id_persona');
            $table->string('nombres');
            $table->string('apellidos');
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('id_sexo')->unsigned();
            $table->integer('id_genero')->unsigned();
            $table->string('email')->nullable();
            $table->string('telefono')->nullable();
            $table->string('codigo_casillero, 50')->nullable();
            $table->string('institucion_trabaja')->nullable();
            $table->integer('id_etnia')->nullable()->unsigned();
            $table->integer('id_comunidad_linguistica')->nullable()->unsigned();
            $table->integer('id_estado_conyugal')->nullable()->unsigned();
            $table->integer('id_relacion_vic_agre')->nullable()->unsigned();
            $table->boolean('flag_discapacidad')->default(0)->index();
            $table->integer('id_discapacidad')->nullable()->unsigned();
            $table->integer('id_trabajo_remunerado')->nullable()->unsigned();
            $table->integer('id_ocupacion')->nullable()->unsigned();
            $table->integer('id_actividad_dedica')->nullable()->unsigned();
            $table->integer('id_condicion_alfabetismo')->nullable()->unsigned();
            $table->integer('id_escolaridad')->nullable()->unsigned();
            $table->integer('id_tipo_violencia')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('id_sexo')->references('id_sexo')
                ->on('tc_sexo')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_genero')->references('id_genero')->on('tc_genero')
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
        Schema::dropIfExists('tc_persona');
    }
}
