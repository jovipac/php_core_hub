import { Component, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ServicesService } from '../../../service/services.service';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2'
import { NgxSpinnerService } from "ngx-spinner";

import "datatables.net-buttons/js/buttons.html5.js";
import { timeout } from 'rxjs-compat/operator/timeout';

interface rol {
  id_rol: number
  slug: String,
  nombre: String,
  descripcion?: String
}

interface rolAssigned {
  id_modulo: number,
  nombre_modulo: string,
  nombre_modulo_padre: string,
  active: boolean
}

@Component({
  selector: 'app-maintance-profile',
  templateUrl: './maintance-profile.component.html',
  styleUrls: ['./maintance-profile.component.scss']
})
export class MaintanceProfileComponent implements OnInit {
  public errorState: boolean = false;
  public closeResult: string = '';
  public message: Object = {};
  public listRol: Array<rol>;
  public createProfile: FormGroup;
  public updatingProfile: FormGroup;
  public codeProfile: number = 0;
  public unassigned: Array<rolAssigned>;
  public assigned: Array<rolAssigned>;
  public codeRol: number = 0;
  public codeModule: number = 0;
  public codeModuleUnassigned: number = 0;
  public assignedOne: boolean = true;
  public unassignedOne: boolean = true;
  public codeAssigned: String = "";
  public nameAssigned: String = "";

  constructor(
    private modalService: NgbModal,
    private service: ServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    this.buildForm();
    this.buildFormUpdate();
  }

  ngOnInit() {
    this.getListRol();
  }
  private buildForm() {
    this.createProfile = this.formBuilder.group({
      codigo: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      borrado: ["", [Validators.required]],
      slug: ["", [Validators.required]],
    });
  }

  private buildFormUpdate() {
    this.updatingProfile = this.formBuilder.group({
      slug: ["", [Validators.required]],
      nombre: ["", [Validators.required]],
      borrado: ["", [Validators.required]],
      descripcion: ["", [Validators.required]],
    });
  }
  /* manager modals */
  open(content, code) {
    this.errorState = false;
    this.modalService
      .open(content, { size: "xl", centered: false })
      .result.then(
        (result) => { this.closeResult = "Closed with: $result"; },
        (reason) => { this.closeResult = "Dismissed $this.getDismissReason(reason)"; }
      );
  }

  getDismissReason(reason: any) {
    this.modalService.dismissAll(reason);
  }

