<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\escolaridad;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class EscolaridadController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $escolaridad = escolaridad::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de escolaridad",
                'result' => $escolaridad
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
     * @param  \App\escolaridad  $escolaridad
     * @return \Illuminate\Http\Response
     */
    public function show(escolaridad $escolaridad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\escolaridad  $escolaridad
     * @return \Illuminate\Http\Response
     */
    public function edit(escolaridad $escolaridad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\escolaridad  $escolaridad
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, escolaridad $escolaridad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\escolaridad  $escolaridad
     * @return \Illuminate\Http\Response
     */
    public function destroy(escolaridad $escolaridad)
    {
        //
    }
}
