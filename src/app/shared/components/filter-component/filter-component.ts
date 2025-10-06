import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-component.html',
  styleUrls: ['./filter-component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatInputModule,
    MatOptionModule
  ]
})
export class FilterDialogComponent {
  fieldControl = new FormControl('');
  searchTerm: string = '';

  constructor(
    public dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { filterableColumns: any[]; customTemplate?: TemplateRef<any> }
  ) {}

  close() {
    this.dialogRef.close();
  }

  applyFilter() {
    this.dialogRef.close({
      field: this.fieldControl.value,
      value: this.searchTerm
    });
  }
}
