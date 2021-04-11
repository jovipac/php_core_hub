<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedientePersona;
use App\Models\Entities\Persona;
use App\Models\ExpedientePersonaVinculacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Helpers\UtilsHelper;

class ExpedientePersonaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedientePersonas = ExpedientePersona::query()
                ->paginate($request->per_page);
        } else
            $expedientePersonas = ExpedientePersona::all();

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
        $inputs = $request->except(['id_tipo_vinculacion']);
        $validator = Validator::make($inputs, [
            'id_expediente' => 'required|integer',
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'nullable|integer',
            'flag_confidencial' => 'boolean',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedientePersona = ExpedientePersona::create($inputs);

        if ($request->has('id_tipo_vinculacion') && $request->filled('id_tipo_vinculacion')) {
            $expedientePersona->tipos_vinculacion()->sync($request->id_tipo_vinculacion);
        }

        return $this->respondCreated([
            'success' => true,
            'message' => "Persona en el expediente creado con exito",
            'result' => $expedientePersona
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedientePersona $expedientePersona)
    {
        $query = Persona::query()
            ->select('tc_persona.*', 'T01.*', 'T02.nombre AS nombre_tipo_vinculacion',
                'T01.id_documento_identidad', 'T03.identificador')
            ->join('tt_expediente_persona AS T01', 'tc_persona.id_persona', 'T01.id_persona')
            ->leftJoin('tc_tipo_vinculacion AS T02', 'T01.id_tipo_vinculacion', 'T02.id_tipo_vinculacion')
            ->leftJoin('tt_documento_identidad_persona AS T03', function ($join) {
                $join->on('T03.id_persona', '=', 'tc_persona.id_persona')
                    ->on('T03.id_documento_identidad', '=', 'T01.id_documento_identidad');
            })
            ->with('direcciones')
            ->where('T01.id_expediente_persona', $expedientePersona->id_expediente_persona);

        //Se extrae los ID de los tipos de vinculacion de la persona del expediente
        $queryPersonaTipoVinculacion = ExpedientePersonaVinculacion::query()
            ->select('tt_expediente_persona_vinculacion.id_expediente_persona_vinculacion', 'tt_expediente_persona_vinculacion.id_expediente_persona',
                'tt_expediente_persona_vinculacion.id_tipo_vinculacion','T01.nombre AS nombre_tipo_vinculacion')
            ->leftJoin('tc_tipo_vinculacion AS T01', 'tt_expediente_persona_vinculacion.id_tipo_vinculacion', 'T01.id_tipo_vinculacion')
            ->where('tt_expediente_persona_vinculacion.id_expediente_persona', $expedientePersona->id_expediente_persona);
        $tipos_vinculacion = $queryPersonaTipoVinculacion->get()->all();
        $persona = $query->first();

        $persona['id_tipo_vinculacion'] = $tipos_vinculacion;


        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Persona en el expediente encontrado",
                'result' => $persona
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $query = Persona::query()
            ->select('tc_persona.*', 'T01.*')
            ->join('tt_expediente_persona AS T01', 'tc_persona.id_persona', 'T01.id_persona');


        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $query->where('T01.id_expediente', $request->id_expediente);
        }
        if ( $request->has('id_persona') && $request->filled('id_persona') ) {
            $query->where('T01.id_persona', $request->id_persona);
        }

        $personas = $query->get()->map(function ($item) {
            //Se extrae los ID de los tipos de vinculacion de la persona del expediente
            $queryPersonaTipoVinculacion = ExpedientePersonaVinculacion::query()
                ->select('tt_expediente_persona_vinculacion.id_expediente_persona_vinculacion', 'tt_expediente_persona_vinculacion.id_expediente_persona',
                    'tt_expediente_persona_vinculacion.id_tipo_vinculacion','T01.nombre AS nombre_tipo_vinculacion')
                ->leftJoin('tc_tipo_vinculacion AS T01', 'tt_expediente_persona_vinculacion.id_tipo_vinculacion', 'T01.id_tipo_vinculacion')
                ->where('tt_expediente_persona_vinculacion.id_expediente_persona', $item['id_expediente_persona']);
            $tipos_vinculacion = $queryPersonaTipoVinculacion->get()->all();
            $item['id_tipo_vinculacion'] = $tipos_vinculacion;

            if ($item['flag_confidencial'] == true) {
                $item['nombres'] = UtilsHelper::stringToCensor($item['nombres']);
                $item['apellidos'] = UtilsHelper::stringToCensor($item['apellidos']);
            }
            return $item;
        });

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
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedientePersona $expedientePersona)
    {
        $inputs = $request->except(['id_tipo_vinculacion']);

        $validator = Validator::make($inputs, [
            'id_expediente' => 'required|integer',
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'nullable|integer',
            'flag_confidencial' => 'nullable|boolean',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedientePersona->update($inputs);

        if ($request->has('id_tipo_vinculacion') && $request->filled('id_tipo_vinculacion')) {
            $expedientePersona->tipos_vinculacion()->sync($request->id_tipo_vinculacion);
        }

        return $this->apiResponse([
            'success' => true,
            'message' => "Persona en el expediente actualizado con exito",
            'result' => $expedientePersona
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedientePersona $expedientePersona)
    {
        $expedientePersona->delete();
        return $this->respondSuccess('Persona en el expediente eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $via = ExpedientePersona::withTrashed()->findorfail($id);
        $via->restore();

        return $this->respondSuccess('Persona en el expediente restaurada con exito');
    }
}
