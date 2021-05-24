import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuxiliaturaService, PrioridadService, ViaService, ResultadoService } from '../../../../service/catalogos';
import { ExpedienteService, FuncionariosService} from '../../../../service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Auxiliatura, Expediente, Prioridad, Via, Resultado, Funcionario } from '../../../../shared/models';
import { first, map, switchMap  } from 'rxjs/operators';
import { formatearCorrelativo } from '../../../../shared/utils/helpers';
import { isEmptyValue, extractErrorMessages } from '../../../../shared/utils';
import { format, isValid } from 'date-fns';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-expediente-encabezado',
  templateUrl: './expediente-encabezado.component.html',
  styleUrls: ['./expediente-encabezado.component.scss']
})
export class ExpedienteEncabezadoComponent implements OnInit {
  @Output() submittedEvent = new EventEmitter();

  public expedienteForm: FormGroup;
  id: string;
  id_via: string;
  isAddMode: boolean;
  submitted: boolean = false;

  public listAuxiliatura: Array<Auxiliatura>;
  public listAuxiliaturaTramite: Array<Auxiliatura>;
  public listPriority: Array<Prioridad>;
  public listVia: Array<Via>;
  public listFuncionarios: Array<Funcionario>;
  public listResultado: Array<Resultado>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private auxiliaturaService: AuxiliaturaService,
    private solicitudService: ExpedienteService,
    private prioridadService: PrioridadService,
    private viaService: ViaService,
    private funcionarioService: FuncionariosService,
    private resultadoService: ResultadoService,
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.getListAuxiliatura();
    this.getListAuxiliaturaTramite();
    this.getListPriority();
    this.getListVia();
    this.getFuncionarios();
    this.getListResultado();

    if (!this.isAddMode) {
      this.loading.show('step01');
      this.solicitudService.getExpediente(this.id)
      .pipe(first())
      .subscribe({
        next: (data:any) => {
          const expediente = {
            ...data.result,
            correlativo: formatearCorrelativo(
              data.result.id_auxiliatura,
              data.result.anio, data.result.folio),
            fecha_ingreso: format(new Date(data.result.fecha_ingreso), 'yyyy-MM-dd'),
          };
          this.expedienteForm.patchValue(<Expediente>expediente);
          this.loading.hide('step01');
        },
        error: (error:any) => {
          this.toastr.error(error.message);
          this.loading.hide('step01');
        }
      });

    }
    // Aca se asignan los valores de  los paramatros opcionales enviados desde la ruta
    this.route.queryParams.subscribe(params => {
      this.id_via = params['id_via'];
    });

    // Se llama la construccion del formulario
    this.buildForm();
  }

  private buildForm() {
    this.expedienteForm = new FormGroup({
      id_expediente: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      anio: new FormControl({
        value: null,
        disabled: false,
      }, []),
      folio: new FormControl({
        value: null,
        disabled: false,
      }, []),
      correlativo: new FormControl({
        value: null,
        disabled: true,
      }, []),
      fecha_ingreso: new FormControl({
        value: null,
        disabled: false,
      }, []),
      id_prioridad: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required]),
      id_via: new FormControl({
        value: isEmptyValue(this.id_via) ? null : this.id_via,
        disabled: false,
      }, [Validators.required]),
      id_funcionario: new FormControl({
        value: null,
        disabled: false,
      }, []),
      id_auxiliatura: new FormControl({
        value: null,
        disabled: false,
      }, [Validators.required]),
      id_auxiliatura_tramite: new FormControl({
        value: null,
        disabled: false,
      }, []),
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

  isFieldRequired(field: string) {
    return this.expedienteForm.get(field).errors.required || false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.expedienteForm.controls; }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.expedienteForm.invalid) {
      return;
    }

    // Se procede a agregar o actualizar
    this.createOrUpdate();

  }

  getListAuxiliatura() {
    this.auxiliaturaService.getListAuxiliatura()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listAuxiliatura = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }



  getListAuxiliaturaTramite() {
    this.auxiliaturaService.getListAuxiliaturaTramite()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listAuxiliaturaTramite = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }


  getListPriority() {
    this.prioridadService.getListPrioridad()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listPriority = response.result;
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

    getFuncionarios() {
    //const dataSend = id_unidad ? { 'id_dependencia': id_unidad } : {};
    this.funcionarioService.getEmployees()
      .pipe(first())
      .subscribe({
        next: (data) => {
          const response: any = data;
          if (response.success) {
            const personasFormateadas = response.result
              ? response.result.map((employee) => {
                employee.nombres_completos = [
                  employee.nombres,
                  employee.apellidos
                ].filter(Boolean)
                .join(" ");
                return employee;
            }) : [];

            this.listFuncionarios = personasFormateadas;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  getListResultado() {
    this.resultadoService.getListResultado()
    .pipe(first())
    .subscribe({
      next: (response: any) => {
        if (response.success) {
          this.listResultado = response.result;
        } else
          this.toastr.error(response.message)
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.message);
      }
    });

  }

  private updateSolicitud() {
    this.loading.show('step01');
    const formValues = {
      ...this.expedienteForm.value,
    };
    this.solicitudService.updateExpediente(this.id, formValues)
        .pipe(first())
        .subscribe({
            next: (response: any) => {
              this.toastr.success(response.message, 'Expediente')
              this.submittedEvent.emit(true);
              this.loading.hide('step01');
            },
            error: (error: HttpErrorResponse) => {
                const messages = extractErrorMessages(error);
                messages.forEach(propertyErrors => {
                  for (let message in propertyErrors) {
                    this.toastr.error(propertyErrors[message], 'Expediente');
                  }
                });
                this.submittedEvent.emit(false);
                this.loading.hide('step01');
            }
        });
  }


  private async createOrUpdate() {
    let completedProcess = false;
    //Valor del Form, incluidos los controles deshabilitados
    let solicitud = {
      ...this.expedienteForm.getRawValue(),
    };

      try {
        this.loading.show('step01');
        if (isEmptyValue(solicitud.id_expediente) && solicitud.id_expediente != 0) {
          solicitud = {
            ...solicitud,
          };
          let response: any = await this.solicitudService.createExpediente(solicitud).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Expediente');
            completedProcess = true;
            this.loading.hide('step01');
            solicitud.id_expediente = response.result.id_expediente;
          } else {
            completedProcess = false;
          }

          this.submittedEvent.emit(completedProcess);
          if (completedProcess === true) {
            this.router.navigate(['../../solicitud/editar', solicitud.id_expediente], { relativeTo: this.route });
          }

        } else {
          solicitud = { ...solicitud, };
          let response: any = await this.solicitudService.updateExpediente(this.id, solicitud).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Expediente');
            completedProcess = true;

            this.loading.hide('step01');

          } else {
            completedProcess = false;
          }

          this.submittedEvent.emit(completedProcess);
          if (completedProcess === true) {
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          }

        }
      } catch(response) {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Expediente');
            }
          });

        } else {
          this.toastr.error(response.error.message)
        }
        completedProcess = false;
        this.loading.hide('step01');
      }

  }


}
