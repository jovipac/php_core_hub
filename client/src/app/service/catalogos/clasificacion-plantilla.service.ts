import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionPlantillaService {

  constructor(private httpClient: HttpClient) { }

  getListClasificacionPlantilla() {
    return this.httpClient.get(`${environment.host}clasificacion-plantilla`, getHeaders())
  }

  getClasificacionPlantilla(id: number) {
    return this.httpClient.get(`${environment.host}clasificacion-plantilla/${id}`, getHeaders())
  }

  createClasificacionPlantilla(data: any) {
    return this.httpClient.post(`${environment.host}clasificacion-plantilla`, data, getHeaders())
  }

  updateClasificacionPlantilla(id: number, data:any) {
    return this.httpClient.put(`${environment.host}clasificacion-plantilla/${id}`, data, getHeaders())
  }

  deleteClasificacionPlantilla(id: number) {
    return this.httpClient.delete(`${environment.host}clasificacion-plantilla/${id}`, getHeaders())
  }

}
