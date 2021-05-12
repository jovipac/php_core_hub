<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExpedienteDocumentoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tt_expediente_documento', function (Blueprint $table) {
            if (!Schema::hasColumn('tt_expediente_documento', 'id_parent')) {
                $table->integer('id_parent')->nullable()->unsigned();
                $table->foreign('id_parent')->references('id_expediente_documento')
                ->on('tt_expediente_documento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            }
            if (!Schema::hasColumn('tt_expediente_documento', '_lft')) {
                $table->integer('_lft')->nullable()->unsigned();
            }
            if (!Schema::hasColumn('tt_expediente_documento', '_rgt')) {
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
        Schema::table('tt_expediente_documento', function (Blueprint $table) {
            $table->dropColumn('_lft');
            $table->dropColumn('_rgt');
        });
    }
}
