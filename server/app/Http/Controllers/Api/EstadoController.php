<?php

namespace App\Http\Controllers;

use App\Models\Catalogs\Estado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstadoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estados = Estado::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación del estado",
                'result' => $estados
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
            'slug' => 'string|unique:tc_estado',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $estado = Estado::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación del estado creado con exito",
            'result' => $estado
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function show(Estado $estado)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación del estado encontrado",
                'result' => $estado
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Estado $estado)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $estado->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Clasificación del estado actualizado con exito",
            'result' => $estado
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function destroy(Estado $estado)
    {
        $estado->delete();

        return $this->respondSuccess('Clasificación del estado eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Estado  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = Estado::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Clasificación del estado restaurado con exito');
    }
}
