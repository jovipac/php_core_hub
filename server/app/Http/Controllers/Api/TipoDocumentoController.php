<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\TipoDocumento;
use Illuminate\Http\Request;

class TipoDocumentoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tiposDocumento = TipoDocumento::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del tipo de documento",
                'result' => $tiposDocumento
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TipoDocumento  $tipo_documento
     * @return \Illuminate\Http\Response
     */
    public function show(TipoDocumento $tipo_documento)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del tipo de documento encontrado",
                'result' => $tipo_documento
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TipoDocumento  $tipo_documento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoDocumento $tipo_documento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TipoDocumento  $tipo_documento
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoDocumento $tipo_documento)
    {
        //
    }
}
