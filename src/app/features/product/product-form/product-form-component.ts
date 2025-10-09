import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface ProductVariantFormValue {
    sku: string;
    price: number;
    stock: number;
}

export interface ProductFormValue {
    name: string;
    description: string;
    variants: ProductVariantFormValue[];
}

@Component({
    selector: 'app-product-form-component',
    standalone: false,
    templateUrl: './product-form-component.html',
    styleUrls: ['./product-form-component.scss']
})
export class ProductFormComponent {
    productForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.productForm = this.fb.group({
            name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
            description: new FormControl('', { nonNullable: true }),
            variants: this.fb.array([this.createVariantGroup()])
        });
    }

    get variants(): FormArray {
        return this.productForm.get('variants') as FormArray;
    }

    createVariantGroup(): FormGroup {
        return this.fb.group({
            sku: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
            price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
            stock: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0)] })
        });
    }

    addVariant(): void {
        this.variants.push(this.createVariantGroup());
    }

    removeVariant(index: number): void {
        if (this.variants.length > 1) {
            this.variants.removeAt(index);
        }
    }

    submit(): void {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }
        const value = this.productForm.getRawValue() as ProductFormValue;
        console.log('Submitting product:', value);
        // TODO: integrate with product service/backend
    }
}


