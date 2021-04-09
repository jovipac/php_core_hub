<?php

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\relacionvicagre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RelacionvicagreController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $relacionvicagre = relacionvicagre::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de relacion con agresor",
                'result' => $relacionvicagre
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
     * @param  \App\relacionvicagre  $relacionvicagre
     * @return \Illuminate\Http\Response
     */
    public function show(relacionvicagre $relacionvicagre)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\relacionvicagre  $relacionvicagre
     * @return \Illuminate\Http\Response
     */
    public function edit(relacionvicagre $relacionvicagre)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\relacionvicagre  $relacionvicagre
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, relacionvicagre $relacionvicagre)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\relacionvicagre  $relacionvicagre
     * @return \Illuminate\Http\Response
     */
    public function destroy(relacionvicagre $relacionvicagre)
    {
        //
    }
}
