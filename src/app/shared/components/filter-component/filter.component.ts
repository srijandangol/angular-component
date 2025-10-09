import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Observable, map, startWith } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

export interface FilterOption {
  value: any;
  label: string;
}

export interface FilterColumn {
  field: string;
  header: string;
  options?: FilterOption[];
}

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatOptionModule,
  ],
  standalone: true,
})
export class FilterComponent implements OnInit {
  filterForm = new FormGroup({});
  filteredOptions: { [key: string]: Observable<FilterOption[]> } = {};
  fieldOptions: { [key: string]: FilterOption[] } = {};
  filterableColumns: FilterColumn[] = [];

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      filterableColumns: FilterColumn[];
      currentFilters?: Record<string, any>;
    }
  ) {}

  ngOnInit() {
    this.filterableColumns = this.data.filterableColumns;

    this.filterableColumns.forEach((column) => {
      const control = new FormControl(null);
      this.filterForm.addControl(column.field, control);

      this.loadFieldOptions(column);

      this.filteredOptions[column.field] = control.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter((value ?? '').toString(), column.field))
      );
    });

    if (this.data.currentFilters) {
      this.filterForm.patchValue(this.data.currentFilters);
    }
  }

  private loadFieldOptions(column: FilterColumn) {
    const fieldName = column.field;

    if (column.options && column.options.length > 0) {
      this.fieldOptions[fieldName] = column.options;
    } else {
      this.fieldOptions[fieldName] = [];
    }
  }

  private _filter(value: string, fieldName: string): FilterOption[] {
    const filterValue = value.toLowerCase();
    return this.fieldOptions[fieldName].filter(
      (option) =>
        option.label.toLowerCase().includes(filterValue) ||
        option.value.toString().toLowerCase().includes(filterValue)
    );
  }

 close() {
  this.dialogRef.close();
}

resetFilters() {
  this.filterForm.reset(); // Reset all form controls
}

  applyFilter() {
    const formValue = this.filterForm.value;
    const filters: Record<string, any> = {};

    Object.entries(formValue).forEach(([key, value]) => {
      if (value && typeof value === 'string' && value.trim() !== '') {
        filters[key] = value;
      } else if (value && typeof value !== 'string') {
        filters[key] = value;
      }
    });

    this.dialogRef.close(filters);
  }

  displayWith(value: any): string {
    if (!value) return '';
    return typeof value === 'string' ? value : value.toString();
  }
}
