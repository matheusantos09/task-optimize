<?php

namespace App\Http\Middleware;

use App\Libraries\Helpers\Functions;
use App\Models\Logs;
use Closure;

class SaveLogs
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Functions::saveLog('Requisição {request_type} para URL {request_url} com params {request_data}', [
            'request_type' => $request->getMethod(),
            'request_url'  => $request->fullUrl(),
            'request_data' => json_encode($request->all())
        ]);

        return $next($request);
    }
}
