<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteHechoArchivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class ExpedienteHechoArchivoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteHechoArchivos = ExpedienteHechoArchivo::query()
                ->paginate($request->per_page);
        } else
            $expedienteHechoArchivos = ExpedienteHechoArchivo::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de pruebas adjunta del hechos",
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

        $expedienteHechoArchivo = [
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
                'message' => "Archivo adjunto del hecho subido con exito",
                'result' => $expedienteHechoArchivo
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
            'id_expediente_hecho' => 'required|integer',
            'ubicacion' => 'string',
            'mime' => 'string',
            'nombre' => 'string',
            'tamanio' => 'integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteHechoArchivo = ExpedienteHechoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho agregada con exito",
            'result' => $expedienteHechoArchivo
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteHechoArchivo  $expediente_hecho_archivo
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteHechoArchivo $expediente_hecho_archivo)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Prueba adjunta del hecho encontrado",
                'result' => $expediente_hecho_archivo
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
            $expedienteHechoArchivo = ExpedienteHechoArchivo::find($id);

            $fullPath = Storage::disk('uploads')->url($expedienteHechoArchivo['ubicacion']);
            $generatedURI = url($fullPath);

            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Prueba adjunta del hecho encontrado con exito",
                    'result' => [
                        'nombre' => $expedienteHechoArchivo['nombre'],
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
     * @param  \App\ExpedienteHechoArchivo  $expediente_hecho_archivo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteHechoArchivo $expediente_hecho_archivo)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_hecho_archivo' => 'required|integer',
            'id_expediente' => 'nullable|integer',
            'id_expediente_hecho' => 'nullable|integer',
            'ubicacion' => 'nullable|string',
            'nombre' => 'nullable|string',
            'tamanio' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expediente_hecho_archivo = ExpedienteHechoArchivo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Prueba adjunta del hecho actualizada con exito",
            'result' => $expediente_hecho_archivo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoArchivo  $expediente_hecho_archivo
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteHechoArchivo $expediente_hecho_archivo)
    {
        $expediente_hecho_archivo->delete();

        return $this->respondSuccess('Prueba adjunta del hecho eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteHechoArchivo  $expediente_hecho_archivo
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expediente_hecho_archivo = ExpedienteHechoArchivo::withTrashed()->findorfail($id);
        $expediente_hecho_archivo->restore();

        return $this->respondSuccess('Prueba adjunta del hecho restaurada con exito');
    }
}
