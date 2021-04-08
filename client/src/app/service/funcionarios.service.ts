import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private httpClient: HttpClient) { }

  getEmployees() {
    return this.httpClient.get(`${environment.host}funcionarios`, getHeaders())
  }

  getListEmployees() {
    return this.httpClient.get(`${environment.host}funcionario/list`, getHeaders())
  }

  getEmployee(id: number) {
    return this.httpClient.get(`${environment.host}funcionarios/${id}`, getHeaders())
  }

  createEmployee(data: object) {
    return this.httpClient.post(`${environment.host}funcionarios/`, data, getHeaders())
  }

  updateEmployee(id: number, data) {
    return this.httpClient.put(`${environment.host}funcionarios/${id}`, data, getHeaders())
  }

  deleteEmployee(id: number) {
    return this.httpClient.delete(`${environment.host}funcionarios/${id}`, getHeaders())
  }

  getTrashEmployees() {
    return this.httpClient.post(`${environment.host}funcionario/trash`, getHeaders())
  }

}
