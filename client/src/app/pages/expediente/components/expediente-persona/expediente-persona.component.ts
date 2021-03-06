import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ViaService, DocumentoIdentidadService, SexoService, GeneroService } from '../../../../service/catalogos';
import { ToastrService } from 'ngx-toastr';
import { ExpedientePersona, DocumentoIdentidad, Sexo, Genero, Via } from '../../../../shared/models';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-expediente-persona',
  templateUrl: './expediente-persona.component.html',
  styleUrls: ['./expediente-persona.component.scss']
})
export class ExpedientePersonaComponent implements OnInit {
  public expedienteForm: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;

  public listDocumentoIdentidad: Array<DocumentoIdentidad>;
  public listVia: Array<Via>;
  public listSex: Array<Sexo>;
  public listGenre: Array<Genero>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private documentoIdentidadService: DocumentoIdentidadService,
    private sexoService: SexoService,
    private generoService: GeneroService,
    private viaService: ViaService,

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.getListDocumentoIdentidad();
    this.getListVia();
    this.getListSexo();
    this.getListGenero();

    // Se llama la construccion del formulario
    this.buildForm();
  }

  private buildForm() {
    this.expedienteForm = new FormGroup({
      id_expediente: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_persona: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_documento_identidad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      identificador: new FormControl({
        value: '',
        disabled: false,
      }, [Validators.required,
        Validators.pattern("[0-9A-z]+")]),
      nombres: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required,
      Validators.minLength(2)]),
      apellidos: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required,
      Validators.minLength(2)]),
      telefono: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]{8,10}")]),
      fecha_nacimiento: new FormControl({
        value: null,
        disabled: false,
      }, []),
      edad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_sexo: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_genero: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_prioridad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_via: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_funcionario: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_resultado: new FormControl({
        value: null,
        disabled: false,
      }, []),
      observaciones: new FormControl({
          value: '',
          disabled: false,
        }, []),
      }, { });
    }

  isFieldValid(field: string) {
    return (this.expedienteForm.get(field).dirty || this.expedienteForm.get(field).touched || this.submitted) && this.expedienteForm.get(field).errors
  }

  isHasErrors(field: string) {
    return (this.submitted || this.expedienteForm.get(field).invalid || this.expedienteForm.get(field).errors);
  }

  displayErrorsCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  // convenience getter for easy access to form fields
  get f() { return this.expedienteForm.controls; }

  getListDocumentoIdentidad() {
    this.documentoIdentidadService.getListDocumentoIdentidad()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listDocumentoIdentidad = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListSexo() {
    this.sexoService.getListSexo()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listSex = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });
  }

  getListGenero() {
    this.generoService.getListGenero()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listGenre = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });
  }

  getListVia() {
    this.viaService.getListVia()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listVia = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });
  }

}
