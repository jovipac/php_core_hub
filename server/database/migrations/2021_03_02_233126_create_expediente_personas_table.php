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
            $table->integer('id_documento_identidad')->nullable()->unsigned();
            $table->integer('id_tipo_vinculacion')->nullable()->unsigned();
            $table->boolean('flag_confidencial')->default(0);
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
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
            $table->foreign('id_documento_identidad')->references('id_documento_identidad')
                ->on('tc_documento_identidad')
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
        Schema::dropIfExists('tt_expediente_persona');
    }
}
