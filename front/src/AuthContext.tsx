import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  token: string;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateEmail: (newEmail: string) => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  token: '',
  login: () => {},
  logout: () => {},
  updateEmail: async () => {},
  updatePassword: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((token: string, newUser: User) => {
    setToken(token);
    setUser(newUser);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const updateEmail = async (newEmail: string) => {
    console.log('Updating email with token:', token);
    try {
      const response = await fetch('/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: newEmail })
      });
  
      const data = await response.json();
      if (!response.ok) {
        console.error('Email update failed:', data.message);
        throw new Error(data.message || 'Email update failed');
      }
  
      setUser(prev => {
        if (prev) {
          return { ...prev, email: newEmail };
        }
        return null;
      });
    } catch (error) {
      console.error('Failed to update email:', error);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    console.log('Updating password with token:', token);
    try {
      const response = await fetch('/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Password update failed:', data.message);
        throw new Error(data.message || 'Password update failed');
      }

      // Не зберігайте новий пароль в локальному стані або localStorage
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log(storedToken)
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    console.log('Loaded token:', token);
    console.log('Loaded user:', storedUser);
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, updateEmail, updatePassword, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
