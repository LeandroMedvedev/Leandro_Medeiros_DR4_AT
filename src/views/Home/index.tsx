import { v4 as uuidv4 } from 'uuid';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

import { calculateDuration, getUser } from '../../utils';
import { baby as babyImage } from '../../assets';
import { ACTIONS, TABLE } from '../../constants';
import { useAppContext } from '../../contexts';
import { list } from '../../services';
import {
  AvatarComponent,
  BoxComponent,
  CardNewItemComponent,
  CustomListComponent,
  GridComponent,
  TypographyComponent,
} from '../../components';

const Home: React.FC = () => {
  const [profile, setProfile] = useState({});
  const [data, setData] = useState([]);

  const { translate } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const user = getUser();

  const loadData = async () => {
    const d = await list(TABLE);
    if (d) setData(d);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <GridComponent container={true}>
      <GridComponent
        size={{ xs: 12 }}
        sx={{
          height: '25vh',
        }}
      >
        <GridComponent
          container={true}
          sx={{
            alignItems: 'flex-end',
            marginTop: '1em',
          }}
        >
          <GridComponent size={{ xs: 4 }}>
            <BoxComponent
              sx={{
                ...styles.centerBox,
                ...styles.centerBox,
              }}
            >
              <IconButton
                sx={{
                  ...styles.iconButton,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
                onClick={() => navigate('/dashboard')}
              >
                <SignalCellularAltIcon
                  sx={{
                    ...styles.icon,
                    color: `${theme.palette.primary.main}`,
                  }}
                />
              </IconButton>
              <BoxComponent
                sx={{
                  ...styles.centerBox,
                  ...styles.boxText,
                }}
              >
                <TypographyComponent component='p' sx={{ ...styles.text2 }}>
                  {profile?.height} {translate('cm')}
                </TypographyComponent>
                <TypographyComponent component='p' sx={{ ...styles.text3 }}>
                  {translate('height')}
                </TypographyComponent>
              </BoxComponent>
            </BoxComponent>
          </GridComponent>

          <GridComponent size={{ xs: 4 }}>
            <BoxComponent
              sx={{
                ...styles.centerBox,
              }}
            >
              <AvatarComponent sx={{ width: 90, height: 90 }} src={babyImage} />
              <BoxComponent
                sx={{
                  ...styles.centerBox,
                  ...styles.boxText,
                }}
              >
                <TypographyComponent component='p' sx={{ ...styles.text1 }}>
                  {profile?.name}
                </TypographyComponent>
                <TypographyComponent component='p' sx={{ ...styles.text3 }}>
                  {profile?.birth
                    ? calculateDuration(profile?.birth, 'days')
                    : 0}{' '}
                  {translate('days')}
                </TypographyComponent>
              </BoxComponent>
            </BoxComponent>
          </GridComponent>

          <GridComponent size={{ xs: 4 }}>
            <BoxComponent
              sx={{
                ...styles.centerBox,
              }}
            >
              <IconButton
                sx={{
                  ...styles.iconButton,
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
                onClick={() => navigate('/settings')}
              >
                <SettingsIcon
                  sx={{
                    ...styles.icon,
                    color: `${theme.palette.primary.main}`,
                  }}
                />
              </IconButton>
              <BoxComponent
                sx={{
                  ...styles.centerBox,
                  ...styles.boxText,
                }}
              >
                <TypographyComponent component='p' sx={{ ...styles.text2 }}>
                  {profile?.weight} {translate('kg')}
                </TypographyComponent>
                <TypographyComponent component='p' sx={{ ...styles.text3 }}>
                  {translate('weight')}
                </TypographyComponent>
              </BoxComponent>
            </BoxComponent>
          </GridComponent>
        </GridComponent>
      </GridComponent>

      <GridComponent
        item='true'
        size={{ xs: 12 }}
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: '75vh',
        }}
      >
        <GridComponent
          container={true}
          sx={{
            marginTop: '-50px',
            padding: 2,
          }}
        >
          <GridComponent size={{ xs: 12 }} item='true'>
            <GridComponent container={true} spacing={2}>
              {ACTIONS.map((action) => (
                <GridComponent key={uuidv4()} size={{ xs: 4 }}>
                  <CardNewItemComponent
                    title={translate(action.title)}
                    Icon={action.Icon}
                    color={action.color}
                    actionType={action.actionType}
                  />
                </GridComponent>
              ))}
            </GridComponent>

            <GridComponent
              container={true}
              sx={{
                marginTop: '1em',
              }}
            >
              <GridComponent item='true' size={{ xs: 12 }}>
                {data ? (
                  <CustomListComponent
                    key={uuidv4()}
                    sx={{
                      overflow: 'auto',
                      maxHeight: '56.5vh',
                    }}
                    items={data}
                  />
                ) : null}
              </GridComponent>
            </GridComponent>
          </GridComponent>
        </GridComponent>
      </GridComponent>
    </GridComponent>
  );
};

const styles = {
  centerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    height: '2.5em',
    width: '2.5em',
  },
  icon: {
    fontSize: '1.5em',
  },
  boxText: {
    marginTop: '.5em',
  },
  text1: {
    wordBreak: 'break-all',
    fontSize: '1.2em',
    fontWeight: '500',
    fontFamily: '"Lato", sans-serif',
  },
  text2: {
    wordBreak: 'break-all',
    fontSize: '.8em',
    fontWeight: '600',
    fontFamily: '"Lato", sans-serif',
  },
  text3: {
    wordBreak: 'break-all',
    fontSize: '.8em',
    fontWeight: '400',
  },
};

export default Home;
