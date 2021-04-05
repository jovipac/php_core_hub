<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Http\Traits\Userstamps;
use Illuminate\Support\Facades\Storage;


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
        'nombre', 'tamanio', 'mime', 'ubicacion', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_by', 'updated_by', 'deleted_by', 'created_at', 'updated_at', 'deleted_at', 'borrado',
    ];

    /**
     * The attributes that should be mutated.
     *
     * @var array
     */
    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        $value = null;
        if (!is_null($this->attributes['ubicacion'] ?? null)) {
            $value = Storage::disk('uploads')->url($this->ubicacion);
        }
        return $value;
    }

    public function expediente()
    {
        return $this->belongsTo(Expediente::class, 'id_expediente', 'id_expediente');
    }

}
