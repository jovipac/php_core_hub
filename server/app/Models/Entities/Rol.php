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
        'nombre', 'descripcion', 'slug', 'borrado'
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

    public function modulos()
    {
        return $this->belongsToMany(Modulo::class, 'tt_rol_modulo', 'id_rol', 'id_modulo', 'id_rol', 'id_modulo')->withTimestamps();
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'tt_usuario_rol', 'id_rol', 'id_usuario', 'id_rol', 'id_usuario')->withTimestamps();
    }

}
