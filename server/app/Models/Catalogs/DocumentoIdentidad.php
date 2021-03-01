<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;

class DocumentoIdentidad extends Model
{
    use SoftDeletesBoolean, DateTimeMutator;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_documento_identidad';
    protected $primaryKey = 'id_documento_identidad';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_documento_identidad', 'nombre', 'descripcion'
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
    protected $dates = ['entrada', 'salida'];

    public function personas()
    {
        return $this->belongsTo(DocumentoIdentidad::class, 'id_documento_identidad', 'id_documento_identidad');
    }

}
