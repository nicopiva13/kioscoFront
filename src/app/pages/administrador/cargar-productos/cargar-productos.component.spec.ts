import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarProductosComponent } from './cargar-productos.component';

describe('CargarProductosComponent', () => {
  let component: CargarProductosComponent;
  let fixture: ComponentFixture<CargarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarProductosComponent]
    });
    fixture = TestBed.createComponent(CargarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
