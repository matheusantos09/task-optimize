<?php

namespace App\Http\Controllers\Api\Auth;

use App\Traits\ResponseTrait;
use App\Traits\ValidationTrait;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Auth;

/**
 * Class LoginController
 *
 * @package App\Http\Controllers\Api\Auth
 */
class LoginController extends Controller
{

    use ValidationTrait;
    use ResponseTrait;


    /**
     * @param \Illuminate\Http\Request $request
     * @param \Tymon\JWTAuth\JWTAuth   $JWTAuth
     *
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function login(Request $request, JWTAuth $JWTAuth)
    {

        try {

            $this->validator($request->all(), [
                'email'    => 'required|email',
                'password' => 'required|max:191'
            ]);

            $credentials = $request->only(['email', 'password']);

            $token = Auth::guard()->attempt($credentials);

            if (!$token) {
                return $this->responseJson(true, 'Usuário não encontrado',
                    400);
            }

            return response()->json([
                'error'      => false,
                'token'      => $token,
                'expires_in' => Auth::guard()->factory()->getTTL() * 60
            ]);

        } catch (JWTException $e) {

            return $this->responseJson(true, 'Não foi possível fazer seu login tente novamente em alguns instantes',
                500, $e);

        } catch (\Exception $e) {

            return $this->responseJson(true, 'Não foi possível fazer seu login tente novamente em alguns instantes',
                500, $e);

        }

    }
}
