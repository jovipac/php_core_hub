<?php

namespace App\Models\Catalogs;

use Illuminate\Database\Eloquent\Model;
use Webkid\LaravelBooleanSoftdeletes\SoftDeletesBoolean;

class Funcionario extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_funcionario';
    protected $primaryKey = 'id_funcionario';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombres', 'apellidos', 'email',
    ];
}
