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
        $role = Rol::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Rol creado con exito",
            'result' => $role
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Rol  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Rol $role)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Rol encontrado",
                'result' => $role
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Rol  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Rol $role)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'descripcion' => 'string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $role->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Rol actualizado con exito",
            'result' => $role
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Rol  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Rol $role)
    {
        $role->delete();

        return $this->respondSuccess('Rol eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Rol  $integer
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = Rol::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Rol restaurado con exito');
    }
}
