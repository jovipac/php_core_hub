<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Persona;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personas = Persona::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de personas",
                'result' => $personas
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        if ($request->has('cui')) {
            $persona = Persona::where('cui', 'like', '%' . $request->input('cui') . '%')->first();

            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Persona encontrada con exito",
                    'result' => $persona
                ]
            );
        } else {
            return $this->apiResponse(
                [
                    'success' => false,
                    'message' => "Persona no encontrada",
                    'result' => []
                ]
            );
        }

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
            'cui' => 'required|integer|unique:tc_persona',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'id_sexo' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $persona = Persona::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Persona agregada con exito",
            'result' => $persona
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function show(Persona $persona)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Persona encontrada con exito",
                'result' => $persona
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Persona $persona)
    {
        $validator = Validator::make($request->all(), [
            'cui' => 'required',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'id_sexo' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $persona->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Persona actualizada con exito",
            'result' => $persona
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function destroy(Persona $persona)
    {
        $persona->delete();

        return $this->respondSuccess('Persona eliminada con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Persona  $persona
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $persona = Persona::withTrashed()->findorfail($id);
        $persona->restore();

        return $this->respondSuccess('Persona restaurada con exito');
    }

}
