<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\ocupacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OcupacionController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ocupacion = ocupacion::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de discapacidades",
                'result' => $ocupacion
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
     * @param  \App\ocupacion  $ocupacion
     * @return \Illuminate\Http\Response
     */
    public function show(ocupacion $ocupacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ocupacion  $ocupacion
     * @return \Illuminate\Http\Response
     */
    public function edit(ocupacion $ocupacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ocupacion  $ocupacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ocupacion $ocupacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ocupacion  $ocupacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(ocupacion $ocupacion)
    {
        //
    }
}
