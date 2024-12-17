import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginService } from './services/login/login.service';
import { ListaPreciosComponent } from './pages/lista-precios/lista-precios.component';

const routes: Routes = [
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lista-precios', component: ListaPreciosComponent },
  { path: 'protected', component: ProductosComponent, canActivate: [LoginService] }, // Ruta protegida
  { path: '', redirectTo: '/productos', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
