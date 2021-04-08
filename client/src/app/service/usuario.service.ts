import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../shared/utils/helpers';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  getListUsers() {
    return this.httpClient.get(`${environment.host}users`, getHeaders())
  }

  searchUsers(data) {
    return this.httpClient.post(`${environment.host}users/search`, data , getHeaders())
  }

  getUsers(id) {
    return this.httpClient.get(`${environment.host}users/${id}`, getHeaders())
  }

  createUsers(data) {
    return this.httpClient.post(`${environment.host}users`, data, getHeaders());
  }

  updateUsers(id, data) {
    return this.httpClient.put(`${environment.host}users/${id}`, data, getHeaders());
  }

  deleteUsers(id) {
    return this.httpClient.delete(`${environment.host}users/${id}`, getHeaders())
  }

  trashUsers(data) {
    return this.httpClient.post(`${environment.host}users/trash`, data , getHeaders())
  }

}
