<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddModulosMenuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ts_modulo', function (Blueprint $table) {
            if (!Schema::hasColumn('ts_modulo', '_lft')) {
                $table->integer('_lft')->nullable()->unsigned();
            }
            if (!Schema::hasColumn('ts_modulo', '_rgt')) {
                $table->integer('_rgt')->nullable()->unsigned();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('ts_modulo', '_lft')) {
            Schema::table('ts_modulo', function ($table) {
                $table->dropColumn('_lft');
            });
        }
        if (Schema::hasColumn('ts_modulo', '_rgt')) {
            Schema::table('ts_modulo', function ($table) {
                $table->dropColumn('_rgt');
            });
        }
    }
}
