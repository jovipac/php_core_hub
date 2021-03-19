<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteHechoArchivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteHechoArchivoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteHechoArchivos = ExpedienteHechoArchivo::query()
                ->paginate($request->per_page);
        } else
            $expedienteHechoArchivos = ExpedienteHechoArchivo::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de pruebas adjunta del hechos",
                'result' => $expedienteHechoArchivos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'id_expediente' => 'required|integer',
            'id_expediente_hecho' => 'required|integer',
            'ubicacion' => 'string',
            'nombre' => 'string',
            'tamanio' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteHechoArchivo = ExpedienteHechoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho agregada con exito",
            'result' => $expedienteHechoArchivo
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteHechoArchivo  $expedienteHechoArchivo
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteHechoArchivo $expedienteHechoArchivo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedienteHechoArchivo  $expedienteHechoArchivo
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpedienteHechoArchivo $expedienteHechoArchivo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteHechoArchivo  $expedienteHechoArchivo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteHechoArchivo $expedienteHechoArchivo)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_hecho_prueba' => 'required|integer',
            'id_expediente' => 'nullable|integer',
            'id_expediente_hecho' => 'nullable|integer',
            'ubicacion' => 'nullable|string',
            'nombre' => 'nullable|string',
            'tamanio' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteHechoArchivo = ExpedienteHechoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho actualizada con exito",
            'result' => $expedienteHechoArchivo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoArchivo  $expedienteHechoArchivo
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteHechoArchivo $expedienteHechoArchivo)
    {
        $expedienteHechoArchivo->delete();

        return $this->respondSuccess('Prueba adjunta del hecho eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoArchivo  $expedienteHechoArchivo
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expedienteHechoArchivo = ExpedienteHechoArchivo::withTrashed()->findorfail($id);
        $expedienteHechoArchivo->restore();

        return $this->respondSuccess('Prueba adjunta del hecho restaurada con exito');
    }
}
