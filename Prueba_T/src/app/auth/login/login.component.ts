import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public error: boolean = false;
  public ping: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logIn() {
    if (this.loginForm.valid) {
      // Envia ´petición a API
      this.authService.loginUsuario(this.loginForm.value).subscribe(
        (resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('url', resp.url);
          // Redirecciona a Perfil
          this.router.navigateByUrl('/user');
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
      this.loginForm.get(campo)?.invalid && this.loginForm.get(campo)?.touched
    );
  }

  testBack() {
    this.authService.testBackend().subscribe((resp: any) => {
      this.ping = resp.tipo;
    });
  }
}
