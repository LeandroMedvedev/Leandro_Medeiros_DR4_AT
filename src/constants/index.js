import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CribIcon from '@mui/icons-material/Crib';
import SpaIcon from '@mui/icons-material/Spa';

const ACTIONS = [
  {
    title: 'sleep',
    actionType: 1,
    Icon: CribIcon /* inicial maiúscula porque é um componente e sintaxe JSX exige inicial maiúscula */,
    color: '#4b10a9',
  },
  {
    title: 'eat',
    actionType: 2,
    Icon: RestaurantMenuIcon,
    color: '#47c869',
  },
  {
    title: 'diaper',
    actionType: 3,
    Icon: SpaIcon,
    color: '#f4cc1d',
  },
];

const TABLE = 'action_students';

export { ACTIONS, TABLE };
