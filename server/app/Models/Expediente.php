<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;

class Expediente extends Model
{
    use SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente';
    protected $primaryKey = 'id_expediente';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente', 'anio', 'folio', 'id_via', 'fecha_ingreso', 'id_prioridad', 'id_motivo',
        'id_dependencia', 'id_funcionario', 'observaciones', 'id_resultado', 'id_auxiliatura', 'id_visita',
        'borrado'
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
    protected $dates = ['fecha_ingreso'];

    public function personas()
    {
        return $this->belongsToMany(ExpedientePersona::class, 'tt_expediente_persona', 'id_expediente', 'id_persona', 'id_expediente', 'id_persona')->withTimestamps();
    }


    public function clasificacionderecho()
    {
        return $this->belongsToMany(ExpedienteClasificacionDerecho::class, 'tt_expediente_clas_derecho', 'id_expediente', 'id_clasificacion_derecho', 'id_expediente', 'id_clasificacion_derecho')->withTimestamps();
    }

}
