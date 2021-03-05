export interface ExpedientePersona {
  id_expediente_persona: number,
  id_expediente: number,
  id_persona: number,
  id_tipo_vinculacion: number,
  flag_confidencial: boolean,
  nombres: string
  apellidos: string,
  nombre_completo: string,
  telefono: string,
  fecha_nacimiento: Date,
  edad: number,
  id_sexo: number,
}
