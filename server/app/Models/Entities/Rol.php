<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class Rol extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_rol';
    protected $primaryKey = 'id_rol';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 'descripcion', 'slug',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    /**
    * The attributes that should be mutated to dates.
    *
    * @var array
    */
    protected $dates = ['deleted_at'];
/*
    public function permissions()
    {

        return $this->belongsToMany(Permiso::class, 'tt_rol_permiso','id_permiso', 'id_permiso);
    }
*/
    public function users()
    {

        return $this->belongsToMany(User::class, 'tt_usuario_rol','id_usuario','id_usuario');
    }
}
