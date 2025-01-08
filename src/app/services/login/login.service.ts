import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/interfaces/modelos.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  private role: number | null = null;

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  registrarUsuario(usuarioData: {
    usu_usuario: string;
    usu_password: string;
    usu_nombre?: string;
    usu_rol_id: number;
  }): Observable<any> {
    return this.http.post(API_URLS.usuarios.postRegistrarUsuario, usuarioData);
  }

  // Método para iniciar sesión
  iniciarSesion(credenciales: {
    usu_usuario: string;
    usu_password: string;
  }): Observable<any> {
    return this.http.post(API_URLS.usuarios.postLogin, credenciales);
  }

  setRole(role: number) {
    this.role = role;
  }

  getRole(): number | null {
    return this.role;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
