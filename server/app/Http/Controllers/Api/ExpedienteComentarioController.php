<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\ExpedienteComentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExpedienteComentarioController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->has('per_page') && $request->filled('per_page')) {
            $expedienteComentarios = ExpedienteComentario::query()
                ->paginate($request->per_page);
        } else
            $expedienteComentarios = ExpedienteComentario::all();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de comentarios de los expedientes",
                'result' => $expedienteComentarios
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
        $expedienteComentario = ExpedienteComentario::query()
            ->select('tt_expediente_comentario.*', 'T01.username AS username_created_by')
            ->join('ts_usuario AS T01', 'tt_expediente_comentario.created_by', 'T01.id_usuario')
            ->orderBy('created_at', 'desc');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $expedienteComentario->where('id_expediente', $request->id_expediente);
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Comentario encontrado con exito",
                'result' => $expedienteComentario->get()
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
            'fecha' => 'nullable|date',
            'comentario' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $expedienteComentario = ExpedienteComentario::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Comentario agregado con exito",
            'result' => $expedienteComentario
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedienteComentario  $expedienteComentario
     * @return \Illuminate\Http\Response
     */
    public function show(ExpedienteComentario $expediente_comentario)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Comentario encontrado con exito",
                'result' => $expediente_comentario
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ExpedienteComentario  $expedienteComentario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ExpedienteComentario $expediente_comentario)
    {
        $inputs = $request->all();
        $validator = Validator::make($inputs, [
            'id_expediente_comentario' => 'required|integer',
            'id_expediente' => 'nullable|integer',
            'fecha' => 'nullable|date',
            'comentario' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $expediente_comentario->update($inputs);

        return $this->apiResponse([
            'success' => true,
            'message' => "Comentario actualizado con exito",
            'result' => $expediente_comentario
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ExpedienteComentario  $expedienteComentario
     * @return \Illuminate\Http\Response
     */
    public function destroy(ExpedienteComentario $expediente_comentario)
    {
        $expediente_comentario->delete();

        return $this->respondSuccess('Comentario eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ExpedienteComentario  $expedienteComentario
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $expedienteComentario = ExpedienteComentario::withTrashed()->findorfail($id);
        $expedienteComentario->restore();

        return $this->respondSuccess('Comentario restaurado con exito');
    }

}
