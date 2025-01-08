import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/interfaces/modelos.model';

@Injectable({
  providedIn: 'root'
})
export class ListaDePrecioService {

  constructor(private http: HttpClient) { }

  // Método para obtener todos los precios desde el backend
  getPrecios(): Observable<any> {
    return this.http.get(API_URLS.listaDePrecios.getPrecios);
  }

  // Método para obtener precios ordenados por nombre con ordenación personalizada
  getPreciosOrdenadosPorNombre(ordenacion: string): Observable<any> {
    return this.http.get(`${API_URLS.listaDePrecios.getPreciosOrdenadosPorNombre}?ordenacion=${ordenacion}`);
  }

// Método para obtener precios ordenados por precio con ordenación personalizada
getPreciosOrdenadosPorPrecio(ordenacion: string): Observable<any> {
  return this.http.get(`${API_URLS.listaDePrecios.getPreciosOrdenadosPorPrecio}?ordenacion=${ordenacion}`);
}

// Método para obtener precios por categoría
getPreciosPorCategoria(categoriaId: string): Observable<any> {
  return this.http.get(API_URLS.listaDePrecios.getPreciosPorCategoria(categoriaId));
}


}

 

