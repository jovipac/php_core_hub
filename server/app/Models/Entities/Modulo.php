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

    public function parent()
    {

        return $this->hasOne('App\Models\Entities\Modulo', 'id_modulo', 'id_parent');
    }

    public function children()
    {

        return $this->hasMany('App\Models\Entities\Modulo', 'id_parent', 'id_modulo');
    }

    public function menu()
    {
        return $this->belongsTo(Menu::class, 'id_menu', 'id_menu');
    }

    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'tt_rol_modulo','id_modulo','id_rol','id_modulo','id_rol')->withTimestamps();
    }

    public static function tree()
    {

        return static::with(implode('.', array_fill(0, 4, 'children')))->where('id_parent', '=', NULL)->get();
    }

    /**
     * Return the Highest Order Menu Item.
     *
     * @param number $parent (Optional) Parent id. Default null
     *
     * @return number Order number
     */
    public function highestOrderMenuItem($parent = null)
    {
        $order = 1;

        $item = $this->where('id_parent', '=', $parent)
            ->orderBy('order', 'DESC')
            ->first();

        if (!is_null($item)) {
            $order = intval($item->order) + 1;
        }

        return $order;
    }

}
