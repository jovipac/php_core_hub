import { Component, OnInit } from '@angular/core';
import { ServicesService } from "../../../service/services.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from "ngx-spinner"
import "datatables.net-buttons/js/buttons.html5.js";


@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})

export class ChangepwdComponent implements OnInit {

  public frmCambiarClave: FormGroup;
  public errorState: boolean = false;
  public message: Object = {};
  public SentPdhCode: boolean = false;


  constructor(
    private service: ServicesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    //private spinner: NgxSpinnerService
  ) {
    this.buildForm();


  }

  ngOnInit() {
    //this.buildForm();

  }


  private buildForm() {
    this.frmCambiarClave = this.formBuilder.group({
      nuevaClave: ["", [Validators.required]],
      confNuevaClave: ["", [Validators.required]]
    });
  }

  cambiarClave(event: Event) {
    event.preventDefault();
    if (this.frmCambiarClave.valid) {

      if (this.frmCambiarClave.value['nuevaClave'] == this.frmCambiarClave.value['confNuevaClave']) {

        let VarFuncionario;
        VarFuncionario = JSON.parse(sessionStorage.getItem('validate'));
        let codesSession;
        codesSession = JSON.parse(VarFuncionario['codes']);

        let objectToSend = {
          password: this.frmCambiarClave.value['confNuevaClave'],
          id_usuario: codesSession['id_usuario']
        };
        ////se ejecuta el servicio
        this.service.updatePassword(objectToSend).subscribe(res => {

          let response: any = res;
          this.toastr.success(response.message, 'Cambiar Clave')
          $(document).ready(
            function () { 
              $('#list').DataTable().destroy();
             }
          )
          
        }, err => {
          let error: any = err;
            this.toastr.error('Error al cambiar el Clave', 'Cambiar Clave')
           
        })



    
        this.errorState = false;

      } else {
        this.errorState = true;
        this.message = { error: 'Las Claves ingresados no coinciden' }

      }

    } else {
      this.errorState = true;
      this.message = { error: 'Debe ingresar la Clave y la confirmación' }


    }
  }









}
