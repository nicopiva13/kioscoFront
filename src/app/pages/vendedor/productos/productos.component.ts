import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { CategoriasService } from 'src/app/services/categorias/categorias.service';

import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = ''; // Para manejar la categoría seleccionada
  cart: Product[] = [];// Productos en el carrito
  categorias: { categoria_id: string; categoria_nombre: string }[] = [];

  constructor(
    private productoService: ProductosService,
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts(); // Cargar todos los productos
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

  // Cargar todos los productos
  loadProducts(): void {
    this.productoService.getProductos().subscribe(
      (response: any) => {
        this.products = response.data.map((product: any) => ({
          producto_id: product.producto_id,
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: product.precio,
          stock: product.stock,
          categoria: product.categoria?.categoria_nombre || 'Sin categoría',
          fotos: product.fotos,
          addedToCart: false, // Propiedad para manejar el estado en el carrito
        }));
        this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Cargar productos por categoría seleccionada
  loadProductsByCategory(categoriaId: string): void {
    if (categoriaId) {
      this.productoService.getProductosPorCategoria(categoriaId).subscribe(
        (response: any) => {
          if (response.data.length === 0) {
            this.filteredProducts = [];
          } else {
            this.filteredProducts = response.data.map((product: any) => ({
              producto_id: product.producto_id,
              nombre: product.nombre,
              descripcion: product.descripcion,
              precio: product.precio,
              stock: product.stock,
              categoria: product.categoria?.categoria_nombre || 'Sin categoría',
              fotos: product.fotos,
              addedToCart: false,
            }));
          }
        },
        (error) => {
          console.error('Error al cargar productos por categoría:', error);
        }
      );
    } else {
      this.filteredProducts = [...this.products];
    }
  }
  
  
  

  // Manejar cambio de categoría
  onCategoryChange(event: any): void {
    const categoriaId = event.value; // Valor de la categoría seleccionada
    this.selectedCategory = categoriaId;
    this.loadProductsByCategory(categoriaId);
  }

  // Agregar un producto al carrito
  addToCart(product: Product): void {
    product.addedToCart = true;
    this.cart.push(product);
  }

  // Abrir el carrito
  openCart(): void {
    console.log('Abrir carrito:', this.cart);
  }
}
