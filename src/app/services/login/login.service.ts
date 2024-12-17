import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';  // Importar el environment

@Injectable({
  providedIn: 'root'
})
export class LoginService {  // Cambia 'login' a 'LoginService'

  private apiUrl = environment.apiUrl;  // Usar el apiUrl del environment

  constructor(private http: HttpClient) { }

  registerUser(nombre: string, usuario: string, pass: string, rol: string): Observable<any> {
    const body = { nombre, usuario, pass, rol };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
  
  loginUser(usuario: string, pass: string): Observable<any> {
    const body = { usuario, pass };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

}
