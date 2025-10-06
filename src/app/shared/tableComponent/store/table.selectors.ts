import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BaseTableState } from './table.state';

export const selectBaseTableState = createFeatureSelector<BaseTableState>('baseTable');

export const selectBaseTableItems = createSelector(
  selectBaseTableState,
  (state) => state.items
);

export const selectBaseTableTotal = createSelector(
  selectBaseTableState,
  (state) => state.total
);

export const selectBaseTableLoading = createSelector(
  selectBaseTableState,
  (state) => state.loading
);

export const selectBaseTableRequest = createSelector(
  selectBaseTableState,
  (state) => ({
    page: state.page,
    pageSize: state.pageSize,
    sort: state.sort,
    endpoint: state.lastRequest?.endpoint
  })
);
