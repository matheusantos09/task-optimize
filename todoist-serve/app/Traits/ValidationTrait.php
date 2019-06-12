<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

/**
 * Trait ValidationTrait
 *
 * @package App\Traits
 */
trait ValidationTrait
{

    /**
     * @param      $request
     * @param      $rules
     * @param null $messages
     *
     * @throws \Exception
     */
    public function validator($request, $rules, $messages = null)
    {

        $validator = Validator::make($request, $rules);

        if ($validator->fails()) {
            $msgReturn = '';

            foreach ($validator->errors()->messages() as $key => $msg) {
                $msgReturn .= ($msg[0] ?? '') . PHP_EOL;
            }

            throw new \Exception((string)$msgReturn);
        }

    }
}
