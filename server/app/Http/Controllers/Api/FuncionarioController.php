<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\Catalogs\Funcionario;
use App\Models\Entities\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class FuncionarioController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $funcionarios = Funcionario::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de funcionarios",
                'result' => $funcionarios
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required',
            'nombres' => 'required',
            'apellidos' => 'required',
            'username' => 'required',
            'email' => 'email',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $input = $request->all();
        $random_password = Str::random(8);
        $user = new User([
            'username' => $input['username'],
            'password' => bcrypt($random_password)
        ]);
        $user->save();
        $input['id_usuario'] = $user['id_usuario'];
        $funcionario = Funcionario::create($input);
        $funcionario['username'] = $input['username'];
        $funcionario['password'] = $random_password;

        return $this->respondCreated([
            'success' => true,
            'message' => "Funcionario creado con exito",
            'result' => $funcionario
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Catalogs\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function show(Funcionario $funcionario)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Funcionario encontrado",
                'result' => $funcionario
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Catalogs\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Funcionario $funcionario)
    {
        $validator = Validator::make($request->all(), [
            'codigo' => 'required',
            'nombres' => 'required',
            'apellidos' => 'required',
            'email' => 'email',
            'id_usuario' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $funcionario->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Funcionario actualizado con exito",
            'result' => $funcionario
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Catalogs\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Funcionario $funcionario)
    {
        $funcionario->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
