<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Dependencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DependenciaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function searchBy(Request $request)
    {
        if ($request->has('nombre')) {
            $term = $request->input('nombre');
            $dependencias = Dependencia::where('nombre', 'like', '%'. $term . '%')
                ->with('puestos')
                ->get();
            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de menus",
                    'result' => $dependencias
                ]
            );
        } else {
            $dependencias = Dependencia::with('puestos')->get();
            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de dependencias",
                    'result' => $dependencias
                ]
            );
        }
    }

        /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dependencias = Dependencia::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de dependencias",
                'result' => $dependencias
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
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $dependencia = Dependencia::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Dependencia creada con exito",
            'result' => $dependencia
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dependencia  $dependencia
     * @return \Illuminate\Http\Response
     */
    public function show(Dependencia $dependencia)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Dependencia encontrada",
                'result' => $dependencia
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dependencia  $dependencia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dependencia $dependencia)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $dependencia->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Dependencia actualizada con exito",
            'result' => $dependencia
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dependencia  $dependencia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dependencia $dependencia)
    {
        $dependencia->delete();

        return $this->respondSuccess('Dependencia eliminada con exito');
    }
}
