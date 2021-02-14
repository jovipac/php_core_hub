import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicesService } from "../../../service/services.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2'

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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  public errorState: boolean = false;
  public closeResult: string = '';
  public listUsers: Array<oficial>;
  public listPosition: Array<position>;
  public listDependency: Array<dependency>;
  public listAuxiliary: Array<auxiliary>;
  public listRol: Array<rol>;
  public createOficial: FormGroup;
  public updateOficial: FormGroup;
  public message: Object = {};
  private codeOficial: number = 0;
  constructor(
    private modalService: NgbModal,
    private service: ServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
    this.buildForm();
    this.buildFormUpdate();
  }

  ngOnInit() {
    this.getListOficial();
    this.getListPostion();
    this.getListDependecy();
    this.getListAuxiliary();
    this.getListRol();
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
  open(content, code) {
    this.modalService
      .open(content, { size: "xl", centered: false })
      .result.then(
        (result) => { this.closeResult = "Closed with: $result"; },
        (reason) => { this.closeResult = "Dismissed $this.getDismissReason(reason)"; }
      );
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
    this.modalService.dismissAll(reason);
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
    this.service.getListDependency().subscribe(res => {
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
    this.service.getListAuxiliary().subscribe(res => {
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
    if (this.createOficial.valid) {
      this.service.createOficial(this.createOficial.value).subscribe(res => {
        let response: any = res;
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListOficial();
        this.toastr.success(response.message, 'Funcionarios')
        this.createOficial.reset();
        this.getDismissReason('Close click');

      }, err => {
        let error: any = err;
        if (error.error.message.username)
          this.toastr.error(error.error.message.username[0], 'Error')
      })
    } else {
      this.errorState = true;
      this.message = { error: 'Todos los campos con * son requeridos...' }
    }
  }

  updateNewOficial(event: Event) {
    event.preventDefault();
    if (this.updateOficial.valid) {
      this.service.updateOficial(this.codeOficial, this.updateOficial.value).subscribe(res => {
        let response: any = res;
        this.toastr.success(response.message.message, 'Funcionarios')
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListOficial();
        this.updateOficial.reset();
        this.getDismissReason('Close click');
      }, err => {
        let error: any = err;
        this.toastr.success('Error al actualizar los funcionarios', 'Funcionarios')
      })
    } else {
      this.errorState = true;
      this.message = { error: 'Todos los campos con * son requeridos...' }
    }


  }
  deleteOficial(codeOficial) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Despues de eliminar al funcionario, no se puede revertir la accion!",
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
          this.toastr.error('Error al eliminar al funcionario', 'Error')
        })
      }
    })
  }

}
