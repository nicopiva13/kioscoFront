import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriasComponent } from 'src/app/components/modales/modal-categorias/modal-categorias.component';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categories: any[] = [];
  displayedColumns: string[] = ['nombre', 'acciones'];

  constructor(private dialog: MatDialog, private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriasService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(ModalCategoriasComponent, {
      width: '400px',

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createCategory(result);
      }
    });
  }
    

  createCategory(category: any): void {
    this.categoriasService.createCategory(category).subscribe(() => {
      this.loadCategories(); // Recargar las categorías después de agregar una nueva
    });
  }

  editCategory(category: any): void {
    const dialogRef = this.dialog.open(ModalCategoriasComponent, {
      width: '400px',
      data: { category: category } // Pasamos la categoría que se va a editar
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  deleteCategory(id: number): void {
    this.categoriasService.deleteCategory(id).subscribe(() => {
      this.loadCategories(); // Recargar categorías después de eliminar
    });
  }

  updateCategory(id: number, updatedCategory: any): void {
    this.categoriasService.updateCategory(id, updatedCategory).subscribe(() => {
      this.loadCategories(); // Recarga las categorías después de la actualización
    }, error => {
      console.error('Error al actualizar la categoría:', error);
    });
  }
  
  

  
}
