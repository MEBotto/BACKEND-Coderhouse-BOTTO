import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const getTokenFromCookie = () => {
  const name = "access_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let cookie of cookieArray) {
    while (cookie.charAt(0) === " ") {
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
  const [email, setEmail] = useState("");

  useEffect(() => {
    const tokenFromCookie = getTokenFromCookie();
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  const value = {
    token,
    email,
    setEmail,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};