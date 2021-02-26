<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentosIdentidadPersonaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_documento_identidad_persona', function (Blueprint $table) {
            $table->integer('id_persona')->unsigned();
            $table->integer('id_documento_identidad')->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_persona')->references('id_persona')->on('tc_persona')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('id_documento_identidad')->references('id_documento_identidad')->on('tc_documento_identidad')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            //SETTING THE PRIMARY KEYS
            $table->primary(['id_persona', 'id_documento_identidad']);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tt_documento_identidad_persona');
    }
}
