import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ExpedienteHechoService } from '../../../../service';
import { TipoAreaLugarService, DepartamentoService, MunicipioService } from '../../../../service/catalogos';
import { TipoAreaLugar, Departamento, Municipio } from '../../../../shared/models';
import { first, debounceTime, distinctUntilChanged, filter, switchMap, map, catchError } from 'rxjs/operators';
import { format, isValid, parseISO } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { isEmptyValue, extractErrorMessages } from '../../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-expediente-hecho',
  templateUrl: './expediente-hecho.component.html',
  styleUrls: ['./expediente-hecho.component.scss']
})
export class ExpedienteHechoComponent implements OnInit {
  @Input() id_expediente_hecho: number;
  @Output() submittedEvent = new EventEmitter();

  formHecho: FormGroup;
  //hechos = new FormArray([]);
  id_expediente: number;
  id_persona: number;
  isAddMode: boolean;
  submitted: boolean = false;
  public listTipoAreaLugar: Array<TipoAreaLugar>;
  public listDepartamento: Array<Departamento>;
  public listMunicipio: Array<Municipio>;
  public listDepartamentoMunicipio: Array<Municipio>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private expedienteHechoService: ExpedienteHechoService,
    private tipoAreaLugarService: TipoAreaLugarService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente;

    this.getListTipoAreaLugar();
    this.getListDepartamento();
    this.getListMunicipio();

    // Finalmente se llama la construccion del formulario
    this.formHecho =  new FormGroup({
      hechos: new FormArray([])
    });
    // this.buildForm({});

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_hecho)) {
        this.getExpedienteHecho(this.id_expediente_hecho);
      }
      else if (!isEmptyValue(this.id_expediente)) {
        const dataSend = { 'id_expediente': this.id_expediente };
        this.searchExpedienteHecho(dataSend);
      } else
        this.addHecho({});
    } else {
      this.addHecho({});
    }

  }

  private buildForm(data: any): FormGroup {
    return new FormGroup({
      id_expediente_hecho : new FormControl({
        value: data?.id_expediente_hecho,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      id_expediente: new FormControl({
        value: data?.id_expediente,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      fecha_hora: new FormControl({
        value: data?.fecha_hora,
        disabled: false,
      }, [Validators.required]),
      id_tipo_area_lugar: new FormControl({
        value: data?.id_tipo_area_lugar,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_departamento: new FormControl({
        value: data?.id_departamento,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      id_municipio: new FormControl({
        value: data?.id_municipio,
        disabled: false,
      }, [Validators.pattern("[0-9]+")]),
      direccion: new FormControl({
        value: data?.direccion,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
      hecho: new FormControl({
        value: data?.hecho,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
      peticion: new FormControl({
        value: data?.peticion,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
      prueba: new FormControl({
        value: data?.prueba,
        disabled: false,
      }, [Validators.pattern(/^\S+[a-zA-ZÀ-ÿ0-9\-\s.,]*\S+$/)]),
    }, {});
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formHecho.get('hechos')['controls'];
  }

  addHecho(data: any) {
    (<FormArray>this.formHecho.get('hechos')).push(this.buildForm(data));
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.formHecho);
    // stop here if form is invalid
    if (this.formHecho.invalid) {
      return;
    }

  }

  getExpedienteHecho(id_expediente_hecho: number) {
    this.loading.show();
    this.expedienteHechoService.getExpedienteHecho(id_expediente_hecho)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const hecho = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const hechoFormateado = !isEmptyValue(hecho) ? {
              ...hecho,
              fecha_hora: isValid(parseISO(hecho.fecha_hora)) ?
                  format(parseISO(new Date(hecho.fecha_hora).toISOString()), 'yyyy-MM-dd') : null,

            } : {};
            this.id_expediente_hecho = hecho.id_expediente_hecho;
          //this.formHecho.patchValue(hechoFormateado);
          /*
            if (isEmptyValue(persona.direcciones)) {
              this.addArchivoAdjunto({});
            } else {
              let archivoAdjuntos = this.formHecho.controls.direcciones as FormArray;
              persona.archivoAdjuntos.forEach(archivoAdjunto  => {
                archivoAdjuntos.push(this.buildArchivoAdjunto(archivoAdjunto));
              })
            }
          */

          } else
            this.toastr.error(response.message);
          this.loading.hide();
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide();
        }
      });
  }

  searchExpedienteHecho(dataSend: any) {
    this.loading.show();
    this.expedienteHechoService.searchExpedienteHecho(dataSend)
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            const hechos = response.result;
            // Se formatea la informacion para adecuarla al formulario
            const hechosFormateado = !isEmptyValue(hechos) ? hechos.map((hecho: any) => {
              return {
                ...hecho,
                fecha_hora: isValid(parseISO(hecho.fecha_hora)) ?
                  format(parseISO(new Date(hecho.fecha_hora).toISOString()), 'yyyy-MM-dd HH:mm') : null,

              }
            }) : [];

            if (isEmptyValue(hechosFormateado)) {
              this.addHecho({});
            } else {
              hechosFormateado.forEach(hecho  => {
                this.addHecho(hecho);
              })
            }

          } else
            this.toastr.error(response.message);
          this.loading.hide();
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide();
        }
      });
  }

  getListTipoAreaLugar() {
    this.tipoAreaLugarService.getListTipoAreaLugar()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listTipoAreaLugar = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListDepartamento() {
    this.departamentoService.getListDepartamento()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listDepartamento = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListMunicipio() {
    this.municipioService.getListMunicipio()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listMunicipio = response.result;
            this.listDepartamentoMunicipio = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  selectedDepartamento(data: any) {
    const id_departamento = this.formHecho.get('id_departamento').value;
    this.listDepartamentoMunicipio = this.listMunicipio
      .filter((departamento: any) => departamento.id_departamento == id_departamento);
  }

  private updatePersonaSolicitud() {
    //Valor del Form, incluidos los controles deshabilitados
    const formValues = {
      ...this.formHecho.getRawValue(),
    };
    this.loading.show();
    this.expedienteHechoService.updateExpedienteHecho(this.id_expediente_hecho, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Hecho del expediente');
              this.submittedEvent.emit(true);
              this.loading.hide();
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Hecho del expediente');
                  }
                });
                this.submittedEvent.emit(false);
                this.loading.hide();
            }
        });
  }

}
