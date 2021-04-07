<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Etnia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtniaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $etnias = Etnia::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificación de la etnia",
                'result' => $etnias
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
            'slug' => 'string|unique:tc_etnia',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $etnium = Etnia::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Clasificación de la etnia creado con exito",
            'result' => $etnium
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Etnia  $etnium
     * @return \Illuminate\Http\Response
     */
    public function show(Etnia $etnium)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Clasificación de la etnia encontrado",
                'result' => $etnium
            ]
        );
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Etnia  $etnium
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Etnia $etnium)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string',
            'slug' => 'string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $etnium->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Clasificación de la etnia actualizado con exito",
            'result' => $etnium
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Etnia  $etnium
     * @return \Illuminate\Http\Response
     */
    public function destroy(Etnia $etnium)
    {
        $etnium->delete();

        return $this->respondSuccess('Clasificación de la etnia eliminado con exito');
    }

        /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Etnia  $etnium
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = Etnia::withTrashed()->findorfail($id);
        $user->restore();

        return $this->respondSuccess('Clasificación de la etnia restaurado con exito');
    }
}
