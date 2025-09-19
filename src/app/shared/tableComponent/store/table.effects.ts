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
      mergeMap(({ request }) =>
        this.baseTableService.fetch(request).pipe(
          map((response: BaseTableResponse<any>) =>
            BaseTableActions.loadBaseTableSuccess({ response, request })
          ),
          catchError((error) =>
            of(BaseTableActions.loadBaseTableFailure({ error }))
          )
        )
      )
    )
  );

  // Effect to reload data on filter/sort/page changes
  reloadOnParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BaseTableActions.setBaseTableFilters,
        BaseTableActions.setBaseTableSort,
        BaseTableActions.setBaseTablePage
      ),
      withLatestFrom(this.store.select(BaseTableSelectors.selectBaseTableRequest)),
      map(([_, request]) => BaseTableActions.loadBaseTable({ request }))
    )
  );
}
