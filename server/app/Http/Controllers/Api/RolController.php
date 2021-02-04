<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Rol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = Rol::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de roles",
                'result' => $roles
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
            'nombre' => 'required|string',
            'descripcion' => 'string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $rol = Rol::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Rol creado con exito",
            'result' => $rol
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function show(Rol $rol)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Rol encontrado",
                'result' => $rol
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rol $rol)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'descripcion' => 'string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $rol->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Rol actualizado con exito",
            'result' => $rol
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rol  $rol
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rol $rol)
    {
        $rol->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
