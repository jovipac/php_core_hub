import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ServicesService } from '../../../../service/services.service';
import { first } from 'rxjs/operators';
import head from 'ramda/src/head';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  login: FormGroup;
  errorLogin: boolean = false;
  message: Object = {};
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServicesService
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.login = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  signin(event: Event) {
    event.preventDefault();
    if (this.login.valid) {
      this.service.signIn(this.login.value)
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          if (response.success) {
            const defaultRol = head(response.result.user.rol);
            const dataMenu = {
              id_usuario: response.result.user.id_usuario,
              id_rol: defaultRol?.id_rol
            }
            const user = {
              access_token: response.result.accessToken,
              token_type: response.result.tokenType,
              username: response.result.user.username,
              rol: defaultRol?.id_rol,
              id_auxiliatura: response.result.user.id_auxiliatura,
              codes: JSON.stringify(dataMenu)
            }

            sessionStorage.setItem("validate", JSON.stringify(user));
            this.router.navigate(['dashboard'])
          } else
            this.message = { error: response.message }

        },
        error: (response: any) => {
          this.errorLogin = true;
          this.message = { error: response.error.message }
        }
      });

    } else {
      this.errorLogin = true;
      this.message = { error: "* Debe de ingresar usuario y contraseña" };
    }
  }

  ngOnInit() { }

}
