import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';
import { CrearAldeanoComponent } from './components/crear-aldeano/crear-aldeano.component';
import { CrearCultivoComponent } from './components/crear-cultivo/crear-cultivo.component';
import { CrearItemComponent } from './components/crear-item/crear-item.component';
import { CrearSemillaComponent } from './components/crear-semilla/crear-semilla.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatButtonModule, CrearAldeanoComponent,
    CrearCategoriaComponent, CrearCultivoComponent,
    CrearItemComponent, CrearSemillaComponent, AdminHomeComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  //Variable para saber qué componente hay que mostrar
  componenteAMostrar: string = '';

  /**
   * Establece el componente que se debe mostrar.
   *
   * @param component - El nombre del componente que se debe mostrar.
   */
  setComponenteAMostrar(componente: string) {
    this.componenteAMostrar = componente;
  }
}
