import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, BehaviorSubject, tap, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) {
    let token = "";
    // Obtener token
    if (typeof window !== 'undefined' && localStorage) {
      token = localStorage.getItem("token") || "";
    }
    this.currentUserLoginOn = new BehaviorSubject<boolean>(!!token);
    this.currentUserData = new BehaviorSubject<string>(token);
  }

  login(credentials: loginRequest): Observable<any> {
    return this.http.post<any>("http://localhost:3000/usuarios/login", credentials).pipe(
      tap((userData) => {
        // Guardar token
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem("token", userData.token);
        }
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Eliminar token
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem("token");
    }
    this.currentUserLoginOn.next(false);
  }



  register(data: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:3000/usuarios/register', data);
  }


   private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Error de red o servidor no disponible
      console.error('Error de red:', error.error);
      return throwError(() => new Error('No se puede conectar con el servidor. Verifique su conexión.'));
    } else if (error.status === 400) {
      // Validación de campos inválidos
      console.error('Error 400 - Datos inválidos:', error.error);
      return throwError(() => new Error(error.error?.error || 'Datos inválidos.'));
    } else if (error.status === 409) {
      // Por ejemplo, usuario ya registrado
      return throwError(() => new Error('El usuario ya está registrado.'));
    } else if (error.status === 500) {
      console.error('Error interno del servidor:', error.error);
      return throwError(() => new Error('Error del servidor. Inténtelo más tarde.'));
    } else {
      console.error('Error inesperado:', error.error);
      return throwError(() => new Error('Ocurrió un error inesperado.'));
    }
  }



  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}
