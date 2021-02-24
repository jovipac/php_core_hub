import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { getHeaders } from '../../shared/utils/helpers';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private httpClient: HttpClient) { }

  getListGenero() {
    return this.httpClient.get(`${environment.host}genero`, getHeaders())
  }

  createGenero(data) {
    return this.httpClient.post(`${environment.host}genero`, data, getHeaders())
  }

  updateGenero(id, data) {
    return this.httpClient.put(`${environment.host}genero/${id}`, data, getHeaders())
  }

  deleteGenero(id) {
    return this.httpClient.delete(`${environment.host}genero/${id}`, getHeaders())
  }

}
