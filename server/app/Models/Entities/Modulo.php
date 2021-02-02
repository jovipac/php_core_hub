<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class Modulo extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_modulo';
    protected $primaryKey = 'id_modulo';

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at', 'borrado',
    ];

    public function parent() {

        return $this->hasOne('App\Models\Entities\Modulo', 'id_modulo', 'id_parent');

    }

    public function children(){

        return $this->hasMany('App\Models\Entities\Modulo', 'id_parent', 'id_modulo');

    }

    public static function tree() {

        return static::with(implode('.', array_fill(0, 4, 'children')))->where('id_parent', '=', NULL)->get();

    }

}
