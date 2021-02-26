<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use App\Models\Catalogs\DocumentoIdentidad;

class DocumentoIdentidadPersona extends Model
{
    use SoftDeletesBoolean, DateTimeMutator;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_documento_identidad_persona';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_persona', 'id_documento_identidad', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function personas()
    {
        return $this->hasMany(Persona::class, 'id_persona', 'id_persona');
    }

    public function documentos_identidad()
    {
        return $this->hasMany(DocumentoIdentidad::class, 'id_documento_identidad', 'id_documento_identidad');
    }

}
