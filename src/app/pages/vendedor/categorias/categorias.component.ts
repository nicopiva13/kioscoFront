import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];

  constructor(
     private dialog: MatDialog,
     private categoriasService: CategoriasService,
     private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriasService.getTodasCategorias().subscribe((response) => {
      console.log(response); // Para verificar la estructura completa
      this.categories = response.data; // Usa el arreglo dentro de `data`
    });
  }
  
  
  editCategory(category: any): void {
    // Aquí podrías abrir un modal para editar la categoría
  }

  deleteCategory(categoriaId: string): void {
    this.categoriasService.eliminarCategoria(categoriaId).subscribe({
      next: () => {
        this.loadCategories(); // Actualizar la lista después de eliminar
        this.snackBar.open('Categoría eliminada correctamente.', 'Cerrar', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (err) => {
        if (err.status === 400) {
          // Error personalizado desde el backend
          this.snackBar.open(err.error.message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        } else {
          // Otro tipo de error
          this.snackBar.open('No se puede borrar una categoria que tenga productos vinculados', 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
      },
    });
  }
  

  openAddCategoryModal(): void {
    // Aquí podrías abrir un modal para agregar una nueva categoría
  }
}
