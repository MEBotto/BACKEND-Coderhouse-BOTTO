import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

// Creamos un componente proveedor para el contexto
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Estado para el tema

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light'); // Cambiar entre temas
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
