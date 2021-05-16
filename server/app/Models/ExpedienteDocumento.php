<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;
use Kalnoy\Nestedset\NodeTrait;
use App\Http\Traits\Userstamps;

class ExpedienteDocumento extends Model
{
    use NodeTrait, SoftDeletesBoolean, Userstamps, DateTimeMutator;


    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tt_expediente_documento';
    protected $primaryKey = 'id_expediente_documento';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_expediente_documento', 'id_expediente', 'id_tipo_documento',
        'remitente', 'titulo', 'texto', 'observaciones', 'id_parent', 'version'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_by', 'updated_by', 'updated_at', 'deleted_by', 'deleted_at', 'borrado', '_lft', '_rgt'
    ];

    public function getLftName()
    {
        return '_lft';
    }

    public function getRgtName()
    {
        return '_rgt';
    }

    public function getParentIdName()
    {
        return 'id_parent';
    }

    // Specify parent id attribute mutator
    public function setParentAttribute($value)
    {
        $this->setParentIdAttribute($value);
    }

    public function expediente()
    {
        return $this->belongsTo(Expediente::class, 'id_expediente', 'id_expediente');
    }

    public function archivos_adjuntos()
    {
        return $this->hasMany(ExpedienteDocumentoArchivo::class, 'id_expediente_documento', 'id_expediente_documento');
    }

}
