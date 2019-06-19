<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Logs
 *
 * @package App\Models
 */
class Logs extends Model
{
    /**
     * @var string
     */
    protected $table = 'logs';

    /**
     * @var array
     */
    protected $fillable = [
        'channel',
        'level',
        'message',
        'time',
        'ip',
        'user_agent',
        'type',
        'name',
        'user_id',
        'created_at',
    ];

    /**
     * @var bool
     */
    public $timestamps = false;
}
