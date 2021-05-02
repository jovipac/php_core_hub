<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Expediente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedientes = Expediente::query()
                ->paginate($request->per_page);
        } else
            $expedientes = Expediente::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de expedientes",
                'result' => $expedientes
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
        $ExpedienteClasificacionDerecho = Expediente::query()
        ->select('tt_expediente.id_expediente', 'tt_expediente.anio', 'tt_expediente.folio', 'tt_expediente.id_auxiliatura', 'tt_expediente.fecha_ingreso',
            'tt_expediente.id_via', 'T01.nombre AS nombre_via',
            'tt_expediente.id_motivo', 'T02.nombre AS nombre_motivo',
            'tt_expediente.id_prioridad', 'T03.nombre AS nombre_prioridad',
            'tt_expediente.id_dependencia', 'T04.nombre AS nombre_dependencia',
            'tt_expediente.id_funcionario', 'T05.nombres AS nombres_funcionario', 'T05.apellidos AS apellidos_funcionario',
            'tt_expediente.id_auxiliatura', 'T06.nombre AS nombre_auxiliatura',
            'tt_expediente.id_resultado', 'T07.nombre AS nombre_resultado',
            'tt_expediente.id_estado_expediente', 'T08.nombre AS nombre_estado',
            'tt_expediente.observaciones', 'tt_expediente.id_visita'
        )
        ->leftJoin('tc_via AS T01', 'tt_expediente.id_via', 'T01.id_via')
        ->leftJoin('tc_motivo AS T02', 'tt_expediente.id_motivo', 'T02.id_motivo')
        ->leftJoin('tc_prioridad AS T03', 'tt_expediente.id_prioridad', 'T03.id_prioridad')
        ->leftJoin('tc_dependencia AS T04', 'tt_expediente.id_dependencia', 'T04.id_dependencia')
        ->leftJoin('tc_funcionario AS T05', 'tt_expediente.id_funcionario', 'T05.id_funcionario')
        ->leftJoin('tc_auxiliatura AS T06', 'tt_expediente.id_auxiliatura', 'T06.id_auxiliatura')
        ->leftJoin('tc_resultado AS T07', 'tt_expediente.id_resultado', 'T07.id_resultado')
        ->leftJoin('tc_estado_expediente AS T08', 'tt_expediente.id_estado_expediente', 'T08.id_estado_expediente');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $ExpedienteClasificacionDerecho->where('tt_expediente.id_expediente', $request->id_expediente);
        }

        if ( $request->has('id_estado_expediente') && $request->filled('id_estado_expediente') ) {
            $ExpedienteClasificacionDerecho->where('tt_expediente.id_estado_expediente', $request->id_estado_expediente);
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
        $input = $request->all();

        if ($request->has('id_via') && $request->filled('id_via')) {
            $findVia = \App\Models\Catalogs\Via::where("slug", $request->id_via)->first();
            if ($request->id_via == "PE") {
                $input['id_via'] = $findVia->id_via;
            }
        }

        $query = Expediente::query()->select('fecha_ingreso', 'anio', 'folio')
            ->whereYear('created_at', date('Y'))
            ->orderBy('folio', 'desc')
            ->first();

        $input['anio'] = isset($query->anio) ? $query->anio : date('Y');
        $input['folio'] = isset($query->folio) ? ++$query->folio : 1;

        $validator = Validator::make($input, [
            'anio' => 'required|integer',
            'folio' => 'integer',
            'fecha_ingreso' => 'required',
            'id_via' => 'required|integer',
            'id_motivo' => 'nullable|integer',
            'id_prioridad' => 'required|integer',
            'id_dependencia' => 'nullable|integer',
            'id_funcionario' => 'nullable|integer',
            'observaciones' => 'string',
            'id_resultado' => 'nullable|integer',
            'id_auxiliatura' => 'required|integer',
            'id_visita' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expediente = Expediente::create($input);

        if ($request->has('id_persona') && $request->filled('id_persona')) {
            $expediente->personas()->attach($input['id_persona']);
        }

        return $this->respondCreated([
            'success' => true,
            'message' => "Expediente creado con exito",
            'result' => $expediente
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function show(Expediente $expediente)
    {
        $query = Expediente::query()->select('tt_expediente.id_expediente', 'tt_expediente.anio', 'tt_expediente.folio',
            'tt_expediente.fecha_ingreso', 'tt_expediente.observaciones',
            'tt_expediente.id_funcionario', 'T01.nombres AS nombres_funcionario', 'T01.apellidos AS apellidos_funcionario',
            'tt_expediente.id_via', 'T02.nombre AS nombre_via',
            'tt_expediente.id_auxiliatura', 'T03.nombre AS nombre_auxiliatura',
            'tt_expediente.id_prioridad', 'T04.nombre AS nombre_prioridad',
            'tt_expediente.id_resultado', 'T05.nombre AS nombre_resultado',
            'tt_expediente.id_estado_expediente', 'T08.nombre AS nombre_estado',
            )
            ->leftJoin('tc_funcionario AS T01', 'tt_expediente.id_funcionario', 'T01.id_funcionario')
            ->leftJoin('tc_via AS T02', 'tt_expediente.id_via', 'T02.id_via')
            ->join('tc_auxiliatura AS T03', 'tt_expediente.id_auxiliatura', 'T03.id_auxiliatura')
            ->join('tc_prioridad AS T04', 'tt_expediente.id_prioridad', 'T04.id_prioridad')
            ->leftJoin('tc_resultado AS T05', 'tt_expediente.id_resultado', 'T05.id_resultado')
            ->leftJoin('tc_estado_expediente AS T08', 'tt_expediente.id_estado_expediente', 'T08.id_estado_expediente')
            ->where('tt_expediente.id_expediente', $expediente->id_expediente);

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Expediente encontrado",
                'result' => $query->first()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expediente $expediente)
    {
        $validator = Validator::make($request->all(), [
            'anio' => 'integer',
            'folio' => 'integer',
            'fecha_ingreso' => 'required',
            'id_via' => 'required|integer',
            'id_motivo' => 'nullable|integer',
            'id_prioridad' => 'required|integer',
            'id_dependencia' => 'nullable|integer',
            'id_funcionario' => 'required|integer',
            'observaciones' => 'nullable|string',
            'id_resultado' => 'nullable|integer',
            'id_auxiliatura' => 'nullable|integer',
            'id_visita' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expediente->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Expediente actualizado con exito",
            'result' => $expediente
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expediente $expediente)
    {
        $expediente->delete();

        return $this->respondSuccess('Expediente eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $via = Expediente::withTrashed()->findorfail($id);
        $via->restore();

        return $this->respondSuccess('Expediente restaurada con exito');
    }

}
