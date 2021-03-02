<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Via;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ViaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vias = Via::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de vias de solicitud",
                'result' => $vias
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
            'slug' => 'string|unique:tc_via',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $via = Via::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Via de solicitud creado con exito",
            'result' => $via
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Via  $via
     * @return \Illuminate\Http\Response
     */
    public function show(Via $via)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Via de solicitud encontrado",
                'result' => $via
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Via  $via
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Via $via)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $via->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Via de solicitud actualizado con exito",
            'result' => $via
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Via  $via
     * @return \Illuminate\Http\Response
     */
    public function destroy(Via $via)
    {
        $via->delete();

        return $this->respondSuccess('Via de solicitud eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $via = Via::withTrashed()->findorfail($id);
        $via->restore();

        return $this->respondSuccess('Via de solicitud restaurada con exito');
    }
}
