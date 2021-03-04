import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private httpClient: HttpClient) { }

  getListResultado() {
    return this.httpClient.get(`${environment.host}resultado`, getHeaders())
  }

  getResultado(id: number) {
    return this.httpClient.get(`${environment.host}resultado/${id}`, getHeaders())
  }

  createResultado(data: any) {
    return this.httpClient.post(`${environment.host}resultado`, data, getHeaders())
  }

  updateResultado(id: number, data: any) {
    return this.httpClient.put(`${environment.host}resultado/${id}`, data, getHeaders())
  }

  deleteResultado(id: number) {
    return this.httpClient.delete(`${environment.host}resultado/${id}`, getHeaders())
  }

}
