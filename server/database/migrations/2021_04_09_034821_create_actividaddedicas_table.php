<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActividaddedicasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tc_actividad_dedica', function (Blueprint $table) {
            $table->increments('id_actividad_dedica');
            $table->string('nombre', 80);
            $table->string('descripcion')->nullable();
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
        Schema::dropIfExists('tc_actividad_dedica');
    }
}
