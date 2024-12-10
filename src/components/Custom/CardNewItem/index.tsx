import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { ICardNewItemProps } from '../../../interfaces';
import { useAppContext } from '../../../contexts';
import {
  CardComponent,
  FabComponent,
  GridComponent,
  TypographyComponent,
} from '../..';

const CardNewItemComponent: React.FC<ICardNewItemProps> = ({
  Icon,
  color,
  title,
  actionType,
}) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  return (
    <CardComponent
      sx={{
        overflow: 'visible',
        borderRadius: '10%',
      }}
    >
      <GridComponent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Icon
          sx={{
            marginTop: '.2em',
            fontSize: '3em',
            color: color,
          }}
        />
        <TypographyComponent
          sx={{
            fontSize: '.80em',
            marginTop: '0.5em',
            fontWeight: '700',
            textAlign: 'center',
            wordWrap: 'break-word',
            width: '90%',
          }}
        >
          {title}
        </TypographyComponent>
      </GridComponent>
      <GridComponent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></GridComponent>
      <GridComponent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FabComponent
          size='small'
          sx={{
            color: color,
            backgroundColor: '#fff',
            position: 'relative',
            bottom: '-20px',
          }}
          onClick={() => navigate(`/new/${actionType}`)}
        >
          <AddIcon />
        </FabComponent>
      </GridComponent>
    </CardComponent>
  );
};

export default CardNewItemComponent;
