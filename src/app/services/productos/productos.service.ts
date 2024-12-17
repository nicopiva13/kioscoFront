import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importar el environment

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = `${environment.apiUrl}/productos`; // Agregamos /carrito aquí

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product);
  }

   // Obtener productos con categorías
   getProductosConCategorias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/con-categorias`);
  }


}
