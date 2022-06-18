import React from 'react';
import UserStack from './UserStack';
import AuthStack from './AuthStack';
import { useAuthentication } from '../hooks/useAuthentication';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <UserStack /> : <AuthStack />;
}