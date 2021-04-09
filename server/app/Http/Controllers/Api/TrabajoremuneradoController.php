<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\trabajoremunerado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrabajoremuneradoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trabajoremunerado = trabajoremunerado::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de trabajos remunerados",
                'result' => $trabajoremunerado
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
     * @param  \App\trabajoremunerado  $trabajoremunerado
     * @return \Illuminate\Http\Response
     */
    public function show(trabajoremunerado $trabajoremunerado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\trabajoremunerado  $trabajoremunerado
     * @return \Illuminate\Http\Response
     */
    public function edit(trabajoremunerado $trabajoremunerado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\trabajoremunerado  $trabajoremunerado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, trabajoremunerado $trabajoremunerado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\trabajoremunerado  $trabajoremunerado
     * @return \Illuminate\Http\Response
     */
    public function destroy(trabajoremunerado $trabajoremunerado)
    {
        //
    }
}
