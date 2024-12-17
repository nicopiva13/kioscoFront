import { TestBed } from '@angular/core/testing';

import { CarritoEventoService } from './carrito-evento.service';

describe('CarritoEventoService', () => {
  let service: CarritoEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
