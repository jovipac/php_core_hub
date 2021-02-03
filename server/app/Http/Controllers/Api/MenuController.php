<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenuController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menus = Menu::all();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de menus",
                'result' => $menus
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function parentMenu($id)
    {
        $menus = Menu::findOrFail($id);
        $items = $menus->parent_items()->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de menus",
                'result' => $items
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function menuItems(Request $request)
    {
        if ($request->has('target')) {
            $menu = Menu::where('target', 'like', '%' . $request->input('target') . '%')->with('children');
            //$items = $menu->children()->get();
            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de menus",
                    'result' => $menu->get()
                ]
            );
        } else {
            $menu = Menu::with('children');
            return $this->apiResponse(
                [
                    'success' => true,
                    'message' => "Listado de items del menu",
                    'result' => $menu
                ]
            );
        }

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
        $input['order'] = Menu::max('order')+1;
        $menu = Menu::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Menu creado con exito",
            'result' => $menu
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function show(Menu $menu)
    {
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Menu encontrado",
                'result' => $menu
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Menu $menu)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        $menu->update($request->all());

        return $this->respondSuccess([
            'success' => true,
            'message' => "Menu actualizado con exito",
            'result' => $menu
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function destroy(Menu $menu)
    {
        // Encuentre todos los elementos con el parent_id de este y restablezca el parent_id a nulo
        $items = Menu::where('parent_id', $menu)->get()->each(function ($item) {
            $item->parent_id = '';
            $item->save();
        });

        $menu->delete();

        return $this->respondSuccess('Eliminado con exito');
    }
}