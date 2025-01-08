import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-cargar-productos',
  templateUrl: './cargar-productos.component.html',
  styleUrls: ['./cargar-productos.component.css']
})
export class CargarProductosComponent implements OnInit {
  productoForm: FormGroup;
  selectedCategory: string = ''; // Para manejar la categoría seleccionada
  categorias: { categoria_id: string; categoria_nombre: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private categoriasService: CategoriasService // Inyección del servicio de categorías
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: ['', [Validators.required]],
      precio: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      id_categoria: [null, Validators.required],
      imagenUrl: ['', Validators.required] // Nueva campo para la URL de la imagen
    });
  }

  onSubmit() {}

  ngOnInit(): void {
    this.loadCategories(); // Llamar al método para cargar categorías
  }

// Cargar todas las categorías
loadCategories(): void {
  this.categoriasService.getTodasCategorias().subscribe(
    (response: any) => {
      this.categorias = response.data.map((categoria: any) => ({
        categoria_id: categoria.categoria_id,
        categoria_nombre: categoria.categoria_nombre,
      }));
    },
    (error) => {
      console.error('Error al cargar categorías:', error);
    }
  );
}

onCategoryChange(event: any): void {
  const categoriaId = event.value; // Valor de la categoría seleccionada
  this.selectedCategory = categoriaId;
}
  

  
}
