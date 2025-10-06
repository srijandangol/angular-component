import { createAction, props } from '@ngrx/store';
import { BaseTableRequest, BaseTableResponse } from '../models/table-column.model';

export const loadBaseTable = createAction(
  '[BaseTable] Load',
  props<{ request: BaseTableRequest }>()
);

export const loadBaseTableSuccess = createAction(
  '[BaseTable] Load Success',
  props<{ response: BaseTableResponse<any>; request: BaseTableRequest }>()
);

export const loadBaseTableFailure = createAction(
  '[BaseTable] Load Failure',
  props<{ error: any }>()
);


export const setBaseTableSort = createAction(
  '[BaseTable] Set Sort',
  props<{ sort: { field: string; direction: 'asc' | 'desc' } | null }>()
);

export const setBaseTablePage = createAction(
  '[BaseTable] Set Page',
  props<{ page: number; pageSize?: number }>()
);
