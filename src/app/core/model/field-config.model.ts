export interface FieldConfig {
  type: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'file';
  inputType?: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: { label: string; value: any }[];
  value?: any;
  required?: boolean;
  accept?: string;
  maxSizeMB?: number;
  validators?: any[];
}
