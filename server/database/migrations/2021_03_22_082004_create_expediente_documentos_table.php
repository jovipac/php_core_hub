<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExpedienteDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tt_expediente_documento', function (Blueprint $table) {
            $table->increments('id_expediente_documento');
            $table->integer('id_expediente')->unsigned();
            $table->string('titulo', 255)->nullable();
            $table->mediumText('texto')->nullable();
            $table->boolean('borrado')->default(0)->index();
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->integer('deleted_by')->nullable()->unsigned();
            $table->timestamps();
            $table->softDeletes();

            //FOREIGN KEY CONSTRAINTS
            $table->foreign('id_expediente')->references('id_expediente')->on('tt_expediente')
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
        Schema::dropIfExists('tt_expediente_documento');
    }
}
