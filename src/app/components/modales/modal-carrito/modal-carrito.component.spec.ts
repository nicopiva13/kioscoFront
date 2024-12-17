import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarritoComponent } from './modal-carrito.component';

describe('ModalCarritoComponent', () => {
  let component: ModalCarritoComponent;
  let fixture: ComponentFixture<ModalCarritoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCarritoComponent]
    });
    fixture = TestBed.createComponent(ModalCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
