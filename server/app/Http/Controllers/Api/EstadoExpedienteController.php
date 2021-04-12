<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\EstadoExpediente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstadoExpedienteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estadosExpediente = EstadoExpediente::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del estado expediente",
                'result' => $estadosExpediente
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
            'descripcion' => 'nullable|string',
            'slug' => 'string|unique:tc_estado_expediente',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $estadoExpediente = EstadoExpediente::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del estado expediente creado con exito",
            'result' => $estadoExpediente
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\EstadoExpediente  $estadoExpediente
     * @return \Illuminate\Http\Response
     */
    public function show(EstadoExpediente $estadoExpediente)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del estado expediente encontrado",
                'result' => $estadoExpediente
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\EstadoExpediente  $estadoExpediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EstadoExpediente $estadoExpediente)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'descripcion' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $estadoExpediente->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación del estado expediente actualizado con exito",
            'result' => $estadoExpediente
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\EstadoExpediente  $estadoExpediente
     * @return \Illuminate\Http\Response
     */
    public function destroy(EstadoExpediente $estadoExpediente)
    {
        $estadoExpediente->delete();

        return $this->respondSuccess('Clasificación del estado expediente eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\EstadoExpediente  $estadoExpediente
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = EstadoExpediente::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Clasificación del estado expediente restaurado con exito');
    }

}
