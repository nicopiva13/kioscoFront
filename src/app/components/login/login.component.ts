import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<number>(); // Emite el rol del usuario
  loginForm: FormGroup; // Formulario reactivo
  errorMessage: string = ''; // Mensaje de error, si ocurre

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    // Inicializa el formulario
    this.loginForm = this.fb.group({
      usu_usuario: ['', [Validators.required]], // Campo usuario requerido
      usu_password: ['', [Validators.required, Validators.minLength(6)]] // Contraseña requerida con mínimo 6 caracteres
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const credenciales = this.loginForm.value;
  
      this.loginService.iniciarSesion(credenciales).subscribe(
        (response) => {
          console.log('Respuesta del login:', response);
          
          // Guarda el token y el rol en el servicio
          this.loginService.setRole(response.usuario.usu_rol_id);
  
          // Emitir el rol
          this.loginSuccess.emit(response.usuario.usu_rol_id);
  
          // Redirigir según el rol
          if (response.usuario.usu_rol_id === 1) {
            console.log('Redirigiendo a /inicio-admin');
            this.router.navigateByUrl('/inicio-admin');
          } else if (response.usuario.usu_rol_id === 2) {
            console.log('Redirigiendo a /inicio-vendedor');
            this.router.navigateByUrl('/inicio-vendedor');
          }          
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.errorMessage = error.error?.mensaje || 'Error al iniciar sesión.';
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
