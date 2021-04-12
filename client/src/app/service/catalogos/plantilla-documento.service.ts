import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantillaDocumentoService {

  constructor(private httpClient: HttpClient) { }

  getListPlantillaDocumento() {
    return this.httpClient.get(`${environment.host}plantilla-documento`, getHeaders())
  }

  searchPlantillaDocumento(data: any) {
    return this.httpClient.post(`${environment.host}plantilla-documento/search`, data , getHeaders())
  }

  getPlantillaDocumento(id: number) {
    return this.httpClient.get(`${environment.host}plantilla-documento/${id}`, getHeaders())
  }

  createPlantillaDocumento(data: any) {
    return this.httpClient.post(`${environment.host}plantilla-documento`, data, getHeaders())
  }

  updatePlantillaDocumento(id: number, data:any) {
    return this.httpClient.put(`${environment.host}plantilla-documento/${id}`, data, getHeaders())
  }

  deletePlantillaDocumento(id: number) {
    return this.httpClient.delete(`${environment.host}plantilla-documento/${id}`, getHeaders())
  }

}
