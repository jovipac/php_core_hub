<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\DocumentoIdentidad;
use App\Models\DocumentoIdentidadPersona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DocumentoIdentidadPersonaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documentoidentidades = DocumentoIdentidadPersona::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de documentos de identidad",
                'result' => $documentoidentidades
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_persona' => 'integer',
            'id_documento_identidad' => 'integer',
            'identificador' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $resSuccess = false;
        if ($request->has('identificador') && $request->filled('identificador')) {
            $resMessage = '';
            $documento = DocumentoIdentidad::select(
                'T01.id_persona',
                'T01.id_documento_identidad',
                'tc_documento_identidad.nombre AS nombre_documento',
                'T01.identificador',
            )
            ->join('tt_documento_identidad_persona AS T01', 'tc_documento_identidad.id_documento_identidad', 'T01.id_documento_identidad');

            if ($request->has('id_documento_identidad'))
                $documento = $documento->where('id_documento_identidad', $request->input('id_documento_identidad'));

            if ($request->has('id_persona'))
                $documento = $documento->where('id_persona', $request->input('id_persona'));

            if ($request->has('identificador'))
                $documento = $documento->where('identificador', 'like', '%' . $request->input('identificador') . '%');

            $documento = $documento->get();

            if (empty($documento) == false) {
                $resSuccess = true;
                $resMessage = "Identificador de la persona encontrada con exito.";
            } else {
                $resSuccess = false;
                $resMessage = "Identificador de la persona no encontrada, debe ingresar los datos manualmente.";
            }

            return $this->apiResponse(
                [
                    'success' => $resSuccess,
                    'message' => $resMessage,
                    'result' => $documento
                ]
            );
        } else {

            return $this->apiResponse(
                [
                    'success' => $resSuccess,
                    'message' => "Debe de especificar una identificación valida a buscar.",
                    'result' => []
                ]
            );
        }

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
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'required|integer',
            'identificador' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $documentoidentidadpersona = DocumentoIdentidadPersona::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Documento de identidad creado con exito",
            'result' => $documentoidentidadpersona
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DocumentoIdentidadPersona  $documentoIdentidadPersona
     * @return \Illuminate\Http\Response
     */
    public function show(DocumentoIdentidadPersona $documentoIdentidadPersona)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Documento de identidad encontrado",
                'result' => $documentoIdentidadPersona
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DocumentoIdentidadPersona  $documentoIdentidadPersona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocumentoIdentidadPersona $documentoIdentidadPersona)
    {
        $validator = Validator::make($request->all(), [
            'id_persona' => 'required|integer',
            'id_documento_identidad' => 'required|integer',
            'identificador' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $documentoIdentidadPersona->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Documento de identidad actualizado con exito",
            'result' => $documentoIdentidadPersona
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DocumentoIdentidadPersona  $documentoIdentidadPersona
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocumentoIdentidadPersona $documentoIdentidadPersona)
    {
        $documentoIdentidadPersona->delete();

        return $this->respondSuccess('Documento de identidad eliminado con exito');
    }
}
