import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoViolenciaService {
  constructor(private httpClient: HttpClient) { }

  getListtipoviolencia() {
    return this.httpClient.get(`${environment.host}tipo-violencia`, getHeaders())
  }

  gettipoviolencia(id: number) {
    return this.httpClient.get(`${environment.host}tipo-violencia/${id}`, getHeaders())
  }

  createtipoviolencia(data: any): any {
    return this.httpClient.post(`${environment.host}tipo-violencia`, data, getHeaders())
  }

  updatetipoviolencia(id: number, data: any) {
    return this.httpClient.put(`${environment.host}tipo-violencia/${id}`, data, getHeaders())
  }

  deletetipoviolencia(id: number) {
    return this.httpClient.delete(`${environment.host}tipo-violencia/${id}`, getHeaders())
  }
}
