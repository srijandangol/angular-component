import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard.component',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  users$!: Observable<any[]>;

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;
  adminUsers = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.users$ = this.http.get<any[]>('http://localhost:3000/users');

    this.users$.subscribe(users => {
      this.totalUsers = users.length;
      this.activeUsers = users.filter(u => u.status === 'Active').length;
      this.inactiveUsers = users.filter(u => u.status === 'Inactive').length;
      this.adminUsers = users.filter(u => u.role === 'Admin').length;
    });
  }

  trackById(index: number, user: any) {
    return user.id;
  }

  addUser() {
    console.log('Add User clicked');
  }

  editUser(user: any) {
    console.log('Edit User', user);
  }

  deleteUser(user: any) {
    console.log('Delete User', user);
  }
}