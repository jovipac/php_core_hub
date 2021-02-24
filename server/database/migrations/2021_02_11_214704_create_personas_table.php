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
            $table->string('cui')->unique();
            $table->string('nombres');
            $table->string('apellidos');
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('id_sexo')->unsigned();
            $table->integer('id_genero')->unsigned();
            $table->string('telefono')->nullable();
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
