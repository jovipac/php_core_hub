export interface Expediente {
  id_expediente: number,
  anio: number,
  folio: number,
  correlativo: string,
  fecha_ingreso: Date,
  id_via: number,
  nombre_via: string,
  id_prioridad: number,
  nombre_prioridad: string,
  id_funcionario: number,
  nombre_funcionario: string,
  id_resultado: number,
  nombre_resultado: string,
  id_auxiliatura: number,
  nombre_auxiliatura: string,
  observaciones: string
}
