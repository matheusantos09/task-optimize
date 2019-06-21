<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LogSlackApi
 *
 * @package App\Models
 */
class LogSlackApi extends Model
{

    public const STATUS_SUCCESS = 'SUCCESS';
    public const STATUS_ERROR   = 'ERROR';

    public const METHOD_GET    = 'GET';
    public const METHOD_POST   = 'POST';
    public const METHOD_PUT    = 'PUT';
    public const METHOD_DELETE = 'DELETE';

    /**
     * @var string
     */
    protected $table = 'log_slack_api';

    /**
     * @var array
     */
    protected $fillable = [
        'method',
        'status',
        'user_id',
        'user_name',
        'user_email',
        'body',
        'response',
        'created_at',
    ];

    public $timestamps = false;

}
