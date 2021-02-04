<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class Dependencia extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_dependencia';
    protected $primaryKey = 'id_dependencia';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function puestos()
    {
        return $this->hasMany(Puesto::class, 'id_dependencia', 'id_dependencia');
    }

    public function search(){
        return "nada";
    }
}
