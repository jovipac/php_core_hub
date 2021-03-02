<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;

class Departamento extends Model
{
    use SoftDeletesBoolean, DateTimeMutator;

    const IS_DELETED = 'borrado';

        /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_departamento';
    protected $primaryKey = 'id_departamento';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_departamento', 'nombre', 'borrado'
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
