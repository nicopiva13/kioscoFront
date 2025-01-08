import { Component, OnInit } from '@angular/core';
import { ListaDePrecioService } from 'src/app/services/listaDePrecio/lista-de-precio.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  precios: any[] = [];
  displayedColumns: string[] = ['nombre', 'categoria_nombre', 'precio'];
  sortOptions = [
    { value: 'asc', viewValue: 'A-Z' },
    { value: 'desc', viewValue: 'Z-A' },
    { value: 'asc', viewValue: 'Precio ▼' },  // Flecha descendente
    { value: 'desc', viewValue: 'Precio ▲' }   // Flecha ascendente   
  ];
  selectedSort: string = 'asc'; // Valor predeterminado
  selectedCategory: string = ''; // Para manejar la categoría seleccionada
  categorias: { categoria_id: string; categoria_nombre: string }[] = [];

  constructor(
    private listaDePrecioService: ListaDePrecioService,
    private categoriasService: CategoriasService
  ) { }

  ngOnInit(): void {
    this.loadCategories();  // Cargar todas las categorías
    this.loadPrecios();
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

  // Manejar cambio de categoría
  onCategoryChange(event: any): void {
    const categoriaId = event.value; // Valor de la categoría seleccionada
    this.selectedCategory = categoriaId;

    // Si se selecciona 'todas', mostrar todos los precios
    if (categoriaId === 'todas') {
      this.loadPrecios();  // Cargar todos los precios
    } else {
      this.loadPreciosPorCategoria(categoriaId);
    }
  }

  // Cargar precios por categoría
  loadPreciosPorCategoria(categoriaId: string): void {
    this.listaDePrecioService.getPreciosPorCategoria(categoriaId).subscribe((response: any) => {
      console.log(response); // Verificar la estructura
      this.precios = response.data; // Asignar directamente el arreglo
    });
  }

  loadPrecios(): void {
    this.listaDePrecioService.getPrecios().subscribe((response: any) => {
      console.log(response); // Verificar la estructura
      this.precios = response.data; // Asignar directamente el arreglo
    });
  }

  getPreciosOrdenados(sortBy: string): void {
    // Condicional para diferenciar entre ordenamiento por nombre y por precio
    if (sortBy === 'asc' || sortBy === 'desc') {
      this.listaDePrecioService.getPreciosOrdenadosPorNombre(sortBy).subscribe((response: any) => {
        console.log(response); // Verificar la estructura
        this.precios = response.data; // Asignar directamente el arreglo
      });
    } else if (sortBy === 'precio-asc' || sortBy === 'precio-desc') {
      this.listaDePrecioService.getPreciosOrdenadosPorPrecio(sortBy).subscribe((response: any) => {
        console.log(response); // Verificar la estructura
        this.precios = response.data; // Asignar directamente el arreglo
      });
    }
  }

  onSortChange(): void {
    this.getPreciosOrdenados(this.selectedSort);
  }
}
