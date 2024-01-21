import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    
    return <Navigate to="/signin-page" replace />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
