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
    Route::resource('estados', 'Api\EstadoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('modulos', 'Api\ModuloController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('users', 'Api\UserController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('roles', 'Api\RolController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
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
    Route::resource('prioridad', 'Api\PrioridadController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('sexo', 'Api\SexoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('genero', 'Api\GeneroController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('personas', 'Api\PersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy',
    ]]);
    Route::resource('motivos', 'Api\MotivoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::resource('visitas', 'Api\VisitaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('estados/restore/{estado}', 'Api\EstadoController@restore')->name('estados.restore');
    Route::get('prioridad/restore/{prioridad}', 'Api\PrioridadController@restore')->name('prioridad.restore');
    Route::get('motivos/restore/{motivo}', 'Api\MotivoController@restore')->name('motivos.restore');
    Route::get('users/restore/{user}', 'Api\UserController@restore')->name('users.restore');
    Route::get('sexo/restore/{sexo}', 'Api\SexoController@restore')->name('sexo.restore');
    Route::get('genero/restore/{genero}', 'Api\GeneroController@restore')->name('genero.restore');
    Route::post('personas/search', 'Api\PersonaController@search')->name('personas.search');
    Route::get('personas/restore/{persona}', 'Api\PersonaController@restore')->name('personas.restore');
    Route::post('visitas/search', 'Api\VisitaController@search')->name('visitas.search');

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
