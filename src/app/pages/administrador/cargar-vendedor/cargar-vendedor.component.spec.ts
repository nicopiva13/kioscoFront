import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarVendedorComponent } from './cargar-vendedor.component';

describe('CargarVendedorComponent', () => {
  let component: CargarVendedorComponent;
  let fixture: ComponentFixture<CargarVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarVendedorComponent]
    });
    fixture = TestBed.createComponent(CargarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
