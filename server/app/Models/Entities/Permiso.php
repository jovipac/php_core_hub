<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;

class Permiso extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_permiso';
    protected $primaryKey = 'id_permiso';

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

        return $this->belongsToMany(Rol::class, 'tt_rol_permiso', 'id_rol', 'id_rol');
    }
/*
    public function users()
    {

        return $this->belongsToMany(User::class, 'tt_usuario_permiso', 'id_usuario', 'id_usuario');
    }
*/
}
