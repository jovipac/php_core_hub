import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaturaService {

  constructor(private httpClient: HttpClient) { }

  getListAuxiliatura() {
    return this.httpClient.get(`${environment.host}auxiliaturas`, getHeaders())
  }

  getListAuxiliaturaTramite() {
    return this.httpClient.get(`${environment.host}auxiliaturas`, getHeaders())
  }


  getAuxiliatura(id: number) {
    return this.httpClient.get(`${environment.host}auxiliaturas/${id}`, getHeaders())
  }

  createAuxiliatura(data: any) {
    return this.httpClient.post(`${environment.host}auxiliaturas`, data, getHeaders())
  }

  updateAuxiliatura(id: number, data:any) {
    return this.httpClient.put(`${environment.host}auxiliaturas/${id}`, data, getHeaders())
  }

  deleteAuxiliatura(id: number) {
    return this.httpClient.delete(`${environment.host}auxiliaturas/${id}`, getHeaders())
  }

}
