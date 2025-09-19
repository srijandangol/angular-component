import { Component } from '@angular/core';
import { TableColumn } from '../../../shared/tableComponent/models/table-column.model';
import * as BaseTableSelectors from '../../../shared/tableComponent/store/table.selectors';
import * as BaseTableActions from '../../../shared/tableComponent/store/table.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-demo',
  standalone: false,
  templateUrl: './demo.html',
  styleUrl: './demo.scss'
})
export class Demo {

   rows = [
    { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Admin', status: 'Active' }
  ];
    total$: Observable<number>;
    loading$: Observable<boolean>;

columns: TableColumn<any>[] = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true, filterable: true },
    { field: 'email', header: 'Email', sortable: true, filterable: true },
    { field: 'role', header: 'Role', sortable: true, filterable: true },
    { field: 'status', header: 'Status', sortable: true, filterable: true },
  ]

   constructor(private store: Store) {
      // this.rows = this.store.select(BaseTableSelectors.selectBaseTableItems);
      this.total$ = this.store.select(BaseTableSelectors.selectBaseTableTotal);
      this.loading$ = this.store.select(BaseTableSelectors.selectBaseTableLoading);
    }
}
