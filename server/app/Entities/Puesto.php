<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Puesto extends Model
{
    /**
     * The attributes for primary key.
     *
     * @var array
     */
    protected $table = 'tc_puesto';
    protected $primaryKey = 'id_puesto';
}
