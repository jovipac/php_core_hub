import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoVinculacionService {

  constructor(private httpClient: HttpClient) { }

  getListTipoVinculacion() {
    return this.httpClient.get(`${environment.host}tipo-vinculacion`, getHeaders())
  }

  getTipoVinculacion(id: number) {
    return this.httpClient.get(`${environment.host}tipo-vinculacion/${id}`, getHeaders())
  }

  createTipoVinculacion(data: any): any {
    return this.httpClient.post(`${environment.host}tipo-vinculacion`, data, getHeaders())
  }

  updateTipoVinculacion(id: number, data: any) {
    return this.httpClient.put(`${environment.host}tipo-vinculacion/${id}`, data, getHeaders())
  }

  deleteTipoVinculacion(id: number) {
    return this.httpClient.delete(`${environment.host}tipo-vinculacion/${id}`, getHeaders())
  }

}
