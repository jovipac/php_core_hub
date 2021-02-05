<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class UsuarioRol extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_usuario_rol';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_permiso', 'nombre',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function roles()
    {

        return $this->hasMany(Rol::class, 'ts_rol', 'id_rol', 'id_rol');
    }

    public function usuarios()
    {

        return $this->hasMany(User::class, 'ts_usuario', 'id_usuario', 'id_usuario');
    }

}
