import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const login = (newToken, userInfo) => {
    setToken(newToken);
    setUser(userInfo);
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    user,
    login,
    logout,
    email,
    setEmail,
    setToken
  };

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}