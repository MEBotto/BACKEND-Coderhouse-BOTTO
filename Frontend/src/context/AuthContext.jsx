import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getTokenFromCookie = () => {
  const name = 'access_token=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const tokenFromCookie = getTokenFromCookie();
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

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