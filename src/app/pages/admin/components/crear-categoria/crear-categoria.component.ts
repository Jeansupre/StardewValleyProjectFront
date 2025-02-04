import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-crear-categoria',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.scss'
})
export class CrearCategoriaComponent {
  // Variable para el formulario de login
  crearCategoriaForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    // Inicializamos el formulario con FormBuilder
    this.crearCategoriaForm = this.fb.group({
      nombre: ['', [Validators.required]],  // Nombre de usuario, con validaciones
    });
  }

  // Método para crear una categoría
  crearCategoria() {
    if (this.crearCategoriaForm.valid) {
      const nombres = this.crearCategoriaForm.value.nombre.split(',');
      this.adminService.crearCategoria(nombres).subscribe({
        next: (response) => {
          console.log('Categoría creada con éxito:', response);
        },
        error: (error) => {
          console.error('Error al crear categoría:', error);
        }
      })
    } else {
      alert('Form is invalid');
    }
  }
}
