<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Catalogs\Auxiliatura;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuxiliaturaController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auxiliaturas = Auxiliatura::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de auxiliaturas",
                'result' => $auxiliaturas
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
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();
        $auxiliatura = Auxiliatura::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Auxiliatura creada con exito",
            'result' => $auxiliatura
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Auxiliatura encontrada",
                'result' => $id
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Auxiliatura $auxiliatura)
    {
        $auxiliatura->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Auxiliatura actualizada con exito",
            'result' => $auxiliatura
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Auxiliatura $auxiliatura)
    {
        $auxiliatura->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
