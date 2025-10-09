import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
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
  styleUrls: ['./base-table-component.scss'],
})
export class BaseTableComponent<T = any> implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn<T>[] = [];
  @Input() rows: T[] = [];
  @Input() total = 0;
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() loading = false;
  @Input() customCellTemplates?: Record<string, TemplateRef<any>>;
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

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.rows || [];
    this.displayedColumns = this.columns.map((col) => String(col.field));

    this.dataSource.filterPredicate = (data: T, filter: string) => {
      if (!filter) return true;
      try {
        const filterObj = JSON.parse(filter);
        return Object.entries(filterObj).every(([field, value]) => {
          if (!value) return true;
          const cellValue = data[field as keyof T];
          if (cellValue == null) return false;
          return (
            cellValue.toString().trim().toLowerCase() === value.toString().trim().toLowerCase()
          );
        });
      } catch {
        return true;
      }
    };
  }

  onSortChange(sortState: Sort) {
    if (this.serverSide) {
      this.sortChange.emit(
        sortState.direction
          ? { field: sortState.active, direction: sortState.direction as 'asc' | 'desc' }
          : null
      );
    }
  }

  onPageChange(event: PageEvent) {
    if (this.serverSide) {
      this.pageChange.emit({ page: event.pageIndex + 1, pageSize: event.pageSize });
    }
  }

  getTemplate(field: string): TemplateRef<any> | null {
    return this.customCellTemplates?.[field] ?? null;
  }

  getCellValue(row: T, field: string | keyof T): any {
    return row[field as keyof T];
  }

  get filterableColumns() {
    return this.columns.filter((col) => col.filterable);
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '500px',
      data: {
        filterableColumns: this.filterableColumns.map((col) => ({
          field: col.field as string,
          header: col.header,
          options: col.filterOptions,
          endpoint: col.filterEndpoint,
        })),
        currentFilters: this.currentFilters,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && typeof result === 'object' && Object.keys(result).length > 0) {
        this.currentFilters = { ...this.currentFilters, ...result };
        this.applyFilters();
      }
    });
  }

  applyFilters() {
    if (this.serverSide) {
      this.filterChange.emit(this.currentFilters);
    } else {
      this.dataSource.filter = Object.keys(this.currentFilters).length
        ? JSON.stringify(this.currentFilters)
        : '';
    }
  }

  clearFilters() {
    this.currentFilters = {};
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return Object.keys(this.currentFilters).length > 0;
  }
}
