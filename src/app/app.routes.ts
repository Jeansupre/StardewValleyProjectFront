import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) }, // Ruta para el login
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard] }, // Ruta para el admin
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard
  { path: '**', redirectTo: 'dashboard' } // Opcional: redirigir cualquier otra ruta al login
];
