<?php

namespace App\Http\Controllers\JsonApiAuth;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\JsonApiAuth\PasswordResetLinkRequest;
use App\Models\Entities\User;
use App\Notifications\JsonApiAuth\ResetPasswordNotification;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Http\Traits\Helpers\ApiResponseTrait;

class PasswordResetLinkController extends Controller
{
    use ApiResponseTrait;

    /**
     * @param PasswordResetLinkRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(PasswordResetLinkRequest $request)
    {
        try {
            // Here you can customize search email in Model
            $input = $request->only(['email']);

            if(User::where('email', $input['email'])->doesntExist()) {
                return $this->respondNotFound('User does not exists');
            }

            $user = User::where('email', $input['email'])->first();

            // Here you can customize the token length
            $token = Str::random(60);

            DB::table('password_resets')->insert([
                'email' => $user->email,
                'token' => $token,
                'created_at' => now()
            ]);

            $user->notify(new ResetPasswordNotification($token));

            return $this->respondSuccess(__('json-api-auth.check_your_email'));

        } catch (\Exception $exception) {
            return $this->respondError($exception->getMessage(), 400, $exception);
        }

    }
}
