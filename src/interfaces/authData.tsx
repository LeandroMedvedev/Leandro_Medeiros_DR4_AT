import { SupabaseClient } from '@supabase/supabase-js';
import { NavigateFunction } from 'react-router-dom';

interface IAuthData {
  email: string;
  password: string;
  supabase: SupabaseClient<any, 'public', any>;
}

interface ISignOut {
  supabase: SupabaseClient;
  navigate: NavigateFunction;
}

export type { IAuthData, ISignOut };
