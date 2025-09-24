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

@Component({
  selector: 'app-base-table-component',
  standalone: false,
  templateUrl: './base-table-component.html',
  styleUrls: ['./base-table-component.scss']
})
export class BaseTableComponent<T = any> implements AfterViewInit, OnChanges {
  @Input() tableTitle: string = '';
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
  @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc'|'desc' } | null>();
  @Output() filterChange = new EventEmitter<Record<string, any>>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  selectedFilterField: string = '';

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.rows || [];
    this.displayedColumns = this.columns.map(col => String(col.field));


    if (!this.selectedFilterField && this.columns.length) {
      this.selectedFilterField = this.columns[0].field as string;
    }

    // Filter predicate for client-side filtering
    this.dataSource.filterPredicate = (data: T, filter: string) => {
      if (!filter) return true;
      const filterObj = JSON.parse(filter);
      const field = Object.keys(filterObj)[0];
      const value = filterObj[field].toString().toLowerCase();
      const cellValue = data[field as keyof T];
      return cellValue != null && cellValue.toString().toLowerCase().includes(value);
    };
  }

  /** Handle filtering */
  applyFilter(field: string, event: Event) {
    const input = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.serverSide) {
      this.filterChange.emit({ [field]: input });
    } else {
      this.dataSource.filter = JSON.stringify({ [field]: input });
    }
  }

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

  get filterableColumns(): TableColumn<T>[] {
  return this.columns.filter(col => col.filterable);
}
}
