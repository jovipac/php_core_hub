<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteHecho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteHechoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteHechos = ExpedienteHecho::query()
                ->paginate($request->per_page);
        } else
            $expedienteHechos = ExpedienteHecho::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de expediente personas",
                'result' => $expedienteHechos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $expedienteHecho = ExpedienteHecho::query()
        ->select('tt_expediente_hecho.*', 'T01.nombre AS nombre_tipo_direccion',
            'T02.nombre AS nombre_departamento', 'T03.nombre AS nombre_municipio',
        )
        ->leftJoin('tc_tipo_area_lugar AS T01', 'tt_expediente_hecho.id_tipo_area_lugar', 'T01.id_tipo_area_lugar')
        ->leftJoin('tc_departamento AS T02', 'tt_expediente_hecho.id_departamento', 'T02.id_departamento')
        ->leftJoin('tc_municipio AS T03', 'tt_expediente_hecho.id_municipio', 'T03.id_municipio');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $expedienteHecho->where('tt_expediente_hecho.id_expediente', $request->id_expediente);
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Expediente encontrado",
                'result' => $expedienteHecho->get()
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
            'id_expediente' => 'required|integer',
            'fecha_hora' => 'date',
            'id_tipo_area_lugar' => 'required|integer',
            'id_departamento' => 'required|integer',
            'id_municipio' => 'required|integer',
            'direccion' => 'nullable|string',
            'hechos' => 'nullable|string',
            'peticion' => 'nullable|string',
            'pruebas' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteHecho = ExpedienteHecho::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Expediente Persona creado con exito",
            'result' => $expedienteHecho
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteHecho  $expedienteHecho
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteHecho $expedienteHecho)
    {
        $expedienteHecho = ExpedienteHecho::query()
        ->select('tt_expediente_hecho.*', 'T01.nombre AS nombre_tipo_direccion',
            'T02.nombre AS nombre_departamento', 'T03.nombre AS nombre_municipio',
        )
        ->leftJoin('tc_tipo_area_lugar AS T01', 'tt_expediente_hecho.id_tipo_area_lugar', 'T01.id_tipo_area_lugar')
        ->leftJoin('tc_departamento AS T02', 'tt_expediente_hecho.id_departamento', 'T02.id_departamento')
        ->leftJoin('tc_municipio AS T03', 'tt_expediente_hecho.id_municipio', 'T03.id_municipio')
        ->where('tt_expediente_hecho.id_expediente_hecho', $expedienteHecho->id_expediente_hecho);

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Direccion de la persona encontrada",
                'result' => $expedienteHecho->first()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedienteHecho  $expedienteHecho
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpedienteHecho $expedienteHecho)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteHecho  $expedienteHecho
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteHecho $expedienteHecho)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_hecho' => 'nullable|integer',
            'id_expediente' => 'nullable|integer',
            'fecha_hora' => 'nullable|date',
            'id_tipo_area_lugar' => 'nullable|integer',
            'id_departamento' => 'nullable|integer',
            'id_municipio' => 'nullable|integer',
            'direccion' => 'nullable|string',
            'hechos' => 'nullable|string',
            'peticion' => 'nullable|string',
            'pruebas' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedienteHecho->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Expediente Persona actualizado con exito",
            'result' => $expedienteHecho
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteHecho  $expedienteHecho
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteHecho $expedienteHecho)
    {
        $expedienteHecho->delete();

        return $this->respondSuccess('Expediente Persona eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteHecho  $expedienteHecho
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $via = ExpedienteHecho::withTrashed()->findorfail($id);
        $via->restore();

        return $this->respondSuccess('Expediente Persona restaurada con exito');
    }
}
