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
    /* Route::resource('rol-modulos', 'Api\RolModuloController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]); */
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

    Route::get('rol-modulos', 'Api\RolModuloController@index')->name('menu.index');
    Route::get('rol-modulos/assigned/{id}', 'Api\RolModuloController@assigned');
    Route::get('rol-modulos/unassigned/{id}', 'Api\RolModuloController@unassigned');
    Route::post('rol-modulos/delete/{id}', 'Api\RolModuloController@destroy')->name('menu.destroy');
    Route::get('rol-modulos/{id}', 'Api\RolModuloController@show');
    Route::post('rol-modulos', 'Api\RolModuloController@store');
    Route::put('rol-modulos/{id}', 'Api\RolModuloController@update');
    Route::post('rol-modulos/menu', 'Api\RolModuloController@menuRol');

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
