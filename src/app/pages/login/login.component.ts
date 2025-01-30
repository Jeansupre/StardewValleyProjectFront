import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // Variable para el formulario de login
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    // Inicializamos el formulario con FormBuilder
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],  // Nombre de usuario, con validaciones
      password: ['', [Validators.required, Validators.minLength(4)]]  // Contraseña, con validaciones
    });
  }

  // Método para manejar el login
  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password)
      .subscribe((loginResponse) => {
        if (loginResponse) {
          this.router.navigate(['/admin']);  // Redirigir al admin si el login es exitoso
        } else {
          alert('Login failed!');
        }
      });
    } else {
      alert('Form is invalid');
    }
  }
}
