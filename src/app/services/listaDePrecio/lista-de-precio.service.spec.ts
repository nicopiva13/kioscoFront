import { TestBed } from '@angular/core/testing';

import { ListaDePrecioService } from './lista-de-precio.service';

describe('ListaDePrecioService', () => {
  let service: ListaDePrecioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDePrecioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
