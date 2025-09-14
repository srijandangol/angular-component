import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area',
  standalone: false,
  templateUrl: './text-area-component.html',
  styleUrl: './text-area-component.scss',
})
export class TextAreaComponent {
  @Input() label: string = '';
  @Input() rows: number = 4;
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
}
