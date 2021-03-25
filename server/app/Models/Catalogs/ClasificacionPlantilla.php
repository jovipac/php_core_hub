<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use Kalnoy\Nestedset\NodeTrait;


class ClasificacionPlantilla extends Model
{
    use NodeTrait, SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_clasificacion_plantilla';
    protected $primaryKey = 'id_clasificacion_plantilla';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_clasificacion_plantilla', 'nombre', 'descripcion', 'id_parent', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'borrado', '_lft', '_rgt'
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

    public function plantillaPadre()
    {
        return $this->belongsTo(ClasificacionPlantilla::class, 'id_clasificacion_plantilla', 'id_parent');
    }

}
