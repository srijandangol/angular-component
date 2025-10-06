import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { TableColumn } from '../models/table-column.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FilterComponent } from '../../components/filter-component/filter.component';

@Component({
  selector: 'app-base-table-component',
  standalone: false,
  templateUrl: './base-table-component.html',
  styleUrls: ['./base-table-component.scss']
})
export class BaseTableComponent<T = any> implements AfterViewInit, OnChanges {

  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];
  @Input() total = 0;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() loading = false;
  @Input() customCellTemplates?: Record<string, TemplateRef<any>>;

  /** Toggle server-side vs client-side */
  @Input() serverSide = false;

  @Output() actionClicked = new EventEmitter<{ action: string; row: any }>();
  @Output() pageChange = new EventEmitter<{ page: number; pageSize?: number }>();
  @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc' | 'desc' } | null>();
  @Output() filterChange = new EventEmitter<Record<string, any>>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  currentFilters: Record<string, any> = {};


  constructor(private dialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Base Table - ngOnChanges triggered');
    console.log('Base Table - Changes:', changes);
    console.log('Base Table - New rows:', this.rows);

    this.dataSource.data = this.rows || [];
    this.displayedColumns = this.columns.map(col => String(col.field));

    console.log('Base Table - DataSource updated with data:', this.dataSource.data);


    // Filter predicate for client-side filtering
    this.dataSource.filterPredicate = (data: T, filter: string) => {
      if (!filter) return true;

      try {
        const filterObj = JSON.parse(filter);

        // Check all filter criteria (AND across fields)
        return Object.entries(filterObj).every(([field, value]) => {
          if (value === undefined || value === null || value === '') return true; // Skip empty values

          const cellValue = data[field as keyof T];
          if (cellValue == null) return false;

          const searchValue = value.toString().trim().toLowerCase();
          const cellString = cellValue.toString().trim().toLowerCase();

          // Exact match only (case-insensitive)
          return cellString === searchValue;
        });
      } catch (error) {
        console.error('Error parsing filter:', error);
        return true;
      }
    };
  }

  // /** Handle filtering */
  // applyFilter(field: string, event: Event) {
  //   const input = (event.target as HTMLInputElement).value.trim().toLowerCase();

  //   if (this.serverSide) {
  //     this.filterChange.emit({ [field]: input });
  //   } else {
  //     this.dataSource.filter = JSON.stringify({ [field]: input });
  //   }
  // }


  /** Handle sorting */
  onSortChange(sortState: Sort) {

    if (this.serverSide) {
      if (sortState.direction === '') {
        this.sortChange.emit(null);
      } else {
        this.sortChange.emit({
          field: sortState.active,
          direction: sortState.direction as 'asc' | 'desc'
        });
      }
    }
    // else: MatTableDataSource handles client-side sorting automatically
  }

  /** Handle pagination */
  onPageChange(event: PageEvent) {
    if (this.serverSide) {
      this.pageChange.emit({
        page: event.pageIndex + 1,
        pageSize: event.pageSize
      });
    }
    // else: MatPaginator handles client-side pagination automatically
  }

  /** Helpers for cell rendering */
  getTemplate(field: string): TemplateRef<any> | null {
    return this.customCellTemplates?.[field] ?? null;
  }

  getCellValue(row: T, field: string | keyof T): any {
    return row[field as keyof T];
  }

  get filterableColumns() {
    return this.columns.filter(col => col.filterable);
  }

  openFilterDialog() {
    console.log('Base Table - Opening filter dialog');
    console.log('Base Table - Columns:', this.columns);
    console.log('Base Table - Filterable columns:', this.filterableColumns);

    const dialogRef = this.dialog.open(FilterComponent, {
      width: '500px',
      data: {
        filterableColumns: this.filterableColumns.map(col => ({
          field: col.field as string,
          header: col.header,
          options: col.filterOptions,
          endpoint: col.filterEndpoint
        })),
        currentFilters: this.currentFilters
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Base Table - Dialog closed with result:', result);

      if (result && typeof result === 'object' && Object.keys(result).length > 0) {
        // Apply new filters
        console.log('Base Table - Applying new filters:', result);
        this.currentFilters = { ...this.currentFilters, ...result };
        this.applyFilters();
      } else if (result === null) {
        // Cancel clicked - do nothing, keep current state
        console.log('Base Table - Cancel clicked, no changes made');
      }
      // If result is undefined, dialog was closed without action - do nothing
    });
  }

  applyFilters() {
    console.log('Base Table - Applying filters:', this.currentFilters);
    if (this.serverSide) {
      console.log('Base Table - Emitting filterChange event');
      this.filterChange.emit(this.currentFilters);
    } else {
      // For client-side filtering
      if (Object.keys(this.currentFilters).length === 0) {
        // Clear all filters - show all data
        console.log('Base Table - Clearing all filters, showing all data');
        this.dataSource.filter = '';
      } else {
        // Apply specific filters
        console.log('Base Table - Applying specific filters');
        this.dataSource.filter = JSON.stringify(this.currentFilters);
      }
    }
  }

  clearFilters() {
    console.log('Base Table - Clear filters button clicked');
    this.currentFilters = {};
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.currentFilters).length > 0;
  }

}
