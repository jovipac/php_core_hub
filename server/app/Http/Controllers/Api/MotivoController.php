<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Motivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MotivoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $motivos = Motivo::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de motivos de visita",
                'result' => $motivos
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
            'nombre' => 'required|string',
            'slug' => 'string|unique:tc_motivo',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $motivo = Motivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Motivo de visita creado con exito",
            'result' => $motivo
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Motivo  $motivo
     * @return \Illuminate\Http\Response
     */
    public function show(Motivo $motivo)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Motivo de visita encontrado",
                'result' => $motivo
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Motivo  $motivo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Motivo $motivo)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $motivo->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Motivo de visita actualizado con exito",
            'result' => $motivo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Motivo  $motivo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Motivo $motivo)
    {
        $motivo->delete();

        return $this->respondSuccess('Motivo de visita eliminado con exito');
    }

        /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $motivo = Motivo::withTrashed()->findorfail($id);
        $motivo->restore();

        return $this->respondSuccess('Motivo de visita restaurada con exito');
    }
}

