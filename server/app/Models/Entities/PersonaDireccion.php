<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;

class PersonaDireccion extends Model
{
    use SoftDeletesBoolean, DateTimeMutator;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_persona_direccion';
    protected $primaryKey = 'id_persona_direccion';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_persona', 'id_tipo_direccion', 'id_departamento', 'id_municipio',
        'direccion', 'comentarios'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'borrado',
    ];

    public function persona()
    {
        return $this->belongsTo(PersonaDireccion::class, 'id_persona', 'id_persona');
    }

    public function tipo_direccion()
    {
        return $this->belongsTo(TipoDireccion::class, 'id_tipo_direccion', 'id_tipo_direccion');
    }

    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'id_departamento', 'id_departamento');
    }

    public function municipio()
    {
        return $this->belongsTo(Municipio::class, 'id_municipio', 'id_municipio');
    }

}
