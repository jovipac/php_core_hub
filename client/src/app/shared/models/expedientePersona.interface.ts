export interface ExpedientePersona {
  id_expediente_persona: number,
  id_expediente: number,
  id_persona: number,
  id_tipo_vinculacion: number,
  nombre_tipo_vinculacion: string,
  flag_confidencial: boolean,
  nombres: string
  apellidos: string,
  nombres_completos: string,
  email?: string,
  telefono: string,
  fecha_nacimiento: Date,
  edad: number,
  id_sexo: number,
}
