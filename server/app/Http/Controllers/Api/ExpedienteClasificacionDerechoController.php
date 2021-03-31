<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteClasificacionDerecho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteClasificacionDerechoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::query()
                ->paginate($request->per_page);
        } else
            $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de Clasificación derecho",
                'result' => $ExpedienteClasificacionDerecho
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
        $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::query()
        ->select('tt_expediente_clas_derecho.id_expediente_clas_derecho', 'tt_expediente_clas_derecho.id_expediente',
            'tt_expediente_clas_derecho.id_clasificacion_derecho', 'T01.nombre AS nombre_clasificacion_derecho',
        )
        ->leftJoin('tc_clasificacion_derecho AS T01', 'tt_expediente_clas_derecho.id_clasificacion_derecho', 'T01.id_clasificacion_derecho');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $ExpedienteClasificacionDerecho->where('id_expediente', $request->id_expediente);
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificacion de derechos del expediente encontrado con exito",
                'result' => $ExpedienteClasificacionDerecho->get()
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
            'id_clasificacion_derecho' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422 );
        }
        $inputs = $request->all();
        $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::create($inputs);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación agregada exitosamente",
            'result' => $ExpedienteClasificacionDerecho
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente' => 'required|integer',
            'id_clasificacion_derecho' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $ExpedienteClasificacionDerecho->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificacion actualizada con exito",
            'result' => $ExpedienteClasificacionDerecho
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        $expedienteClasificacionDerecho->delete();
        return $this->respondSuccess('Clasificacion de expediente eliminada');
    }
}
