import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Tasks } from './task/tasks';
import { authGuard } from './guards/auth.guard';
import {  NotFound  } from './pages/not-found/not-found';

export const routes: Routes = [{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },{path:'register',component:Register},  { path: 'tareas', component: Tasks,canActivate: [authGuard] },{ path: '**', component: NotFound }];
