<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\PersonaDireccion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonaDireccionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personadireccion = PersonaDireccion::with('modulos')->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de direcciones de las personas",
                'result' => $personadireccion
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'id_persona' => 'required|integer',
            'id_tipo_direccion' => 'nullable|integer',
            'id_departamento' => 'required|integer',
            'id_municipio' => 'required|integer',
            'direccion' => 'nullable|string',
            'comentarios' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $puesto = PersonaDireccion::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Puesto creado con exito",
            'result' => $puesto
        ]);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PersonaDireccion  $personaDireccion
     * @return \Illuminate\Http\Response
     */
    public function show(PersonaDireccion $personaDireccion)
    {
        $direccion = PersonaDireccion::query()
        ->select('tc_persona_direccion.*', 'T01.nombre AS nombre_tipo_direccion',
            'T02.nombre AS nombre_departamento', 'T03.nombre AS nombre_municipio',
        )
        ->leftJoin('tc_tipo_direccion AS T01', 'tc_persona_direccion.id_tipo_direccion', 'T01.id_tipo_direccion')
        ->leftJoin('tc_departamento AS T02', 'tc_persona_direccion.id_departamento', 'T02.id_departamento')
        ->leftJoin('tc_municipio AS T03', 'tc_persona_direccion.id_municipio', 'T03.id_municipio')
        ->where('tc_persona_direccion.id_persona_direccion', $personaDireccion->id_persona_direccion);

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Direccion de la persona encontrada",
                'result' => $direccion->first()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PersonaDireccion  $personaDireccion
     * @return \Illuminate\Http\Response
     */
    public function edit(PersonaDireccion $personaDireccion)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ExpedientePersona  $expedientePersona
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $persona = PersonaDireccion::query()
            ->select('tc_persona_direccion.*', 'T01.nombre AS nombre_tipo_direccion',
                'T02.nombre AS nombre_departamento', 'T03.nombre AS nombre_municipio',
            )
            ->leftJoin('tc_tipo_direccion AS T01', 'tc_persona_direccion.id_tipo_direccion', 'T01.id_tipo_direccion')
            ->leftJoin('tc_departamento AS T02', 'tc_persona_direccion.id_departamento', 'T02.id_departamento')
            ->leftJoin('tc_municipio AS T03', 'tc_persona_direccion.id_municipio', 'T03.id_municipio');

        if ( $request->has('direccion') && $request->filled('direccion') ) {
            $persona = $persona->where('tc_persona_direccion.direccion', 'like', '%' . $request->input('direccion') . '%');
        }
        if ( $request->has('id_persona') && $request->filled('id_persona') ) {
            $persona->where('tc_persona_direccion.id_persona', $request->input('id_persona'));
        }

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Direccion de la persona encontrada",
                'result' => $persona->get()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PersonaDireccion  $personaDireccion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonaDireccion $personaDireccion)
    {
        $validator = Validator::make($request->all(), [
            'id_persona' => 'required|integer',
            'id_tipo_direccion' => 'nullable|integer',
            'id_departamento' => 'required|integer',
            'id_municipio' => 'required|integer',
            'direccion' => 'nullable|string',
            'comentarios' => 'nullable|string',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $personaDireccion->update($request->all());

        return $this->apiResponse([
            'success' => true,
            'message' => "Puesto actualizado con exito",
            'result' => $personaDireccion
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PersonaDireccion  $personaDireccion
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonaDireccion $personaDireccion)
    {
        $personaDireccion->delete();

        return $this->respondSuccess('Via de solicitud eliminado con exito');
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Via $via
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $personaDireccion = PersonaDireccion::withTrashed()->findorfail($id);
        $personaDireccion->restore();

        return $this->respondSuccess('Via de solicitud restaurada con exito');
    }
}
