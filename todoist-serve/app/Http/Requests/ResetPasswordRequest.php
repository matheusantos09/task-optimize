<?php

namespace App\Http\Requests;

use Config;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    public function rules()
    {
        return [
            'token'    => 'required',
            'email'    => 'required|email',
            'password' => 'required|max:91'
            //            'password' => 'required|confirmed'
        ];
    }

    public function authorize()
    {
        return true;
    }
}
