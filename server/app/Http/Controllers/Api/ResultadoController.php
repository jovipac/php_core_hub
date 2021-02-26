<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Resultado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResultadoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resultados = Resultado::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del resultado",
                'result' => $resultados
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
            'slug' => 'nullable|string|unique:tc_resultado',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $resultado = Resultado::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del resultado creado con exito",
            'result' => $resultado
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Resultado  $resultado
     * @return \Illuminate\Http\Response
     */
    public function show(Resultado $resultado)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del resultado encontrado",
                'result' => $resultado
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Resultado  $resultado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Resultado $resultado)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $resultado->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación del resultado actualizado con exito",
            'result' => $resultado
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Resultado  $resultado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resultado $resultado)
    {
        $resultado->delete();

        return $this->respondSuccess('Clasificación del resultado eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Resultado  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $resultado = Resultado::withTrashed()->findorfail($id);
        $resultado->restore();

        return $this->respondSuccess('Clasificación del resultado restaurado con exito');
    }
}
