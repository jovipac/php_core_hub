import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { ConditionalExpr } from '@angular/compiler';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {
  }

  /* Function init params */
  private createHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "authorization": `${JSON.parse(sessionStorage.getItem('validate')).tokenType} ${JSON.parse(sessionStorage.getItem('validate')).accessToken}`
      })
    };

  }

  /* Services from login and logout */
  /* Service from logout */
  /**
   *
   * @param auth : json from auth
   * @function login
   * @returns true and false, if exist user
   */
  signIn(auth) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.httpClient.post(`${environment.host}auth/login`, auth, httpOptions);
  }
  /* service logout */
  /**
   * @function logout
   * @returns true and false, delete token
   */
  logout() {
    return this.httpClient.get(`${environment.host}auth/logout`, this.createHeaders());
  }
  /* End services from login and logout */

  /* Start service from oficial */
  /* Maintance from oficial */
  getOficials() {
    return this.httpClient.get(`${environment.host}funcionario/list`, this.createHeaders())
  }

  getOficial(id) {
    return this.httpClient.get(`${environment.host}funcionarios/${id}`, this.createHeaders())
  }

  createOficial(data) {
    return this.httpClient.post(`${environment.host}funcionarios/`, data, this.createHeaders())
  }

  updateOficial(id, data) {
    return this.httpClient.put(`${environment.host}funcionarios/${id}`, data, this.createHeaders())
  }

  deleteOficial(id) {
    return this.httpClient.delete(`${environment.host}funcionarios/${id}`, this.createHeaders())
  }

  /* End service from oficial */

  getListDependency() {
    return this.httpClient.get(`${environment.host}dependencias`, this.createHeaders())
  }

  getListPosition() {
    return this.httpClient.get(`${environment.host}puestos`, this.createHeaders())
  }

  getListAuxiliary() {
    return this.httpClient.get(`${environment.host}auxiliaturas`, this.createHeaders())
  }

  /* routing from rol */
  getListRol() {
    return this.httpClient.get(`${environment.host}roles`, this.createHeaders())
  }

  createRol(data) {
    return this.httpClient.post(`${environment.host}roles`, data, this.createHeaders())
  }

  updateRol(id, data) {
    return this.httpClient.put(`${environment.host}roles/${id}`, data, this.createHeaders())
  }

  deleteRol(id) {
    return this.httpClient.delete(`${environment.host}roles/${id}`, this.createHeaders())
  }

  /*start module of roles */
  /* rol assigned */
  rolAssigned(codeRol) {
    return this.httpClient.get(`${environment.host}rol-modulos/assigned/${codeRol}`, this.createHeaders());
  }
  /* rol unassigned filter ID*/
  rolUnassigned(codeRol) {
    return this.httpClient.get(`${environment.host}rol-modulos/unassigned/${codeRol}`, this.createHeaders())
  }
  /* rol from modules */
  rolModule() {
    return this.httpClient.get(`${environment.host}rol-modulos`, this.createHeaders())
  }
  /* rol from module filter per ID */
  searchRolModule(codeRol) {
    return this.httpClient.get(`${environment.host}rol-modulos/${codeRol}`, this.createHeaders())
  }
  /* update rol module */
  updateRolModule(codeRol, data) {
    return this.httpClient.put(`${environment.host}rol-modulos/${codeRol}`, data, this.createHeaders());
  }
  /* create rol module */
  createRolModule(data) {
    return this.httpClient.post(`${environment.host}rol-modulos`, data, this.createHeaders());
  }
  /* create rol module */
  deleteRolModule(id, data) {
    return this.httpClient.post(`${environment.host}rol-modulos/delete/${id}`, data, this.createHeaders());
  }
  /* endmodule of roles */



  /* End maintance users */
  getMenu(data) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(`${environment.host}usuario-modulos/menu`, data, this.createHeaders()).subscribe(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  /* SERVICE OF MONITOR REASON */
  getListReason() {
    return this.httpClient.get(`${environment.host}motivos`, this.createHeaders())
  }

  getListVisit(data) {
    return this.httpClient.post(`${environment.host}visitas/search`, data , this.createHeaders())
  }

  updateVisit(codeRol, data) {
    return this.httpClient.put(`${environment.host}visitas/${codeRol}`, data, this.createHeaders());
  }


  /*start module of user */
  /* user assigned */
  UserAssigned(codeRol) {
    return this.httpClient.get(`${environment.host}usuario-modulos/assigned/${codeRol}`, this.createHeaders())
  }

  /* user unassigned filter ID*/
  UserUnassigned(codeRol) {
    return this.httpClient.get(`${environment.host}usuario-modulos/unassigned/${codeRol}`, this.createHeaders());
  }

  /* create user add new module */
  createUserModule(data) {
    return this.httpClient.post(`${environment.host}usuario-modulos`, data, this.createHeaders());
  }

  /* create user delete module */
  deleteUserModule(id, data) {
    return this.httpClient.post(`${environment.host}usuario-modulos/delete/${id}`, data, this.createHeaders());
  }



}
