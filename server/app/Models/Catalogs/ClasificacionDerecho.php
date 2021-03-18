<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use Kalnoy\Nestedset\NodeTrait;

class ClasificacionDerecho extends Model
{
    use NodeTrait, SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_clasificacion_derecho';
    protected $primaryKey = 'id_clasificacion_derecho';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_clasificacion_derecho', 'nombre', 'descripcion', 'id_parent', 'order', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at', 'borrado', '_lft', '_rgt'
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

    public function clasificacion()
    {
        return $this->belongsTo(ClasificacionDerecho::class, 'id_clasificacion_derecho', 'id_parent');
    }

}
