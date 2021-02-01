<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePuestosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_puesto', function (Blueprint $table) {
            $table->increments('id_puesto');
            $table->string('nombre');
            $table->integer('id_dependencia')->nullable()->unsigned();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('id_dependencia')->references('id_dependencia')
                ->on('tc_dependencia')
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
        Schema::dropIfExists('tc_puesto');
    }
}
