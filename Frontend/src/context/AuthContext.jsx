import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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
  const [remainingTime, setRemainingTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromCookie = getTokenFromCookie();
    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const expirationTime = JSON.parse(atob(token.split(".")[1])).exp;
      const currentTime = Date.now() / 1000;
      const timeRemainingInSeconds = expirationTime - currentTime;
      setRemainingTime(timeRemainingInSeconds);

      if (timeRemainingInSeconds <= 0) {
        setToken(null);
      }

      const intervalId = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else {
      setRemainingTime(null);
    }
  }, [token]);

  useEffect(() => {
    if (remainingTime !== null && remainingTime <= 0) {
      setToken(null);
      Swal.fire({
        icon: "info",
        title: "Sesión expirada",
        text: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
      }).then(() => {
        navigate("/");
      });
    }
  }, [remainingTime, navigate]);

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
