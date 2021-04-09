import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoConyugalService {

  constructor(private httpClient: HttpClient) { }

  getListEstadoConyugal() {
    return this.httpClient.get(`${environment.host}estado-conyugal`, getHeaders())
  }

  getEstadoConyugal(id: number) {
    return this.httpClient.get(`${environment.host}estado-conyugal/${id}`, getHeaders())
  }

  createEstadoConyugal(data: any): any {
    return this.httpClient.post(`${environment.host}estado-conyugal`, data, getHeaders())
  }

  updateEstadoConyugal(id: number, data: any) {
    return this.httpClient.put(`${environment.host}estado-conyugal/${id}`, data, getHeaders())
  }

  deleteEstadoConyugal(id: number) {
    return this.httpClient.delete(`${environment.host}estado-conyugal/${id}`, getHeaders())
  }

}
