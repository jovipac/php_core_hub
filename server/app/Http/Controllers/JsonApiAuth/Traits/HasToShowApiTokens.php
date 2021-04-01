<?php

namespace App\Http\Controllers\JsonApiAuth\Traits;

use Laravel\Passport\Passport;
use App\Actions\JsonApiAuth\AuthKit;
use App\Http\Traits\Helpers\ApiResponseTrait;
use App\Http\Resources\UsuarioResource;
use App\Models\Entities\User;


trait HasToShowApiTokens
{
    use ApiResponseTrait;

    /**
     * Here you can customize how to return data on login and register
     * @param $user
     * @param int $code
     * @param bool $showToken
     * @return \Illuminate\Http\JsonResponse
     */
    public function showCredentials($user, $remember = false, $showToken = true)
    {
        $response = [
            'user' => new UsuarioResource($user),
            'tokenType' => 'Bearer',
        ];

        $tokenResponse = $this->createToken($user, $remember);

        if($showToken) {
            $response = array_merge( (array)$response, (array)$tokenResponse);
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => __('json-api-auth.success'),
                'result' => $response
            ]
        );

    }

    protected function createToken(User $user, $remember_me = false)
    {
        if ($remember_me === true) {
            Passport::personalAccessTokensExpireIn(\Carbon\Carbon::now()->addWeeks(1));
        }
        $token = $user->createToken(
            config('json-api-auth.token_id') ?? 'App'
            // Here you can customize the scopes for a new user
            //config('json-api-auth.scopes')
        );

        if(AuthKit::isSanctum()) {
            return $token->plainTextToken;
        }
        //return $token->accessToken;
        return $token;
    }
}
