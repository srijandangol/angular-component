import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material/material-module';

// import your shared reusable components
import { InputTextComponent } from './components/input-text-component/input-text-component';
import { TextAreaComponent } from './components/text-area-component/text-area-component';
import { CheckboxComponent } from './components/checkbox-component/checkbox-component';
import { ButtonComponent } from './components/button-component/button-component';
import { DropdownComponent } from './components/dropdown-component/dropdown-component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { BaseTableComponent } from './tableComponent/base-table-component/base-table-component';
import { FilterComponent } from './components/filter-component/filter.component';
import { RouterModule } from '@angular/router';
import { TableheaderComponent } from './tableComponent/tableheader.component/tableheader.component';
import { BaseFormComponent } from '../core/base-form-component/base-form-component';

@NgModule({
  declarations: [
    InputTextComponent,
    TextAreaComponent,
    CheckboxComponent,
    ButtonComponent,
    DropdownComponent,
    BaseTableComponent,
    TableheaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterComponent,
    MaterialModule,
    RouterModule,
    ClickOutsideDirective // Import standalone directive here
  ],
  exports: [
    InputTextComponent,
    TextAreaComponent,
    CheckboxComponent,
    ButtonComponent,
    DropdownComponent,
    BaseTableComponent,
    FilterComponent,
    TableheaderComponent,
    MaterialModule, // so other modules can use Material
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective // Export standalone directive
  ],
})
export class SharedModule { }
