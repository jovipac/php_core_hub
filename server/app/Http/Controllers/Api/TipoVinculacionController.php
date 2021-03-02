<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\TipoVinculacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoVinculacionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipovinculacion = TipoVinculacion::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de tipos vinculaciones",
                'result' => $tipovinculacion
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
            'slug' => 'string|unique:tc_tipovinculacion',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $tipoVinculacion = TipoVinculacion::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Tipo vinculacion creado con exito",
            'result' => $tipoVinculacion
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TipoVinculacion  $tipoVinculacion
     * @return \Illuminate\Http\Response
     */
    public function show(TipoVinculacion $tipoVinculacion)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Tipo vinculacion encontrado",
                'result' => $tipoVinculacion
            ]
        );
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TipoVinculacion  $tipoVinculacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoVinculacion $tipoVinculacion)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $tipoVinculacion->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Tipo vinculacion actualizado con exito",
            'result' => $tipoVinculacion
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TipoVinculacion  $tipoVinculacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoVinculacion $tipoVinculacion)
    {
        $tipoVinculacion->delete();

        return $this->respondSuccess('Tipo vinculacion eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $tipovinculacion = TipoVinculacion::withTrashed()->findorfail($id);
        $tipovinculacion->restore();

        return $this->respondSuccess('Tipo vinculacion restaurada con exito');
    }

}
