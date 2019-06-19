<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TimerEvent
 *
 * @package App
 */
class TimerEvent extends Model
{
    protected $fillable = [
        'user_id',
        'event',
        'cycle',
        'cycle_time',
    ];

    protected $table = 'timer_events';
}
