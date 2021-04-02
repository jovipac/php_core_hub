<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\Helpers\ApiResponseTrait;
use Carbon\Carbon;
use App\Models\Entities\User;
use App\Http\Resources\UsuarioResource;

class AuthController extends Controller
{
    use ApiResponseTrait;

    /**
     * Registro de usuario
     */
    public function signUp(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:ts_usuario',
            'email' => 'string|email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return $this->respondCreated([
            'success' => true,
            'message' => "Usuario agregado con exito",
            'result' => $user
        ]);

    }

    /**
     * Inicio de sesión y creación de token
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);

        $credentials = request(['username', 'password']);

        if (!Auth::attempt($credentials))
            return $this->respondUnAuthorized('No autorizado');

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');

        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        $response = [
            'user' => new UsuarioResource($request->user()),
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($token->expires_at)->toDateTimeString()
        ];
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Autenticado correctamente",
                'result' => $response
            ]
        );
    }

    /**
     * Cierre de sesión (anular el token)
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return $this->respondSuccess('Sesión cerrada correctamente');

    }

    /**
     * Obtener el objeto User como json
     */
    public function profile(Request $request)
    {
        return response()->json($request->user());
    }
}
