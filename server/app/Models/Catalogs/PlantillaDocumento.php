<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;

class PlantillaDocumento extends Model
{
    use SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_plantilla_documento';
    protected $primaryKey = 'id_plantilla_documento';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_plantilla_documento', 'titulo', 'texto', 'id_clasificacion_plantilla'
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
