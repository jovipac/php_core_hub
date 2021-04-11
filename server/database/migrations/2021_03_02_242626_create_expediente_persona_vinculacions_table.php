<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedientePersonaVinculacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_persona_vinculacion', function (Blueprint $table) {
            $table->increments('id_expediente_persona_vinculacion');
            $table->integer('id_expediente_persona')->unsigned();
            $table->integer('id_tipo_vinculacion')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente_persona')->references('id_expediente_persona')
                ->on('tt_expediente_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_tipo_vinculacion')->references('id_tipo_vinculacion')
                ->on('tc_tipo_vinculacion')
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
        Schema::dropIfExists('tt_expediente_persona_vinculacion');
    }
}
