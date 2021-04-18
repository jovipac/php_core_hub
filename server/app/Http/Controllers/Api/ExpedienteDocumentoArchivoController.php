<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteDocumentoArchivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ExpedienteDocumentoArchivoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteHechoArchivos = ExpedienteDocumentoArchivo::query()
                ->paginate($request->per_page);
        } else
            $expedienteHechoArchivos = ExpedienteDocumentoArchivo::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de pruebas adjunta de los documento",
                'result' => $expedienteHechoArchivos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        $inputs = $request->except(['file']);

        $fileName = $request->file('file')->getClientOriginalName();
        $extension = $request->file('file')->extension();
        $mime = $request->file('file')->getMimeType();
        $clientSize = $request->file('file')->getSize();
        $filePath = $request->file('file')->store('uploads');

        $expedienteDocumentoArchivo = [
            'params' => $inputs,
            'filename' =>  $fileName,
            'extension' =>  $extension,
            'path' =>  $filePath,
            'mime' => $mime,
            'size' => $clientSize
        ];

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Archivo adjunto del documento subido con exito",
                'result' => $expedienteDocumentoArchivo
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
            'id_expediente' => 'required|integer',
            'id_expediente_documento' => 'required|integer',
            'ubicacion' => 'string',
            'mime' => 'string',
            'nombre' => 'string',
            'tamanio' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteDocumentoArchivo = ExpedienteDocumentoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del documento agregada con exito",
            'result' => $expedienteDocumentoArchivo
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteDocumentoArchivo  $expediente_documento_archivo
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteDocumentoArchivo $expediente_documento_archivo)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Prueba adjunta del documento encontrado",
                'result' => $expediente_documento_archivo
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function download($id)
    {
        try {
            $expedienteDocumentoArchivo = ExpedienteDocumentoArchivo::find($id);

            $fullPath = Storage::disk('uploads')->url($expedienteDocumentoArchivo['ubicacion']);
            $generatedURI = url($fullPath);

            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Prueba adjunta del documento encontrado con exito",
                    'result' => [
                        'nombre' => $expedienteDocumentoArchivo['nombre'],
                        'url' => $generatedURI
                    ]
                ]
            );

        } catch (\Exception $exception) {
            return $this->respondError($exception->getMessage(), 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteDocumentoArchivo  $expedienteDocumentoArchivo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteDocumentoArchivo $expediente_documento_archivo)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_documento_prueba' => 'required|integer',
            'id_expediente' => 'nullable|integer',
            'id_expediente_documento' => 'nullable|integer',
            'ubicacion' => 'nullable|string',
            'nombre' => 'nullable|string',
            'tamanio' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expediente_documento_archivo = ExpedienteDocumentoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del documento actualizada con exito",
            'result' => $expediente_documento_archivo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteDocumentoArchivo  $expediente_documento_archivo
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteDocumentoArchivo $expediente_documento_archivo)
    {
        $expediente_documento_archivo->delete();

        return $this->respondSuccess('Prueba adjunta del documento eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteDocumentoArchivo  $expediente_documento_archivo
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expediente_documento_archivo = ExpedienteDocumentoArchivo::withTrashed()->findorfail($id);
        $expediente_documento_archivo->restore();

        return $this->respondSuccess('Prueba adjunta del documento restaurada con exito');
    }

}
