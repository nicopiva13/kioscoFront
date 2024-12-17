import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-categorias',
  templateUrl: './modal-categorias.component.html',
  styleUrls: ['./modal-categorias.component.css']
})
export class ModalCategoriasComponent {
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con el nombre de la categoría (si se edita) o vacío (si se agrega)
    this.categoryForm = this.fb.group({
      nombre: [data ? data.nombre : '', Validators.required] // Si data es null, se usa cadena vacía
    });
  }

  onSave(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value); // Cierra el modal y envía el valor del formulario
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
