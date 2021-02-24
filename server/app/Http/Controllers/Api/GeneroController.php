<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Genero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GeneroController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $generos = Genero::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del genero",
                'result' => $generos
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
            'slug' => 'string|unique:tc_genero',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $genero = Genero::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del genero creado con exito",
            'result' => $genero
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Genero  $genero
     * @return \Illuminate\Http\Response
     */
    public function show(Genero $genero)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del genero encontrado",
                'result' => $genero
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Genero  $genero
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Genero $genero)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $genero->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación del genero actualizado con exito",
            'result' => $genero
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Genero  $genero
     * @return \Illuminate\Http\Response
     */
    public function destroy(Genero $genero)
    {
        $genero->delete();

        return $this->respondSuccess('Clasificación del genero eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Genero  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $genero = Genero::withTrashed()->findorfail($id);
        $genero->restore();

        return $this->respondSuccess('Clasificación del genero restaurado con exito');
    }

}
