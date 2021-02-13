<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVisitasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_visita', function (Blueprint $table) {
            $table->increments('id_visita');
            $table->integer('id_persona')->unsigned();
            $table->integer('id_motivo')->unsigned();
            $table->datetime('entrada')->nullable();
            $table->datetime('salida')->nullable();
            $table->integer('llamadas')->default(0)->unsigned();
            $table->integer('id_dependencia')->unsigned();
            $table->integer('id_funcionario')->unsigned();
            $table->integer('id_estado')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_persona')->references('id_persona')->on('tc_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_motivo')->references('id_motivo')->on('tc_motivo')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_dependencia')->references('id_dependencia')->on('tc_dependencia')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_funcionario')->references('id_funcionario')->on('tc_funcionario')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_estado')->references('id_estado')->on('tc_estado')
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
        Schema::dropIfExists('tt_visita');
    }
}