  getListRol() {
    this.service.getListRol().subscribe(res => {
      let response: any = res;
      if (response.result.length > 0) {
        this.listRol = response.result;
        $(document).ready(function () {
          $('#list').DataTable({
            dom: "Bfrtip",
            buttons: [
              {
                extend: 'excel', className: 'btn btn-success', exportOptions: {
                  columns: [0, 1, 2]
                }
              }
            ],
            "language": {
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
            data: this.listRol
          });
        });
      }
      else {
        this.listRol.length = 0
      }
    }, err => {
      console.log(err)
    })
  }

  getRol(codeProfile) {
    this.codeProfile = codeProfile;
    let profile = this.listRol.filter(lr => (lr.id_rol == codeProfile));

    if (profile.length > 0) {
      this.updatingProfile.setValue({
        slug: (profile[0].slug) ? profile[0].slug : "",
        nombre: profile[0].nombre,
        borrado: "0",
        descripcion: (profile[0].descripcion) ? profile[0].descripcion : '',
      })
    }
  }

  newProfile(event: Event) {
    event.preventDefault();
    if (this.createProfile.valid) {
      this.service.createRol(this.createProfile.value).subscribe(res => {
        let response: any = res;
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListRol();
        this.toastr.success(response.message, 'Perfiles')
        this.createProfile.reset();
        this.getDismissReason('Close click');
      }, err => {
        console.log(err)
      })
      this.errorState = false;

    } else {
      this.errorState = true;
      this.message = { error: "Todos los campos con * son necesarios..." }
    }
  }

  updateProfiles(event: Event) {
    this.errorState = false;
    event.preventDefault();
    if (this.updatingProfile.valid) {
      this.errorState = false;
      this.service.updateRol(this.codeProfile, this.updatingProfile.value).subscribe(res => {
        let response: any = res;
        $(document).ready(function () { $('#list').DataTable().destroy(); })
        this.getListRol();
        this.toastr.success(response.message, 'Funcionarios')
        this.updatingProfile.reset();
        this.getDismissReason('Close click');
      }, err => {
        console.log(err)
      })
    } else {
      this.errorState = true;
      this.message = { error: 'Todos los campos con * son necesarios...' }
    }
  }

  deleteProfile(codeOficial) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Despues de inhabilitar el perfil, no se podra revertir la acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si. Estoy seguro',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteRol(codeOficial).subscribe(res => {
          let response: any = res;
          this.toastr.success(response.message, 'Perfiles')
          $(document).ready(function () { $('#list').DataTable().destroy(); })
          this.getListRol();

        }, err => {
          this.toastr.error('Error al inhabilitar al funcionario', 'Error')
        })
      }
    })
  }

  loadModuleAssigned(codeRol) {

    this.assignedOne = true;
    this.unassignedOne = true;
    this.codeRol = codeRol;
    let temp = this.listRol.filter(lr => (lr.id_rol == codeRol));
    if (temp.length > 0) {
      this.codeAssigned = temp[0].slug;
      this.nameAssigned = temp[0].nombre;
    }
    this.spinner.show();
    this.rolUnassigned(codeRol);
    this.rolAssigned(codeRol);
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
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

  async rolUnassigned(codeRol) {
    this.service.rolUnassigned(codeRol).subscribe(res => {
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

  async rolAssigned(codeRol) {
    this.service.rolAssigned(codeRol).subscribe(res => {
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


  rolAssignedOne() {
    this.service.createRolModule({
      "id_rol": this.codeRol,
      "id_modulo": this.codeModule
    }).subscribe(res => {
      this.assignedOne = true;
      this.unassignedOne = true;
      this.unassigned.length = 0;
      this.assigned.length = 0;
      this.rolUnassigned(this.codeRol);
      this.rolAssigned(this.codeRol);
      this.toastr.success('Modulo/herramienta asigando correctamente')
    }, err => {
      console.log(err)
    })
  }

  rollAssignedAll() {
    this.spinner.show();
    let temp = [];
    for (let u of this.unassigned) {
      temp.push(u)
    }
    this.unassigned.length = 0;
    this.assigned.length = 0;
    for (let rol of temp) {
      let elemts = {
        "id_rol": this.codeRol,
        "id_modulo": rol.id_modulo
      }
      this.service.createRolModule({
        "id_rol": this.codeRol,
        "id_modulo": rol.id_modulo
      }).subscribe(res => {
        this.toastr.success(`Se ha asignado correctamente el modulo/herramienta`)
      }, err => {
        this.toastr.success(`No se ha asignado correctamente el modulo/herramienta`)
      })
    }
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.rolUnassigned(this.codeRol);
      this.rolAssigned(this.codeRol);
      this.spinner.hide();
    }, 2000);
  }

  async rolUnassignedOne() {
    this.service.deleteRolModule(this.codeRol, { id_modulo: this.codeModuleUnassigned }).subscribe(res => {
      this.unassigned.length = 0;
      this.assigned.length = 0;
      this.unassignedOne = true;
      this.assignedOne = true;
      let response: any = res;
      this.rolUnassigned(this.codeRol);
      this.rolAssigned(this.codeRol);
      this.toastr.success('Modulo/herramienta desasignado correctamente')
    }, err => {
      console.log(err)
    })
  }

  rollUnassignedAll() {
    this.spinner.show();
    let temp = [];
    for (let u of this.assigned) {
      temp.push(u)
    }
    console.log(temp)
    this.unassigned.length = 0;
    this.assigned.length = 0;
    for (let rol of temp) {
      this.service.deleteRolModule(this.codeRol, {
        "id_modulo": rol.id_modulo
      }).subscribe(res => {
        this.toastr.success(`Se ha desasignado correctamente el modulo/herramienta`)
      }, err => {
        this.toastr.success(`No se ha desasignado correctamente el modulo/herramienta`)
      })
    }
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.rolUnassigned(this.codeRol);
      this.rolAssigned(this.codeRol);
      this.spinner.hide();
    }, 2000);
  }


}
