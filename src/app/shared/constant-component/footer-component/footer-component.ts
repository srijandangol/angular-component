import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer-component',
  standalone: false,
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss'
})
export class FooterComponent {
   @Input() text: string = 'Admin Dashboard';
  currentYear: number = new Date().getFullYear();
  
  
}
