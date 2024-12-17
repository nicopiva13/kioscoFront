import { Component } from '@angular/core';
import Swal from 'sweetalert2';  // Importar SweetAlert2
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  nombre: string = '';
  usuario: string = '';
  pass: string = '';
  rol: string = '';
  showPassword: boolean = false;  // Variable para controlar la visibilidad

  constructor(private authService: LoginService) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;  // Cambia entre mostrar y ocultar la contraseña
  }

  onRegister(): void {
    console.log('Datos enviados:', this.nombre, this.usuario, this.pass, this.rol);  // Verificar datos en consola

    if (this.nombre && this.usuario && this.pass && this.rol) {
      this.authService.registerUser(this.nombre, this.usuario, this.pass, this.rol).subscribe(
        response => {
          console.log('Usuario registrado', response);
          // Alerta de éxito con SweetAlert2
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Usuario registrado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4caf50',  // Color verde
          });
        },
        error => {
          console.error('Error en el registro', error);
          // Alerta de error con SweetAlert2
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error durante el registro. Intenta nuevamente.',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#d33',  // Color rojo para el error
          });
        }
      );
    } else {
      // Alerta si faltan campos por llenar
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos.',
        icon: 'warning',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#f0ad4e',  // Color de advertencia
      });
    }
  }
}
