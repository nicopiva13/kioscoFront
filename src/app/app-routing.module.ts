import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/vendedor/productos/productos.component';
import { CategoriasComponent } from './pages/vendedor/categorias/categorias.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ListaPreciosComponent } from './pages/vendedor/lista-precios/lista-precios.component';
import { CargarProductosComponent } from './pages/administrador/cargar-productos/cargar-productos.component';
import { CargarCategoriasComponent } from './pages/administrador/cargar-categorias/cargar-categorias.component';
import { CargarVendedorComponent } from './pages/administrador/cargar-vendedor/cargar-vendedor.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { InicioVendedorComponent } from './pages/vendedor/inicio-vendedor/inicio-vendedor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'lista-precios', component: ListaPreciosComponent },
  {path: 'inicio-vendedor', component: InicioVendedorComponent},
  { path: 'inicio-admin', component: InicioAdminComponent },
  { path: 'cargar-productos', component: CargarProductosComponent },
  { path: 'cargar-categorias', component: CargarCategoriasComponent },
  { path: 'cargar-clientes', component: CargarVendedorComponent },
  // { path: 'protected', component: ProductosComponent, canActivate: [LoginService] }
  // { path: '', redirectTo: '/productos', pathMatch: 'full' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
