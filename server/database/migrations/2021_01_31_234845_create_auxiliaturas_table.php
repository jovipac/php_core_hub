<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuxiliaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_auxiliatura', function (Blueprint $table) {
            $table->increments('id_auxiliatura');
            $table->string('nombre');
            $table->string('direccion', 255)->nullable();
            $table->string('telefono', 100)->nullable();
            $table->string('email', 80)->nullable();
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tc_auxiliatura');
    }
}
