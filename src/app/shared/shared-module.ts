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

@NgModule({
  declarations: [
    InputTextComponent, 
    TextAreaComponent, 
    CheckboxComponent, 
    ButtonComponent, 
    DropdownComponent, 
    BaseTableComponent,
  ],
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MaterialModule,
    ClickOutsideDirective // Import standalone directive here
  ],
  exports: [
    InputTextComponent,
    TextAreaComponent,
    CheckboxComponent,
    ButtonComponent,
    DropdownComponent,
    BaseTableComponent,
    MaterialModule, // so other modules can use Material
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideDirective // Export standalone directive
  ],
})
export class SharedModule {}
