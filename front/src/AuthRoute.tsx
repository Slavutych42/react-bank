import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Змініть на вірний шлях

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const { token } = state;

  if (token) {
    return <Navigate to="/balance" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;

