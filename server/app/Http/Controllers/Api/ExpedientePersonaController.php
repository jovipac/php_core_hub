<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedientePersona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
                'message' => "Listado de expedientes",
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
            'id_tipo_vinculacion' => 'nullable|integer',
            'flag_confidencial' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedientePersona = ExpedientePersona::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Expediente creado con exito",
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
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Expediente encontrado",
                'result' => $expedientePersona
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
            'id_tipo_vinculacion' => 'required|integer',
            'flag_confidencial' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expedientePersona->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Expediente actualizado con exito",
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

        return $this->respondSuccess('Expediente eliminado con exito');
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

        return $this->respondSuccess('Expediente restaurada con exito');
    }
}
