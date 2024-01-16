import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { login } = useAuth();
  if (!login) {
    console.log(login)
    return <Navigate to="/signin-page" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
