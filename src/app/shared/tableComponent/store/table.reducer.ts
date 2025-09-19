import { createReducer, on } from '@ngrx/store';
import * as BaseTableActions from './table.actions';
import { initialState } from './table.state';

export const baseTableReducer = createReducer(
  initialState,
  on(BaseTableActions.loadBaseTable, (state, { request }) => ({
    ...state,
    loading: true,
    error: null,
    lastRequest: request
  })),

  on(BaseTableActions.loadBaseTableSuccess, (state, { response }) => ({
    ...state,
    items: response.items,
    total: response.total,
    loading: false,
    error: null
  })),

  on(BaseTableActions.loadBaseTableFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(BaseTableActions.setBaseTableFilters, (state, { filters }) => ({
    ...state,
    filters
  })),

  on(BaseTableActions.setBaseTableSort, (state, { sort }) => ({
    ...state,
    sort
  })),

  on(BaseTableActions.setBaseTablePage, (state, { page, pageSize }) => ({
    ...state,
    page,
    pageSize: pageSize ?? state.pageSize
  }))
);
