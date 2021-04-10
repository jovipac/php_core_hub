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
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $visitas = Visita::query()
                ->paginate($request->per_page);
        } else
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
        if ($request->has('id_auxiliatura') || $request->has('id_motivo') || $request->has('id_estado') ) {
            $list = Visita::query()
                ->select('tt_visita.id_visita', 'tt_visita.id_persona',
                'T01.nombres', 'T01.apellidos', 'T01.fecha_nacimiento', 'T01.telefono',
                'tt_visita.entrada', 'tt_visita.salida', 'tt_visita.id_funcionario', 'tt_visita.llamadas',
                'tt_visita.id_motivo', 'T02.nombre AS nombre_motivo',
                'tt_visita.id_dependencia', 'T03.nombre AS nombre_dependencia',
                'tt_visita.id_estado', 'T05.nombre AS nombre_estado',
                'tt_visita.id_prioridad', 'T07.nombre AS nombre_prioridad',
                'T04.nombres AS nombres_funcionario', 'T04.apellidos AS apellidos_funcionario'
                )
                ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
                ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
                ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
                ->leftJoin('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
                ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
                ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura')
                ->join('tc_prioridad AS T07', 'tt_visita.id_prioridad', 'T07.id_prioridad') ;

            if ($request->has('id_auxiliatura'))
                $list = $list->where('tt_visita.id_auxiliatura', $request->input('id_auxiliatura'));

            if ($request->has('id_motivo'))
                $list = $list->where('tt_visita.id_motivo', $request->input('id_motivo'));

            if ($request->has('id_estado'))
                $list = $list->where('tt_visita.id_estado', $request->input('id_estado'));

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
                'tt_visita.id_auxiliatura', 'T06.nombre AS nombre_auxiliatura', 'T07.nombre AS nombre_prioridad',
                'T04.nombres AS nombres_funcionario', 'T04.apellidos AS apellidos_funcionario'
                )
                ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
                ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
                ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
                ->leftJoin('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
                ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
                ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura')
                ->join('tc_prioridad AS T07', 'tt_visita.id_prioridad', 'T07.id_prioridad') ;

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
            'edad' => 'nullable|integer',
            'entrada' => 'required',
            'salida' => 'nullable|date_format:H:i',
            'llamadas' => 'integer',
            'id_dependencia' => 'required|integer',
            'id_funcionario' => 'nullable|integer',
            'id_auxiliatura' => 'required|integer',
            'id_prioridad' => 'required|integer',
            'id_estado' => 'nullable|integer',
            'institucion_trabaja' => 'nullable|string',
            'observaciones' => 'nullable|string',
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
        $query = Visita::query()
            ->select('tt_visita.id_visita', 'tt_visita.id_persona', 'T01.nombres', 'T01.apellidos',
            'T08.identificador', 'T08.id_documento_identidad', 'T09.nombre AS nombre_documento_identidad',
            'T01.telefono', 'T01.fecha_nacimiento', 'T01.id_sexo', 'T01.id_genero',
            'tt_visita.edad', 'tt_visita.entrada', 'tt_visita.salida', 'tt_visita.llamadas',
            'tt_visita.id_motivo', 'T02.nombre AS nombre_motivo',
            'tt_visita.id_dependencia', 'T03.nombre AS nombre_dependencia',
            'tt_visita.id_funcionario', 'T04.nombres AS nombres_funcionario', 'T04.apellidos AS apellidos_funcionario',
            'tt_visita.id_estado', 'T05.nombre AS nombre_estado',
            'tt_visita.id_auxiliatura', 'T06.nombre AS nombre_auxiliatura',
            'tt_visita.id_prioridad', 'T07.nombre AS nombre_prioridad',
            'tt_visita.observaciones'
            )
            ->join('tc_persona AS T01', 'tt_visita.id_persona', 'T01.id_persona')
            ->join('tc_motivo AS T02', 'tt_visita.id_motivo', 'T02.id_motivo')
            ->join('tc_dependencia AS T03', 'tt_visita.id_dependencia', 'T03.id_dependencia')
            ->leftJoin('tc_funcionario AS T04', 'tt_visita.id_funcionario', 'T04.id_funcionario')
            ->join('tc_estado AS T05', 'tt_visita.id_estado', 'T05.id_estado')
            ->join('tc_auxiliatura AS T06', 'tt_visita.id_auxiliatura', 'T06.id_auxiliatura')
            ->join('tc_prioridad AS T07', 'tt_visita.id_prioridad', 'T07.id_prioridad')
            ->leftJoin('tt_documento_identidad_persona AS T08', 'tt_visita.id_persona', 'T08.id_persona')
            ->leftJoin('tc_documento_identidad AS T09', 'T08.id_documento_identidad', 'T09.id_documento_identidad')
            ->where('tt_visita.id_visita', $visita->id_visita);
        /*
        $visita = $item->get()->each(function ($query) {
            if (!is_null($query->fecha_nacimiento ?? null))
                $query->edad = Carbon::parse($query->fecha_nacimiento)->age;
            else
                $query->edad = null;
        });
        */
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Registro de visita encontrado con exito",
                'result' => $query->first()
            ]
        );
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
            'edad' => 'nullable|integer',
            'entrada' => 'nullable|date',
            'salida' => 'nullable|date',
            'llamadas' => 'integer',
            'id_dependencia' => 'nullable|integer',
            'id_funcionario' => 'nullable|integer',
            'id_prioridad' => 'integer',
            'id_estado' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $visita->update($request->all());

        return $this->apiResponse([
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function trash(Request $request)
    {
        $users = Visita::onlyTrashed()
            ->orderBy('deleted_at', 'desc')->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado registro de visitas eliminados",
                'result' => $users
            ]
        );
    }

}
