<?php

namespace App\Http\Repositories;

use App\Models\LogSlackApi;
use Carbon\Carbon;

/**
 * Class LogSlackApiRepository
 *
 * @package App\Http\Repositories
 */
class LogSlackApiRepository
{

    /**
     * @param      $status
     * @param null $user
     * @param null $body
     * @param null $response
     */
    public static function saveLog($method, $status, $user = null, $body = null, $response = null)
    {

        LogSlackApi::create([
            'method'     => $method,
            'status'     => $status,
            'user_id'    => $user ? $user->id : null,
            'user_name'  => $user ? $user->name : null,
            'user_email' => $user ? $user->email : null,
            'body'       => $body,
            'response'   => $response,
            'created_at' => Carbon::now(),
        ]);

    }

}
