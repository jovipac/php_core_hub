<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\Entities\User;
use Illuminate\Support\Facades\Hash;



class changepwdController extends ApiController
{


public function update(Request $request)
{
   
 
    $user = User::query()
    ->select(
        'id_usuario', 'username','email'
    )
    ->where('id_usuario', $request->id_usuario);

    $user->update(['password' => Hash::make($request->get('password'))]);


   return $this->apiResponse([
        'success' => true,
        'message' => "Clave cambiada con éxito",
        'result' => $user
    ]);
}



}
