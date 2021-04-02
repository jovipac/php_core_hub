<?php

namespace App\Http\Controllers\JsonApiAuth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\JsonApiAuth\Traits\HasToShowApiTokens;
use App\Http\Requests\JsonApiAuth\LoginRequest;
use App\Models\Entities\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\Helpers\ApiResponseTrait;

class LoginController extends Controller
{
    use HasToShowApiTokens;

    public function __invoke(LoginRequest $request)
    {
        try {

            if (Auth::attempt($request->only(['username', 'password']))) {
                if ($request->has('remember') && $request->filled('remember'))
                    return $this->showCredentials(Auth::user(), 200, true, true);
                else
                    return $this->showCredentials(Auth::user());
            }

        } catch (\Exception $exception) {

            return $this->respondError( $exception->getMessage(), 400);

        }
        return $this->respondError( __('json-api-auth.failed'), 401);

    }
}
