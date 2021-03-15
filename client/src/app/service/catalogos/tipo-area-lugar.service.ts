import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoAreaLugarService {

  constructor(private httpClient: HttpClient) { }

  getListTipoAreaLugar() {
    return this.httpClient.get(`${environment.host}tipo-area-lugar`, getHeaders())
  }

  getTipoAreaLugar(id: number) {
    return this.httpClient.get(`${environment.host}tipo-area-lugar/${id}`, getHeaders())
  }

  createTipoAreaLugar(data: any) {
    return this.httpClient.post(`${environment.host}tipo-area-lugar`, data, getHeaders())
  }

  updateTipoAreaLugar(id: number, data: any) {
    return this.httpClient.put(`${environment.host}tipo-area-lugar/${id}`, data, getHeaders())
  }

  deleteTipoAreaLugar(id: number) {
    return this.httpClient.delete(`${environment.host}tipo-area-lugar/${id}`, getHeaders())
  }

}
