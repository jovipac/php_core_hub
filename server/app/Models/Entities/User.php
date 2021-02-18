<?php

namespace App\Models\Entities;

use App\Http\Traits\HasPermissionsTrait;
use App\Models\Catalogs\Auxiliatura;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use App\Http\Traits\SoftDeletesBoolean;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasPermissionsTrait, SoftDeletesBoolean;

    const IS_DELETED = 'borrado';

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_usuario';
    protected $primaryKey = 'id_usuario';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_auxiliatura', 'username', 'password', 'email', 'id_auxiliatura', 'id_funcionario', 'borrado'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'borrado',
    ];
    //protected $appends = ['nombre_auxiliatura'];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles()
    {
        return $this->belongsToMany(Rol::class, 'tt_usuario_rol','id_usuario','id_rol','id_usuario','id_rol')->withTimestamps();
    }

    public function modulos()
    {
        return $this->belongsToMany(Modulo::class, 'tt_usuario_modulo', 'id_usuario', 'id_modulo', 'id_usuario', 'id_modulo')->withTimestamps();
    }

    public function getNombreAuxiliaturaAttribute()
    {
        $value = null;
        if (!is_null($this->attributes['id_auxiliatura'])) {
            $value = $this->auxiliatura->nombre;
        }
        return $value;
    }

    public function auxiliatura()
    {
        return $this->belongsTo(Auxiliatura::class, 'id_auxiliatura', 'id_auxiliatura');
    }

    public function funcionario()
    {
        return $this->belongsTo(Funcionario::class, 'id_funcionario', 'id_funcionario');
    }
}
