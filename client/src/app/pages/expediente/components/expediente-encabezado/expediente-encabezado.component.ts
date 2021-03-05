import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PrioridadService,ViaService, ResultadoService } from '../../../../service/catalogos';
import { ExpedienteService, FuncionariosService} from '../../../../service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Expediente, Prioridad, Via, Resultado, Funcionario } from '../../../../shared/models';
import { first, map, switchMap  } from 'rxjs/operators';
import { formatearCorrelativo } from '../../../../shared/utils/helpers';
import { format, isValid } from 'date-fns';

@Component({
  selector: 'app-expediente-encabezado',
  templateUrl: './expediente-encabezado.component.html',
  styleUrls: ['./expediente-encabezado.component.scss']
})
export class ExpedienteEncabezadoComponent implements OnInit {
  public expedienteForm: FormGroup;
  id: string;
  isAddMode: boolean;
  submitted = false;

  public listPriority: Array<Prioridad>;
  public listVia: Array<Via>;
  public listFuncionarios: Array<Funcionario>;
  public listResultado: Array<Resultado>;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private solicitudService: ExpedienteService,
    private prioridadService: PrioridadService,
    private viaService: ViaService,
    private funcionarioService: FuncionariosService,
    private resultadoService: ResultadoService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.getListPriority();
    this.getListVia();
    this.getFuncionarios();
    this.getListResultado();

    if (!this.isAddMode) {
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
        },
        error: (error:any) => {
          this.toastr.error(error.message);
        }
      });

    }

    // Se llama la construccion del formulario
    this.buildForm();
  }

  private buildForm() {
    this.expedienteForm = new FormGroup({
      id_expediente: new FormControl({
        value: null,
        disabled: !this.isAddMode,
      }, [Validators.pattern("[0-9]+")]),
      correlativo: new FormControl({
        value: null,
        disabled: false,
      }, []),
      fecha_ingreso: new FormControl({
        value: null,
        disabled: false,
      }, []),
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

  isFieldRequired(field: string) {
    return this.expedienteForm.get(field).errors.required || false;
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


}
