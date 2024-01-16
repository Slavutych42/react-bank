import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthState {
  token: string | '';
  user: any; 
}

type AuthAction =
  | { type: 'LOGIN'; payload: { token: string; user: any } }
  | { type: 'LOGOUT' };

export const initialState: AuthState = { token: '', user: null };

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
        token: '',
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<{
  authToken: string | '';
  login: (token: string) => void;
  logout: () => void;
}>({
  authToken: '',
  login: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | ''>('');

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
  };

  const logout = () => {
    setAuthToken('');
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

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

