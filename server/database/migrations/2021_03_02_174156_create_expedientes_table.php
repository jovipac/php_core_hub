<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente', function (Blueprint $table) {
            $table->increments('id_expediente');
            $table->smallInteger('anio')->unsigned();
            $table->integer('folio')->unsigned();
            $table->integer('id_via')->unsigned();
            $table->date('fecha_ingreso')->nullable();
            $table->integer('id_prioridad')->unsigned();
            $table->integer('id_funcionario')->nullable()->unsigned();
            $table->string('observaciones')->nullable();
            $table->integer('id_resultado')->nullable()->unsigned();
            $table->integer('id_auxiliatura')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_via')->references('id_via')->on('tc_via')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_prioridad')->references('id_prioridad')->on('tc_prioridad')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_funcionario')->references('id_funcionario')->on('tc_funcionario')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_resultado')->references('id_resultado')->on('tc_resultado')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('id_auxiliatura')->references('id_auxiliatura')->on('tc_auxiliatura')
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
        Schema::dropIfExists('tt_expediente');
    }
}
