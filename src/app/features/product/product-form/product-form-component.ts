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

interface VariantOption {
  id: number;
  label: string;
}

interface VariantColorOption {
  id: number;
  label: string;
}

interface FrequencyOption {
  id: string;
  label: string;
}

interface DurationOption {
  id: number; // numeric so we can use it in amount calculation
  label: string;
}

/* colorOptions kept as const */
const colorOptions: VariantColorOption[] = [
  { id: 1, label: 'Red' },
  { id: 2, label: 'Blue' },
  { id: 3, label: 'Green' },
  { id: 4, label: 'Black' },
  { id: 5, label: 'White' },
];

@Component({
  selector: 'app-product-form-component',
  standalone: false,
  templateUrl: './product-form-component.html',
  styleUrls: ['./product-form-component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;

  allOptions: VariantOption[] = [
    { id: 1, label: 'Small' },
    { id: 2, label: 'Medium' },
    { id: 3, label: 'Large' },
    { id: 4, label: 'Extra Large' },
  ];

  // Frequency and Duration option lists as class properties
  frequencyOptions: FrequencyOption[] = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' }
  ];

  durationOptions: DurationOption[] = [
    { id: 1, label: '1 Month' },
    { id: 3, label: '3 Months' },
    { id: 6, label: '6 Months' },
    { id: 12, label: '12 Months' }
  ];

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(2)],
      }),
      description: new FormControl('', { nonNullable: true }),
      variants: this.fb.array([this.createVariantGroup()]),
    });

    // Keep duplicate checks and amount recalculation in sync
    this.variants.valueChanges.subscribe(() => {
      this.updateDuplicateErrors();
      this.recalculateAmounts();
    });
  }

  get variants(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  createVariantGroup(): FormGroup {
    return this.fb.group({
      variantType: [null, Validators.required],
      color: [null, Validators.required],
      frequency: [null, Validators.required],
      duration: [null, Validators.required],
      sku: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      price: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      stock: new FormControl(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(0)],
      }),
      amount: new FormControl({ value: 0, disabled: true }) // auto-calculated
    });
  }

  addVariant(): void {
    const last = this.variants.at(this.variants.length - 1);
    if (last.invalid) {
      last.markAllAsTouched();
      return;
    }

    const lastSelected = last.get('variantType')?.value;
    if (!lastSelected) {
      last.get('variantType')?.markAsTouched();
      return;
    }

    if (this.isAddDisabled) return;

    this.variants.push(this.createVariantGroup());
  }

  removeVariant(index: number): void {
    if (this.variants.length > 1) {
      this.variants.removeAt(index);
      // after removal, update duplicates and amounts
      this.updateDuplicateErrors();
      this.recalculateAmounts();
    }
  }

  /* ---------- filtering helpers for variantType ---------- */
  availableOptionsFor(index: number): VariantOption[] {
    const selected = this.selectedIds(index);
    const current = this.variants.at(index).get('variantType')?.value;
    return this.allOptions.filter((o) => !selected.has(o.id) || o.id === current);
  }

  private selectedIds(exceptIndex?: number): Set<number> {
    const set = new Set<number>();
    this.variants.controls.forEach((ctrl, i) => {
      if (i === exceptIndex) return;
      const v = ctrl.get('variantType')?.value;
      if (v != null) set.add(v);
    });
    return set;
  }

  /* ---------- filtering helpers for color ---------- */
  availableColorsFor(index: number): VariantColorOption[] {
    const selected = new Set<number>();
    this.variants.controls.forEach((ctrl, i) => {
      if (i !== index) {
        const val = ctrl.get('color')?.value;
        if (val != null) selected.add(val);
      }
    });

    const currentValue = this.variants.at(index).get('color')?.value;
    return colorOptions.filter((c) => !selected.has(c.id) || c.id === currentValue);
  }

  /* ---------- filtering helpers for frequency ---------- */
  availableFrequenciesFor(index: number): FrequencyOption[] {
    const selected = new Set<string>();
    this.variants.controls.forEach((ctrl, i) => {
      if (i !== index) {
        const val = ctrl.get('frequency')?.value;
        if (val != null) selected.add(val);
      }
    });
    const current = this.variants.at(index).get('frequency')?.value;
    return this.frequencyOptions.filter(f => !selected.has(f.id) || f.id === current);
  }

  /* ---------- filtering helpers for duration ---------- */
  availableDurationsFor(index: number): DurationOption[] {
    const selected = new Set<number>();
    this.variants.controls.forEach((ctrl, i) => {
      if (i !== index) {
        const val = ctrl.get('duration')?.value;
        if (val != null) selected.add(val);
      }
    });
    const current = this.variants.at(index).get('duration')?.value;
    return this.durationOptions.filter(d => !selected.has(d.id) || d.id === current);
  }

  /* ---------- duplicate-checker updated for all dropdowns ---------- */
  private updateDuplicateErrors(): void {
    const trackDuplicates = (controlName: string) => {
      const counts = new Map<any, number>();
      this.variants.controls.forEach(ctrl => {
        const val = ctrl.get(controlName)?.value;
        if (val != null) counts.set(val, (counts.get(val) || 0) + 1);
      });

      this.variants.controls.forEach(ctrl => {
        const val = ctrl.get(controlName)?.value;
        const hasDup = val != null && (counts.get(val) || 0) > 1;
        const existing = ctrl.get(controlName)?.errors || {};

        if (hasDup) {
          ctrl.get(controlName)?.setErrors({ ...existing, duplicate: true });
        } else {
          if ('duplicate' in existing) delete existing['duplicate'];
          ctrl.get(controlName)?.setErrors(Object.keys(existing).length ? existing : null);
        }
      });
    };

    // apply duplicate detection to all dropdown-like fields
    trackDuplicates('variantType');
    trackDuplicates('color');
    trackDuplicates('frequency');
    trackDuplicates('duration');
  }

  /* ---------- amount auto-calculation (example) ---------- */
  private recalculateAmounts(): void {
    // Example formula: amount = price * stock * durationMonths
    this.variants.controls.forEach(ctrl => {
      const price = Number(ctrl.get('price')?.value) || 0;
      const stock = Number(ctrl.get('stock')?.value) || 0;
      const duration = Number(ctrl.get('duration')?.value) || 0; // duration.id is months
      const amount = price * stock * duration;
      const amountCtrl = ctrl.get('amount');
      if (amountCtrl) amountCtrl.setValue(amount, { emitEvent: false });
    });
  }

  get isAddDisabled(): boolean {
    return this.selectedIds().size >= this.allOptions.length;
  }

  submit(): void {
    this.productForm.markAllAsTouched();
    this.updateDuplicateErrors();
    this.recalculateAmounts();

    if (this.productForm.invalid) {
      console.warn('Form invalid:', this.productForm.value);
      return;
    }
    const value = this.productForm.getRawValue() as ProductFormValue;
    console.log('Submitting product:', value);
    // TODO: integrate with product service/backend
  }
}
