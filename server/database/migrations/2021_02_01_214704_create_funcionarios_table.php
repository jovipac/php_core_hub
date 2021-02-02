<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFuncionariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_funcionario', function (Blueprint $table) {
            $table->increments('id_funcionario');
            $table->string('codigo')->nullable();
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('email')->nullable();
            $table->integer('id_usuario')->nullable()->unsigned();
            $table->integer('id_puesto')->nullable()->unsigned();
            $table->integer('id_auxiliatura')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('id_puesto')->references('id_puesto')
                ->on('tc_puesto')
                ->onDelete('cascade');
            $table->foreign('id_usuario')->references('id_usuario')
                ->on('ts_usuario')
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
        Schema::dropIfExists('tc_funcionario');
    }
}
