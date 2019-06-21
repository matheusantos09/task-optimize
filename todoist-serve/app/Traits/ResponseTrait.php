<?php

namespace App\Traits;

/**
 * Traits ResponseTrait
 *
 * @package App\Traits
 */
trait ResponseTrait
{

    /**
     * @param      $error
     * @param      $message
     * @param int  $code
     * @param null $exception
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function responseJson($error, $message, $code = 200, $exception = null)
    {

        if ($error) {
            return response()->json([
                'error'   => true,
                'content' => config('constant.APP_DEBUG') ?
                    '[DEBUG MODE] ' .
                    ($exception ? $exception->getMessage() : '') . PHP_EOL
                    . 'File: ' . ($exception ? $exception->getFile() : '') . PHP_EOL
                    . 'Line: ' . ($exception ? $exception->getLine() : '') . PHP_EOL
                    . ' | ' . ($message ?? '') :
                    $message ?? 'Ocorreu um erro'
            ], $code);
        }

        return response()->json([
            'error'   => false,
            'content' => $message ?? 'Pedido processado com sucesso'
        ], $code);

    }

    /**
     * @param $token
     * @param $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function tokenResponseJson($token, $message)
    {
        return response()->json([
            'error'   => false,
            'content' => $message ?? 'Pedido processado com sucesso',
            'token'   => $token
        ]);

    }

}
