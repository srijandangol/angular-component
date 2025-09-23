import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseTableComponent } from './base-table-component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface TestRow {
  id: number;
  name: string;
}

fdescribe('BaseTableComponent', () => {
  let component: BaseTableComponent<TestRow>;
  let fixture: ComponentFixture<BaseTableComponent<TestRow>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseTableComponent],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    fixture = TestBed.createComponent<BaseTableComponent<TestRow>>(BaseTableComponent);
    component = fixture.componentInstance;

    // Dummy data
    component.columns = [
      { field: 'id', header: 'ID', filterable: true },
      { field: 'name', header: 'Name', filterable: true }
    ];
    component.rows = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    // Initialize MatTableDataSource manually for testing
    component.dataSource.paginator = component.paginator;
    component.dataSource.sort = component.sort;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayedColumns and selectedFilterField on ngOnChanges', () => {
    component.ngOnChanges({});
    expect(component.displayedColumns).toEqual(['id', 'name']);
    expect(component.selectedFilterField).toBe('id');
  });

  it('should filter data client-side', () => {
    component.serverSide = false;
    const event = { target: { value: 'Bob' } } as any;
    component.applyFilter('name', event);
    expect(component.dataSource.filter).toBe(JSON.stringify({ name: 'bob' }));
  });

  it('should emit filterChange for server-side filtering', () => {
    component.serverSide = true;
    spyOn(component.filterChange, 'emit');
    const event = { target: { value: 'Alice' } } as any;
    component.applyFilter('name', event);
    expect(component.filterChange.emit).toHaveBeenCalledWith({ name: 'alice' });
  });

  it('should emit sortChange for server-side sorting', () => {
    component.serverSide = true;
    spyOn(component.sortChange, 'emit');
    component.onSortChange({ active: 'name', direction: 'asc' });
    expect(component.sortChange.emit).toHaveBeenCalledWith({ field: 'name', direction: 'asc' });
  });

  it('should emit null sortChange when direction is empty', () => {
    component.serverSide = true;
    spyOn(component.sortChange, 'emit');
    component.onSortChange({ active: 'id', direction: '' });
    expect(component.sortChange.emit).toHaveBeenCalledWith(null);
  });

  it('should emit pageChange for server-side pagination', () => {
    component.serverSide = true;
    spyOn(component.pageChange, 'emit');
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 2 };
    component.onPageChange(pageEvent);
    expect(component.pageChange.emit).toHaveBeenCalledWith({ page: 2, pageSize: 10 });
  });

  it('should return correct cell value', () => {
    const row = { id: 1, name: 'Alice' };
    expect(component.getCellValue(row, 'name')).toBe('Alice');
    expect(component.getCellValue(row, 'id')).toBe(1);
  });

  it('should return custom template or null', () => {
    const template = {} as TemplateRef<any>;
    component.customCellTemplates = { name: template };
    expect(component.getTemplate('name')).toBe(template);
    expect(component.getTemplate('id')).toBeNull();
  });

  it('should return filterable columns', () => {
    expect(component.filterableColumns.length).toBe(2);
  });

  it('should call onView, onEdit, onDelete', () => {
    spyOn(window, 'alert');
    const row = { id: 1, name: 'Alice' };
    component.onView(row);
    expect(window.alert).toHaveBeenCalledWith('View click');
    component.onEdit(row);
    expect(window.alert).toHaveBeenCalledWith('Edit click');
    component.onDelete(row);
    expect(window.alert).toHaveBeenCalledWith('Delete click');
  });

  it('should handle client-side filtering correctly via filterPredicate', () => {
    component.serverSide = false;
    component.ngOnChanges({});
    const predicate = component.dataSource.filterPredicate;
    expect(predicate({ id: 1, name: 'Alice' }, JSON.stringify({ name: 'ali' }))).toBe(true);
    expect(predicate({ id: 2, name: 'Bob' }, JSON.stringify({ name: 'ali' }))).toBe(false);
  });
});
