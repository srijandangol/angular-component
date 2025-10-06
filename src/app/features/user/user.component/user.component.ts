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

  tableTitle = 'Users';
  buttonLabel = 'Add User';

  rows$: Observable<any[]>;
  total$: Observable<number>;
  loading$: Observable<boolean>;

  columns: TableColumn<any>[] = UserColumns;


  constructor(private store: Store) {
    this.rows$ = this.store.select(BaseTableSelectors.selectBaseTableItems);
    this.total$ = this.store.select(BaseTableSelectors.selectBaseTableTotal);
    this.loading$ = this.store.select(BaseTableSelectors.selectBaseTableLoading);

    // Add debugging to see if store data is changing
    this.rows$.subscribe(rows => {
      console.log('User Component - Rows updated from store:', rows);
    });

    this.total$.subscribe(total => {
      console.log('User Component - Total updated from store:', total);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(BaseTableActions.loadBaseTable({
      request: { page: 1, pageSize: 10, endpoint: 'http://localhost:3000/users' }
    }));
  }

  handleAction(event: { action: string; row: any }) {
    if (event.action === 'view') {
      // this.dialog.open(UserDetailComponent, {
      //   data: event.row,
      //   width: '600px'});
      // this.router.navigate(['/users', event.row.id]);
      console.log('View user', event.row);

    }
    if (event.action === 'edit') {
      console.log('Edit user', event.row);
      // open form or navigate
    }
    if (event.action === 'delete') {
      console.log('Delete user', event.row);
      // confirm + delete
    }
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
    console.log('User Component - Filter change received:', filters);
    // Client-side filtering is handled by the base table component
    // This method is called when filters are applied or cleared
    if (Object.keys(filters).length === 0) {
      console.log('User Component - All filters cleared, showing all data');
    } else {
      console.log('User Component - Filters applied:', filters);
    }
  }


  openAddUserForm() {
    console.log('Opening Add User Form...');
    // Navigate or open modal here
  }
}
