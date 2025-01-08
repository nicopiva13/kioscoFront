import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioVendedorComponent } from './inicio-vendedor.component';

describe('InicioVendedorComponent', () => {
  let component: InicioVendedorComponent;
  let fixture: ComponentFixture<InicioVendedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioVendedorComponent]
    });
    fixture = TestBed.createComponent(InicioVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
