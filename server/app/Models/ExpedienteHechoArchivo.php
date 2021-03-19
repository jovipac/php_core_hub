<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;


class ExpedienteHechoArchivo extends Model
{
    use SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente_hecho_archivo';
    protected $primaryKey = 'id_expediente_hecho_archivo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente_hecho_archivo', 'id_expediente', 'id_expediente_hecho',
        'nombre', 'tamanio', 'ubicacion', 'borrado'
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

}
