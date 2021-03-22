<?php

namespace App\Models\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class Menu extends Model
{

    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'ts_menu';
    protected $primaryKey = 'id_menu';

    protected $guarded = [];

    public function items()
    {
        return $this->hasMany(Modulo::class, 'id_menu', 'id_menu');
    }

    public function children()
    {
        return $this->hasMany(Modulo::class, 'id_menu', 'id_menu')->whereNull('id_parent')->with('children');
    }

}
