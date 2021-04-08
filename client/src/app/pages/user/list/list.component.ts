import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ServicesService } from "../../../service/services.service";
import {  FuncionariosService} from '../../../service';
import { AuxiliaturaService, DependenciaService } from '../../../service/catalogos';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"


import "datatables.net-buttons/js/buttons.html5.js";

interface oficial {
  id_funcionario: number,
  codigo: String,
  nombres: String
  apellidos: String,
  email: String,
  username: String,
  id_dependencia: number,
  id_puesto: number,
  id_auxiliatura: number,
  id_rol: String,
  borrado: String,
  nombre_auxiliatura: string,
  nombre_dependencia: string,
  nombre_puesto: string,
  nombre_rol: string,
  id_usuario:number


}

interface position {
  id_puesto: number,
  nombre: String
}
interface dependency {
  id_dependencia: number,
  nombre: String
}
interface auxiliary {
  id_auxiliatura: number,
  nombre: string
}

interface rol {
  id_rol: number,
  nombre: string
}

interface rolAssigned {
  id_modulo: number,
  nombre_modulo: string,
  nombre_modulo_padre: string,
  active: boolean
}

interface states {
  id_estado: number,
  nombre: string
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public modalRef: BsModalRef;
  public errorState: boolean = false;
  public closeResult: string = '';
  public listUsers: Array<oficial>;
  public listPosition: Array<position>;
  public listDependency: Array<dependency>;
  public listAuxiliary: Array<auxiliary>;
  public listRol: Array<rol>;
  public createOficial: FormGroup;
  public updateOficial: FormGroup;
  public SerchOficial: FormGroup;
  public message: Object = {};
  private codeOficial: number = 0;
  public codeAssigned: String = "";
  public nameAssigned: String = "";
  public unassigned: Array<rolAssigned>;
  public assigned: Array<rolAssigned>;
  public codeModule: number = 0;



  public codeModuleUnassigned: number = 0;
  public assignedOne: boolean = true;
  public unassignedOne: boolean = true;

  public SentUsername: boolean = false;
  public SentEmail: boolean = false;
  public SentPdhCode: boolean = false;
  public liststates: Array<states>;


  constructor(
    private modalService: BsModalService,
    private service: ServicesService,
    private funcionarioService: FuncionariosService,
    private auxiliaturaService: AuxiliaturaService,
    private dependenciaService: DependenciaService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.buildForm();
    this.buildFormUpdate();
    this.buildFormSerch();
  }

  ngOnInit() {
    this.getListOficial();
    this.getListPostion();
    this.getListDependecy();
    this.getListAuxiliary();
    this.getListRol();
    this.getEstadosU();
  }


  private buildForm() {
    this.createOficial = this.formBuilder.group({
      codigo: ["", [Validators.required]],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
      id_dependencia: ["", [Validators.required]],
      id_puesto: ["", [Validators.required]],
      id_auxiliatura: ["", [Validators.required]],
      id_rol: ["1", [Validators.required]],
      borrado: ["", [Validators.required]]
    });
  }

  private buildFormSerch() {
    this.SerchOficial = this.formBuilder.group({
      id_estado: ["", []]
    });
  }

  private buildFormUpdate() {
    this.updateOficial = this.formBuilder.group({
      id_funcionario: [""],
      codigo: ["", [Validators.required]],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      username: ["", [Validators.required]],
      id_dependencia: ["", [Validators.required]],
      id_puesto: ["", [Validators.required]],
      id_auxiliatura: ["", [Validators.required]],
      id_rol: ["1", [Validators.required]],
      borrado: ["", [Validators.required]]
    });
  }


  /* manager modals */
  openModal(content, code) {
    this.errorState = false;
    this.ResetSenti();
    this.modalRef = this.modalService
      .show(content, { class: 'modal-xl', backdrop: 'static', keyboard: true });
    /*
      .result.then(
        (result) => { this.closeResult = "Closed with: $result"; },
        (reason) => { this.closeResult = "Dismissed $this.getDismissReason(reason)"; }
      );
    */
  }

  closeModal(modalId?: number){
    this.modalService.hide(modalId);
  }

