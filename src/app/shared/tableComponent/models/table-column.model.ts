type ColumnType = 'text' | 'custom' | 'action' | undefined;

export interface TableColumn<T> {
  field: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: Array<{ value: any; label: string }>;
  filterEndpoint?: string;
  type?: ColumnType;
}

export interface BaseTableRequest {
  page: number;
  pageSize: number;
  sort?: { field: string; direction: 'asc' | 'desc' } | null;
  endpoint?: string;
}

export interface BaseTableResponse<T> {
  total: number;
  items: T[];
}
