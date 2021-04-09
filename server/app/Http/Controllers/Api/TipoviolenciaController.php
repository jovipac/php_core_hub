<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\tipoviolencia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class TipoviolenciaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipoviolencia = tipoviolencia::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de tipo violencia",
                'result' => $tipoviolencia
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
     * @param  \App\tipoviolencia  $tipoviolencia
     * @return \Illuminate\Http\Response
     */
    public function show(tipoviolencia $tipoviolencia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\tipoviolencia  $tipoviolencia
     * @return \Illuminate\Http\Response
     */
    public function edit(tipoviolencia $tipoviolencia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\tipoviolencia  $tipoviolencia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, tipoviolencia $tipoviolencia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\tipoviolencia  $tipoviolencia
     * @return \Illuminate\Http\Response
     */
    public function destroy(tipoviolencia $tipoviolencia)
    {
        //
    }
}
