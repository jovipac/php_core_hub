<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Departamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartamentoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $departamentos = Departamento::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de departamentos",
                'result' => $departamentos
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
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $departamento = Departamento::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Departamento creado con exito",
            'result' => $departamento
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function show(Departamento $departamento)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Departamento encontrado",
                'result' => $departamento
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Departamento $departamento)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $departamento->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Departamento actualizado con exito",
            'result' => $departamento
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Departamento  $departamento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Departamento $departamento)
    {
        $departamento->delete();

        return $this->respondSuccess('Departamento eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Departamento  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $departamento = Departamento::withTrashed()->findorfail($id);
        $departamento->restore();

        return $this->respondSuccess('Departamento restaurado con exito');
    }
}
