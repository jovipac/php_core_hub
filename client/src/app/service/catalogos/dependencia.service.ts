import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DependenciaService {

  constructor(private httpClient: HttpClient) { }

  getListDependencia() {
    return this.httpClient.get(`${environment.host}dependencias`, getHeaders())
  }

  getDependencia(id: number) {
    return this.httpClient.get(`${environment.host}dependencias/${id}`, getHeaders())
  }

  createDependencia(data: any) {
    return this.httpClient.post(`${environment.host}dependencias`, data, getHeaders())
  }

  updateDependencia(id: number, data:any) {
    return this.httpClient.put(`${environment.host}dependencias/${id}`, data, getHeaders())
  }

  deleteDependencia(id: number) {
    return this.httpClient.delete(`${environment.host}dependencias/${id}`, getHeaders())
  }

}
