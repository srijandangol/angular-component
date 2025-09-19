import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BaseTableSelectors from '../../../shared/tableComponent/store/table.selectors';
import * as BaseTableActions from '../../../shared/tableComponent/store/table.actions';
import { TableColumn } from '../../../shared/tableComponent/models/table-column.model';
import { UserColumns } from './user-column/tableColumns';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserTableComponent implements OnInit {
  rows$: Observable<any[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;
  
  columns: TableColumn<any>[] = UserColumns;


  constructor(private store: Store) {
    this.rows$ = this.store.select(BaseTableSelectors.selectBaseTableItems);
    this.total$ = this.store.select(BaseTableSelectors.selectBaseTableTotal);
    this.loading$ = this.store.select(BaseTableSelectors.selectBaseTableLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(BaseTableActions.loadBaseTable({
      request: { page: 1, pageSize: 10, endpoint: 'http://localhost:3000/users' }
    }));
  }

  onPageChange(e: { page: number; pageSize?: number }) {
    this.store.dispatch(BaseTableActions.setBaseTablePage(e));
  }

  onSortChange(sort: { field: string; direction: 'asc' | 'desc' } | null) {
    if (sort) {
      this.store.dispatch(BaseTableActions.setBaseTableSort({ sort }));
    }
  }

  onFilterChange(filters: Record<string, any>) {
    this.store.dispatch(BaseTableActions.setBaseTableFilters({ filters }));
  }
}
