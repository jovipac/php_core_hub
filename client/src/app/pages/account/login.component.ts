import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service';
import { first } from 'rxjs/operators';
import head from 'ramda/src/head';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
    login: FormGroup;
    loading = false;
    submitted = false;
    errorLogin: boolean = false;
    message: Object = {};

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        this.login = this.formBuilder.group({
            username: ['', [Validators.required ]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.login.controls; }

    onSubmit(event: Event) {
        event.preventDefault();
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.login.invalid) {
            return;
        }

        this.loading = true;
        if (this.login.valid) {
          this.authService.login(this.login.value)
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
                  id_funcionario: response.result.user.id_funcionario,
                  codes: JSON.stringify(dataMenu)
                }

                sessionStorage.setItem("validate", JSON.stringify(user));
                // get return url from query parameters or default to home page
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                this.router.navigateByUrl(returnUrl);
                //this.router.navigate(['dashboard'])
              } else
                this.message = { error: response.message }

            },
            error: (response: any) => {
              this.loading = false;
              this.errorLogin = true;
              this.message = { error: response.error.message }
            }
          });

        } else {
          this.loading = false;
          this.errorLogin = true;
          this.message = { error: "* Debe de ingresar usuario y contraseña" };
        }

    }
}
