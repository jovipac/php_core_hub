<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\UsuarioRol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UsuarioRolController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuario_role = UsuarioRol::with('roles')->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de roles del usuario",
                'result' => $usuario_role
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
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $usuario_role = UsuarioRol::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Rol del usuario creado con exito",
            'result' => $usuario_role
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Rol del usuario encontrado",
                'result' => $id
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UsuarioRol $usuario_role)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $usuario_role->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Rol del usuario actualizado con exito",
            'result' => $usuario_role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(UsuarioRol $usuario_role)
    {
        $usuario_role->delete();

        return $this->respondSuccess('Rol del usuario eliminado con exito');
    }
}
