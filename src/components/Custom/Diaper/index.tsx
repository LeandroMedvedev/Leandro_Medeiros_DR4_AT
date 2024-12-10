import { useEffect } from 'react';

import DateTimePickerComponent from '../../DateTimePicker';
import { IDiaperProps } from '../../../interfaces';
import TextFieldComponent from '../../TextField';
import ButtonComponent from '../../Button';
import GridComponent from '../../Grid';
import {
  adjustDateTimeForTimezone,
  handleInputChange,
  selectItem,
} from '../../../utils';

const DiaperComponent: React.FC<IDiaperProps> = ({
  data,
  setData,
  translate,
}) => {
  useEffect(() => {
    setData({ ...data, action_type: 3 });
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
          onChange={(value: string) => {
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
        <ButtonComponent
          color={data.type === 1 ? 'secondary' : 'primary'}
          onClick={() => {
            selectItem(1, 'type', data, setData);
          }}
        >
          {translate('diaper-wet')}
        </ButtonComponent>
        <ButtonComponent
          color={data.type === 2 ? 'secondary' : 'primary'}
          onClick={() => {
            selectItem(2, 'type', data, setData);
          }}
        >
          {translate('diaper-dirty')}
        </ButtonComponent>
        <ButtonComponent
          color={data.type === 3 ? 'secondary' : 'primary'}
          onClick={() => {
            selectItem(3, 'type', data, setData);
          }}
        >
          {translate('diaper-both')}
        </ButtonComponent>
        <ButtonComponent
          color={data.type === 4 ? 'secondary' : 'primary'}
          onClick={() => {
            selectItem(4, 'type', data, setData);
          }}
        >
          {translate('diaper-clean')}
        </ButtonComponent>
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

export default DiaperComponent;
