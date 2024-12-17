import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product.model';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ModalCarritoComponent } from 'src/app/components/modales/modal-carrito/modal-carrito.component';
import { CarritoEventoService } from 'src/app/services/eventoCarrito/carrito-evento.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  carritoProductosIds: Set<number> = new Set(); // Conjunto de IDs de productos en el carrito

  constructor(
    private productoService: ProductosService,
    private dialog: MatDialog,
    private carritoService: CarritoService,
    private CarritoEventoService: CarritoEventoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    // Suscribirse al evento de vaciar carrito para actualizar el estado de los productos
    this.CarritoEventoService.carritoVaciado$.subscribe(() => {
      this.clearCarritoProductosState();
    });
  }

  // Cargar los productos disponibles
  loadProducts(): void {
    this.productoService.getProductos().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.filteredProducts = data;
        this.loadCarritoProductos(); // Llama a loadCarritoProductos después de cargar los productos
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Cargar los IDs de los productos ya presentes en el carrito
  loadCarritoProductos(): void {
    this.carritoService.verCarrito().subscribe(
      (productosCarrito) => {
        this.carritoProductosIds = new Set(productosCarrito.map((p: any) => p.id_producto));
        
        // Marcar productos en el carrito como `addedToCart`
        this.products.forEach(product => {
          if (this.carritoProductosIds.has(product.id_producto)) {
            product.addedToCart = true;
          }
        });
      },
      (error) => {
        console.error('Error al cargar productos del carrito:', error);
      }
    );
  }

  // Agregar producto al carrito si no existe ya
  addToCart(product: Product): void {
    if (this.carritoProductosIds.has(product.id_producto)) {
      return; // Evita que se vuelva a agregar si ya está en el carrito
    }
  
    const productData = {
      nombreProducto: product.nombre,
      descripcion: product.descripcion,
      cantidad: 1,
      precio: product.precio,
      imagen: product.imagen,
      id_producto: product.id_producto
    };
  
    this.carritoService.agregarAlCarrito(productData).subscribe(
      () => {
        this.carritoProductosIds.add(product.id_producto);
        product.addedToCart = true;
        // Guarda en localStorage los productos en el carrito
        localStorage.setItem('carritoProductosIds', JSON.stringify([...this.carritoProductosIds]));
      },
      (error) => {
        console.error('Error al agregar el producto al carrito:', error);
      }
    );
  }

  openCart() {
    const dialogRef = this.dialog.open(ModalCarritoComponent, {
      width: '800px',
      height: '700px'
    });

    // Escuchar el evento de eliminación de productos
    dialogRef.componentInstance.productoEliminado.subscribe((id_producto: number) => {
      this.carritoProductosIds.delete(id_producto);
      const product = this.products.find(p => p.id_producto === id_producto);
      if (product) product.addedToCart = false;
    });
  }
  

  filterProducts(event: Event): void {
    const input = event.target as HTMLInputElement;
    const searchTerm = input.value;

    this.filteredProducts = searchTerm
      ? this.products.filter(product =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : this.products;
  }


 // Limpiar el estado de los productos en el carrito cuando se vacía
 clearCarritoProductosState(): void {
  this.products.forEach(product => product.addedToCart = false);
  this.carritoProductosIds.clear();
  localStorage.removeItem('carritoProductosIds'); // Limpiar el almacenamiento local
}

}
