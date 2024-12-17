import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importar el environment

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  private apiUrl = `${environment.apiUrl}/categorias`; // Agregamos /carrito aquí

  constructor(private http: HttpClient) { }

  // Método para obtener categorías desde el backend
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(this.apiUrl, category);
  }

  updateCategory(id: number, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



}
