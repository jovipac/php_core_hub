import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private httpClient: HttpClient) { }

  getListDepartamento() {
    return this.httpClient.get(`${environment.host}departamento`, getHeaders())
  }

  getDepartamento(id: number) {
    return this.httpClient.get(`${environment.host}departamento/${id}`, getHeaders())
  }

  createDepartamento(data: any) {
    return this.httpClient.post(`${environment.host}departamento`, data, getHeaders())
  }

  updateDepartamento(id: number, data: any) {
    return this.httpClient.put(`${environment.host}departamento/${id}`, data, getHeaders())
  }

  deleteDepartamento(id: number) {
    return this.httpClient.delete(`${environment.host}departamento/${id}`, getHeaders())
  }

}
