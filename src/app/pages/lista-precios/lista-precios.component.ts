import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'categoria_nombre', 'stock', 'precio'];
  dataSource = new MatTableDataSource<any>([]);
  filteredData = new MatTableDataSource<any>([]); // Para los datos filtrados
  categories: any[] = []; // Almacena las categorías
  selectedCategory: string | undefined; // Cambia a string si los IDs son strings

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductosService, private CategoriasService:CategoriasService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories(); // Cargar categorías al inicio
  }

  // Cargar productos con categorías
  loadProducts(): void {
    this.productoService.getProductosConCategorias().subscribe((data: any[]) => {
      console.log('Productos cargados:', data); // Ver los productos cargados
      this.dataSource.data = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      this.filteredData.data = this.dataSource.data;
      this.filteredData.paginator = this.paginator;
      this.filteredData.sort = this.sort;
    });
  }

  // Cargar las categorías
  loadCategories(): void {
    this.CategoriasService.getCategories().subscribe((data: any[]) => {
      console.log('Categorías cargadas:', data); // Ver las categorías cargadas
      this.categories = [{ id_categoria: -1, nombre: 'Todos' }, ...data]; // Añadir la opción "Todos"
    });
  }

  // Filtrar productos según la categoría seleccionada
  filterProducts(): void {
    const selectedId = this.selectedCategory ?? -1; // Asigna -1 si es undefined o si se selecciona "Todos"
    
    // Si el valor es -1, mostrar todos los productos; si no, filtrar por la categoría seleccionada
    this.filteredData.data = selectedId !== -1 
      ? this.dataSource.data.filter(product => product.id_categoria == selectedId) 
      : this.dataSource.data;
    
    console.log('Productos filtrados:', this.filteredData.data); // Verifica los productos filtrados
    this.filteredData.paginator = this.paginator;
    this.filteredData.sort = this.sort;
  }

  // Descargar PDF con la lista de productos
  downloadPDF(): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lista de Precios de Productos', 14, 22);

    const productsForPDF = this.filteredData.data.map(product => [
      product.nombre,
      product.descripcion,
      product.categoria_nombre,
      product.stock > 0 ? product.stock : 'Sin stock',
      product.precio,
    ]);

    (doc as any).autoTable({
      head: [['nombre', 'descripcion', 'categoria', 'stock', 'precio']],
      body: productsForPDF,
      startY: 30
    });

    doc.save('lista-de-precios.pdf');
  }
}
