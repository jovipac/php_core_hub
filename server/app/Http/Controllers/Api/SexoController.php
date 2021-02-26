<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Sexo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SexoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sexos = Sexo::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del sexo",
                'result' => $sexos
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
            'slug' => 'string|unique:tc_sexo',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $sexo = Sexo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del sexo creado con exito",
            'result' => $sexo
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sexo  $sexo
     * @return \Illuminate\Http\Response
     */
    public function show(Sexo $sexo)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del sexo encontrado",
                'result' => $sexo
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sexo  $sexo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sexo $sexo)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $sexo->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación del sexo actualizado con exito",
            'result' => $sexo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sexo  $sexo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sexo $sexo)
    {
        $sexo->delete();

        return $this->respondSuccess('Clasificación del sexo eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Sexo  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $sexo = Sexo::withTrashed()->findorfail($id);
        $sexo->restore();

        return $this->respondSuccess('Clasificación del sexo restaurado con exito');
    }

}
