<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\actividaddedica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ActividaddedicaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $actividaddedica = actividaddedica::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de actividades",
                'result' => $actividaddedica
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
     * @param  \App\actividaddedica  $actividaddedica
     * @return \Illuminate\Http\Response
     */
    public function show(actividaddedica $actividaddedica)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\actividaddedica  $actividaddedica
     * @return \Illuminate\Http\Response
     */
    public function edit(actividaddedica $actividaddedica)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\actividaddedica  $actividaddedica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, actividaddedica $actividaddedica)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\actividaddedica  $actividaddedica
     * @return \Illuminate\Http\Response
     */
    public function destroy(actividaddedica $actividaddedica)
    {
        //
    }
}
