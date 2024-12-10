import { ChangeEvent } from 'react';

interface ITextFieldProps {
  variant?: 'filled' | 'outlined' | 'standard';
  className?: string;
  defaultValue?: any;
  value?: any;
  label?: string;
  type?: string;
  mask?: string;
  error?: any;
  helperText?: string | null;
  fullWidth?: boolean;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default ITextFieldProps;
