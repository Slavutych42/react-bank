import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Переконайтеся, що шлях до AuthContext правильний

interface AuthRouteProps {
  children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { authToken } = useAuth(); // Отримуємо поточний токен авторизації

  if (authToken) {
    // Якщо токен присутній, перенаправляємо на сторінку "balance-page"
    return <Navigate to="/balance-page" replace />;
  }

  // Якщо токен відсутній, відображаємо передані дочірні компоненти
  return <>{children}</>;
};

export default AuthRoute;

