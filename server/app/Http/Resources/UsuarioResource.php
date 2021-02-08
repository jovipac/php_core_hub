<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UsuarioRolResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {   $rolesFormat = UsuarioRolResource::collection($this->roles()->get());
        return [
            'id_usuario' => $this->id_usuario,
            'username' => $this->username,
            'email' => $this->email,
            'id_funcionario' => $this->id_funcionario,
            'id_auxiliatura' => $this->id_auxiliatura,
            'rol' => $rolesFormat,
        ];
    }
}
