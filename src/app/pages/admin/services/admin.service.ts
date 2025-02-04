import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Url de la api de administrador
  private url = `${environment.api}/admin`;

  constructor(private http: HttpClient) {}

  // Método para crear categorías
  crearCategoria(nombres: string[]) {
    // Lógica para crear categorías
    console.log('Enviando datos a la API:', nombres);
    return this.http.post<any>(
`${this.url}/crearCategorias`,
    { nombres },
    );
  }
}
