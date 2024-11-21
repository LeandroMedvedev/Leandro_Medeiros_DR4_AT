import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  handleSignUpInputChange,
  validateEmail,
  validatePassword,
} from '../../utils';
import { SignUpDataProps } from '../../interfaces';
import { useAppContext } from '../../contexts';
import { signUp } from '../../services';
import { logo } from '../../assets';
import {
  AvatarComponent,
  BoxComponent,
  ButtonComponent,
  GridComponent,
  TextFieldComponent,
  TypographyComponent,
} from '../../components';

const SignUp: React.FC = () => {
  const { showSnackbarMessage, showAlertMessage, supabase } = useAppContext();
  const navigate = useNavigate();

  const [data, setData] = useState<SignUpDataProps>({
    email: {
      value: '',
      error: false,
      helperText: null,
    },
    password: {
      value: 'wW*8uuuu',
      error: false,
      helperText: null,
    },
    confirmPassword: {
      value: 'wW*8uuuu',
      error: false,
      helperText: null,
    },
  });

  const checkSignUp = async () => {
    const emailValidation = validateEmail(data.email.value);
    const passwordValidation = validatePassword(data.password.value);
    const isInvalid = data.password.value !== data.confirmPassword.value;

    setData((previous) => ({
      ...previous,
      email: {
        value: previous.email.value,
        error: emailValidation.error,
        helperText: emailValidation.helperText,
      },
      password: {
        value: previous.password.value,
        error: passwordValidation.error,
        helperText: passwordValidation.helperText,
      },
      confirmPassword: {
        value: previous.confirmPassword.value,
        error: isInvalid,
        helperText: isInvalid ? 'As senhas não coincidem' : null,
      },
    }));

    if (emailValidation.error || passwordValidation.error) {
      return;
    }

    const { data: response, error } = await signUp({
      email: data.email.value,
      password: data.password.value,
      supabase,
    });

    if (error?.code === 'user_already_exists') {
      showAlertMessage('Usuário já registrado', 'error');
    } else if (error?.code) {
      showAlertMessage(error?.message as string, 'error');
    } else {
      showAlertMessage('Cadastro realizado com sucesso!', 'success');
      navigate('/signin');
    }
  };

  return (
    <BoxComponent sx={styles.container}>
      <GridComponent
        sx={{ ...styles.boxAdjustment, ...styles.centerBox }}
        container
      >
        <GridComponent sx={styles.centerBox} size={{ xs: 8 }}>
          <AvatarComponent sx={{ width: 180, height: 180 }} src={logo} />
        </GridComponent>

        <GridComponent
          sx={{ ...styles.centerBox, ...styles.marginTop }}
          size={{ xs: 8 }}
        >
          <TypographyComponent variant='h3'>Cadastrar</TypographyComponent>
        </GridComponent>

        <GridComponent sx={styles.marginTop} size={{ xs: 8 }}>
          <TypographyComponent variant='h5'>
            Seja Bem-vindo!
          </TypographyComponent>
        </GridComponent>

        <GridComponent sx={styles.marginTop} size={{ xs: 8 }}>
          <TextFieldComponent
            fullWidth
            label='E-mail'
            error={data.email.error}
            helperText={data.email.helperText}
            value={data.email.value}
            onChange={(event) => {
              handleSignUpInputChange(setData, 'email', event.target.value);
            }}
          />
        </GridComponent>

        <GridComponent sx={styles.marginTop} size={{ xs: 8 }}>
          <TextFieldComponent
            fullWidth
            label='Senha'
            error={data.password.error}
            helperText={data.password.helperText}
            value={data.password.value}
            onChange={(event) => {
              handleSignUpInputChange(setData, 'password', event.target.value);
            }}
            type='password'
          />
        </GridComponent>

        <GridComponent sx={styles.marginTop} size={{ xs: 8 }}>
          <TextFieldComponent
            fullWidth
            label='Confirmar Senha'
            error={data.confirmPassword.error}
            helperText={data.confirmPassword.helperText}
            value={data.confirmPassword.value}
            onChange={(event) => {
              handleSignUpInputChange(
                setData,
                'confirmPassword',
                event.target.value
              );
            }}
            type='password'
          />
        </GridComponent>

        <GridComponent size={{ xs: 8 }}>
          <ButtonComponent
            sx={styles.marginTop}
            fullWidth
            onClick={checkSignUp}
            disabled={
              !data.email.value ||
              !data.password.value ||
              !data.confirmPassword.value
            }
          >
            Enviar
          </ButtonComponent>
        </GridComponent>

        <GridComponent
          sx={{ ...styles.centerBox, ...styles.marginTop }}
          size={{ xs: 8 }}
        >
          <p>
            Já é cadastrado? <Link to='/signin'> Entrar</Link>
          </p>
        </GridComponent>
      </GridComponent>
    </BoxComponent>
  );
};

const styles = {
  container: {
    height: '100vh',
    paddingTop: 8,
  },
  centerBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxAdjustment: {
    padding: 2,
  },
  marginTop: {
    marginTop: 1,
  },
};

export default SignUp;
