<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Puesto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PuestoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $puestos = Puesto::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de puestos",
                'result' => $puestos
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
            'id_dependencia' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $puesto = Puesto::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Puesto creado con exito",
            'result' => $puesto
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function show(Puesto $puesto)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Puesto encontrado",
                'result' => $puesto
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Puesto $puesto)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'id_dependencia' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $puesto->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Puesto actualizado con exito",
            'result' => $puesto
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Puesto  $puesto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Puesto $puesto)
    {
        $puesto->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
