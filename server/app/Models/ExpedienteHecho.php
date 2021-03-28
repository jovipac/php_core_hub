<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;


class ExpedienteHecho extends Model
{
    use SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente_hecho';
    protected $primaryKey = 'id_expediente_hecho';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente_hecho', 'id_expediente', 'fecha_hora', 'id_tipo_area_lugar', 'id_departamento', 'id_municipio',
        'direccion', 'hecho', 'peticion', 'prueba', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function expediente()
    {
        return $this->belongsTo(Expediente::class, 'id_expediente', 'id_expediente');
    }

    public function archivos_adjuntos()
    {
        return $this->hasMany(ExpedienteHechoArchivo::class, 'id_expediente_hecho', 'id_expediente_hecho');
    }

}
