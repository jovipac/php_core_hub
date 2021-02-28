<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\DocumentoIdentidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DocumentoIdentidadController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documentoidentidades = DocumentoIdentidad::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de documentos de identidad",
                'result' => $documentoidentidades
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
            'descripcion' => 'string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $documentoidentidad = DocumentoIdentidad::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Documento de identidad creado con exito",
            'result' => $documentoidentidad
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DocumentoIdentidad  $documentoIdentidad
     * @return \Illuminate\Http\Response
     */
    public function show(DocumentoIdentidad $documentoIdentidad)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Documento de identidad encontrado",
                'result' => $documentoIdentidad
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DocumentoIdentidad  $documentoIdentidad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentoIdentidad $documentoIdentidad)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'descripcion' => 'string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $documentoIdentidad->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Documento de identidad actualizado con exito",
            'result' => $documentoIdentidad
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DocumentoIdentidad  $documentoIdentidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentoIdentidad $documentoIdentidad)
    {
        $documentoIdentidad->delete();

        return $this->respondSuccess('Documento de identidad eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\DocumentoIdentidad  $documentoIdentidad
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = DocumentoIdentidad::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Documento de identidad restaurado con exito');
    }

}
