<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;

class Persona extends Model
{
    use SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_persona';
    protected $primaryKey = 'id_persona';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_persona', 'cui', 'nombres', 'apellidos', 'fecha_nacimiento', 'id_sexo', 'telefono'
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
    protected $dates = ['fecha_nacimiento'];

}
