import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private httpClient: HttpClient) { }

  getListtipodocumento() {
    return this.httpClient.get(`${environment.host}tipo-documento`, getHeaders())
  }

  gettipodocumento(id: number) {
    return this.httpClient.get(`${environment.host}tipo-documento/${id}`, getHeaders())
  }

  createtipodocumento(data: any): any {
    return this.httpClient.post(`${environment.host}tipo-documento`, data, getHeaders())
  }

  updatetipodocumento(id: number, data: any) {
    return this.httpClient.put(`${environment.host}tipo-documento/${id}`, data, getHeaders())
  }

  deletetipodocumento(id: number) {
    return this.httpClient.delete(`${environment.host}tipo-documento/${id}`, getHeaders())
  }
}
