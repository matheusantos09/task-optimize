<?php

namespace App\Libraries\Slack;

/**
 * Class Account
 *
 * @package App\Libraries\Slack
 */
class Account
{

    protected const BASE_URI = 'https://slack.com/api/';

    protected const DND_SET_SNOOZE = 'dnd.setSnooze';
    protected const DND_END_SNOOZE = 'dnd.endSnooze';

    /**
     * @var
     */
    private $token;

    /**
     * Account constructor.
     */
    public function __construct()
    {
        $user = \JWTAuth::parseToken()->toUser();

        $this->token = $user->token;
    }

    /**
     * @return string
     */
    public function getToken(): string
    {
        return $this->token;
    }

    /**
     * @return string
     */
    protected function getUriSetSnooze(): string
    {
        return self::BASE_URI . self::DND_SET_SNOOZE;
    }

    /**
     * @return string
     */
    protected function getUriEndSnooze(): string
    {
        return self::BASE_URI . self::DND_END_SNOOZE;
    }


}
