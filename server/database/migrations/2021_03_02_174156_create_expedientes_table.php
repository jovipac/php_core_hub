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
            $table->integer('id_motivo')->default(1)->unsigned();
            $table->integer('id_prioridad')->unsigned();
            $table->integer('id_dependencia')->unsigned();
            $table->integer('id_funcionario')->nullable()->unsigned();
            $table->string('observaciones', 255)->nullable();
            $table->integer('id_resultado')->nullable()->unsigned();
            $table->integer('id_auxiliatura')->unsigned();
            $table->integer('id_auxiliatura_tramite')->nullable()->unsigned();
            $table->integer('id_visita')->nullable()->unsigned();
            $table->integer('id_estado_expediente')->unsigned();
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
            $table->foreign('id_motivo')->references('id_motivo')->on('tc_motivo')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_prioridad')->references('id_prioridad')->on('tc_prioridad')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_dependencia')->references('id_dependencia')->on('tc_dependencia')
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
            $table->foreign('id_auxiliatura_tramite')->references('id_auxiliatura')->on('tc_auxiliatura')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_estado_expediente')->references('id_estado_expediente')->on('tc_estado_expediente')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_visita')->references('id_visita')->on('tt_visita')
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
        Schema::dropIfExists('tt_expediente');
    }
}
