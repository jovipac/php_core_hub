<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;

class UsuarioModulo extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_usuario_modulo';
    protected $primaryKey = 'id_usuario_modulo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuario', 'id_modulo', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function usuarios()
    {

        return $this->hasMany(Rol::class, 'id_usuario', 'id_usuario');
    }

    public function modulos()
    {

        return $this->hasMany(Modulo::class, 'id_modulo', 'id_modulo');
    }
}
