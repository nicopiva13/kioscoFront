import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // Importa SweetAlert2
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string = '';
  pass: string = '';

  constructor(private authService: LoginService, private router: Router) { }

  onLogin(): void {
    this.authService.loginUser(this.usuario, this.pass).subscribe(
      (response: any) => {
        console.log('Login exitoso', response);
        this.authService.setToken(response.token);

        // Reemplazamos el alert por una notificación visual con SweetAlert2
        Swal.fire({
          title: '¡Login exitoso!',
          text: 'Redirigiendo a productos...',
          icon: 'success',
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#ffa726',  // Color del botón de confirmación
          timer: 2000  // Se cerrará automáticamente en 2 segundos
        }).then(() => {
          this.router.navigate(['/productos']);  // Redirige a /productos después de la alerta
        });
      },
      error => {
        console.error('Error en el login', error);

        // Reemplazamos el alert por una notificación visual en caso de error
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#d33',  // Color del botón en caso de error
        });
      }
    );
  }
}