  getOficial(codeOficial) {
    this.codeOficial = codeOficial;
    let oficial = this.listUsers.filter(lu => (lu.id_funcionario == codeOficial));
    if (oficial.length > 0) {
      this.updateOficial.setValue({
        id_funcionario: codeOficial,
        codigo: oficial[0].codigo,
        nombres: oficial[0].nombres,
        apellidos: oficial[0].apellidos,
        email: oficial[0].email,
        username: (oficial[0].username) ? oficial[0].username : "",
        id_dependencia: (oficial[0].id_dependencia) ? oficial[0].id_dependencia : "",
        id_puesto: oficial[0].id_puesto,
        id_auxiliatura: (oficial[0].id_auxiliatura) ? oficial[0].id_auxiliatura : "",
        id_rol: (oficial[0].id_rol) ? oficial[0].id_rol : "1",
        borrado: (oficial[0].borrado) ? oficial[0].borrado : "0"
      })
    }
  }
  getDismissReason(reason: any) {
    this.modalRef.hide();
  }

  /* function get position */
  getListPostion() {
    this.service.getListPosition().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listPosition = response.result;
      else
        this.listPosition = []
    }, err => {
      console.log(err)
    });
  }
  /* function get list dependency */
  getListDependecy() {
    this.dependenciaService.getListDependencia().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listDependency = response.result;
      else
        this.listDependency.length = 0
    }, err => {
      console.log(err)
    })
  }

  getListAuxiliary() {
    this.auxiliaturaService.getListAuxiliatura().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listAuxiliary = response.result;
      else
        this.listAuxiliary.length = 0
    }, err => {
      console.log(err)
    })
  }

  getListRol() {
    this.service.getListRol().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0)
        this.listRol = response.result;
      else
        this.listRol.length = 0;
    }, err => {
      console.log(err)
    })
  }
  /* Function get list of oficial */
  getListOficial() {
    this.service.getOficials().subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.listUsers = response.result;
        $(document).ready(function () {
          $('#list').DataTable({
            dom: "Bfrtip",
            buttons: [
              {
                extend: 'excel', className: 'btn btn-success', exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              }
            ],
            language: {
              "sProcessing": "Procesando...",
              "sLengthMenu": "Mostrar _MENU_ registros",
              "sZeroRecords": "No se encontraron resultados",
              "sEmptyTable": "Ningún dato disponible en esta tabla",
              "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
              "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
              "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
              "sInfoPostFix": "",
              "sSearch": "Buscar:",
              "sUrl": "",
              "sInfoThousands": ",",
              "sLoadingRecords": "Cargando...",
              "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
              },
              "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
              },
              "buttons": {
                "excel": "Descargar excel"
              }
            },
            retrieve: true,
            data: this.listUsers
          });

        });

      } else {
        this.listUsers = [];
      }
    }, err => {
      console.log(err)
    })
  }

  createNewOficial(event: Event) {
    event.preventDefault();
    this.ResetSenti();
    if (this.createOficial.valid) {

      this.service.createOficial(this.createOficial.value).subscribe(res => {
        let response: any = res;
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListOficial();
        this.toastr.success(response.message, 'Funcionarios')
        this.toastr.success(response.result.password, 'Password asignado')



        this.createOficial.reset();
        this.getDismissReason('Close click');

      }, err => {
        let error: any = err;
        if (error.error.message.username){
          this.toastr.warning( error.error.message.username[0], 'Nombre de usuario')
          this.SentUsername = true
        }
        if (error.error.message.codigo){
          this.toastr.warning(error.error.message.codigo[0], 'Código PDH') ;
          this.SentPdhCode = true
        }
        if (error.error.message.email) {
          this.toastr.warning(error.error.message.email[0], 'Email') ;
          this.SentEmail = true
        }
      })
    } else {
      this.errorState = true;
      this.message = { error: 'Todos los campos con * son requeridos...' }
    }
  }

  updateNewOficial(event: Event) {
    event.preventDefault();
    this.ResetSenti();
    if (this.updateOficial.valid) {
      this.service.updateOficial(this.codeOficial, this.updateOficial.value).subscribe(res => {
        let response: any = res;
        this.toastr.success(response.message, 'Funcionarios')
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListOficial();
        this.updateOficial.reset();
        this.getDismissReason('Close click');
      }, err => {
        let error: any = err;
        if (error.error.message.username){
          this.toastr.warning( error.error.message.username[0], 'Nombre de usuario')
          this.SentUsername = true
        }
        if (error.error.message.codigo){
          this.toastr.warning(error.error.message.codigo[0], 'Código PDH') ;
          this.SentPdhCode = true
        }
        if (error.error.message.email) {
          this.toastr.warning(error.error.message.email[0], 'Email') ;
          this.SentEmail = true
        }


        this.toastr.warning('Error al actualizar los funcionarios', 'Funcionarios')
      })
    } else {
      this.errorState = true;
      this.message = { error: 'Todos los campos con * son requeridos...' }
    }


  }
  deleteOficial(codeOficial) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Despues de inhabilitar al funcionario, no se puede revertir la accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si. Estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteOficial(codeOficial).subscribe(res => {
          let response: any = res;
          this.toastr.success(response.message, 'Funcionarios')
          $(document).ready(function () { $('#list').DataTable().destroy(); })
          this.getListOficial();

        }, err => {
          this.toastr.error('Error al inhabilitar al funcionario', 'Error')
        })
      }
    })
  }

  loadModuleAssigned(codeOficial) {
    console.log(codeOficial);
    this.codeOficial = codeOficial;
    let user = this.listUsers.filter(lu => (lu.id_usuario == codeOficial));
    if (user.length > 0) {
      this.codeAssigned = user[0].codigo;
      this.nameAssigned = user[0].username;
    }
    this.spinner.show();
    this.UserUnassigned(codeOficial);
    this.UserAssigned(codeOficial);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }


  async UserUnassigned(codeRol) {
    this.service.UserUnassigned(codeRol).subscribe(res => {
      let response: any = res;
      this.unassigned = response.result.map(r => {
        return {
          id_modulo: r.id_modulo,
          nombre_modulo: r.nombre_modulo,
          nombre_modulo_padre: r.nombre_modulo_padre,
          active: false
        }
      })
    }, err => {
      console.log(err)
    })
  }

  async UserAssigned(codeRol) {
    this.service.UserAssigned(codeRol).subscribe(res => {
      let response: any = res;
      this.assigned = response.result.map(r => {
        return {
          id_modulo: r.id_modulo,
          nombre_modulo: r.nombre_modulo,
          nombre_modulo_padre: r.nombre_modulo_padre,
          active: false
        }
      })
    }, err => {
      console.log(err)
    })
  }

  selectAsignatureAccess(codeModule) {
    this.codeModule = codeModule;
    this.assignedOne = false;
    this.unassignedOne = true;
    /* cambiar el estado a true al elemento */
    let positionActive = this.unassigned.map((u) => u.active).indexOf(true);
    let positionNoActive = this.unassigned.map((u) => u.id_modulo).indexOf(codeModule);
    if (positionActive !== positionNoActive) {
      this.unassigned[positionNoActive].active = true;
      if (positionActive !== -1) {
        this.unassigned[positionActive].active = false;
      }
    }
  }

  selectUnasignatureAccess(codeModule) {
    this.codeModuleUnassigned = codeModule;
    this.unassignedOne = false;
    this.assignedOne = true;
    /* cambiar el estado a true al elemento */
    let positionActive = this.assigned.map((u) => u.active).indexOf(true);
    let positionNoActive = this.assigned.map((u) => u.id_modulo).indexOf(codeModule);
    if (positionActive !== positionNoActive) {
      this.assigned[positionNoActive].active = true;
      if (positionActive !== -1) {
        this.assigned[positionActive].active = false;
      }
    }
  }


  UserAssignedOne() {
    this.service.createUserModule({
      "id_usuario": this.codeOficial,
      "id_modulo": this.codeModule
    }).subscribe(res => {
      this.assignedOne = true;
      this.unassignedOne = true;
      this.unassigned.length = 0;
      this.assigned.length = 0;
      this.UserUnassigned(this.codeOficial);
      this.UserAssigned(this.codeOficial);
      this.toastr.success('Modulo/herramienta asigando correctamente')
    }, err => {
      console.log(err)
    })
  }

  UserAssignedAll() {
    this.spinner.show();
    let temp = [];
    for (let u of this.unassigned) {
      temp.push(u)
    }
    this.unassigned.length = 0;
    this.assigned.length = 0;
    for (let rol of temp) {
      let elemts = {
        "id_usuario": this.codeOficial,
        "id_modulo": rol.id_modulo
      }
      this.service.createUserModule({
        "id_usuario": this.codeOficial,
        "id_modulo": rol.id_modulo
      }).subscribe(res => {
        this.toastr.success(`Se ha asignado correctamente el modulo/herramienta`)
      }, err => {
        this.toastr.success(`No se ha asignado correctamente el modulo/herramienta`)
      })
    }
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.UserUnassigned(this.codeOficial);
      this.UserAssigned(this.codeOficial);
      this.spinner.hide();
    }, 2000);
  }

  async UserUnassignedOne() {
    this.service.deleteUserModule(this.codeOficial, { id_modulo: this.codeModuleUnassigned }).subscribe(res => {
      this.unassigned.length = 0;
      this.assigned.length = 0;
      this.unassignedOne = true;
      this.assignedOne = true;
      let response: any = res;
      this.UserUnassigned(this.codeOficial);
      this.UserAssigned(this.codeOficial);
      this.toastr.success('Modulo/herramienta desasignado correctamente')
    }, err => {
      console.log(err)
    })
  }

  UserlUnassignedAll() {
    this.spinner.show();
    let temp = [];
    for (let u of this.assigned) {
      temp.push(u)
    }
    console.log(temp)
    this.unassigned.length = 0;
    this.assigned.length = 0;
    for (let rol of temp) {
      this.service.deleteUserModule(this.codeOficial, {
        "id_modulo": rol.id_modulo
      }).subscribe(res => {
        this.toastr.success(`Se ha desasignado correctamente el modulo/herramienta`)
      }, err => {
        this.toastr.success(`No se ha desasignado correctamente el modulo/herramienta`)
      })
    }
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.UserUnassigned(this.codeOficial);
      this.UserAssigned(this.codeOficial);
      this.spinner.hide();
    }, 2000);
  }

  ResetSenti(){
    this.SentUsername = false;
    this.SentEmail = false;
    this.SentPdhCode = false;
  }

  getEstadosU(){
    let list = [ { id_estado: 1 , nombre: "Activo"  }, { id_estado: 0  , "nombre": "Inactivo"} ];
    this.liststates = list;
  }


  getTrashEmployees() {
    this.funcionarioService.getTrashEmployees().subscribe(res => {
      let response: any = res;
      console.log(response)
      if (response.result.length > 0) {
        this.listUsers = response.result;
        $(document).ready(function () {
          $('#list').DataTable({
            dom: "Bfrtip",
            buttons: [
              {
                extend: 'excel', className: 'btn btn-danger', exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              }
            ],
            language: {
              "sProcessing": "Procesando...",
              "sLengthMenu": "Mostrar _MENU_ registros",
              "sZeroRecords": "No se encontraron resultados",
              "sEmptyTable": "Ningún dato disponible en esta tabla",
              "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
              "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
              "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
              "sInfoPostFix": "",
              "sSearch": "Buscar:",
              "sUrl": "",
              "sInfoThousands": ",",
              "sLoadingRecords": "Cargando...",
              "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
              },
              "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
              },
              "buttons": {
                "excel": "Descargar excel"
              }
            },
            retrieve: true,
            data: this.listUsers
          });

        });

      } else {
        this.listUsers = [];
      }
    }, err => {
      console.log(err)
    })
  }


  GetUser(){
    let estado = this.SerchOficial.value.id_estado;

    if(estado == 1){
      this.getListOficial();
    }else{
      this.getTrashEmployees();
    }
  }

}
