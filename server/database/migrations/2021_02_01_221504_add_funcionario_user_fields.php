<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFuncionarioUserFields extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('ts_usuario', function (Blueprint $table) {
            if (!Schema::hasColumn('ts_usuario', 'id_funcionario')) {
                $table->integer('id_funcionario')->nullable()->unsigned();
                $table->foreign('id_funcionario')->references('id_funcionario')
                    ->on('tc_funcionario')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            }
            if (!Schema::hasColumn('ts_usuario', 'id_auxiliatura')) {
                $table->integer('id_auxiliatura')->nullable()->unsigned();
                $table->foreign('id_auxiliatura')->references('id_auxiliatura')
                    ->on('tc_auxiliatura')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        if (Schema::hasColumn('ts_usuario', 'id_funcionario')) {
            Schema::table('ts_usuario', function ($table) {
                $table->dropColumn('id_funcionario');
            });
        }
        if (Schema::hasColumn('ts_usuario', 'id_auxiliatura')) {
            Schema::table('ts_usuario', function ($table) {
                $table->dropColumn('id_auxiliatura');
            });
        }
    }
}
