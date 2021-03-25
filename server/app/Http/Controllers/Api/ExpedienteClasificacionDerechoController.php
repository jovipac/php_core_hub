<?php

namespace App\Http\Controllers\Api;

use App\Models\ExpedienteClasificacionDerecho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteClasificacionDerechoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::query()
                ->paginate($request->per_page);
        } else
            $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de expedientes",
                'result' => $ExpedienteClasificacionDerecho
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
            'nombre' => 'required|string',

        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $ExpedienteClasificacionDerecho = ExpedienteClasificacionDerecho::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Tipo vinculacion creado con exito",
            'result' => $ExpedienteClasificacionDerecho
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function edit(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteClasificacionDerecho  $expedienteClasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteClasificacionDerecho $expedienteClasificacionDerecho)
    {
        //
    }
}
