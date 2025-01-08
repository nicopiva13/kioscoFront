import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/vendedor/productos/productos.component';
import { CategoriasComponent } from './pages/vendedor/categorias/categorias.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importar FormsModule y ReactiveFormsModule

// MATERIAL
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ModalesComponent } from './components/modales/modal-productos/modales.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ModalCategoriasComponent } from './components/modales/modal-categorias/modal-categorias.component';
import { ListaPreciosComponent } from './pages/vendedor/lista-precios/lista-precios.component'; 
import { MatPaginatorModule } from '@angular/material/paginator';
import { ModalCarritoComponent } from './components/modales/modal-carrito/modal-carrito.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CargarProductosComponent } from './pages/administrador/cargar-productos/cargar-productos.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CargarCategoriasComponent } from './pages/administrador/cargar-categorias/cargar-categorias.component';
import { CargarVendedorComponent } from './pages/administrador/cargar-vendedor/cargar-vendedor.component';
import { InicioAdminComponent } from './pages/administrador/inicio-admin/inicio-admin.component';
import { InicioVendedorComponent } from './pages/vendedor/inicio-vendedor/inicio-vendedor.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,  // Mueve ProductosComponent aquí
    CategoriasComponent,
    RegistroComponent,
    LoginComponent,
    ModalesComponent,
    ModalCategoriasComponent,
    ListaPreciosComponent,
    ModalCarritoComponent,
    CargarProductosComponent,
    CargarCategoriasComponent,
    CargarVendedorComponent,
    InicioAdminComponent,
    InicioVendedorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
