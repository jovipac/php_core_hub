<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\ComunidadLinguistica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ComunidadLinguisticaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comunidad_linguisticas = ComunidadLinguistica::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de comunidades linguisticas",
                'result' => $comunidad_linguisticas
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
            'id_etnia' => 'required|integer',
            'nombre' => 'required|unique:tc_comunidad_linguistica',
            'descripcion' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $comunidad_linguistica = ComunidadLinguistica::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Comunidad linguistica creado con exito",
            'result' => $comunidad_linguistica
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ComunidadLinguistica  $comunidad_linguistica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ComunidadLinguistica $comunidad_linguistica)
    {
        $validator = Validator::make($request->all(), [
            'id_etnia' => 'required|integer',
            'nombre' => 'nullable|string',
            'descripcion' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $comunidad_linguistica->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Comunidad linguistica actualizado con exito",
            'result' => $comunidad_linguistica
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ComunidadLinguistica  $comunidad_linguistica
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComunidadLinguistica $comunidad_linguistica)
    {
        $comunidad_linguistica->delete();

        return $this->respondSuccess('Comunidad linguistica eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ComunidadLinguistica  $comunidad_linguistica
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = ComunidadLinguistica::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Comunidad linguistica restaurado con exito');
    }

}
