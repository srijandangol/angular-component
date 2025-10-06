import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface HeaderNavItem {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-header-component',
  standalone: false,
  templateUrl: './header-component.html',
  styleUrls: ['./header-component.scss']
})
export class HeaderComponent {
  @Input() title: string = 'My App';
  @Output() menuToggled = new EventEmitter<void>();
  
  headerNavItems: HeaderNavItem[] = [
    { label: 'Home', route: '/dashboard' },
    { label: 'Profile', route: '/profile' },
    { label: 'Settings', route: '/settings' }
  ];

  toggleSidenav(): void {
    this.menuToggled.emit();
  }
}
