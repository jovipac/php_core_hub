import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificacionDerechoService {

  constructor(private httpClient: HttpClient) { }

  getListClasificacionDerecho() {
    return this.httpClient.get(`${environment.host}clasificacion-derecho`, getHeaders())
  }

  getClasificacionDerecho(id: number) {
    return this.httpClient.get(`${environment.host}clasificacion-derecho/${id}`, getHeaders())
  }

  createClasificacionDerecho(data: any) {
    return this.httpClient.post(`${environment.host}clasificacion-derecho`, data, getHeaders())
  }

  updateClasificacionDerecho(id: number, data:any) {
    return this.httpClient.put(`${environment.host}clasificacion-derecho/${id}`, data, getHeaders())
  }

  deleteClasificacionDerecho(id: number) {
    return this.httpClient.delete(`${environment.host}clasificacion-derecho/${id}`, getHeaders())
  }


}
