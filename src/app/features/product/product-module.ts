import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material/material-module';
import { ProductFormComponent } from './product-form/product-form-component';

@NgModule({
    declarations: [ProductFormComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, RouterModule],
})
export class ProductModule { }


