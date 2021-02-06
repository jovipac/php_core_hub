<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Rol;
use App\Models\Entities\RolModulo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RolModuloController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rol_modulo = Rol::with('modulos')->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos del rol",
                'result' => $rol_modulo
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
            'id_rol' => 'required',
            'id_modulo' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $rol_modulo = RolModulo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Modulo del rol creado con exito",
            'result' => $rol_modulo
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
        $rol_modulo = Rol::with('modulos')->where('id_rol',$id)->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Modulo del rol encontrado",
                'result' => $rol_modulo
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
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id_rol' => 'required',
            'id_modulo' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $rol_modulo = Rol::where('id_rol',$id)->first();
        $rol_modulo->modulos()->syncWithoutDetaching([$request->id_modulo]);
        //$rol_modulo->modulos()->updateExistingPivot($id, ['id_modulo' => $request->id_modulo]);

        return $this->respondSuccess([
            'success' => true,
            'message' => "Modulo del rol actualizado con exito",
            'result' => $rol_modulo->modulos()->get()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(RolModulo $rol_modulo)
    {
        $rol_modulo->delete();

        return $this->respondSuccess('Modulo del rol eliminado con exito');
    }
}
