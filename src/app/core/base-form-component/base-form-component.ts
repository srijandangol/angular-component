import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-base-form-component',
  standalone: false,
  templateUrl: './base-form-component.html',
  styleUrls: ['./base-form-component.scss']
})
export class BaseFormComponent implements OnInit {
  @Input() config: any[] = [];
  @Input() initialData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;
  fileError: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const formGroup: any = {};
    this.config.forEach(field => {
      formGroup[field.name] = [this.initialData[field.name] || '', this.getValidators(field)];
    });
    this.form = this.fb.group(formGroup);
  }

  getValidators(field: any) {
    const validatorFns: ValidatorFn[] = [];
    if (field.validators) {
      field.validators.forEach((v: any) => {
        if (v.name === 'required') validatorFns.push(Validators.required);
      });
    }
    return validatorFns;
  }

  onFileChange(event: any, field: any) {
  const file = event.target.files[0];
  this.fileError = null;
  this.previewUrl = null;

  if (!file) return;

  // Validate type
  if (!file.name.toLowerCase().endsWith('.png')) {
    this.fileError = 'Only PNG files are allowed';
    this.form.patchValue({ [field.name]: null });
    return;
  }

  // Validate size
  const sizeMB = file.size / (1024 * 1024);
  if (sizeMB > (field.maxSizeMB || 3)) {
    this.fileError = `File must be smaller than ${field.maxSizeMB || 3} MB`;
    this.form.patchValue({ [field.name]: null });
    return;
  }

  // Convert to Base64 for preview and storage
  const reader = new FileReader();
  reader.onload = () => {
    this.form.get(field.name)?.setValue(reader.result); // Store Base64
    this.previewUrl = reader.result;
  };
  reader.readAsDataURL(file);
}


  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
