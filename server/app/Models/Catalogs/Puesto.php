<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class Puesto extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_puesto';
    protected $primaryKey = 'id_puesto';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 'id_dependencia', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    //protected $appends = ['nombre_dependencia'];

    public function getNombreDependenciaAttribute()
    {
        $value = null;
        if (!is_null($this->attributes['id_dependencia'])) {
            $value = $this->dependencia->nombre;
        }
        return $value;
    }

    public function dependencia()
    {
        return $this->belongsTo(Dependencia::class, 'id_dependencia', 'id_dependencia');
    }

}
