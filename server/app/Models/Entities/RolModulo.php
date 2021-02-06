<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class RolModulo extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_rol_modulo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_rol', 'id_modulo', 'borrado'
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

        return $this->hasMany(Rol::class, 'id_rol', 'id_rol');
    }

    public function modulos()
    {

        return $this->hasMany(Modulo::class, 'id_modulo', 'id_modulo');
    }
}