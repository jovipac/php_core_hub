<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\Entities\Modulo;
use App\Models\Entities\UsuarioModulo;
use App\Models\Entities\RolModulo;
use App\Models\Entities\UsuarioRol;
use App\Models\Entities\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Kalnoy\Nestedset\Collection;

class UsuarioModuloController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuario_modulo = UsuarioModulo::with('modulos')->get();
        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos del rol",
                'result' => $usuario_modulo
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
        $usuario_modulo = User::query()
            ->select(
                //'T01.id_usuario',
                'T01.id_modulo',
                //'ts_usuario.username',
                'T02.nombre AS nombre_modulo',
                'T03.nombre AS nombre_modulo_padre'
            )
            ->join('tt_usuario_modulo AS T01', 'ts_usuario.id_usuario', 'T01.id_usuario')
            ->join('ts_modulo AS T02', 'T01.id_modulo', 'T02.id_modulo')
            ->leftJoin('ts_modulo AS T03', 'T03.id_modulo', 'T02.id_parent')
            ->where('T01.id_usuario', $id)
            ->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos asociados al rol",
                'result' => $usuario_modulo
            ]
        );
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function unassigned($id)
    {
        //Empezamos a buscar el primer Rol del usuario asignado
        $usuario_rol = UsuarioRol::where('id_usuario', $id)->first();
        //Procedemos a hacer una busqueda de modulos que no esten asociados con su rol y ni asocaidos al usuario
        $usuario_modulo = Modulo::select(
                'ts_modulo.id_modulo',
                'ts_modulo.nombre AS nombre_modulo',
                'T02.nombre AS nombre_modulo_padre'
            )
            ->leftJoin('ts_modulo AS T02', 'T02.id_modulo', '=', 'ts_modulo.id_parent')
            ->whereNotNull('ts_modulo.id_parent')
            ->whereNotIn('ts_modulo.id_modulo', function ($query) use ($usuario_rol) {
                $query->select('id_modulo')
                    ->from(with(new UsuarioModulo)->getTable())
                    ->where('id_usuario', $usuario_rol->id_usuario);
            })
            ->whereNotIn('ts_modulo.id_modulo', function ($query) use ($usuario_rol) {
                $query->select('id_modulo')
                    ->from(with(new RolModulo)->getTable())
                    ->where('id_rol', $usuario_rol->id_rol);
            })
            ->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Listado de modulos no asociados al rol",
                'result' => $usuario_modulo
            ]
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Menu  $menu
     * @return \Illuminate\Http\Response
     */

    public function menuUser(Request $request)
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

        $rol_modulos = UsuarioRol::query()
            ->select('tt_usuario_rol.id_usuario', 'T02.id_modulo', 'T03.nombre AS nombre_modulo',
            'T03.id_parent','T04.nombre AS nombre_modulo_padre')
            ->join('tt_rol_modulo AS T02', 'tt_usuario_rol.id_rol', '=', 'T02.id_rol')
            ->join('ts_modulo AS T03', 'T02.id_modulo', '=', 'T03.id_modulo')
            ->leftJoin('ts_modulo AS T04', 'T04.id_modulo', '=', 'T03.id_parent')
            ->where('tt_usuario_rol.id_usuario', $usuario_rol->id_usuario)
            ->where('tt_usuario_rol.id_rol', $usuario_rol->id_rol);

        $usuario_modulos = UsuarioModulo::query()
            ->select('tt_usuario_modulo.id_usuario', 'tt_usuario_modulo.id_modulo',
            'T03.nombre AS nombre_modulo',
            'T03.id_parent','T04.nombre AS nombre_modulo_padre')
            ->leftJoin('ts_modulo AS T03', 'tt_usuario_modulo.id_modulo', '=', 'T03.id_modulo')
            ->leftJoin('ts_modulo AS T04', 'T04.id_modulo', '=', 'T03.id_parent')
            ->where('tt_usuario_modulo.id_usuario', $usuario_rol->id_usuario)
            ->union($rol_modulos)  // Se realiza la union del resultado: rol-modulos y usuario-modulos
            ->get();

        //Se instancia una collection nueva para ir fusionando los modulos y submodulos asociados al rol
        $modulos = new Collection();
        foreach ($usuario_modulos as $usuario_modulo) {
            $modulo = Modulo::query()
                ->select('ts_menu.nombre AS nombre_menu', 'ts_menu.target', 'ts_modulo.*')
                ->join('ts_menu', 'ts_menu.id_menu', '=', 'ts_modulo.id_menu')
                ->defaultOrder()->ancestorsAndSelf($usuario_modulo->id_modulo);
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
                'id_usuario' => [
                    'required',
                    'integer',
                ],
                'id_modulo' => [
                    'required',
                    'integer',
                    Rule::unique('tt_usuario_modulo')->where(function ($query) use ($request) {
                        return $query->where('id_usuario', $request->id_usuario)
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

        $usuario_modulo = User::where('id_usuario', $input['id_usuario'])->first();
        $usuario_modulo->modulos()->attach([$request->id_modulo]);
        //$usuario_modulo = RolModulo::create($input);

        return $this->respondCreated([
            'success' => true,
            'message' => "Modulo del rol creado con exito",
            'result' => $usuario_modulo
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
        $usuario_modulo = UsuarioModulo::with('modulos')->where('id_usuario',$id)->get();

        return $this->apiResponse(
            [
                'success' => true,
                'message' => "Modulo del usuario encontrado",
                'result' => $usuario_modulo
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
                'id_usuario' => [
                    'required',
                    'integer',
                    Rule::unique('tt_rol_modulo')->where(function ($query) use ($request) {
                        return $query->where('id_usuario', $request->id_usuario)
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
        $usuario_modulo = User::where('id_usuario',$id)->first();
        $usuario_modulo->modulos()->syncWithoutDetaching([$request->id_modulo]);

        return $this->apiResponse([
            'success' => true,
            'message' => "Modulo del rol actualizado con exito",
            'result' => $usuario_modulo->modulos()->get()
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
            'id_usuario' => 'integer',
            'id_modulo' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return $this->respondError($validator->errors(), 422);
        }
        $usuario_modulo = User::where('id_usuario',$id)->first();

        $usuario_modulo->modulos()->detach([$request->id_modulo]);

        return $this->respondSuccess('Modulo del rol eliminado con exito');
    }
}
