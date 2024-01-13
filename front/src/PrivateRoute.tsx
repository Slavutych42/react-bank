import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Змініть на вірний шлях

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useAuth();
  const { token } = state;

  if (!token) {
    // Якщо користувач не аутентифікований, перенаправляємо на сторінку входу
    return <Navigate to="/signin" replace />;
  }

  // Якщо користувач аутентифікований, рендеримо дочірній компонент
  return <>{children}</>;
};

export default PrivateRoute;