import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/interfaces/modelos.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  // Método para obtener todas las categorías desde el backend
  getTodasCategorias(): Observable<any> {
    return this.http.get(API_URLS.categorias.getTodasCategorias);
  }

  // Método para crear una nueva categoría
  postCategoria(categoriaData: any): Observable<any> {
    return this.http.post(API_URLS.categorias.postCategoria, categoriaData);
  }

  // Método para actualizar una categoría usando el ID como parámetro
  // actualizarCategoria(categoriaId: string, categoriaData: any): Observable<any> {
  //   return this.http.put(API_URLS.categorias.putActualizarCategoria(categoriaId), categoriaData);
  // }

  // Método para eliminar una categoría usando el ID como parámetro
  eliminarCategoria(categoriaId: string): Observable<any> {
    return this.http.delete(API_URLS.categorias.deleteEliminarCategoria(categoriaId));
  }
}
