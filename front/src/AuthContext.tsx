import React, { createContext, useContext, useState, useEffect } from 'react';

// Визначення інтерфейсу для стану аутентифікації
interface AuthState {
  token: number | null;
  user: any; // Ви можете змінити тип 'any' на конкретніший тип даних користувача
}

// Визначення типів дій для useReducer
type AuthAction =
  | { type: 'LOGIN'; payload: { token: number; user: any } }
  | { type: 'LOGOUT' };

// Початковий стан для useReducer
export const initialState: AuthState = { token: null, user: null };

// Функція reducer для управління станом аутентифікації
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

// Створення контексту з початковим значенням
export const AuthContext = createContext<{
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}>({
  authToken: null,
  login: () => {},
  logout: () => {},
});

// Визначення інтерфейсу для пропсів AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Компонент провайдера контексту
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту аутентифікації
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

