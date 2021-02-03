<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

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

}
