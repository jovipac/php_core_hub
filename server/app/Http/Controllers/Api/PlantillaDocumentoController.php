<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\PlantillaDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlantillaDocumentoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resultados = PlantillaDocumento::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de plantillas de documentos",
                'result' => $resultados
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        $resultados = PlantillaDocumento::query()
        ->select(
            'titulo AS title',
            'texto AS content',
        )
        ->orderBy('created_at', 'desc');

        return response()->json($resultados);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $expedienteDocumento = PlantillaDocumento::query()->orderBy('created_at', 'desc');

        if ( $request->has('id_clasificacion_plantilla ') && $request->filled('id_clasificacion_plantilla ') ) {
            $expedienteDocumento->where('id_clasificacion_plantilla ', $request->id_clasificacion_plantilla );
        }

        if ( $request->has('titulo') && $request->filled('titulo') ) {
            $expedienteDocumento->where('titulo', 'like', '%' . $request->input('titulo') . '%');
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Plantilla del documento encontrado con exito",
                'result' => $expedienteDocumento->get()
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
            'titulo' => 'required|string',
            'texto' => 'nullable|string',
            'id_clasificacion_plantilla ' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $plantillaDocumento = PlantillaDocumento::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Plantilla del documento creado con exito",
            'result' => $plantillaDocumento
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PlantillaDocumento  $plantilla_documento
     * @return \Illuminate\Http\Response
     */
    public function show(PlantillaDocumento $plantilla_documento)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Plantilla del documento encontrado",
                'result' => $plantilla_documento
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PlantillaDocumento  $plantilla_documento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PlantillaDocumento $plantilla_documento)
    {
        $validator = Validator::make($request->all(), [
            'titulo' => 'required|string',
            'texto' => 'nullable|string',
            'id_clasificacion_plantilla ' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $plantilla_documento->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Plantilla del documento actualizado con exito",
            'result' => $plantilla_documento
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PlantillaDocumento  $plantilla_documento
     * @return \Illuminate\Http\Response
     */
    public function destroy(PlantillaDocumento $plantilla_documento)
    {
        $plantilla_documento->delete();

        return $this->respondSuccess('Plantilla del documento eliminado con exito');

    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\PlantillaDocumento  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $plantillaDocumento = PlantillaDocumento::withTrashed()->findorfail($id);
        $plantillaDocumento->restore();

        return $this->respondSuccess('Plantilla del documento restaurado con exito');
    }

}
