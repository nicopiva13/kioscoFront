import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userRole: number | null = null; // Para almacenar el rol del usuario
  isLoggedIn: boolean = false; // Para verificar si el usuario está logueado

  constructor(private router: Router) {}

  // Método para manejar el login exitoso y redirigir según el rol
  onLoginSuccess(role: number) {
    this.userRole = role; // Guardamos el rol
    this.isLoggedIn = true; // Indicamos que el usuario está logueado
    localStorage.setItem('rol', String(role)); // Guardar en localStorage

    // Redirigir según el rol del usuario
    if (role === 1) {
      this.router.navigate(['/inicio-admin']);
    } else if (role === 2) {
      this.router.navigate(['/inicio-vendedor']);
    }
  }

  // Método para manejar el cierre de sesión
  logout() {
    this.isLoggedIn = false;
    this.userRole = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
