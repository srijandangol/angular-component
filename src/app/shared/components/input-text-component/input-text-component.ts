import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: false,
  templateUrl: './input-text-component.html',
  styleUrl: './input-text-component.scss',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Output() valueChange = new EventEmitter<string>();
}
