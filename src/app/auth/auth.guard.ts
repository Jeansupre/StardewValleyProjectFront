import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Tu servicio de autenticación
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated() && this.verifyTokenExpiration(localStorage.getItem('authToken'))) {
      return true;  // Permite el acceso si está autenticado
    } else {
      this.router.navigate(['/login']);  // Redirige al login si no está autenticado
      return false;
    }
  }

  private verifyTokenExpiration = (token: string | null) => {
    try {
      if (!token) {
        throw Error("No hay token"); // No hay token
      }
      const decodedToken = jwtDecode(token); // Decodifica el JWT
      const currentTime = Date.now() / 1000; // Obtiene el tiempo actual en segundos

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return false; // Token expirado
      }
      return true; // Token válido
    } catch (error) {
      console.error("Error decoding token:", error);
      return false; // Token inválido
    }
  };
}
