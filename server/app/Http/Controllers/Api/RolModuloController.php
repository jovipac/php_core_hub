<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Rol;
use App\Models\Entities\Modulo;
use App\Models\Entities\RolModulo;
use App\Models\Entities\UsuarioRol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Kalnoy\Nestedset\Collection;

class RolModuloController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rol_modulo = Rol::with('modulos')->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos del rol",
                'result' => $rol_modulo
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function assigned($id)
    {
        $rol_modulo = Rol::query()
        ->select('tt_rol_modulo.id_rol', 'tt_rol_modulo.id_modulo',
            'ts_rol.nombre AS nombre_rol', 'T01.nombre AS nombre_modulo',
            'T02.nombre AS nombre_modulo_padre')
            ->join('tt_rol_modulo', 'ts_rol.id_rol', '=', 'tt_rol_modulo.id_rol')
            ->join('ts_modulo AS T01', 'tt_rol_modulo.id_modulo', '=', 'T01.id_modulo')
            ->leftJoin('ts_modulo AS T02', 'T02.id_modulo', '=', 'T01.id_parent')
            ->where('tt_rol_modulo.id_rol', $id)
            ->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos asociados al rol",
                'result' => $rol_modulo
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function unassigned($rol_id)
    {
        $rolModulos = [];

        $rol_modulos = Modulo::select('id_modulo')
            ->whereNotIn('ts_modulo.id_modulo', function ($query) use ($rol_id) {
                $query->select('id_modulo')
                ->from(with(new RolModulo)->getTable())
                    ->where('id_rol', $rol_id);
            })
            ->whereIsLeaf()
            ->get();
        //Se extrae los ID de los modulos resultantes de la consulta SQL anterior
        foreach ($rol_modulos as $rol_modulo) {
            array_push($rolModulos, $rol_modulo->id_modulo);
        }
        //Se procede a hacer una consulta SQL para obtener los campos adicionales a mostrar: nombre modulo padre
        $modulos =  Modulo::select(
            'ts_modulo.id_modulo',
            'ts_modulo.nombre AS nombre_modulo',
            'T02.nombre AS nombre_modulo_padre'
        )
        ->leftJoin('ts_modulo AS T02', 'T02.id_modulo', 'ts_modulo.id_parent')
        ->whereIn('ts_modulo.id_modulo', $rolModulos)
        ->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos no asociados al rol",
                'result' => $modulos
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */
    public function menuRol(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_rol' => 'required|integer',
            'id_usuario' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }

        //Empezamos a buscar el primer rol del usuario asignado
        $usuario_rol = UsuarioRol::where('id_usuario', $request->id_usuario)->first();

        $rol_modulos = Rol::query()
        ->select('tt_rol_modulo.id_rol', 'tt_rol_modulo.id_modulo',
            'ts_rol.nombre AS nombre_rol', 'T01.nombre AS nombre_modulo',
            'T01.id_parent','T02.nombre AS nombre_modulo_padre')
            ->join('tt_rol_modulo', 'ts_rol.id_rol', '=', 'tt_rol_modulo.id_rol')
            ->join('ts_modulo AS T01', 'tt_rol_modulo.id_modulo', '=', 'T01.id_modulo')
            ->leftJoin('ts_modulo AS T02', 'T02.id_modulo', '=', 'T01.id_parent')
            ->where('tt_rol_modulo.id_rol', $usuario_rol->id_rol)
            ->get();

        //Se instancia una collection nueva para ir fusionando los modulos y submodulos asociados al rol
        $modulos = new Collection();
        foreach ($rol_modulos as $rol_modulo) {
            $modulo = Modulo::query()
                ->select('ts_menu.nombre AS nombre_menu', 'ts_menu.target', 'ts_modulo.*')
                ->join('ts_menu', 'ts_menu.id_menu', '=', 'ts_modulo.id_menu')
                ->defaultOrder()->ancestorsAndSelf($rol_modulo->id_modulo);
            $modulos = $modulo->merge($modulos);
        }
        $modulos_menu = $modulos->sortBy('id_modulo')->toTree();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos asociados al usuario",
                'result' => $modulos_menu
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
        $validator = Validator::make(
            $request->all(),
            [
                'id_rol' => [
                    'required',
                    'integer',
                ],
                'id_modulo' => [
                    'required',
                    'integer',
                    Rule::unique('tt_rol_modulo')->where(function ($query) use ($request) {
                        return $query->where('id_rol', $request->id_rol)
                            ->where('id_modulo', $request->id_modulo);
                    }),
                ],
            ],
            []
        );

        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $input = $request->all();

        $rol_modulo = Rol::where('id_rol', $input['id_rol'])->first();
        $rol_modulo->modulos()->attach([$request->id_modulo]);
        //$rol_modulo = RolModulo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Modulo del rol creado con exito",
            'result' => $rol_modulo
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
        $rol_modulo = Rol::with('modulos')->where('id_rol',$id)->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Modulo del rol encontrado",
                'result' => $rol_modulo
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'id_rol' => [
                    'required',
                    'integer',
                    Rule::unique('tt_rol_modulo')->where(function ($query) use ($request) {
                        return $query->where('id_rol', $request->id_rol)
                            ->where('id_modulo', $request->id_modulo);
                    }),
                ],
                'id_modulo' => [
                    'required',
                    'integer',
                ],
            ],
            []
        );

        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $rol_modulo = Rol::where('id_rol',$id)->first();
        $rol_modulo->modulos()->syncWithoutDetaching([$request->id_modulo]);

        return $this->apiResponse([
            'success' => true,
            'message' => "Modulo del rol actualizado con exito",
            'result' => $rol_modulo->modulos()->get()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'id_rol' => 'integer',
            'id_modulo' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $rol_modulo = Rol::where('id_rol',$id)->first();

        $rol_modulo->modulos()->detach([$request->id_modulo]);

        return $this->respondSuccess('Modulo del rol eliminado con exito');
    }
}
