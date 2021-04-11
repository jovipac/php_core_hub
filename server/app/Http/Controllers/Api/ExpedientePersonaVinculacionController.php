<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedientePersonaVinculacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ExpedientePersonaVinculacionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedientePersonas = ExpedientePersonaVinculacion::query()
                ->paginate($request->per_page);
        } else
            $expedientePersonas = ExpedientePersonaVinculacion::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de personas en expedientes",
                'result' => $expedientePersonas
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
            'id_expediente_persona' => 'required|integer',
            'id_tipo_vinculacion' => [
                'nullable',
                'integer',
                Rule::unique('tt_expediente_persona')->where(function ($query) use ($request) {
                    return $query
                        ->where('id_expediente_persona', $request->id_expediente_persona)
                        ->where('id_tipo_vinculacion', $request->id_tipo_vinculacion);
                }),
            ],

        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedientePersonaVinculacion = ExpedientePersonaVinculacion::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Persona en el expediente creado con exito",
            'result' => $expedientePersonaVinculacion
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedientePersonaVinculacion  $expedientePersonaVinculacion
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedientePersonaVinculacion $expedientePersonaVinculacion)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Funcionario encontrado",
                'result' => $expedientePersonaVinculacion
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedientePersonaVinculacion  $expedientePersonaVinculacion
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $personas = ExpedientePersonaVinculacion::query()
            ->select('tt_expediente_persona_vinculacion.*', 'T02.nombre AS nombre_tipo_vinculacion')
            ->join('tt_expediente_persona AS T01', 'tt_expediente_persona_vinculacion.id_expediente_persona', 'T01.id_expediente_persona')
            ->leftJoin('tc_tipo_vinculacion AS T02', 'tt_expediente_persona_vinculacion.id_tipo_vinculacion', 'T02.id_tipo_vinculacion');

        if ( $request->has('id_expediente_persona') && $request->filled('id_expediente_persona') ) {
            $personas->where('T01.id_expediente_persona', $request->id_expediente_persona);
        }
        if ( $request->has('id_tipo_vinculacion') && $request->filled('id_tipo_vinculacion') ) {
            $personas->where('T01.id_tipo_vinculacion', $request->id_tipo_vinculacion);
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Persona en el expediente encontrado",
                'result' => $personas
            ]
        );
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedientePersonaVinculacion  $expedientePersonaVinculacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedientePersonaVinculacion $expedientePersonaVinculacion)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_persona' => 'nullable|integer',
            'id_tipo_vinculacion' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedientePersonaVinculacion->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Persona en el expediente actualizado con exito",
            'result' => $expedientePersonaVinculacion
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedientePersonaVinculacion  $expedientePersonaVinculacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedientePersonaVinculacion $expedientePersonaVinculacion)
    {
        $expedientePersonaVinculacion->delete();
        return $this->respondSuccess('Persona en el expediente eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedientePersonaVinculacion  $expedientePersonaVinculacion
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $via = ExpedientePersonaVinculacion::withTrashed()->findorfail($id);
        $via->restore();

        return $this->respondSuccess('Persona en el expediente restaurada con exito');
    }

}
