import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EscolaridadService {
  constructor(private httpClient: HttpClient) { }

  getListescolaridad() {
    return this.httpClient.get(`${environment.host}escolaridad`, getHeaders())
  }

  getescolaridad(id: number) {
    return this.httpClient.get(`${environment.host}escolaridad/${id}`, getHeaders())
  }

  createescolaridad(data: any): any {
    return this.httpClient.post(`${environment.host}escolaridad`, data, getHeaders())
  }

  updateescolaridad(id: number, data: any) {
    return this.httpClient.put(`${environment.host}escolaridad/${id}`, data, getHeaders())
  }

  deleteescolaridad(id: number) {
    return this.httpClient.delete(`${environment.host}escolaridad/${id}`, getHeaders())
  }
}
