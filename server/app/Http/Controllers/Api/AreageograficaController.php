<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\areageografica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class AreageograficaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areageografica = areageografica::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de areas geograficas",
                'result' => $areageografica
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
     * @param  \App\areageografica  $areageografica
     * @return \Illuminate\Http\Response
     */
    public function show(areageografica $areageografica)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\areageografica  $areageografica
     * @return \Illuminate\Http\Response
     */
    public function edit(areageografica $areageografica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\areageografica  $areageografica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, areageografica $areageografica)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\areageografica  $areageografica
     * @return \Illuminate\Http\Response
     */
    public function destroy(areageografica $areageografica)
    {
        //
    }
}
