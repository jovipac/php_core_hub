<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\ClasificacionPlantilla;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ClasificacionPlantillaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        ClasificacionPlantilla::fixTree();
        $clasificacionPlantillas = ClasificacionPlantilla::all()->toTree();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificaciones de las plantillas",
                'result' => $clasificacionPlantillas
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

        if ($request->has('id_parent') && $request->filled('id_parent')) {
            $parent = ClasificacionPlantilla::find($request->input('id_parent'));
            $clasificacionPlantilla = ClasificacionPlantilla::create($input, $parent);
        } else {
            $clasificacionPlantilla = ClasificacionPlantilla::create($input);
        }

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación de la plantilla creado con exito",
            'result' => $clasificacionPlantilla
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ClasificacionPlantilla  $clasificacionPlantilla
     * @return \Illuminate\Http\Response
     */
    public function show(ClasificacionPlantilla $clasificacionPlantilla)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación de la plantilla encontrado",
                'result' => $clasificacionPlantilla
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ClasificacionPlantilla  $clasificacionPlantilla
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ClasificacionPlantilla $clasificacionPlantilla)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'nullable|string',
            'descripcion' => 'nullable|string',
            'id_parent' => 'nullable|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $clasificacionPlantilla->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación de la plantilla actualizado con exito",
            'result' => $clasificacionPlantilla
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClasificacionPlantilla  $clasificacionPlantilla
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClasificacionPlantilla $clasificacionPlantilla)
    {
        $clasificacionPlantilla->delete();

        return $this->respondSuccess('Clasificación de la plantilla eliminada con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\ClasificacionPlantilla  $integer
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $clasificacionPlantilla = ClasificacionPlantilla::withTrashed()->findorfail($id);
        $clasificacionPlantilla->restore();

        return $this->respondSuccess('Clasificación de la plantilla restaurada con exito');
    }

}
