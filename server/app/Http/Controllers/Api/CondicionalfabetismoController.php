<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\condicionalfabetismo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CondicionalfabetismoController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $condicionalfabetismo = condicionalfabetismo::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de condicion de analfabetismo",
                'result' => $condicionalfabetismo
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
     * @param  \App\condicionalfabetismo  $condicionalfabetismo
     * @return \Illuminate\Http\Response
     */
    public function show(condicionalfabetismo $condicionalfabetismo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\condicionalfabetismo  $condicionalfabetismo
     * @return \Illuminate\Http\Response
     */
    public function edit(condicionalfabetismo $condicionalfabetismo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\condicionalfabetismo  $condicionalfabetismo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, condicionalfabetismo $condicionalfabetismo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\condicionalfabetismo  $condicionalfabetismo
     * @return \Illuminate\Http\Response
     */
    public function destroy(condicionalfabetismo $condicionalfabetismo)
    {
        //
    }
}
