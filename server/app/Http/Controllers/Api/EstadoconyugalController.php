<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\estadoconyugal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EstadoconyugalController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estadoconyugal = estadoconyugal::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de estados conyugales",
                'result' => $estadoconyugal
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
     * @param  \App\estadoconyugal  $estadoconyugal
     * @return \Illuminate\Http\Response
     */
    public function show(estadoconyugal $estadoconyugal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\estadoconyugal  $estadoconyugal
     * @return \Illuminate\Http\Response
     */
    public function edit(estadoconyugal $estadoconyugal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\estadoconyugal  $estadoconyugal
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, estadoconyugal $estadoconyugal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\estadoconyugal  $estadoconyugal
     * @return \Illuminate\Http\Response
     */
    public function destroy(estadoconyugal $estadoconyugal)
    {
        //
    }
}
