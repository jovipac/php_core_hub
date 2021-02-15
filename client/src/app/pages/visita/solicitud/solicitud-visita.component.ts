import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-solicitud-visita',
  templateUrl: './solicitud-visita.component.html',
  styleUrls: ['./solicitud-visita.component.scss']
})
export class SolicitudVisitaComponent implements OnInit {
  solicitud: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.buildForm();
   }

  ngOnInit() {
  }

  private buildForm() {
    this.solicitud = this.formBuilder.group({
      cui: ["", [Validators.required]],
      nombres: ["", [Validators.required]],
      apellidos: ["", [Validators.required]],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();

  }

}
