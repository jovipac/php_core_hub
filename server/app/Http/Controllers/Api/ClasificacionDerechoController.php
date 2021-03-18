<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\ClasificacionDerecho;
use Illuminate\Http\Request;

class ClasificacionDerechoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clasificacionDerechos = ClasificacionDerecho::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de clasificacion de derechos",
                'result' => $clasificacionDerechos
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
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function show(ClasificacionDerecho $clasificacionDerecho)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function edit(ClasificacionDerecho $clasificacionDerecho)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ClasificacionDerecho  $clasificacionDerecho
     * @return \Illuminate\Http\Response
     */
    public function destroy(ClasificacionDerecho $clasificacionDerecho)
    {
        //
    }
}
