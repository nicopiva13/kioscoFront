import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCategoriasComponent } from './cargar-categorias.component';

describe('CargarCategoriasComponent', () => {
  let component: CargarCategoriasComponent;
  let fixture: ComponentFixture<CargarCategoriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CargarCategoriasComponent]
    });
    fixture = TestBed.createComponent(CargarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
