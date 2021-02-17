<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use Kalnoy\Nestedset\NodeTrait;

class Modulo extends Model
{
    use NodeTrait, SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_modulo';
    protected $primaryKey = 'id_modulo';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_menu', 'nombre', 'slug', 'accion', 'url', 'tipo', 'icono', 'id_parent', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'borrado', '_lft', '_rgt'
    ];

    protected function getScopeAttributes()
    {
        return ['id_menu'];
    }

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
/*
    public function parent()
    {

        return $this->hasOne('App\Models\Entities\Modulo', 'id_modulo', 'id_parent');
    }

    public function children()
    {

        return $this->hasMany('App\Models\Entities\Modulo', 'id_parent', 'id_modulo');
    }
*/
    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id_menu', 'id_menu');
    }

    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'tt_rol_modulo','id_modulo','id_rol','id_modulo','id_rol')->withTimestamps();
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'tt_usuario_modulo','id_modulo','id_usuario','id_modulo','id_rol')->withTimestamps();
    }

}
