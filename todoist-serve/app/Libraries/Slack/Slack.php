<?php

namespace App\Libraries\Slack;

use App\Http\Repositories\LogSlackApiRepository;
use App\Models\LogSlackApi;
use App\User;
use GuzzleHttp\Client;

/**
 * Class Slack
 *
 * @package App\Libraries\Slack
 */
class Slack extends Account
{

    /**
     * @param \App\User $user
     * @param int       $min
     *
     * @return string
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function setSnoozeUser(User $user, $min = 25)
    {
        try {

            if (empty($user->slack_snooze)) {
                throw new \Exception('A conta não permite o modo Slack Snooze');
            }

            if (empty($user->slack_token)) {
                throw new \Exception('Token não encontrado');
            }

            $client   = new Client();
            $response = $client->request('GET', $this->getUriSetSnooze(), [
                'query' => [
                    'token'       => $user->slack_token,
                    'num_minutes' => 10
                ]
            ]);

            LogSlackApiRepository::saveLog(LogSlackApi::METHOD_GET, LogSlackApi::STATUS_SUCCESS, $user, serialize([
                'token'       => $user->slack_token,
                'num_minutes' => 10
            ]), $response->getBody()->getContents());

            return $response->getBody()->getContents();

        } catch (\Exception $e) {
            LogSlackApiRepository::saveLog(LogSlackApi::METHOD_GET, LogSlackApi::STATUS_ERROR, $user, serialize([
                'token'       => $user->slack_token,
                'num_minutes' => 10
            ]), $e->getMessage());
        }
    }


    /**
     * @param \App\User $user
     *
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function endSnoozeUser(User $user)
    {
        try {

            if (empty($user->slack_token)) {
                throw new \Exception('Token não encontrado');
            }

            $client   = new Client();
            $response = $client->request('POST', $this->getUriEndSnooze(), [
                'form_params' => [
                    'token' => $user->slack_token,
                ]
            ]);

            LogSlackApiRepository::saveLog(LogSlackApi::METHOD_POST, LogSlackApi::STATUS_SUCCESS, $user, serialize([
                'token' => $user->slack_token,
            ]), $response->getBody()->getContents());

        } catch (\Exception $e) {
            LogSlackApiRepository::saveLog(LogSlackApi::METHOD_POST, LogSlackApi::STATUS_ERROR, $user, serialize([
                'token' => $user->slack_token,
            ]), $e->getMessage());
        }
    }

}
