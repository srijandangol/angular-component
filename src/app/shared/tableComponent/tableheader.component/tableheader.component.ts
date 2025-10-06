import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tableheader-component',
  standalone: false,
  templateUrl: './tableheader.component.html',
  styleUrls: ['./tableheader.component.scss']
})
export class TableheaderComponent {
 @Input() tableTitle: string = '';
  @Input() buttonLabel: string = 'Add'; // generic button label
  @Output() buttonClicked = new EventEmitter<void>();

  onActionClick() {
    this.buttonClicked.emit();
  }
}
