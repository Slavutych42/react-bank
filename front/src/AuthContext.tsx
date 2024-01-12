import React, { createContext, useReducer, useContext } from 'react';

// Визначення інтерфейсу для стану аутентифікації
interface AuthState {
  token: string | null;
  user: any; // Ви можете змінити тип 'any' на конкретніший тип даних користувача
}

// Визначення типів дій для useReducer
type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; user: any } }
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
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Визначення інтерфейсу для пропсів AuthProvider
interface AuthProviderProps {
  children: React.ReactNode;
}

// Компонент провайдера контексту
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання контексту аутентифікації
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

