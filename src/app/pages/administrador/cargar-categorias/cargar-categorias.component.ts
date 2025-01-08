import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargar-categorias',
  templateUrl: './cargar-categorias.component.html',
  styleUrls: ['./cargar-categorias.component.css']
})
export class CargarCategoriasComponent implements OnInit {
  categoriaForm: FormGroup; // Formulario para las categorías
  loading: boolean = false; // Para mostrar un estado de carga
  mensajeError: string = ''; // Para mostrar un mensaje de error

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService // Inyección del servicio
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]], // Solo el nombre
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.categoriaForm.invalid) {
      return; // No hacemos nada si el formulario no es válido
    }
  
    this.loading = true; // Mostrar carga mientras se hace la solicitud
    this.mensajeError = ''; // Limpiar errores previos
  
    const categoriaData = {
      categoria_nombre: this.categoriaForm.get('nombre')?.value, // Aseguramos que el nombre se asigne correctamente
    };
  
    console.log('CategoriaData:', categoriaData); // Agregar un log para verificar qué se envía
  
    this.categoriasService.postCategoria(categoriaData).subscribe({
      next: (response) => {
        this.loading = false; // Ocultar el estado de carga
        Swal.fire({
          title: '¡Categoría creada!',
          text: 'La categoría se ha creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.categoriaForm.reset(); // Limpiar el formulario
      },
      error: (err) => {
        this.loading = false; // Ocultar el estado de carga
        this.mensajeError = 'Hubo un error al crear la categoría. Intente de nuevo.';
        console.error(err);
  
        // Mostrar error con SweetAlert2
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la categoría. Por favor, intente de nuevo.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
      },
    });
  }
  
}
