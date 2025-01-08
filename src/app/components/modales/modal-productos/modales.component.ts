import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-modales',
  templateUrl: './modales.component.html',
  styleUrls: ['./modales.component.css']
})
export class ModalesComponent {
  categories: any[] = [];  // Arreglo para almacenar las categorías

  product = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    id_categoria: '',
    imagen: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ModalesComponent>,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onSave(): void {
    // Guardar el producto y cerrar el modal
    this.dialogRef.close(this.product);
  }

  onCancel(): void {
    // Cancelar y cerrar el modal
    this.dialogRef.close();
  }

  loadCategories(): void {
    // Cargar las categorías desde el servicio
    this.categoriasService.getTodasCategorias().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }
}
