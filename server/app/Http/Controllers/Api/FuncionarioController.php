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
    public function list()
    {
        $funcionarios = Funcionario::select('id_funcionario', 'codigo', 'nombres', 'apellidos', 'email', 'created_at', 'updated_at')
        ->join('ts_usuario as T01', 'T01.id_funcionario', '=', 'id_funcionario')
        ->join('ts_puesto as T02', 'T01.id_puesto', '=', 'id_puesto')
        ->join('ts_puesto as T02', 'T01.id_puesto', '=', 'id_puesto')
        ->get();
        //->join('id_funcionario');

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de funcionarios",
                'result' => $funcionarios
            ]
        );
    }

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
            'username' => 'required|unique:ts_usuario',
            'email' => 'email',
            'id_puesto' => 'required|integer',
            'id_auxiliatura' => 'required|integer',
            'id_rol' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $input = $request->all();
        $random_password = Str::random(8);

        $funcionario = Funcionario::create($input);

        $newUser = new User([
            'username' => $input['username'],
            'password' => bcrypt($random_password),
            'email' => $input['email'],
            'id_funcionario' => $funcionario['id_funcionario'],
            'id_auxiliatura' => $input['id_auxiliatura'],
        ]);
        $newUser->save();
        /*
        $rolInit = $input['id_rol'];
        $newRolUser = new RolUser([
            'id_usuario' => $newUser['id_usuario'],
            'id_rol' => $input['id_rol'],
        ]);
        $user = User::find($newUser->id_usuario);
        $user->roles()->attach($rolInit);
        */
        $funcionario['username'] = $input['username'];
        $funcionario['password'] = $random_password;
        $funcionario['id_auxiliatura'] = $input['id_auxiliatura'];

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
            'id_funcionario' => 'required|integer',
            'codigo' => 'required',
            'nombres' => 'required',
            'apellidos' => 'required',
            'email' => 'email',
            'id_puesto' => 'required|integer',
            'id_rol' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $funcionario->update($request->all());

        $findUser = User::where("id_funcionario",'=', $request->id_funcionario)->first()
            ->update($request->all());

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
