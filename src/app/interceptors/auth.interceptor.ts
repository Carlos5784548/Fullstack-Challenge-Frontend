import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  let token: string | null = null;

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      console.error('Error HTTP:', error);

      // Manejo de errores comunes
      if (error.status === 0) {
        alert('No se pudo conectar con el servidor. Verificá tu conexión.');
      } else if (error.status === 401) {
        alert('Sesión expirada o no autorizada. Iniciá sesión nuevamente.');
        router.navigate(['/login']);
      } else if (error.status === 403) {
        alert('Acceso denegado.');
      } else if (error.status === 500) {
        alert('Error interno del servidor. Intentalo más tarde.');
      }

      return throwError(() => error);
    })
  );
};
