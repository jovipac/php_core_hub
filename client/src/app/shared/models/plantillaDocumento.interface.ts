export interface PlantillaDocumento {
  id_plantilla_documento : number,
  titulo: string,
  texto: string,
  id_clasificacion_plantilla : number,
  id_etapa?: number,
  created_at: Date,
}
