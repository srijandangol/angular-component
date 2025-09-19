import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService, Province } from '../services/location.service';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  province: number | null;
  district: string | null;
  terms: boolean;
  notifications: boolean;
}

@Component({
  selector: 'app-form-eg',
  standalone: false,
  templateUrl: './form-eg.html',
  styleUrls: ['./form-eg.scss'],
})
export class FormExampleComponent implements OnInit {
  myForm!: FormGroup;
  provinces: Province[] = [];
  districts: string[] = [];
  submitted = false;
  isLoading = false;


  provinceOptions: { value: number; label: string }[] = [];
  districtOptions: { value: string; label: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProvinces();
    this.setupFormListeners();
  }

  private initializeForm(): void {
    this.myForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      province: [null, Validators.required],
      district: [{ value: null, disabled: true }, Validators.required],
      terms: [false, Validators.requiredTrue],
      notifications: [true]
    });
  }

 private loadProvinces(): void {
  this.isLoading = true;
  this.locationService.getProvinces().subscribe({
    next: (provinces) => {
      this.provinces = provinces;
      // Map to DropdownOption
      this.provinceOptions = provinces.map(p => ({ value: p.id, label: p.name }));
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading provinces:', error);
      this.isLoading = false;
    }
  });
}


  private setupFormListeners(): void {
    // When province changes, load its districts
    this.myForm.get('province')?.valueChanges.subscribe(provinceId => {
      this.onProvinceChange(provinceId);
    });
  }

  onProvinceChange(provinceId: number | null): void {
    // Reset district when province changes
    this.myForm.get('district')?.setValue(null);
    
    if (provinceId) {
      this.loadDistricts(provinceId);
    } else {
      this.districtOptions = [];
      this.myForm.get('district')?.disable();
    }
  }

 private loadDistricts(provinceId: number): void {
  this.isLoading = true;
  this.locationService.getDistricts(provinceId).subscribe({
    next: (districts) => {
      this.districts = districts;
      // Map to DropdownOption
      this.districtOptions = districts.map(d => ({ value: d, label: d }));
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading districts:', error);
      this.districts = [];
      this.districtOptions = [];
      this.isLoading = false;
    }
  });
}

  onSubmit(): void {
    this.submitted = true;
    const formData: FormData = this.myForm.value;
    console.log('Form submitted:', formData);
    if (this.myForm.valid) {
      
      
      
      // Here you would typically send the form data to a server
      // For example:
      // this.userService.createUser(formData).subscribe({
      //   next: (response) => {
      //     console.log('User created:', response);
      //     // Handle success (e.g., show success message, redirect, etc.)
      //   },
      //   error: (error) => {
      //     console.error('Error creating user:', error);
      //     // Handle error (e.g., show error message)
      //   }
      // });
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.myForm.controls).forEach(field => {
        const control = this.myForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  onCancel(): void {
    this.myForm.reset({
      notifications: true,
      terms: false
    });
    this.submitted = false;
  }

  // Helper method to get the name of the selected province
  getSelectedProvinceName(): string {
    const provinceId = this.myForm.get('province')?.value;
    const province = this.provinces.find(p => p.id === provinceId);
    return province ? province.name : '';
  }
}
