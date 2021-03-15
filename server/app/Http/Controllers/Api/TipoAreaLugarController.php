<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\TipoAreaLugar;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class TipoAreaLugarController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoAreaLugars = TipoAreaLugar::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de tipos de area del lugar",
                'result' => $tipoAreaLugars
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
            'slug' => 'nullable|string|unique:tc_resultado',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $tipoAreaLugar = TipoAreaLugar::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Tipo de area del lugar creado con exito",
            'result' => $tipoAreaLugar
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TipoAreaLugar  $tipoAreaLugar
     * @return \Illuminate\Http\Response
     */
    public function show(TipoAreaLugar $tipoAreaLugar)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Tipo de area del lugar encontrado",
                'result' => $tipoAreaLugar
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\TipoAreaLugar  $tipoAreaLugar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoAreaLugar $tipoAreaLugar)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $tipoAreaLugar->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Tipo de area del lugar actualizado con exito",
            'result' => $tipoAreaLugar
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TipoAreaLugar  $tipoAreaLugar
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoAreaLugar $tipoAreaLugar)
    {
        $tipoAreaLugar->delete();

        return $this->respondSuccess('Tipo de area del lugar eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\TipoAreaLugar  $estado
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $tipoAreaLugar = TipoAreaLugar::withTrashed()->findorfail($id);
        $tipoAreaLugar->restore();

        return $this->respondSuccess('Tipo de area del lugar restaurado con exito');
    }

}
