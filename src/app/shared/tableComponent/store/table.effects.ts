import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { BaseTableResponse } from '../models/table-column.model';
import { BaseTableService } from '../services/table.service';

import * as BaseTableActions from './table.actions';
import * as BaseTableSelectors from './table.selectors';

@Injectable()
export class BaseTableEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private baseTableService = inject(BaseTableService);

  // Effect to load table data
  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BaseTableActions.loadBaseTable),
      mergeMap(({ request }) => {
        console.log('Effects - Load action triggered with request:', request);
        return this.baseTableService.fetch(request).pipe(
          map((response: BaseTableResponse<any>) => {
            console.log('Effects - Load success, response:', response);
            return BaseTableActions.loadBaseTableSuccess({ response, request });
          }),
          catchError((error) => {
            console.log('Effects - Load error:', error);
            return of(BaseTableActions.loadBaseTableFailure({ error }));
          })
        );
      })
    )
  );

  // Effect to reload data on sort/page changes
  reloadOnParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BaseTableActions.setBaseTableSort,
        BaseTableActions.setBaseTablePage
      ),
      withLatestFrom(this.store.select(BaseTableSelectors.selectBaseTableRequest)),
      map(([action, request]) => {
        console.log('Effects - Action triggered:', action.type);
        console.log('Effects - Request object:', request);
        return BaseTableActions.loadBaseTable({ request });
      })
    )
  );

  
}
