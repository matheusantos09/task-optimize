<?php

namespace App\Libraries\Helpers;

use App\Models\Logs;
use Carbon\Carbon;
use Monolog\Logger;

/**
 * Class Functions
 *
 * @package App\Libraries\Helpers
 */
class Functions
{

    /**
     * @param        $message
     * @param array  $context
     * @param string $channel
     * @param string $level
     */
    public static function saveLog($message, array $context = [], $channel = 'event', $level = 'info')
    {
        $levels = [
            'debug'     => Logger::DEBUG,
            'info'      => Logger::INFO,
            'notice'    => Logger::NOTICE,
            'warning'   => Logger::WARNING,
            'error'     => Logger::ERROR,
            'critical'  => Logger::CRITICAL,
            'alert'     => Logger::ALERT,
            'emergency' => Logger::EMERGENCY,
        ];

        $level   = $levels[$level] ?? $levels['info'];
        $message = self::interpolate($message, $context);

        Logs::create([
            'channel'    => $channel,
            'level'      => $level,
            'message'    => $message,
            'time'       => Carbon::now()->format('U'),
            'ip'         => request()->ip(),
            'user_agent' => $_SERVER['HTTP_USER_AGENT'],
            'type'       => 1,
            'name'       => auth()->user()->name ?? null,
            'user_id'    => auth()->user()->id ?? null,
            'created_at' => Carbon::now(),
        ]);
    }

    /**
     * @param       $message
     * @param array $context
     *
     * @return string
     */
    public static function interpolate($message, array $context = array())
    {
        $replace = array();
        foreach ($context as $key => $val) {
            if (!is_array($val) && (!is_object($val) || method_exists($val, '__toString'))) {
                $replace['{' . $key . '}'] = $val;
            }
        }

        return strtr($message, $replace);
    }

}
