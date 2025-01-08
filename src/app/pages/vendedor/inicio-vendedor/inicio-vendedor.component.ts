import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-vendedor',
  templateUrl: './inicio-vendedor.component.html',
  styleUrls: ['./inicio-vendedor.component.css']
})
export class InicioVendedorComponent {
  opened: boolean = true;
  isLoggedIn: boolean = false; // Para verificar si el usuario está logueado
  userRole: number | null = null; // Rol del usuario
  showAgregarProducto = false;
  showAgregarCategoria = false;
  showListasPrecios = false;

  constructor(private router: Router) {}

  // Método para manejar el toggle del sidenav
  toggleSidenav() {
    this.opened = !this.opened;
  }

  // Método para manejar el estado de autenticación después del inicio de sesión
  onLoginSuccess(role: number) {
    this.isLoggedIn = true;
    this.userRole = role; // Actualiza el rol del usuario
    // this.router.navigate(['/productos']);
  }

  // Método para manejar el cierre de sesión
  logout() {
    this.isLoggedIn = false;
    this.userRole = null;
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  


  // Funciones para mostrar los componentes respectivos al hacer clic en las opciones
  showProductos() {
    this.showAgregarProducto = true;
    this.showAgregarCategoria = false;
    this.showListasPrecios = false;
  }

  showCategorias() {
    this.showAgregarProducto = false;
    this.showAgregarCategoria = true;
    this.showListasPrecios = false;
  }

  showListaPrecios() {
    this.showAgregarProducto = false;
    this.showAgregarCategoria = false;
    this.showListasPrecios = true;
  }

}
