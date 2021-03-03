<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signUp');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');

    });
});


Route::group([
    'middleware' => 'auth:api'
], function () {
    Route::resource('documento-identidad', 'Api\DocumentoIdentidadController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('documento-identidad/restore/{documento_identidad}', 'Api\DocumentoIdentidadController@restore')->name('documento-identidad.restore');

    Route::resource('estado', 'Api\EstadoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('estado/restore/{estado}', 'Api\EstadoController@restore')->name('estados.restore');

    Route::resource('modulos', 'Api\ModuloController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('users', 'Api\UserController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('users/restore/{user}', 'Api\UserController@restore')->name('users.restore');

    Route::resource('roles', 'Api\RolController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('roles/restore/{user}', 'Api\RolController@restore')->name('roles.restore');

    Route::resource('usuario-roles', 'Api\UsuarioRolController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('funcionarios', 'Api\FuncionarioController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('dependencias', 'Api\DependenciaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('puestos', 'Api\PuestoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('auxiliaturas', 'Api\AuxiliaturaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('via', 'Api\ViaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('via/restore/{via}', 'Api\ViaController@restore')->name('via.restore');

    Route::resource('tipo-vinculacion', 'Api\TipoVinculacionController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('tipo-vinculacion/restore/{tipo_vinculacion}', 'Api\TipoVinculacionController@restore')->name('tipo-vinculacion.restore');

    Route::resource('prioridad', 'Api\PrioridadController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('prioridad/restore/{prioridad}', 'Api\PrioridadController@restore')->name('prioridad.restore');

    Route::resource('resultado', 'Api\ResultadoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('resultado/restore/{resultado}', 'Api\ResultadoController@restore')->name('resultado.restore');

    Route::resource('sexo', 'Api\SexoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('sexo/restore/{sexo}', 'Api\SexoController@restore')->name('sexo.restore');

    Route::resource('genero', 'Api\GeneroController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('genero/restore/{genero}', 'Api\GeneroController@restore')->name('genero.restore');

    Route::resource('departamento', 'Api\DepartamentoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('departamento/restore/{departamento}', 'Api\DepartamentoController@restore')->name('departamento.restore');

    Route::resource('municipio', 'Api\MunicipioController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('municipio/restore/{municipio}', 'Api\MunicipioController@restore')->name('municipio.restore');

    Route::resource('documento-identidad-persona', 'Api\DocumentoIdentidadPersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('documento-identidad-persona/search', 'Api\DocumentoIdentidadPersonaController@search')->name('documento-identidad-persona.search');

    Route::resource('personas', 'Api\PersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy',
    ]]);
    Route::post('personas/search', 'Api\PersonaController@search')->name('personas.search');
    Route::get('personas/restore/{persona}', 'Api\PersonaController@restore')->name('personas.restore');

    Route::resource('motivos', 'Api\MotivoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('motivos/restore/{motivo}', 'Api\MotivoController@restore')->name('motivos.restore');

    Route::resource('visitas', 'Api\VisitaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('visitas/search', 'Api\VisitaController@search')->name('visitas.search');

    Route::resource('expedientes', 'Api\ExpedienteController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expedientes/restore/{expedientes}', 'Api\ExpedienteController@restore')->name('expedientes.restore');
    //Route::post('expedientes/search', 'Api\ExpedienteController@search')->name('expedientes.search');

    Route::resource('expediente-personas', 'Api\ExpedientePersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expediente-personas/restore/{expediente-persona}', 'Api\ExpedientePersonaController@restore')->name('expediente-persona.restore');
    //Route::post('expediente-personas/search', 'Api\ExpedientePersonasController@search')->name('expediente-persona.search');

    Route::get('rol-modulos', 'Api\RolModuloController@index')->name('menu.index');
    Route::get('rol-modulos/assigned/{id}', 'Api\RolModuloController@assigned');
    Route::get('rol-modulos/unassigned/{id}', 'Api\RolModuloController@unassigned');
    Route::post('rol-modulos/delete/{id}', 'Api\RolModuloController@destroy')->name('menu.destroy');
    Route::get('rol-modulos/{id}', 'Api\RolModuloController@show');
    Route::post('rol-modulos', 'Api\RolModuloController@store');
    Route::put('rol-modulos/{id}', 'Api\RolModuloController@update');
    Route::post('rol-modulos/menu', 'Api\RolModuloController@menuRol')->name('rol-modulos.menu');

    Route::get('usuario-modulos', 'Api\UsuarioModuloController@index')->name('usuario-modulo.index');
    Route::get('usuario-modulos/assigned/{id}', 'Api\UsuarioModuloController@assigned')->name('usuario-modulo.assigned');
    Route::get('usuario-modulos/unassigned/{id}', 'Api\UsuarioModuloController@unassigned')->name('usuario-modulo.unassigned');
    Route::post('usuario-modulos/delete/{id}', 'Api\UsuarioModuloController@destroy')->name('usuario-modulo.destroy');
    Route::get('usuario-modulos/{id}', 'Api\UsuarioModuloController@show')->name('usuario-modulo.show');
    Route::post('usuario-modulos', 'Api\UsuarioModuloController@store')->name('usuario-modulo.store');
    Route::put('usuario-modulos/{id}', 'Api\UsuarioModuloController@update')->name('usuario-modulo.update');
    Route::post('usuario-modulos/menu', 'Api\UsuarioModuloController@menuUser')->name('usuario-modulos.menu');

    Route::get('dependencia/search', [
        'uses' => 'Api\DependenciaController@searchBy',
        'as' => 'dependencias.search'
    ]);

    Route::get('funcionario/list', [
        'uses' => 'Api\FuncionarioController@list',
        'as' => 'funcionarios.list'
    ]);

    Route::get('menus', 'Api\MenuController@index')->name('menu.index');
    Route::get('menus/{menu}', 'Api\MenuController@show')->name('menu.show');
    Route::post('menus', 'Api\MenuController@store')->name('menu.store');
    Route::put('menus/{menu}', 'Api\MenuController@update')->name('menu.update');
    Route::delete('menus/{menu}','Api\MenuController@destroy')->name('menu.destroy');
    Route::get('menu-items', 'Api\MenuController@menuItems')->name('menu.menuItems');
});
