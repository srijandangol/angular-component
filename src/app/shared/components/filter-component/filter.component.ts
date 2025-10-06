import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, map, startWith } from 'rxjs';

export interface FilterOption {
    value: any;
    label: string;
}

export interface FilterColumn {
    field: string;
    header: string;
    options?: FilterOption[];
    endpoint?: string;
}

@Component({
    selector: 'app-filter-component',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
    ],
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
    ) { }

    ngOnInit() {
        console.log('Table Filter - Initializing with data:', this.data);
        this.filterableColumns = this.data.filterableColumns;
        console.log('Table Filter - Filterable columns:', this.filterableColumns);

        // Create form controls for each filterable column
        this.filterableColumns.forEach((column) => {
            const control = new FormControl(null);
            this.filterForm.addControl(column.field, control);
            console.log('Table Filter - Added form control for:', column.field);

            // Load options for this field
            this.loadFieldOptions(column);

            // Set up autocomplete filtering
            this.filteredOptions[column.field] = control.valueChanges.pipe(
                startWith(''),
                map((value) => this._filter((value ?? '').toString(), column.field))
            );
        });

        console.log('Table Filter - Form controls created:', this.filterForm.controls);
        console.log('Table Filter - Field options:', this.fieldOptions);

        // Initialize with current filters if any
        if (this.data.currentFilters) {
            this.filterForm.patchValue(this.data.currentFilters);
        }
    }

    private loadFieldOptions(column: FilterColumn) {
        const fieldName = column.field;

        if (column.options && column.options.length > 0) {
            // Use static options
            this.fieldOptions[fieldName] = column.options;
        } else if (column.endpoint) {
            // TODO: Implement API call for dynamic options
            console.log('Table Filter - API endpoint for', fieldName, ':', column.endpoint);
            this.fieldOptions[fieldName] = [];
        } else {
            // No options available
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
        console.log('Table Filter - Cancel clicked, closing without changes');
        this.dialogRef.close(null);
    }

    applyFilter() {
        console.log('Table Filter - Apply Filter button clicked!');
        const formValue = this.filterForm.value;
        const filters: Record<string, any> = {};

        console.log('Table Filter - Form value:', formValue);

        // Only include non-empty values
        Object.entries(formValue).forEach(([key, value]) => {
            if (value && typeof value === 'string' && value.trim() !== '') {
                filters[key] = value;
            } else if (value && typeof value !== 'string') {
                filters[key] = value;
            }
        });

        console.log('Table Filter - Applying filters:', filters);
        this.dialogRef.close(filters);
    }

    displayWith(value: any): string {
        if (!value) return '';
        return typeof value === 'string' ? value : value.toString();
    }
}
