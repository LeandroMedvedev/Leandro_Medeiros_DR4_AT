import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface IDatePickerProps<TDate extends Dayjs = any>
  extends DatePickerProps<TDate> {
  placeholder?: string;
  fullWidth: boolean;
  ampm: boolean | string;
}

export default IDatePickerProps;
