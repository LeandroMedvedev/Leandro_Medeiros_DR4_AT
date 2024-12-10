import { redirect } from 'react-router-dom';

import { IAuthData, ISignOut } from '../interfaces';

const isAuthenticated = () => {
  const session: string | null = localStorage.getItem('session');

  if (session) throw redirect('/');

  return null;
}

const handlePrivateRouteChecking = () => {
  const session: string | null = localStorage.getItem('session');

  if (!session) throw redirect('/signin');

  return null;
}

const signIn = async ({ email, password, supabase }: IAuthData) => await supabase.auth.signInWithPassword({
  email, password
});

const signUp = async ({ email, password, supabase }: IAuthData) => await supabase.auth.signUp({
  email, password
});

const signOut = async ({ supabase, navigate }: ISignOut) => {
  localStorage.removeItem("session");
  localStorage.removeItem("user");

  supabase.auth.signOut();

  return navigate("/signin")
}

export { isAuthenticated, handlePrivateRouteChecking, signIn, signOut, signUp };