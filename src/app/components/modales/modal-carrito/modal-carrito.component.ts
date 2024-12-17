import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { CarritoEventoService } from 'src/app/services/eventoCarrito/carrito-evento.service';

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.css']
})
export class ModalCarritoComponent implements OnInit {
  productosCarrito: any[] = []; // Variable para almacenar productos del carrito
  @Output() productoEliminado = new EventEmitter<number>();

  constructor(
    private carritoService: CarritoService,
    private dialogRef: MatDialogRef<ModalCarritoComponent>,
    private CarritoEventoService: CarritoEventoService
  ) {}

  ngOnInit() {
    this.cargarCarrito();
  }

cargarCarrito(): void {
    this.carritoService.verCarrito().subscribe(
      (data: any[]) => {
        this.productosCarrito = data; // Almacena los productos en la variable
      },
      error => {
        console.error('Error al cargar el carrito:', error);
      }
    );
}


deleteProduct(product: any): void {
  this.carritoService.deleteFromCart(product.id_producto).subscribe(
    () => {
      this.productosCarrito = this.productosCarrito.filter(p => p.id_producto !== product.id_producto);
      
      // Emitir el evento para notificar al componente de productos
      this.productoEliminado.emit(product.id_producto);
    },
    (error) => {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  );
}


  

cerrarModal(): void {
    this.dialogRef.close(); // Método para cerrar el modal
  }


incrementarCantidad(producto: any) {
    producto.cantidad++;
    this.actualizarCarrito(producto);
}

decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
        producto.cantidad--;
        this.actualizarCarrito(producto);
    }
}

actualizarCarrito(producto: any) {
    this.carritoService.actualizarCantidad(producto.id_producto, producto.cantidad).subscribe(
        response => {
            console.log('Cantidad actualizada');
        },
        error => {
            console.error('Error al actualizar la cantidad:', error);
        }
    );
}



vaciarCarrito(): void {
  this.carritoService.vaciarCarrito().subscribe(
    () => {
      this.productosCarrito = [];
      this.cargarCarrito();

      // Emitir el evento de carrito vaciado
      this.CarritoEventoService.emitirCarritoVaciado();
    },
    error => {
      console.error('Error al vaciar el carrito:', error);
    }
  );
}


calcularTotal(): number {
  return this.productosCarrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}


  
}
