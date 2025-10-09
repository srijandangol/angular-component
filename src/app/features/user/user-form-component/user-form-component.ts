import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FieldConfig } from '../../../core/model/field-config.model';
import { HttpClient } from '@angular/common/http';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form-component',
  standalone: false,
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.scss',
})
export class UserFormComponent {
  formConfig: FieldConfig[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'input',
      inputType: 'text',
      required: true,
      validators: [{ name: 'required' }, { name: 'minLength', value: 3 }],
    },
    {
      name: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      required: true,
      validators: [
        { name: 'required' },
        { name: 'pattern', value: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ },
      ],
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'Admin' },
        { label: 'User', value: 'User' },
      ],
      required: true,
      validators: [{ name: 'required' }],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
      required: true,
      validators: [{ name: 'required' }],
    },
    {
      name: 'profilePicture',
      label: 'Profile Picture',
      type: 'file',
      required: false,
      accept: '.png',
      maxSizeMB: 3,
    },
  ];

  isEditMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data?.user;
  }

  onSubmit(formValue: any) {
    if (this.isEditMode) {
      this.http.put(`http://localhost:3000/users/${this.data.user.id}`, formValue).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.http
        .get<any[]>(`http://localhost:3000/users?email=${formValue.email}`)
        .subscribe((users) => {
          if (users.length > 0) {
            alert('Email already exists!');
            return;
          }

          this.http.post('http://localhost:3000/users', formValue).subscribe(() => {
            this.dialogRef.close(true);
          });
        });
    }
  }
}
