<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;

class ExpedienteClasificacionDerecho extends Model
{

    use SoftDeletesBoolean, Userstamps, DateTimeMutator;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente_clas_derecho';
    protected $primaryKey = 'id_expediente_clas_derecho';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente_clas_derecho', 'id_expediente', 'id_clasificacion_derecho' ,
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at', 'borrado'
    ];


    public function expedientes()
    {
        return $this->hasMany(Expediente::class, 'id_expediente', 'id_expediente');
    }

    public function Clasificacion_Derecho()
    {
        return $this->hasMany(ClasificacionDerecho::class, 'id_clasificacion_derecho', 'id_clasificacion_derecho');
    }
}
