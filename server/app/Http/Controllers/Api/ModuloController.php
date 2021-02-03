<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Modulo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ModuloController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $modulos = Modulo::all()->whereNotNull('id_parent');
        //$modulos = Modulo::tree();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos",
                'result' => $modulos
            ]
        );
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
        $input['order'] = Modulo::max('order')+1;
        $modulo = Modulo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Modulo creado con exito",
            'result' => $modulo
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Modulo  $modulo
     * @return \Illuminate\Http\Response
     */
    public function show(Modulo $modulo)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Modulo encontrado",
                'result' => $modulo
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Modulo  $modulo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Modulo $modulo)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $modulo->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Modulo actualizado con exito",
            'result' => $modulo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Modulo  $modulo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Modulo $modulo)
    {
        // Encuentre todos los elementos con el parent_id de este y restablezca el parent_id a nulo
        $items = Modulo::where('parent_id', $modulo)->get()->each(function ($item) {
            $item->parent_id = '';
            $item->save();
        });

        $modulo->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}
