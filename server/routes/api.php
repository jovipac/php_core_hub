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
});
