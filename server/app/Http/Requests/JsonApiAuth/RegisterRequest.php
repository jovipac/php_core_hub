<?php

namespace App\Http\Requests\JsonApiAuth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|string|max:100|unique:ts_usuario',
            'email' => 'required|string|email|max:200',
            'password' => 'required|string|confirmed|min:8',
        ];
    }
}