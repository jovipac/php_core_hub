export interface Visita {
  id_visita: number,
  id_persona: number,
  cui: string,
  nombres: string
  apellidos: string,
  telefono: string,
  fecha_nacimiento: Date,
  edad: number,
  entrada: Date,
  salida: Date,
  id_sexo: number,
  nombre_sexo: string,
  id_motivo: number,
  nombre_motivo: number,
  id_dependencia: number,
  nombre_dependencia: string,
  id_funcionario: number,
  nombre_funcionario: string,
  id_auxiliatura: number,
  nombre_auxiliatura: string,
  llamadas: number
}
