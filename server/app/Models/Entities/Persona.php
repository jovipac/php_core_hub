<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use App\Http\Traits\SoftDeletesBoolean;
use App\Http\Traits\DateTimeMutator;

class Persona extends Model
{
    use SoftDeletesBoolean, DateTimeMutator;

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
        'id_persona', 'nombres', 'apellidos', 'fecha_nacimiento', 'id_sexo', 'id_genero',
        'email', 'telefono', 'codigo_casillero', 'institucion_trabaja',
        'id_etnia', 'id_comunidad_linguistica', 'id_estado_conyugal', 'id_relacion_vic_agre',
        'flag_discapacidad', 'id_discapacidad', 'id_trabajo_remunerado', 'id_ocupacion',
        'id_actividad_dedica', 'id_condicion_alfabetismo', 'id_escolaridad', 'id_tipo_violencia',
        'direcciones'
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

    protected $appends = ['edad'];

    public function getEdadAttribute()
    {
        $value = null;
        if (!is_null($this->attributes['fecha_nacimiento'] ?? null)) {
            $value = \Carbon\Carbon::parse($this->fecha_nacimiento)->age;
        }
        return $value;
    }

    public function documentos_identidad()
    {
        return $this->belongsToMany(
            \App\Models\Catalogs\DocumentoIdentidad::class,
            'tt_documento_identidad_persona',
            'id_persona',
            'id_documento_identidad',
            'id_persona',
            'id_documento_identidad'
        )->withTimestamps();
    }

    public function direcciones()
    {
        return $this->hasMany(PersonaDireccion::class, 'id_persona', 'id_persona');
    }

}
