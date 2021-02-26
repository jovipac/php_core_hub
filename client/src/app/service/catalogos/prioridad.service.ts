import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {

  constructor(private httpClient: HttpClient) { }

  getListPrioridad() {
    return this.httpClient.get(`${environment.host}prioridad`, getHeaders())
  }

  createPrioridad(data) {
    return this.httpClient.post(`${environment.host}prioridad`, data, getHeaders())
  }

  updatePrioridad(id, data) {
    return this.httpClient.put(`${environment.host}prioridad/${id}`, data, getHeaders())
  }

  deletePrioridad(id) {
    return this.httpClient.delete(`${environment.host}prioridad/${id}`, getHeaders())
  }

}
