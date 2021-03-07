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
        //$personas = Persona::all();
        $personas = Persona::with('documentos_identidad')->get();

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
        $validator = Validator::make($request->all(), [
            'id_documento_identidad' => 'required|integer',
            'identificador' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $resSuccess = false;
        if ($request->has('identificador')) {
            $resMessage = '';
            $persona = Persona::query()
            ->join('tt_documento_identidad_persona AS T01', 'tc_persona.id_persona', 'T01.id_persona')
            ->join('tc_documento_identidad AS T02', 'T01.id_documento_identidad', 'T02.id_documento_identidad');

            if ($request->has('identificador'))
                $persona = $persona->where('T01.identificador', 'like', '%' . $request->input('identificador') . '%');

            $persona = $persona->first();

            if (empty($persona) == false) {
                $resSuccess = true;
                $resMessage = "Identificador de la persona encontrada con exito.";
            } else {
                $resSuccess = false;
                $resMessage = "Identificador de la persona no encontrada, debe ingresar los datos manualmente.";
            }

            return $this->apiResponse(
                [
                    'success' => $resSuccess,
                    'message' => $resMessage,
                    'result' => $persona
                ]
            );
        } else {
            return $this->apiResponse(
                [
                    'success' => $resSuccess,
                    'message' => "Debe de especificar una identificación valida a buscar.",
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
            'id_documento_identidad' => 'required|integer',
            'identificador' => 'required|integer|unique:tt_documento_identidad_persona',
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'id_sexo' => 'required|integer',
            'id_genero' => 'required|integer',
            'fecha_nacimiento' => 'date',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $persona = Persona::create($input);

        if (
            ($request->has('id_documento_identidad') && $request->filled('id_documento_identidad')) &&
            ($request->has('identificador') && $request->filled('identificador'))
        ) {
            $persona->documentos_identidad()->attach($request->id_documento_identidad, ['identificador' => $request->identificador]);
        }

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
        $query = Persona::query()->with('documentos_identidad');

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Persona encontrada con exito",
                'result' => $query->first()
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
            'nombres' => 'required|string',
            'apellidos' => 'required|string',
            'id_sexo' => 'integer',
            'id_genero' => 'integer',
            'fecha_nacimiento' => 'date',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $persona->update($request->all());

        return $this->apiResponse([
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
