<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Prioridad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PrioridadController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $prioridades = Prioridad::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación de la prioridad",
                'result' => $prioridades
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
            'slug' => 'string|unique:tc_prioridad',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $prioridad = Prioridad::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación de la prioridad creado con exito",
            'result' => $prioridad
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Prioridad  $prioridad
     * @return \Illuminate\Http\Response
     */
    public function show(Prioridad $prioridad)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación de la prioridad encontrada",
                'result' => $prioridad
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Prioridad  $prioridad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Prioridad $prioridad)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $prioridad->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación de la prioridad actualizada con exito",
            'result' => $prioridad
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Prioridad  $prioridad
     * @return \Illuminate\Http\Response
     */
    public function destroy(Prioridad $prioridad)
    {
        $prioridad->delete();

        return $this->respondSuccess('Clasificación de la prioridad eliminada con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Prioridad  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $prioridad = Prioridad::withTrashed()->findorfail($id);
        $prioridad->restore();

        return $this->respondSuccess('Clasificación del prioridad restaurada con exito');
    }
}
