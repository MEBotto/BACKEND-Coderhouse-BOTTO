import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

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

// Hook personalizado para usar el contexto
export const useTheme = () => useContext(ThemeContext);
