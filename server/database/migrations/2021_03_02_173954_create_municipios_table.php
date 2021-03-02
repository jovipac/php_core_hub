<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMunicipiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_municipio', function (Blueprint $table) {
            $table->increments('id_municipio');
            $table->integer('id_departamento')->unsigned();
            $table->string('nombre');
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_departamento')->references('id_departamento')->on('tc_departamento')
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
        Schema::dropIfExists('id_municipio');
    }
}
