<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Visita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class VisitaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $visitas = Visita::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de registros de visitas",
                'result' => $visitas
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        if ($request->has('id_auxiliatura') || $request->has('id_motivo')) {
            $list = Visita::query()
                ->select('tt_visita.id_visita', 'tt_visita.id_persona',
                'T01.cui', 'T01.nombres', 'T01.apellidos', 'T01.fecha_nacimiento', 'T01.telefono',
                'tt_visita.entrada', 'tt_visita.salida', 'tt_visita.llamadas',
                'tt_visita.id_motivo', 'T02.nombre AS nombre_motivo',
                'tt_visita.id_dependencia', 'T03.nombre AS nombre_dependencia',
                'tt_visita.id_estado', 'T05.nombre AS nombre_estado',
                )
                ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
                ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
                ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
                ->join('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
                ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
                ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura');

            if ($request->has('id_auxiliatura'))
                $list = $list->where('tt_visita.id_auxiliatura', $request->input('id_auxiliatura'));

            if ($request->has('id_motivo'))
                $list = $list->where('tt_visita.id_motivo', $request->input('id_motivo'));

            $visitas = $list->get()->each(function ($query) {
                if (!is_null($query->fecha_nacimiento ?? null))
                    $query->edad = Carbon::parse($query->fecha_nacimiento)->age;
                else
                    $query->edad = null;
            });
            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de solicitud de visitas",
                    'result' => $visitas
                ]
            );

        } else {

            $list = Visita::query()
                ->select('tt_visita.id_visita', 'tt_visita.id_persona',
                'T01.cui', 'T01.nombres', 'T01.apellidos', 'T01.fecha_nacimiento', 'T01.telefono',
                'tt_visita.entrada', 'tt_visita.salida', 'tt_visita.llamadas',
                'tt_visita.id_motivo', 'T02.nombre AS nombre_motivo',
                'tt_visita.id_dependencia', 'T03.nombre AS nombre_dependencia',
                'tt_visita.id_estado', 'T05.nombre AS nombre_estado',
                'tt_visita.id_auxiliatura', 'T06.nombre AS nombre_auxiliatura',
                )
                ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
                ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
                ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
                ->join('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
                ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
                ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura');

            $visitas = $list->get()->each(function ($query) {
                if (!is_null($query->fecha_nacimiento ?? null))
                    $query->edad = Carbon::parse($query->fecha_nacimiento)->age;
                else
                    $query->edad = null;
            });

            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de solicitud de visitas",
                    'result' => $visitas
                ]
            );
        }
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
        if (!$request->has('entrada')) {
            $input['entrada'] = Carbon::now()->format('H:i');
        }

        $validator = Validator::make($input, [
            'id_persona' => 'required|integer',
            'id_motivo' => 'required|integer',
            'entrada' => 'date_format:H:i|before:tomorrow',
            'salida' => 'nullable|date_format:H:i|after:entrada',
            'llamadas' => 'integer',
            'id_dependencia' => 'required|integer',
            'id_funcionario' => 'integer',
            'id_auxiliatura' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $visita = Visita::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Registro de visita creado con exito",
            'result' => $visita
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Visita  $visita
     * @return \Illuminate\Http\Response
     */
    public function show(Visita $visita)
    {
        $item = Visita::query()
            ->select('tt_visita.id_visita', 'tt_visita.id_persona', 'T01.cui',
            'T01.nombres', 'T01.apellidos', 'T01.telefono', 'T01.fecha_nacimiento', 'T01.id_sexo',
            'tt_visita.entrada', 'tt_visita.salida', 'tt_visita.llamadas',
            'tt_visita.id_motivo', 'T02.nombre AS nombre_motivo',
            'tt_visita.id_dependencia', 'T03.nombre AS nombre_dependencia',
            'tt_visita.id_funcionario', 'T04.codigo AS codigo_funcionario',
            'tt_visita.id_estado', 'T05.nombre AS nombre_estado',
            'tt_visita.id_auxiliatura', 'T06.nombre AS nombre_auxiliatura',
            )
            ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
            ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
            ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
            ->join('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
            ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
            ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura')
            ->where('tt_visita.id_visita', $visita->id_visita);

        $visita = $item->get()->each(function ($query) {
            if (!is_null($query->fecha_nacimiento ?? null))
                $query->edad = Carbon::parse($query->fecha_nacimiento)->age;
            else
                $query->edad = null;
        });

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Registro de visita encontrado con exito",
                'result' => $visita->first()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Visita  $visita
     * @return \Illuminate\Http\Response
     */
    public function edit(Visita $visita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Visita  $visita
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Visita $visita)
    {
        $validator = Validator::make($request->all(), [
            'id_persona' => 'integer',
            'id_motivo' => 'integer',
            'entrada' => 'date_format:H:i|before:tomorrow',
            'salida' => 'nullable|date_format:H:i|after:entrada',
            'llamadas' => 'integer',
            'id_dependencia' => 'integer',
            'id_funcionario' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $visita->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Registro de visita actualizado con exito",
            'result' => $visita
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Visita  $visita
     * @return \Illuminate\Http\Response
     */
    public function destroy(Visita $visita)
    {
        $visita->delete();

        return $this->respondSuccess('Registro de visita eliminado con exito');
    }
}
