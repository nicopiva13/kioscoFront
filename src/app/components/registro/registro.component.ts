import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private LoginService: LoginService) { }

  usuarioData = {
    usu_usuario: '',
    usu_password: '',
    usu_nombre: '',
    usu_rol_id: 0,
  };

  registrarUsuario() {
    this.LoginService.registrarUsuario(this.usuarioData).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }



}
