import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    // Verifica si hay un token o una sesión activa en el almacenamiento local
    const token = localStorage.getItem('authToken');
    return token ? true : false;
  }

  // Método para hacer login
  login(username: string, password: string): Observable<boolean> {
    return this.getLogin(username, password).pipe(
      map((data) => {
        if (data?.token) {
          localStorage.setItem('authToken', data.token);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false)) // Manejo de errores
    );
  }

  getLogin(username: string, password: string): Observable<any> {
    return this.http
    .post<any>(`${environment.api_public}/auth/login`, { username, password }, {
      headers: {
        'Accept-Language': '',
      },
    })
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
