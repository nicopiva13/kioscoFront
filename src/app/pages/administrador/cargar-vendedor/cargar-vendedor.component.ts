import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-vendedor',
  templateUrl: './cargar-vendedor.component.html',
  styleUrls: ['./cargar-vendedor.component.css']
})
export class CargarVendedorComponent {
  vendedorForm: FormGroup; // Formulario reactivo
  mensajeError: string = ''; // Para mostrar un mensaje de error

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService, // Cambié el nombre a loginService para que sea consistente
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // Inicializa el formulario con validaciones
    this.vendedorForm = this.fb.group({
      usu_usuario: ['', [Validators.required]], // Solo 'required', sin 'email'
      usu_password: ['', [Validators.required, Validators.minLength(6)]], // Contraseña obligatoria, mínimo 6 caracteres
      usu_nombre: ['', Validators.required], // Nombre obligatorio
      usu_rol_id: [2, Validators.required] // Rol fijo para vendedor
    });    
  }

   // Método para manejar el envío del formulario
   onSubmit() {
    if (this.vendedorForm.valid) {
      const usuarioData = this.vendedorForm.value;

      // Llama al servicio para registrar el usuario
      this.loginService.registrarUsuario(usuarioData).subscribe(
        {
          next: (response) => {
            // Mostrar modal de éxito con SweetAlert2
            Swal.fire({
              title: '¡Usuario registrado!',
              text: 'El vendedor se ha registrado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.router.navigate(['/usuarios']); // Redirige después de cerrar el modal
            });
          },
          error: (error) => {
            console.error('Error al registrar usuario:', error);
            // Mostrar modal de error con SweetAlert2
            Swal.fire({
              title: 'Error',
              text: error.error?.mensaje || 'Hubo un problema al registrar el vendedor. Intente nuevamente.',
              icon: 'error',
              confirmButtonText: 'Cerrar',
            });
          }
        }
      );
    } else {
      // Mostrar modal si el formulario no es válido
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
    }
  }

}
