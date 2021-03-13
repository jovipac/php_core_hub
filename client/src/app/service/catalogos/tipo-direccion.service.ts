import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDireccionService {

  constructor(private httpClient: HttpClient) { }

  getListTipoDireccion() {
    return this.httpClient.get(`${environment.host}tipo-direccion`, getHeaders())
  }

  getTipoDireccion(id: number) {
    return this.httpClient.get(`${environment.host}tipo-direccion/${id}`, getHeaders())
  }

  createTipoDireccion(data: any) {
    return this.httpClient.post(`${environment.host}tipo-direccion`, data, getHeaders())
  }

  updateTipoDireccion(id: number, data: any) {
    return this.httpClient.put(`${environment.host}tipo-direccion/${id}`, data, getHeaders())
  }

  deleteTipoDireccion(id: number) {
    return this.httpClient.delete(`${environment.host}tipo-direccion/${id}`, getHeaders())
  }

}
