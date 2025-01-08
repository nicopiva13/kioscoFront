import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/interfaces/modelos.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(API_URLS.productos.getTodosProductos);
  }

  // Obtener productos por categoría
  getProductosPorCategoria(categoriaId: string): Observable<any> {
    return this.http.get(API_URLS.productos.getProductosXCategoria(categoriaId));
  }

  // Crear un producto con fotos
  crearProductoConFotos(producto: any, fotos: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {
      ...producto,
      fotos,
    };
    return this.http.post(API_URLS.productos.postProducto, body, { headers });
  }


  


}
