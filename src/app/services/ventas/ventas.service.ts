// src/app/services/ventas/ventas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = `${environment.apiUrl}/ventas`; // Agregamos /carrito aquí

  constructor(private http: HttpClient) {}

  // Método para registrar una venta
  registrarVenta(id_usuario: number, total: number, tipo_pago: string): Observable<any> {
    const ventaData = {
      id_usuario,
      total,
      tipo_pago
    };

    return this.http.post<any>(`${this.apiUrl}/registrar`, ventaData);
  }
}
