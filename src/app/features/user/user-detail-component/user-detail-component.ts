import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-detail-component',
  standalone: false,
  templateUrl: './user-detail-component.html',
  styleUrl: './user-detail-component.scss'
})
export class UserDetailComponent implements OnInit {
  user: any;
  loading = true;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  ngOnInit(): void {
    this.loadUser(this.data.userId);
  }

loadUser(userId: string) {
  this.loading = true;
  this.http.get(`http://localhost:3000/users/${userId}`).subscribe({
  next: (data) => {
    this.user = data;
    this.loading = false;
  },
  error: (err) => {
    console.error('Error loading user:', err);
    this.user = null;
    this.loading = false;
  },
});

}


  onClose() {
    this.dialogRef.close();
  }
}
