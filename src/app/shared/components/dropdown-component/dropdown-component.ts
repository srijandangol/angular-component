import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface DropdownOption {
  value: any;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-dropdown',
  standalone: false,
  templateUrl: './dropdown-component.html',
  styleUrl: './dropdown-component.scss',
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @Input() selectedValue: any = null;
  @Input() placeholder: string = 'Select an option';
  @Input() disabled: boolean = false;
  @Output() selectedValueChange = new EventEmitter<any>();

  isOpen: boolean = false;

  get selectedLabel(): string {
    if (this.selectedValue === null || this.selectedValue === undefined) {
      return this.placeholder;
    }
    const selectedOption = this.options.find(option => option.value === this.selectedValue);
    return selectedOption ? selectedOption.label : this.placeholder;
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(option: DropdownOption) {
    if (!option.disabled) {
      this.selectedValue = option.value;
      this.selectedValueChange.emit(option.value);
      this.isOpen = false;
    }
  }

  closeDropdown() {
    this.isOpen = false;
  }

  // TrackBy function for ngFor to optimize rendering
  trackByValue(index: number, option: any): any {
    return option.value;
  }
}
