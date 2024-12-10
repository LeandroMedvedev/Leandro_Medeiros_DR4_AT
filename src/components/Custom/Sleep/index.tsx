import { useEffect } from 'react';

import { adjustDateTimeForTimezone, handleInputChange } from '../../../utils';
import { ISleepProps } from '../../../interfaces';
import {
  DateTimePickerComponent,
  GridComponent,
  TextFieldComponent,
} from '../..';

const SleepComponent: React.FC<ISleepProps> = ({
  data,
  setData,
  translate,
}) => {
  useEffect(() => {
    setData({ ...data, action_type: 1 });
  }, []);

  return (
    <GridComponent container={true} spacing={2}>
      <GridComponent item='true' size={{ xs: 12 }}>
        <DateTimePickerComponent
          value={
            data?.start_date
              ? adjustDateTimeForTimezone(data?.start_date)
              : null
          }
          label={translate('data-hour-start')}
          name='start_date'
          fullWidth={true}
          ampm={false}
          format='DD/MM/YYYY HH:mm'
          onChange={(value) => {
            handleInputChange(
              'start_date',
              new Date(value.toString()),
              data,
              setData
            );
          }}
        />
      </GridComponent>

      <GridComponent item='true' size={{ xs: 12 }}>
        <DateTimePickerComponent
          value={
            data?.end_date ? adjustDateTimeForTimezone(data?.end_date) : null
          }
          label={translate('data-hour-end')}
          name='end_date'
          fullWidth={true}
          ampm={false}
          format='DD/MM/YYYY HH:mm'
          onChange={(value) => {
            handleInputChange(
              'end_date',
              new Date(value.toString()),
              data,
              setData
            );
          }}
        />
      </GridComponent>

      <GridComponent item='true' size={{ xs: 12 }}>
        <TextFieldComponent
          value={data?.observation ? data.observation : ''}
          label={translate('observation')}
          onChange={(event) => {
            handleInputChange('observation', event.target.value, data, setData);
          }}
          name='observation'
          fullWidth={true}
          multiline={true}
        />
      </GridComponent>
    </GridComponent>
  );
};

export default SleepComponent;
