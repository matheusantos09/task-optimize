<?php

namespace App\Http\Controllers;

use App\Libraries\Helpers\Functions;
use App\Libraries\Slack\Slack;
use App\Traits\ResponseTrait;
use App\Traits\ValidationTrait;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class UserController
 *
 * @package App\Http\Controllers
 */
class UserController extends Controller
{

    use ResponseTrait;
    use ValidationTrait;

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            DB::beginTransaction();

            $this->validator($request->all(), [
                'name'     => 'required|max:191',
                'email'    => 'required|email|unique:users',
                'password' => 'required|max:30',
            ]);

            $request->merge([
                'password' => bcrypt($request->get('password'))
            ]);

            User::create($request->all());

            DB::commit();

            return $this->responseJson(false, 'Seu usuário foi criado com sucesso');

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->responseJson(true, 'Não foi possível cadastrar seu usuário', 500, $e);

        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {

        try {

            $this->validator($request->all(), [
                'email'    => 'required|email',
                'password' => 'required|max:30',
            ]);

            $credentials = $request->only('email', 'password');
            $jwtToken    = auth('api')->attempt($credentials);

            if (!$jwtToken) {
                return $this->responseJson(true, 'Dados inválidos, tente novamente', 401);
            }

            return $this->tokenResponseJson($jwtToken, 'Login feito com sucesso');

        } catch (JWTException $e) {

            return $this->responseJson(true, 'Não foi possível fazer seu login, tente novamente', 500, $e);

        } catch (\Exception $e) {

            return $this->responseJson(true, 'Não foi possível fazer seu login, tente novamente', 500, $e);

        }

    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function loadConfigs()
    {
        try {
            $user = \JWTAuth::parseToken()->toUser();

            return response()->json([
                'error'                 => false,
                'name'                  => $user->name,
                'email'                 => $user->email,
                'password'              => '',
                'password_confirmation' => '',
                'slack_snooze'          => $user->slack_snooze,
                'slack_token'           => $user->slack_token,
                'notification_email'    => $user->notification_email,
                'notification_news'     => $user->notification_news,
                'image'                 => $user->image,
            ]);

        } catch (\Exception $e) {
            return $this->responseJson(true, 'Não foi possível carregar suas informações', 500, $e);
        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveConfigs(Request $request)
    {
        try {

            $this->validator($request->all(), [
                'email'              => 'required|email',
                'password'           => 'max:191|confirmed',
                'name'               => 'required|string|max:191',
                'slack_snooze'       => 'required|boolean',
                'slack_token'        => 'required|string|max:255',
                'notification_email' => 'required|boolean',
                'notification_news'  => 'required|boolean',
            ]);


            $user = \JWTAuth::parseToken()->toUser();

            $request->merge([
                'slack_snooze'       => $request->get('slack_snooze') ? true : false,
                'notification_email' => $request->get('notification_email') ? true : false,
                'notification_news'  => $request->get('notification_news') ? true : false,
            ]);

            $user->name  = $request->get('name');
            $user->email = $request->get('email');

            if ($request->get('password')) {
                $user->password = bcrypt($request->get('password'));
            }

            $user->slack_snooze       = $request->get('slack_snooze');
            $user->slack_token        = $request->get('slack_token');
            $user->notification_email = $request->get('notification_email');
            $user->notification_news  = $request->get('notification_news');
            $user->save();

            return response()->json([
                'error'   => false,
                'content' => 'Dados alterados com sucesso'
            ]);

        } catch (\Exception $e) {
            return $this->responseJson(true, 'Não foi possível salvar seus dados', 500, $e);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function startSnooze()
    {
        try {
            $user = \JWTAuth::parseToken()->toUser();

            if (!$user->slack_snooze) {
                return response()->json([
                    'error' => true,
                ]);
            }

            app(Slack::class)->setSnoozeUser($user);

            return response()->json([
                'error' => false,
            ]);

        } catch (\Exception $e) {
            return $this->responseJson(true, 'Não foi possível ativar o modo Snooze do Slack', 500, $e);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function endSnooze()
    {
        try {
            $user = \JWTAuth::parseToken()->toUser();

            app(Slack::class)->endSnoozeUser($user);

            return response()->json([
                'error' => false,
            ]);

        } catch (\Exception $e) {
            return $this->responseJson(true, 'Não foi possível desativar o modo Snooze do Slack', 500, $e);
        }
    }

    public function uploadImage(Request $request)
    {
        try {
            $user = \JWTAuth::parseToken()->toUser();

            $this->validator($request->all(), [
                'image' => 'required|mimes:jpg,png,jpeg,gif'
            ]);
dd($request->all());
            $image = Functions::uploadImage($request->file('image'), 'users');

            $user->image = $image;
            $user->save();

            return response()->json([
                'error' => false,
                'image' => $image
            ]);

        } catch (\Exception $e) {
            return $this->responseJson(true, 'Não foi possível fazer o upload da sua foto, tente novamente', 500, $e);
        }

    }

}
