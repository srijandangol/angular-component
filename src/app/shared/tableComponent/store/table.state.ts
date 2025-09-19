import { BaseTableRequest, BaseTableResponse } from '../models/table-column.model';

export interface BaseTableState {
  items: any[];
  total: number;
  loading: boolean;
  error: any;
  page: number;
  pageSize: number;
  sort: { field: string; direction: 'asc' | 'desc' } | null;
  filters: Record<string, any>;
  lastRequest: BaseTableRequest | null;
}

export const initialState: BaseTableState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  page: 1,
  pageSize: 10,
  sort: null,
  filters: {},
  lastRequest: null
};
