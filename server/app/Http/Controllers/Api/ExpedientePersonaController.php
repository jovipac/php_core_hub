<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedientePersona;
use App\Models\Entities\Persona;
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
        $validator = Validator::make($request->all(), [
            'id_expediente' => 'required|integer',
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'nullable|integer',
            'id_tipo_vinculacion' => 'nullable|integer',
            'flag_confidencial' => 'boolean',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedientePersona = ExpedientePersona::create($input);

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
        $persona = Persona::query()
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

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Persona en el expediente encontrado",
                'result' => $persona->first()
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
            ->select('tc_persona.*', 'T01.*', 'T02.nombre AS nombre_tipo_vinculacion')
            ->join('tt_expediente_persona AS T01', 'tc_persona.id_persona', 'T01.id_persona')
            ->leftJoin('tc_tipo_vinculacion AS T02', 'T01.id_tipo_vinculacion', 'T02.id_tipo_vinculacion');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $query->where('T01.id_expediente', $request->id_expediente);
        }
        if ( $request->has('id_persona') && $request->filled('id_persona') ) {
            $query->where('T01.id_persona', $request->id_persona);
        }

        $personas = $query->get()->map(function ($item) {
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
        $validator = Validator::make($request->all(), [
            'id_expediente' => 'required|integer',
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'nullable|integer',
            'id_tipo_vinculacion' => 'required|integer',
            'flag_confidencial' => 'nullable|boolean',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedientePersona->update($request->all());

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
