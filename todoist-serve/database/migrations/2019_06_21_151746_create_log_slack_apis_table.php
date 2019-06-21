<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogSlackApisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log_slack_api', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('method', 15)->nullable();
            $table->string('status', 15)->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->string('user_name')->nullable();
            $table->string('user_email')->nullable();
            $table->longText('body')->nullable();
            $table->longText('response')->nullable();
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log_slack_api');
    }
}
