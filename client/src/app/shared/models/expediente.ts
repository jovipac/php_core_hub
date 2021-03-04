export interface Expediente {
  id_expediente: number,
  anio: number,
  folio: number,
  fecha_ingreso: Date,
  id_via: number,
  id_prioridad: number,
  id_funcionario: number,
  id_resultado: number,
  observaciones: string
}
