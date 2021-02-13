<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Visita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
    public function create()
    {
        //
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
            'id_persona' => 'required|integer',
            'id_motivo' => 'required|integer',
            'entrada' => 'date_format:H:i|before:tomorrow',
            'salida' => 'nullable|date_format:H:i|after:entrada',
            'llamadas' => 'integer',
            'id_dependencia' => 'required|integer',
            'id_funcionario' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
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
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Registro de visita encontrado con exito",
                'result' => $visita
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
