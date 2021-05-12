<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteDocumento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteDocumentoController extends ApiController
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
            $expedienteDocumentos = ExpedienteDocumento::query()
                ->paginate($request->per_page);
        } else
            $expedienteDocumentos = ExpedienteDocumento::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de documentos de los expedientes",
                'result' => $expedienteDocumentos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $expedienteDocumento = ExpedienteDocumento::query()
            ->select('tt_expediente_documento.*', 'T01.nombre as nombre_tipo_documento', 'T02.username')
            ->leftJoin('tc_tipo_documento as T01', 'tt_expediente_documento.id_tipo_documento', 'T01.id_tipo_documento')
            ->join('ts_usuario as T02', 'tt_expediente_documento.created_by', 'T02.id_usuario')
            ->orderBy('created_at', 'desc');

        if ( $request->has('id_tipo_documento') && $request->filled('id_tipo_documento') ) {
            $expedienteDocumento->where('id_tipo_documento', $request->id_tipo_documento);
        }

        if ( $request->has('titulo') && $request->filled('titulo') ) {
            $expedienteDocumento->where('titulo', 'like', '%' . $request->input('titulo') . '%');
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Documento del expediente encontrado con exito",
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
            'id_expediente' => 'required|integer',
            'id_plantilla_documento' => 'nullable|integer',
            'titulo' => 'nullable|string',
            'texto' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteDocumento = ExpedienteDocumento::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Documento del expediente agregado con exito",
            'result' => $expedienteDocumento
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteDocumento  $expedienteDocumento
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteDocumento $expediente_documento)
    {
        $expedienteDocumento = ExpedienteDocumento::query()
            ->with('archivos_adjuntos')
            ->where('id_expediente_documento', $expediente_documento->id_expediente_documento)
            ->first();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Documento del expediente encontrado con exito",
                'result' => $expedienteDocumento
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteDocumento  $expedienteDocumento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteDocumento $expedienteDocumento)
    {
        $validator = Validator::make($request->all(), [
            'id_expediente_documento' => 'required|integer',
            'id_expediente' => 'nullable|integer',
            'id_plantilla_documento' => 'nullable|integer',
            'titulo' => 'nullable|string',
            'texto' => 'nullable|string',
            'observaciones' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $inputs = $request->except(['id_expediente_documento']);
        $newExpedienteDocumento = ExpedienteDocumento::create($inputs);

        return $this->respondCreated([
            'success' => true,
            'message' => "Documento del expediente actualizado con exito",
            'result' => $newExpedienteDocumento
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteDocumento  $expedienteDocumento
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteDocumento $expedienteDocumento)
    {
        $expedienteDocumento->delete();

        return $this->respondSuccess('Documento del expediente eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteDocumento  $expedienteDocumento
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expedienteDocumento = ExpedienteDocumento::withTrashed()->findorfail($id);
        $expedienteDocumento->restore();

        return $this->respondSuccess('Documento del expediente restaurado con exito');
    }

}
