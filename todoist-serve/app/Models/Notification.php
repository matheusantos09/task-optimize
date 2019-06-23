<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class NotificationController
 *
 * @package App\Models
 */
class Notification extends Model
{
    /**
     * @var array
     */
    protected $fillable = [
        'user_id',
        'importance',
        'text',
        'new',
    ];

    /**
     * @var string
     */
    protected $table = 'notifications';

}
