import { Component, EventEmitter, Output } from '@angular/core';

export interface SideNavItem {
  label: string;
  route: string;
  icon?: string;
}

@Component({
  selector: 'app-sidebar-component',
  standalone: false,
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.scss']
})
export class SidebarComponent {
    @Output() sidebarItemClicked = new EventEmitter<void>();
   sidebarItems: SideNavItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'Users', route: '/users', icon: 'people' },
    // { label: 'Settings', route: '/settings', icon: 'settings' },
    // { label: 'Reports', route: '/reports', icon: 'assessment' },
    // { label: 'Profile', route: '/profile', icon: 'account_circle' }
  ];
}
