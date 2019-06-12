<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

/**
 * Class Handler
 *
 * @package App\Exceptions
 */
class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param \Exception $exception
     *
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception               $exception
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
//
//        if (strpos($request->getRequestUri(), 'api/') !== false) {
//
//            if ($exception instanceof ModelNotFoundException) {
//                return response()->json([
//                    'error'   => true,
//                    'content' => 'Modelo não encontrado'
//                ], 404);
//            }
//
//            if ($exception instanceof NotFoundHttpException) {
//                return response()->json([
//                    'error'   => true,
//                    'content' => 'Recurso não encontrado'
//                ], 404);
//            }
//
//            if ($exception instanceof MethodNotAllowedHttpException) {
//                return response()->json([
//                    'error'   => true,
//                    'content' => 'Método não encontrado'
//                ], 405);
//            }
//
//        }
//
//        if ($exception instanceof TokenExpiredException) {
//
//            return response()->json([
//                'error'   => true,
//                'content' => 'Seu token expirou, tente fazer login novamente'
//            ]);
//
//        } elseif ($exception instanceof TokenInvalidException) {
//
//            return response()->json([
//                'error'   => true,
//                'content' => 'Token Inválido'
//            ]);
//
//        } elseif ($exception instanceof JWTException) {
//
//            return response()->json([
//                'error'   => true,
//                'content' => 'Token sem Permissão de acesso ao sistema'
//            ]);
//
//        } elseif ($exception instanceof TokenBlacklistedException) {
//
//            return response()->json([
//                'error'   => true,
//                'content' => 'Token sem Permissão de acesso ao sistema'
//            ]);
//
//        }

        if ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {

            return response()->json([
                'error'   => true,
                'content' => 'token is expired'
            ], 400);

        } elseif ($exception instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {

            return response()->json([
                'error'   => true,
                'content' => 'token is invalid'
            ], 400);

        } elseif ($exception instanceof \Tymon\JWTAuth\Exceptions\JWTException) {

            return response()->json([
                'error'   => true,
                'content' => 'token absent'
            ], 400);

        }


        return parent::render($request, $exception);
    }
}
