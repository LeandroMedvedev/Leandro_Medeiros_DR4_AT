import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface IButtonProps extends ButtonProps {
  children?: ReactNode;
  props?: any;
  // loading?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  classname?: '';
}

export default IButtonProps;
