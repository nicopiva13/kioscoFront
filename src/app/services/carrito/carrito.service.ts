import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importar el environment

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = `${environment.apiUrl}/carrito`; // Agregamos /carrito aquí

  constructor(private http: HttpClient) { }

  // 1. Confirmar compra
  confirmarCompra(productos: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmar`, { productos });
  }

  // 2. Ver carrito
  verCarrito(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  agregarAlCarrito(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, producto);
  }

  actualizarCantidad(id_producto: number, cantidad: number): Observable<any> {
    const body = { cantidad }; // Crea el cuerpo de la solicitud
    return this.http.put(`${this.apiUrl}/${id_producto}`, body); // Asegúrate de que la URL sea correcta
  }

  // En carrito.service.ts
  vaciarCarrito(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/carrito`);
  }

  // En carrito.service.ts
deleteFromCart(id_producto: number): Observable<any> {
  return this.http.delete(`${environment.apiUrl}/carrito/${id_producto}`);
}



}
