<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_usuario' => $this->id_usuario,
            'username' => $this->username,
            'email' => $this->email,
            'id_funcionario' => $this->id_funcionario,
            'id_auxiliatura' => $this->id_auxiliatura,
        ];
    }
}
