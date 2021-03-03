<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Municipio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MunicipioController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $municipios = Municipio::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de municipios de los departamentos",
                'result' => $municipios
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
            'id_departamento' => 'required|integer',
            'nombre' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $municipio = Municipio::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Municipio del departamento creado con exito",
            'result' => $municipio
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Municipio  $municipio
     * @return \Illuminate\Http\Response
     */
    public function show(Municipio $municipio)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Municipio del departamento encontrado",
                'result' => $municipio
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Municipio  $municipio
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Municipio $municipio)
    {
        $validator = Validator::make($request->all(), [
            'id_departamento' => 'required|integer',
            'nombre' => 'required|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $municipio->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Municipio del departamento actualizado con exito",
            'result' => $municipio
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Municipio  $municipio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Municipio $municipio)
    {
        $municipio->delete();

        return $this->respondSuccess('Municipio eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Municipio  $integer
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $municipio = Municipio::withTrashed()->findorfail($id);
        $municipio->restore();

        return $this->respondSuccess('Municipio restaurada con exito');
    }
}
