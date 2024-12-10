import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../contexts';
import { signOut } from '../../services';
import {
  ButtonComponent,
  GridComponent,
  TypographyComponent,
} from '../../components';

const Dashboard: React.FC = () => {
  const { supabase } = useAppContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/signin');
    signOut({ supabase, navigate });
  };

  return (
    <GridComponent sx={{ xs: 12 }}>
      <TypographyComponent sx={{ fontWeight: 900, xs: 12, fontSize: 32 }}>
        Dashboard
      </TypographyComponent>
      <ButtonComponent onClick={handleSignOut}>Sair</ButtonComponent>
    </GridComponent>
  );
};

export default Dashboard;
