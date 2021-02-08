<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ts_modulo', function (Blueprint $table) {
            $table->increments('id_modulo');
            $table->integer('id_menu')->nullable()->unsigned();
            $table->string('nombre');
            $table->string('slug', 50)->nullable();
            $table->string('tipo', 10)->nullable();
            $table->string('accion', 100)->nullable();
            $table->string('url')->nullable();
            $table->string('icono', 25)->nullable();
            $table->integer('id_parent')->nullable()->unsigned();
            $table->integer('order')->default(0);
            $table->boolean('borrado')->default(0)->index();
            $table->timestamps();

            $table->foreign('id_parent')->references('id_modulo')
                ->on('ts_modulo')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });

        Schema::table('ts_modulo', function (Blueprint $table) {
            $table->foreign('id_menu')->references('id_menu')->on('ts_menu')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ts_modulo');
    }
}
