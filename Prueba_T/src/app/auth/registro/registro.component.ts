import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorService } from 'src/app/validators/validator.service';
import { UserService } from '../../services/auth/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent implements OnInit {
  public registerForm = this.fb.group(
    {
      nombre: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales(
          'password',
          'password_confirmation'
        ),
      ],
    }
  );

  public error: boolean = false;
  public show1: boolean = false;
  public show2: boolean = false;
  public created: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router,
    private validatorService: ValidatorService
  ) {}

  get emailErrorMsg(): string {
    const errors = this.registerForm.get('email')?.errors;
    if (errors?.['required']) {
      return 'Email es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El valor ingresado no tiene formato de correo';
    }

    return '';
  }

  ngOnInit(): void {}

  signIn() {
    if (this.registerForm.valid) {
      this.authService.createUsuario(this.registerForm.value).subscribe(
        (resp: any) => {
          // move to login

          if (resp.estado) {
            this.created = true;
          }
        },
        (err) => {
          // Manejo de error
          this.error = true;
        }
      );
    }
  }

  campoNoValido(campo: string) {
    return (
      this.registerForm.get(campo)?.invalid &&
      this.registerForm.get(campo)?.touched
    );
  }

  showPass(campo: number) {
    if (campo === 1) {
      this.show1 = !this.show1;
    }

    if (campo === 2) {
      this.show2 = !this.show2;
    }
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
