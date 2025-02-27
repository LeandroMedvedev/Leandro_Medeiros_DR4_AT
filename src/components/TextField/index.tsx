import { TextField } from '@mui/material';

import { ITextFieldProps } from '../../interfaces';

const TextFieldComponent: React.FC<ITextFieldProps> = (props) => {
  const { variant = 'outlined' } = props;

  return (
    <TextField
      className={`general-textfield ${props.className ? props.className : ''}`}
      variant={variant}
      {...props}
    />
  );
};

export default TextFieldComponent;
