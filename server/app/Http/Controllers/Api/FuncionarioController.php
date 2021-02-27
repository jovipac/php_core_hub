<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Models\Catalogs\Funcionario;
use App\Models\Entities\User;
use App\Models\Entities\UsuarioRol;
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
        $funcionarios = Funcionario::query()
        ->select('tc_funcionario.id_funcionario', 'tc_funcionario.codigo',
            'T01.id_usuario', 'T01.username', 'tc_funcionario.nombres', 'tc_funcionario.apellidos',
            'T02.id_dependencia','T03.nombre AS nombre_dependencia', 'T02.id_puesto', 'T02.nombre AS nombre_puesto',
            'tc_funcionario.email', 'tc_funcionario.borrado',
            'T04.id_auxiliatura', 'T04.nombre AS nombre_auxiliatura',
            'T05.id_rol', 'T06.nombre AS nombre_rol',
            'tc_funcionario.created_at', 'tc_funcionario.updated_at')
        ->join('ts_usuario as T01', 'tc_funcionario.id_funcionario', '=', 'T01.id_funcionario')
        ->leftJoin('tc_puesto as T02', 'T02.id_puesto', '=', 'tc_funcionario.id_puesto')
        ->leftJoin('tc_dependencia as T03', 'T02.id_dependencia', '=', 'T03.id_dependencia')
        ->leftJoin('tc_auxiliatura as T04', 'T04.id_auxiliatura', '=', 'T01.id_auxiliatura')
        ->leftJoin('tt_usuario_rol as T05', 'T05.id_usuario', '=', 'T01.id_usuario')
        ->leftJoin('ts_rol as T06', 'T06.id_rol', '=', 'T05.id_rol')
        ->get();

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
        $funcionarios = Funcionario::select(
            'tc_funcionario.*',
            'T02.id_dependencia',
            'T03.nombre AS nombre_dependencia',
            'T02.id_puesto',
            'T02.nombre AS nombre_puesto'
        )
        ->leftJoin('tc_puesto as T02', 'T02.id_puesto', '=', 'tc_funcionario.id_puesto')
        ->leftJoin('tc_dependencia as T03', 'T02.id_dependencia', '=', 'T03.id_dependencia')
        ->get();

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
            'codigo' => 'required|unique:tc_funcionario',
            'nombres' => 'required',
            'apellidos' => 'required',
            'username' => 'required|unique:ts_usuario',
            'email' => 'email|required|unique:tc_funcionario',
            'id_puesto' => 'required|integer',
            'id_auxiliatura' => 'required|integer',
            'id_rol' => 'required|integer',
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
        $newUser->roles()->attach($input['id_rol']);

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
            'id_rol' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $funcionario->update($request->all());

        $findUser = User::where("id_funcionario", $request->id_funcionario)->first();

        $findUser->roles()->sync([$request->id_rol]);
        $findUser->update($request->all());

        return $this->apiResponse([
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
        $findUser = User::where("id_funcionario",'=', $funcionario->id_funcionario)->first();
        $findUser->delete();
        $funcionario->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
