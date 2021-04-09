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
/*
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'Auth\AuthController@login');
    Route::post('signup', 'Auth\AuthController@signUp');
    Route::get('logout', 'Auth\AuthController@logout')->middleware('auth:api');
});
*/

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
    Route::post('users/trash', 'Api\UserController@trash')->name('users.trash');

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
    Route::get('funcionarios/restore/{funcionario}', 'Api\FuncionarioController@restore')->name('funcionarios.restore');
    Route::post('funcionarios/trash', 'Api\FuncionarioController@trash')->name('funcionarios.trash');

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

    Route::resource('etnia', 'Api\EtniaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('etnia/restore/{etnium}', 'Api\EtniaController@restore')->name('etnia.restore');

    Route::resource('comunidad-linguistica', 'Api\ComunidadLinguisticaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('comunidad-linguistica/restore/{comunidad-linguistica}', 'Api\ComunidadLinguisticaController@restore')->name('comunidad-linguistica.restore');

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

    Route::resource('tipo-direccion', 'Api\TipoDireccionController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('tipo-direccion/restore/{tipo-direccion}', 'Api\TipoDireccionController@restore')->name('tipo-direccion.restore');

    Route::resource('personas', 'Api\PersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy',
    ]]);
    Route::post('personas/search', 'Api\PersonaController@search')->name('personas.search');
    Route::get('personas/restore/{persona}', 'Api\PersonaController@restore')->name('personas.restore');

    Route::resource('persona-direccion', 'Api\PersonaDireccionController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('persona-direccion/restore/{persona-direccion}', 'Api\PersonaDireccionController@restore')->name('persona-direccion.restore');
    Route::post('persona-direccion/search', 'Api\PersonaDireccionController@search')->name('persona-direccion.search');

    Route::resource('motivos', 'Api\MotivoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('motivos/restore/{motivo}', 'Api\MotivoController@restore')->name('motivos.restore');

    Route::resource('tipo-area-lugar', 'Api\TipoAreaLugarController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('tipo-area-lugar/restore/{tipo_area_lugar}', 'Api\TipoAreaLugarController@restore')->name('tipo-area-lugar.restore');

    Route::resource('clasificacion-derecho', 'Api\ClasificacionDerechoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('clasificacion-derecho/search', 'Api\ClasificacionDerechoController@search')->name('clasificacion-derecho.search');

    Route::resource('clasificacion-plantilla', 'Api\ClasificacionPlantillaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);

    Route::resource('visitas', 'Api\VisitaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('visitas/search', 'Api\VisitaController@search')->name('visitas.search');

    Route::resource('expedientes', 'Api\ExpedienteController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expedientes/restore/{expedientes}', 'Api\ExpedienteController@restore')->name('expedientes.restore');
    Route::post('expedientes/search', 'Api\ExpedienteController@search')->name('expedientes.search');

    Route::resource('expediente-personas', 'Api\ExpedientePersonaController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expediente-personas/restore/{expediente-persona}', 'Api\ExpedientePersonaController@restore')->name('expediente-persona.restore');
    Route::post('expediente-personas/search', 'Api\ExpedientePersonaController@search')->name('expediente-persona.search');

    Route::resource('expediente-hechos', 'Api\ExpedienteHechoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expediente-hechos/restore/{expediente_hecho}', 'Api\ExpedienteHechoController@restore')->name('expediente-hechos.restore');
    Route::post('expediente-hechos/search', 'Api\ExpedienteHechoController@search')->name('expediente-hechos.search');

    Route::resource('expediente-hecho-archivos', 'Api\ExpedienteHechoArchivoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('expediente-hecho-archivos/upload', 'Api\ExpedienteHechoArchivoController@upload')->name('expediente-hecho-archivos.upload');
    Route::get('expediente-hecho-archivos/download/{expediente_hecho_archivo}', 'Api\ExpedienteHechoArchivoController@download')->name('expediente-hecho-archivos.download');
    Route::post('expediente-hecho-archivos/search', 'Api\ExpedienteHechoArchivoController@search')->name('expediente-hecho-archivos.search');

    Route::resource('expediente-clasificacion-derechos', 'Api\ExpedienteClasificacionDerechoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('expediente-clasificacion-derechos/search', 'Api\ExpedienteClasificacionDerechoController@search')->name('expediente-clasificacion-derecho.search');

    Route::resource('expediente-documentos', 'Api\ExpedienteDocumentoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::get('expediente-documentos/restore/{expediente_documento}', 'Api\ExpedienteDocumentoController@restore')->name('expediente-documentos.restore');
    Route::post('expediente-documentos/search', 'Api\ExpedienteDocumentoController@search')->name('expediente-documentos.search');

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

    Route::resource('expediente-clas-derecho', 'Api\ExpedienteClasificacionDerechoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
    Route::post('expediente-clas-derecho/search', 'Api\ExpedienteClasificacionDerechoController@search')->name('expediente-clas-derecho.search');

    Route::resource('persona-discapacidad', 'Api\PersonaDiscapacidadController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);

    Route::resource('estado-conyugal', 'Api\EstadoconyugalController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);

    Route::resource('relacion-victima-agresor', 'Api\RelacionvicagreController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);

    Route::resource('trabajo-remunerado', 'Api\TrabajoremuneradoController', ['only' => [
        'index', 'store', 'update', 'show', 'destroy'
    ]]);
});
