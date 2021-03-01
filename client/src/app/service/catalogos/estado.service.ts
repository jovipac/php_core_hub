import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private httpClient: HttpClient) { }

  getListEstado() {
    return this.httpClient.get(`${environment.host}estado`, getHeaders())
  }

  createEstado(data) {
    return this.httpClient.post(`${environment.host}estado`, data, getHeaders())
  }

  updateEstado(id, data) {
    return this.httpClient.put(`${environment.host}estado/${id}`, data, getHeaders())
  }

  deleteEstado(id) {
    return this.httpClient.delete(`${environment.host}estado/${id}`, getHeaders())
  }

}
