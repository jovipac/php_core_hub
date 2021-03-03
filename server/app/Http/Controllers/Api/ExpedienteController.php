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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'anio' => 'required|integer',
            'folio' => 'integer',
            'fecha_ingreso' => 'required',
            'id_via' => 'required|integer',
            'id_prioridad' => 'required|integer',
            'id_funcionario' => 'required|integer',
            'observaciones' => 'string',
            'id_resultado' => 'nullable|integer',
            'id_auxiliatura' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expediente = Expediente::create($input);

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
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Expediente encontrado",
                'result' => $expediente
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
            'anio' => 'required|integer',
            'folio' => 'integer',
            'fecha_ingreso' => 'required',
            'id_via' => 'required|integer',
            'id_prioridad' => 'required|integer',
            'id_funcionario' => 'required|integer',
            'observaciones' => 'string',
            'id_resultado' => 'required|integer',
            'id_auxiliatura' => 'required|integer',
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
