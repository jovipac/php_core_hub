<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\ClasificacionDerecho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClasificacionDerechoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        ClasificacionDerecho::fixTree();
        $clasificacionDerechos = ClasificacionDerecho::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación de los derechos",
                'result' => $clasificacionDerechos
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $clasificacionDerecho = ClasificacionDerecho::query()
        ->select('tc_clasificacion_derecho.id_clasificacion_derecho', 'tc_clasificacion_derecho.nombre', 'tc_clasificacion_derecho.descripcion',
        'tc_clasificacion_derecho.order', 'tc_clasificacion_derecho.id_parent', 'T01.nombre AS nombre_padre')
        ->leftJoin('tc_clasificacion_derecho AS T01', 'tc_clasificacion_derecho.id_parent', 'T02.clasificacion_derecho');

        if ( $request->has('id_expediente') && $request->filled('id_expediente') ) {
            $clasificacionDerecho->where('tc_clasificacion_derecho.id_expediente', $request->input('id_expediente'));
        }
        if ( $request->has('nombre') && $request->filled('nombre') ) {
            $clasificacionDerecho->where('tc_clasificacion_derecho.nombre', 'like', '%' . $request->input('nombre') . '%');
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificacion del derecho encontrado",
                'result' => $clasificacionDerecho->get()
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
            'descripcion' => 'nullable|string',
            'id_parent' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $clasificacionDerecho = ClasificacionDerecho::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificacion del derecho creado con exito",
            'result' => $clasificacionDerecho
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function show(ClasificacionDerecho $clasificacionDerecho)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificacion del derecho encontrado",
                'result' => $clasificacionDerecho
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClasificacionDerecho $clasificacionDerecho)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'nullable|string',
            'descripcion' => 'nullable|string',
            'id_parent' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $clasificacionDerecho->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificacion del derecho actualizado con exito",
            'result' => $clasificacionDerecho
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClasificacionDerecho $clasificacionDerecho)
    {
        $clasificacionDerecho->delete();

        return $this->respondSuccess('Clasificacion del derecho eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ClasificacionDerecho  $integer
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $clasificacionDerecho = ClasificacionDerecho::withTrashed()->findorfail($id);
        $clasificacionDerecho->restore();

        return $this->respondSuccess('Clasificacion del derecho restaurada con exito');
    }

}
