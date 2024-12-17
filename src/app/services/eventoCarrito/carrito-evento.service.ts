import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoEventoService {
  private carritoVaciadoSource = new Subject<void>();
  carritoVaciado$ = this.carritoVaciadoSource.asObservable();

  emitirCarritoVaciado() {
    this.carritoVaciadoSource.next();
  }
}
