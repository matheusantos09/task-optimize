<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('logs', function (Blueprint $table) {
            $table->engine = 'MyISAM';
            $table->string('channel', 255)->nullable();
            $table->integer('level')->nullable();
            $table->longText('message')->nullable();
            $table->integer('time')->unsigned()->nullable();

            $table->string('ip', 15)->nullable();
            $table->string('user_agent', 200)->nullable();
            $table->integer('type')->nullable();
            $table->string('name', 191)->nullable();
            $table->integer('user_id')->nullable();
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('logs');
    }
}
