<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\PersonaDiscapacidad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonaDiscapacidadController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personaDiscapacidad = PersonaDiscapacidad::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de discapacidades",
                'result' => $personaDiscapacidad
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PersonaDiscapacidad  $personaDiscapacidad
     * @return \Illuminate\Http\Response
     */
    public function show(PersonaDiscapacidad $personaDiscapacidad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PersonaDiscapacidad  $personaDiscapacidad
     * @return \Illuminate\Http\Response
     */
    public function edit(PersonaDiscapacidad $personaDiscapacidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PersonaDiscapacidad  $personaDiscapacidad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersonaDiscapacidad $personaDiscapacidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PersonaDiscapacidad  $personaDiscapacidad
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersonaDiscapacidad $personaDiscapacidad)
    {
        //
    }
}
