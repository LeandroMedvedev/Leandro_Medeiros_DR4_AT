import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { get, save, signOut } from '../../services';
import { useAppContext } from '../../contexts';
import {
  AppBarComponent,
  ButtonComponent,
  DatePickerComponent,
  GridComponent,
  TextFieldComponent,
  TypographyComponent,
} from '../../components';
import {
  adjustDateTimeForTimezone,
  getUser,
  handleInputChange,
} from '../../utils';

const Settings = () => {
  const { translate, changeLanguage, supabase } = useAppContext();
  const navigate = useNavigate();
  const user = getUser();
  const [data, setData] = useState({});

  const loadData = async () => {
    /*
      const result = await get('profile_students', [
        { field: 'user_id', value: user.id },
      ]);
      setData(result);
    */
  };

  useEffect(() => {
    loadData();
  }, []);

  const verifyLanguage = (language: string) => {
    const storeLanguage = localStorage.getItem('language');
    if (storeLanguage === language) {
      return 'contained';
    }
    return 'outlined';
  };

  return (
    <>
      <AppBarComponent title={translate('settings')} />
      <GridComponent
        container
        spacing={2}
        sx={{ ...styles.boxAdjustment, ...styles.centerBox }}
      >
        <GridComponent sx={styles.marginTop} item='true' size={{ xs: 12 }}>
          <TextFieldComponent
            placeholder={translate('name')}
            fullWidth
            onChange={(event) =>
              handleInputChange('name', event.target.value, data, setData)
            }
            defaultValue={data?.name || ''}
          />
        </GridComponent>
        <GridComponent sx={styles.marginTop} item='true' size={{ xs: 12 }}>
          <TextFieldComponent
            placeholder={translate('height')}
            fullWidth
            onChange={(event) =>
              handleInputChange('height', event.target.value, data, setData)
            }
            defaultValue={data?.height}
          />
        </GridComponent>
        <GridComponent sx={styles.marginTop} item='true' size={{ xs: 12 }}>
          <TextFieldComponent
            placeholder={translate('weight')}
            fullWidth
            onChange={(event) =>
              handleInputChange('weight', event.target.value, data, setData)
            }
            defaultValue={data?.weight}
          />
        </GridComponent>
        <GridComponent sx={styles.marginTop} item='true' size={{ xs: 12 }}>
          <DatePickerComponent
            value={data?.birth ? adjustDateTimeForTimezone(data?.birth) : null}
            placeholder={translate('birth')}
            name='birth'
            fullWidth
            ampm='false'
            format='DD/MM/YYYY'
            onChange={(value) => {
              handleInputChange(
                'birth',
                new Date(value.toString()),
                data,
                setData
              );
            }}
          />
        </GridComponent>

        <GridComponent item='true' size={{ xs: 12 }}>
          <ButtonComponent
            onClick={async () => {
              data.user_id = user.id;
              data.created_at = new Date();
              await save('profile_students', data);
            }}
            fullWidth
          >
            {translate('save')}
          </ButtonComponent>
        </GridComponent>

        <GridComponent sx={styles.marginTop} item='true' size={{ xs: 12 }}>
          <TypographyComponent variant='h5'>
            {translate('language')}
          </TypographyComponent>
        </GridComponent>
        <GridComponent item='true' size={{ xs: 12 }}>
          <ButtonComponent
            onClick={() => changeLanguage('en')}
            variant={verifyLanguage('en')}
            fullWidth
            sx={{ ...styles.button }}
          >
            {translate('english')}
          </ButtonComponent>
        </GridComponent>
        <GridComponent item='true' size={{ xs: 12 }}>
          <ButtonComponent
            onClick={() => changeLanguage('es')}
            variant={verifyLanguage('es')}
            fullWidth
            sx={{ ...styles.button }}
          >
            {translate('spanish')}
          </ButtonComponent>
        </GridComponent>
        <GridComponent item='true' size={{ xs: 12 }}>
          <ButtonComponent
            onClick={() => changeLanguage('pt')}
            variant={verifyLanguage('pt')}
            fullWidth
            sx={{ ...styles.button }}
          >
            {translate('portugues')}
          </ButtonComponent>
        </GridComponent>
        <GridComponent item='true' size={{ xs: 12 }}>
          <ButtonComponent
            onClick={() => signOut({ supabase, navigate })}
            fullWidth
            color='error'
            sx={{ ...styles.button }}
          >
            {translate('sign-out')}
          </ButtonComponent>
        </GridComponent>
      </GridComponent>
    </>
  );
};

const styles = {
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  boxAdjustment: {
    height: 'calc(100vh - 56px)',
    padding: 2,
  },
  marginTop: {
    marginTop: 4,
  },
  button: {},
};

export default Settings;
