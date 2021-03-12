<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;

class ExpedientePersona extends Model
{
    use SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente_persona';
    protected $primaryKey = 'id_expediente_persona';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente', 'id_persona', 'id_documento_identidad', 'id_tipo_vinculacion', 'flag_confidencial',
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

    public function expedientes()
    {
        return $this->belongsToMany(Expediente::class, 'tt_expediente','id_persona','id_expediente','id_persona','id_expediente')->withTimestamps();
    }

}
