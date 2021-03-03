<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedientePersonasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_persona', function (Blueprint $table) {
            $table->increments('id_expediente_persona');
            $table->integer('id_expediente')->unsigned();
            $table->integer('id_persona')->unsigned();
            $table->integer('id_tipo_vinculacion')->unsigned();
            $table->boolean('flag_protegido')->default(0);
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente')->references('id_expediente')
                ->on('tt_expediente')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_persona')->references('id_persona')
                ->on('tc_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_tipo_vinculacion')->references('id_tipo_vinculacion')
                ->on('tc_tipo_vinculacion')
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
        Schema::dropIfExists('tt_expediente_persona');
    }
}
