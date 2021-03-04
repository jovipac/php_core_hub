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

  getGenero(id: number) {
    return this.httpClient.get(`${environment.host}genero/${id}`, getHeaders())
  }


  createGenero(data: any) {
    return this.httpClient.post(`${environment.host}genero`, data, getHeaders())
  }

  updateGenero(id: number, data: any) {
    return this.httpClient.put(`${environment.host}genero/${id}`, data, getHeaders())
  }

  deleteGenero(id: number) {
    return this.httpClient.delete(`${environment.host}genero/${id}`, getHeaders())
  }

}
