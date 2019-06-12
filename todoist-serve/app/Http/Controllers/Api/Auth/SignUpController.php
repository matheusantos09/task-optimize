<?php

namespace App\Http\Controllers\Api\Auth;

use App\Traits\ResponseTrait;
use App\Traits\ValidationTrait;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\HttpException;

/**
 * Class SignUpController
 *
 * @package App\Http\Controllers\Api\Auth
 */
class SignUpController extends Controller
{

    use ValidationTrait;
    use ResponseTrait;

    /**
     * @param \Illuminate\Http\Request $request
     * @param \Tymon\JWTAuth\JWTAuth   $JWTAuth
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function signUp(Request $request, JWTAuth $JWTAuth)
    {

        try {
            DB::beginTransaction();

            $this->validator($request->all(), [
                'name'     => 'required',
                'email'    => 'required|email|unique:users',
                'password' => 'required'
            ]);

            $user = User::create($request->all());

            if (!$user) {
                throw new HttpException(500);
            }

            $token = $JWTAuth->fromUser($user);

            DB::commit();

            return $this->tokenResponseJson($token, 'Login feito com sucesso, iremos te levar ao seu painel');

        } catch (\Exception $e) {

            DB::rollBack();

            return $this->responseJson(true, 'Não foi possível fazer o login', 500, $e);


        }
    }
}
