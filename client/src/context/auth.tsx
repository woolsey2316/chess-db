import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  login: () => {
    return;
  },
  logout: () => {
    return;
  },
});

interface AuthProviderProps {
  children: JSX.Element;
}

interface AuthContext {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
