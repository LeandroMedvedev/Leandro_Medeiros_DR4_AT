import { v4 as uuidv4 } from 'uuid';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import SpaIcon from '@mui/icons-material/Spa';
import { useNavigate } from 'react-router-dom';
import CribIcon from '@mui/icons-material/Crib';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

import { ICustomListProps } from '../../../interfaces';
import { useAppContext } from '../../../contexts';
import { generateSubtitle } from '../../../utils';

const CustomListComponent: React.FC<ICustomListProps> = ({
  items,
  ...props
}) => {
  const navigate = useNavigate();
  const { translate } = useAppContext();

  const getIcon = (actionType: string) => {
    switch (actionType) {
      case '1':
        return <CribIcon />;
      case '2':
        return <RestaurantMenuIcon />;
      case '3':
        return <SpaIcon />;
      default:
        return <RestaurantMenuIcon />;
    }
  };

  const actionTypeListToInt = {
    1: 'sleep',
    2: 'eat',
    3: 'diaper',
  };

  const typeColor = {
    1: '#4b10a9',
    2: '#47c869',
    3: '#f4cc1d',
  };

  return (
    <List {...props}>
      {items.map((item, index) => {
        const typeStr = actionTypeListToInt[item.action_type];
        return (
          <ListItem
            key={uuidv4()}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '60px',
              marginTop: '1em',
            }}
            id={`new-item-list-${index}`}
            onClick={() => navigate(`/${item.action_type}/${item.id}`)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: typeColor[item.action_type] }}>
                {getIcon(item.action_type?.toString())}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={translate(typeStr)}
              secondary={generateSubtitle(item, translate)}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default CustomListComponent;
