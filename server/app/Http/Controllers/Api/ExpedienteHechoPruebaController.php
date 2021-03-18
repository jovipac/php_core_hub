<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteHechoPrueba;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteHechoPruebaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteHechoPruebas = ExpedienteHechoPrueba::query()
                ->paginate($request->per_page);
        } else
            $expedienteHechoPruebas = ExpedienteHechoPrueba::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de pruebas adjunta del hechos",
                'result' => $expedienteHechoPruebas
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
        $expedienteHechoPrueba = ExpedienteHechoPrueba::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho agregada con exito",
            'result' => $expedienteHechoPrueba
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteHechoPrueba  $expedienteHechoPrueba
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteHechoPrueba $expedienteHechoPrueba)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedienteHechoPrueba  $expedienteHechoPrueba
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpedienteHechoPrueba $expedienteHechoPrueba)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteHechoPrueba  $expedienteHechoPrueba
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteHechoPrueba $expedienteHechoPrueba)
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
        $expedienteHechoPrueba = ExpedienteHechoPrueba::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho actualizada con exito",
            'result' => $expedienteHechoPrueba
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoPrueba  $expedienteHechoPrueba
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteHechoPrueba $expedienteHechoPrueba)
    {
        $expedienteHechoPrueba->delete();

        return $this->respondSuccess('Prueba adjunta del hecho eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoPrueba  $expedienteHechoPrueba
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expedienteHechoPrueba = ExpedienteHechoPrueba::withTrashed()->findorfail($id);
        $expedienteHechoPrueba->restore();

        return $this->respondSuccess('Prueba adjunta del hecho restaurada con exito');
    }
}
