import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Переконайтеся, що шлях до AuthContext правильний

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authToken } = useAuth(); // Отримуємо поточний токен авторизації

  if (!authToken) {
    // Якщо токен відсутній, перенаправляємо на сторінку входу
    return <Navigate to="/signin-page" replace />;
  }

  // Якщо токен присутній, відображаємо передані дочірні компоненти
  return <>{children}</>;
};

export default PrivateRoute;
