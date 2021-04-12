import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteComentarioService {

  constructor(private httpClient: HttpClient) { }

  getListexpedientecomentario() {
    return this.httpClient.get(`${environment.host}expediente-comentario`, getHeaders())
  }

  getexpedientecomentario(id: number) {
    return this.httpClient.get(`${environment.host}expediente-comentario/${id}`, getHeaders())
  }

  createexpedientecomentario(data: any) {
    return this.httpClient.post(`${environment.host}expediente-comentario`, data, getHeaders())
  }

  updateexpedientecomentario(id: number, data:any) {
    return this.httpClient.put(`${environment.host}expediente-comentario/${id}`, data, getHeaders())
  }

  searchexpedientecomentario(data: any) {
    return this.httpClient.post(`${environment.host}expediente-comentario/search`, data, getHeaders())
  }


}
