<?php

namespace App\Http\Controllers;

use App\Traits\ResponseTrait;
use App\Traits\ValidationTrait;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{

    use ResponseTrait;
    use ValidationTrait;

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

}
