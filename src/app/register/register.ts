import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})

export class Register {
  registerForm: FormGroup;
  registerError: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // Puedes agregar más campos aquí si tu backend lo requiere
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

register() {
  if (this.registerForm.valid) {
    this.registerError = "";
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 400) {
          this.registerError = 'El usuario ya existe';
        } else {
          this.registerError = err.error?.message || 'Error al registrar usuario';
        }
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
    alert("Completa todos los campos correctamente.");
  }
}

}