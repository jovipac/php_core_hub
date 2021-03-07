export interface Persona {
  id_persona: number,
  cui: string,
  nombres: string
  apellidos: string,
  nombres_completos: string,
  email?: string,
  telefono: string,
  fecha_nacimiento: Date,
  edad: number,
  id_sexo: number,
}
