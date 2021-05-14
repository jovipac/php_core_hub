import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantillaDocumentoService } from '../../../service/catalogos';
import { PlantillaDocumento } from '../../../shared/models';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { formatearCorrelativo } from '../../../shared/utils/helpers';
import { isEmptyValue } from '../../../shared/utils';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpErrorResponse } from '@angular/common/http';
import { extractErrorMessages } from '../../../shared/utils';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllTemplateComponent implements OnInit {

  public listPlantillaDocumentos: Array<PlantillaDocumento>;
  constructor(
    private plantillaDocumentoService: PlantillaDocumentoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private loading: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.listPlantillaDocumento();
  }

  listPlantillaDocumento() {
    this.loading.show('dashboard');

    this.plantillaDocumentoService.getListPlantillaDocumento()
    .pipe(first())
    .subscribe({
      next: (data:any) => {
        const plantilladocumentosFormateadas = data.result
        ? data.result.map((data:any) => {
          const plantilladocumento = {
          ...data,
          };

          return <PlantillaDocumento>plantilladocumento;
      }) : [];

      this.listPlantillaDocumentos = plantilladocumentosFormateadas;
      this.loading.hide('dashboard');
      },
      error: (error:any) => {
        this.toastr.error(error.message);
        this.loading.hide('dashboard');
      }
    });
  }

  goCreate() {
    this.router.navigate(['../../../create'], { relativeTo: this.route });
  }

  goEdit(plantilla: any) {
    this.router.navigate(['../../../edit', plantilla.id_plantilla_documento], { relativeTo: this.route });
  }

}
