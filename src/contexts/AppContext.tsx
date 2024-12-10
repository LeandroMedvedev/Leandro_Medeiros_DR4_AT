import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TFunction } from 'i18next';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import { useTranslation } from 'react-i18next';
import React, { ReactNode, useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { darkTheme, lightTheme } from '../theme';
import { validateEnvVariables } from '../utils';
import {
  AlertComponent,
  GridComponent,
  SnackbarComponent,
} from '../components';

/* extensões (abaixo) necessárias para que função adjustDateTimeForTimezone funcione */
dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);

type AlertSeverity = 'info' | 'warning' | 'error' | 'success';

interface IShowAlertParams {
  (message: string, severity: AlertSeverity): void;
}

interface IAppContext {
  showSnackbarMessage: (message: string) => void;
  showAlertMessage: IShowAlertParams;
  changeLanguage: (lang: string) => void;
  translate: TFunction<'translation', undefined>;
  supabase: SupabaseClient<any, 'public', any>;
}

interface IAppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = validateEnvVariables({
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
});

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<
    AlertSeverity | undefined
  >();
  const timeoutDuration = 5000;
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const { t: translate, i18n } = useTranslation();

  const showSnackbarMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const showAlertMessage: IShowAlertParams = (message, severity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);

    setTimeout(() => setAlertMessage(''), timeoutDuration);
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleClose = () => {
    setSnackbarMessage('');
    setSnackbarOpen(false);
  };

  const sharedState = {
    showSnackbarMessage,
    showAlertMessage,
    changeLanguage,
    translate,
    supabase,
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');

    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      const navLanguage = navigator.language.split('-').at(0);
      if (navLanguage) changeLanguage(navLanguage);
    }
  }, []);

  return (
    <div className='app-background'>
      <AppContext.Provider value={sharedState}>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          {children}
          <SnackbarComponent
            open={snackbarOpen}
            onClose={handleClose}
            autoHideDuration={3000}
            message={snackbarMessage}
          />
          {alertMessage && (
            <GridComponent
              container
              spacing={2}
              padding={2}
              sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }}
            >
              <GridComponent size={5}>
                <AlertComponent severity={alertSeverity}>
                  {alertMessage}
                </AlertComponent>
              </GridComponent>
            </GridComponent>
          )}
        </ThemeProvider>
      </AppContext.Provider>
    </div>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context)
    throw new Error('useAppContext must be used within an AppProvider');

  return context;
};

export { AppProvider, useAppContext };
