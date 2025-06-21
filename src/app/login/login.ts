import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth} from '../services/auth'; // Ajusta la ruta si es necesario
import { loginRequest } from '../services/loginRequest';   // Ajusta la ruta si es necesario
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: true,
})
export class Login implements OnInit {
  loginError: string = "";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: Auth
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as loginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/tareas');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
