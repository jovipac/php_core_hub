export interface ExpedienteHecho {
  id_expediente_hecho: number,
  id_expediente: number,
  fecha_hora: Date,
  id_tipo_area_lugar: number,
  nombre_tipo_area_lugar: string,
  id_departamento: number,
  nombre_departamento: string,
  id_municipio: number,
  nombre_municipio: string,
  direccion: string
  hecho: string,
  peticion: string,
  prueba: string,
}
