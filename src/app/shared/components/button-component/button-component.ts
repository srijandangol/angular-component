import { Component, Input, Output, EventEmitter } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonConfig = {
  [key in ButtonType]: {
    base: string;
    hover: string;
    focus: string;
    disabled: string;
  };
};

const buttonStyles: ButtonConfig = {
  primary: {
    base: 'bg-blue-600 text-white',
    hover: 'hover:bg-blue-700',
    focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  secondary: {
    base: 'bg-gray-100 text-gray-700',
    hover: 'hover:bg-gray-200',
    focus: 'focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  danger: {
    base: 'bg-red-600 text-white',
    hover: 'hover:bg-red-700',
    focus: 'focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  success: {
    base: 'bg-green-600 text-white',
    hover: 'hover:bg-green-700',
    focus: 'focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  warning: {
    base: 'bg-yellow-500 text-white',
    hover: 'hover:bg-yellow-600',
    focus: 'focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  },
  info: {
    base: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-600',
    focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    disabled: 'opacity-50 cursor-not-allowed'
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() buttonType: ButtonType = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const style = buttonStyles[this.buttonType];
    const size = sizeStyles[this.size];
    const width = this.fullWidth ? 'w-full' : '';
    
    return [
      'inline-flex items-center justify-center rounded-md font-medium',
      'focus:outline-none transition-colors duration-200',
      style.base,
      !this.disabled ? style.hover : '',
      !this.disabled ? style.focus : '',
      this.disabled ? style.disabled : '',
      size,
      width
    ].join(' ');
  }

  onClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
