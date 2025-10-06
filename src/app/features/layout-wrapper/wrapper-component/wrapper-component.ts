import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper-component',
  standalone: false,
  templateUrl: './wrapper-component.html',
  styleUrls: ['./wrapper-component.scss']
})
export class WrapperComponent {
  
 isSidebarOpen = false;
  isMobile = false;
  
  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onMenuItemClick() {
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
  }
}
