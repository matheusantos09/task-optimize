<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersTableAddColuns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('slack_snooze')->default(false)->after('remember_token');
            $table->string('slack_token', 255)->nullable()->after('slack_snooze');
            $table->boolean('notification_email')->default(false)->after('slack_token');
            $table->boolean('notification_news')->default(false)->after('notification_email');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('slack_snooze');
            $table->dropColumn('slack_token');
            $table->dropColumn('notification_email');
            $table->dropColumn('notification_news');
        });
    }
}
