import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { ExpedienteHechoService, ExpedienteHechoArchivoService } from '../../../../service';
import { TipoAreaLugarService, DepartamentoService, MunicipioService , AreaGeograficaService } from '../../../../service/catalogos';
import { TipoAreaLugar, Departamento, Municipio } from '../../../../shared/models';
import { first } from 'rxjs/operators';
import { format, isValid, parseISO } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { isEmptyValue, extractErrorMessages } from '../../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";
// Configuracion del componente Datepicker
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-expediente-hecho',
  templateUrl: './expediente-hecho.component.html',
  styleUrls: ['./expediente-hecho.component.scss']
})
export class ExpedienteHechoComponent implements OnInit {
  @Input() id_expediente_hecho: number;
  @Output() submittedEvent = new EventEmitter();

  formHecho: FormGroup;
  id_expediente: number;
  id_persona: number;
  isAddMode: boolean;
  submitted: boolean = false;
  uploader: FileUploader;
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  public listTipoAreaLugar: Array<TipoAreaLugar>;
  public listDepartamento: Array<Departamento>;
  public listMunicipio: Array<Municipio>;
  public listDepartamentoMunicipio: Array<Municipio>;
  public listAreaGeografica: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private expedienteHechoService: ExpedienteHechoService,
    private expedienteHechoArchivoService: ExpedienteHechoArchivoService,
    private tipoAreaLugarService: TipoAreaLugarService,
    private departamentoService: DepartamentoService,
    private areageograficaService: AreaGeograficaService,
    private municipioService: MunicipioService,
    private loading: NgxSpinnerService,
    private localeService: BsLocaleService
  ) {
    defineLocale('es', esLocale);
    this.localeService.use('es');
    this.dpConfig.adaptivePosition = true;
    this.dpConfig.containerClass = 'theme-blue';
    this.dpConfig.dateInputFormat = 'L LT';

    this.uploader = new FileUploader({
      url: expedienteHechoArchivoService.uploadURL,
      disableMultipart: false,
      method: 'POST',
      authToken: `${JSON.parse(sessionStorage.getItem('validate')).token_type} ${JSON.parse(sessionStorage.getItem('validate')).access_token}`,
    });
  }

  ngOnInit(): void {
    this.localeService.use('es');
    this.id_expediente = this.route.snapshot.params['id'];
    this.isAddMode = !this.id_expediente;

    this.getListTipoAreaLugar();
    this.getListDepartamento();
    this.getListMunicipio();
    this.getListAreaGeografica();

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onSuccessItem = (item: any, suscriptor: string, status: number, headers: any): any => {
      if (suscriptor) {
        console.log("response", item);
        console.log("response", JSON.parse(suscriptor));
      }
    }

    this.uploader.response.subscribe(async (suscriptor: string) => {
      try {
        if (suscriptor) {
          const dataInput = JSON.parse(suscriptor);
          const dataSend = {
            'id_expediente': dataInput.result.params?.id_expediente,
            'id_expediente_hecho': dataInput.result.params?.id_expediente_hecho,
            'ubicacion': dataInput.result.path,
            'nombre': dataInput.result.filename,
            'tamanio': dataInput.result.size,
            'mime': dataInput.result.mime,
          };

          const response: any = await this.expedienteHechoArchivoService.createExpedienteHechoArchivo(dataSend).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Archivo adjunto del Hecho');
            this.loading.hide('step03');
          } else {
            this.toastr.error(response.message)
          }

        }
      } catch (response) {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Archivo adjunto del Hecho');
            }
          });
        } else {
          this.toastr.error(response.error.message)
        }
        this.loading.hide('step03');
      }

    });

    // Finalmente se llama la construccion del formulario
    this.formHecho =  new FormGroup({
      hechos: new FormArray([])
    });

    if (!this.isAddMode) {
      // Si existe ya un ID ya guardado, se consulta y carga la información
      if (!isEmptyValue(this.id_expediente_hecho) && this.id_expediente_hecho > 0) {
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
      id_area_geografica: new FormControl({
        value: data?.id_area_geografica,
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
      archivos_adjuntos: new FormControl({
        value: data?.archivos_adjuntos,
        disabled: false,
      }, []),
    }, {});
  }

  displayValidation(value: boolean) {
    return {
      'is-invalid': value
    };
  }

  displayValidationMsg(value: boolean) {
    const cssStyle = Boolean(value) ? 'valid-feedback' : 'invalid-feedback';
    return cssStyle;
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

    // stop here if form is invalid
    if (this.formHecho.invalid) {
      return;
    }
    // proceded to save or update
    this.createOrUpdateHecho()

  }

  getExpedienteHecho(id_expediente_hecho: number) {
    this.loading.show('step03');
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

          } else
            this.toastr.error(response.message);
          this.loading.hide('step03');
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide('step03');
        }
      });
  }

  searchExpedienteHecho(dataSend: any) {
    this.loading.show('step03');
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
                fecha_hora: isValid(parseISO(hecho.fecha_hora)) ? new Date(hecho.fecha_hora) : null,

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
          this.loading.hide('step03');
        },
        error: (error: any) => {
          this.toastr.error(error.message);
          this.loading.hide('step03');
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

  selectedDepartamento(id: number) {
    const id_departamento = this.formHecho.get('hechos').value[id].id_departamento;
    this.listDepartamentoMunicipio = this.listMunicipio
      .filter((departamento: any) => departamento.id_departamento == id_departamento);
  }

  getListAreaGeografica() {
    this.areageograficaService.getListareageografica()
      .pipe(first())
      .subscribe({
        next: (response: any) => {
          if (response.success) {
            this.listAreaGeografica = response.result;
          } else
            this.toastr.error(response.message)
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(error.message);
        }
      });
  }

  private async createOrUpdateHecho() {
    let completedProcess = false;
    //Valor del Form, incluidos los controles deshabilitados
    let formValues = {
      ...this.formHecho.getRawValue(),
    };

    let result = formValues.hechos.forEach(async (hecho: any) => {
      try {
        this.loading.show('step03');
        if (isEmptyValue(hecho.id_expediente_hecho) && hecho.id_expediente_hecho != 0) {
          hecho = {
            ...hecho,
            id_expediente: this.id_expediente,
            fecha_hora: format(parseISO(new Date(hecho.fecha_hora).toISOString()), 'yyyy-MM-dd HH:mm'),
          };
          let response: any = await this.expedienteHechoService.createExpedienteHecho(hecho).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Hecho del expediente');
            completedProcess = true;
            this.loading.hide('step03');

            // Pasos para guardar los archivos adjuntos
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('id_expediente', this.id_expediente);
              form.append('id_expediente_hecho', response.result.id_expediente_hecho);
            };
            this.uploader.uploadAll();
          } else {
            completedProcess = false;
          }
          this.submittedEvent.emit(completedProcess);
        } else {
          hecho = { ...hecho, fecha_hora: format(parseISO(new Date(hecho.fecha_hora).toISOString()), 'yyyy-MM-dd HH:mm') };
          let response: any = await this.expedienteHechoService.updateExpedienteHecho(hecho.id_expediente_hecho, hecho).toPromise();
          if (response.success) {
            this.toastr.success(response.message, 'Hecho del expediente');
            completedProcess = true;
            this.loading.hide('step03');

            // Pasos para guardar los archivos adjuntos
            this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
              form.append('id_expediente', this.id_expediente);
              form.append('id_expediente_hecho', hecho.id_expediente_hecho);
            };
            this.uploader.uploadAll();
          } else {
            completedProcess = false;
          }
          //this.submittedEvent.emit(completedProcess);

        }
      } catch(response) {
        if (Object.prototype.toString.call(response.error.message) === '[object Object]') {
          const messages = extractErrorMessages(response);
          messages.forEach(propertyErrors => {
            for (let message in propertyErrors) {
              this.toastr.error(propertyErrors[message], 'Hecho del expediente');
            }
          });

        } else {
          this.toastr.error(response.error.message)
        }
        completedProcess = false;
        this.loading.hide('step03');
      }

      if (completedProcess === true) {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }

    });
    //result = await Promise.all([promise1, promise2, promise3]);
    //this.submittedEvent.emit(result);
  }

  private updateHechoSolicitud() {
    let completedProcess = false;
    //Valor del Form, incluidos los controles deshabilitados
    const formValues = {
      ...this.formHecho.getRawValue(),
    };
    formValues.hechos.forEach(hecho  => {
      this.loading.show('step03');
      this.expedienteHechoService.updateExpedienteHecho(hecho.id_expediente_hecho, hecho)
      .pipe(first())
      .subscribe({
          next: (response: any) => {
            this.toastr.success(response.message, 'Hecho del expediente');
            completedProcess = true;
            this.loading.hide('step03');
            this.submittedEvent.emit(completedProcess);
          },
          error: (error: HttpErrorResponse) => {
              const messages = extractErrorMessages(error);
              messages.forEach(propertyErrors => {
                for (let message in propertyErrors) {
                  this.toastr.error(propertyErrors[message], 'Hecho del expediente');
                }
              });
              completedProcess = false;
              this.loading.hide('step03');
          }
      });

    })

  }

}
