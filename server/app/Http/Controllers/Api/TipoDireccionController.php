<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\TipoDireccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TipoDireccionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiposDireccion = TipoDireccion::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del tipo de direccion",
                'result' => $tiposDireccion
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
            'slug' => 'string|unique:tc_tipo_direccion',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $tipodireccion = TipoDireccion::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del tipo de direccion creado con exito",
            'result' => $tipodireccion
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TipoDireccion  $tipoDireccion
     * @return \Illuminate\Http\Response
     */
    public function show(TipoDireccion $tipoDireccion)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del tipo de direccion encontrado",
                'result' => $tipoDireccion
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TipoDireccion  $tipoDireccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoDireccion $tipoDireccion)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $tipoDireccion->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación del tipo de direccion actualizado con exito",
            'result' => $tipoDireccion
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TipoDireccion  $tipoDireccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoDireccion $tipoDireccion)
    {
        $tipoDireccion->delete();

        return $this->respondSuccess('Clasificación del tipo de direccion eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\TipoDireccion  $tipoDireccion
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $tipodireccion = TipoDireccion::withTrashed()->findorfail($id);
        $tipodireccion->restore();

        return $this->respondSuccess('Clasificación del tipo de direccion restaurado con exito');
    }
}
