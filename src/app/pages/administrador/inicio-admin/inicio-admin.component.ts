import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent {
  opened: boolean = true;
  isLoggedIn: boolean = false; // Para verificar si el usuario está logueado
  showAgregarProducto: boolean = false; // Para controlar la visibilidad del componente de agregar productos
  showAgregarCategoria: boolean = false; // Para controlar la visibilidad del componente de agregar categorías
  showAgregarCliente: boolean = false; // Para controlar la visibilidad del componente de agregar clientes

  constructor(private router: Router) {}

  // Método para manejar el toggle del sidenav
  toggleSidenav() {
    this.opened = !this.opened;
  }

  // Método para manejar el estado de autenticación después del inicio de sesión
  onLoginSuccess(role: number) {
    this.isLoggedIn = true;
    // Actualiza el rol del usuario si es necesario
  }

  // Método para manejar el cierre de sesión
  logout() {
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login']); // Cambia '/login' por la ruta de tu pantalla de inicio de sesión
  }

  // Métodos para abrir cada uno de los componentes
  showProducto() {
    this.showAgregarProducto = true;
    this.showAgregarCategoria = false;
    this.showAgregarCliente = false;
  }

  showCategoria() {
    this.showAgregarProducto = false;
    this.showAgregarCategoria = true;
    this.showAgregarCliente = false;
  }

  showCliente() {
    this.showAgregarProducto = false;
    this.showAgregarCategoria = false;
    this.showAgregarCliente = true;
  }
}

