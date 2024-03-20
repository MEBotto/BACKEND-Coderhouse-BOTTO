import "boxicons";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import Products from "./pages/Products/Products.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";
import Chat from "./pages/Chat/Chat.jsx";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    document.body.className = `${theme}-body`;
  }, [theme]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login onLogin={login} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route
              path="/"
              element={
                <>
                  <Navbar theme={theme} setTheme={setTheme} />
                  <Outlet />
                </>
              }
            >
              <Route path="/chat" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products" element={<Products theme={theme} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

const OutletWithNavbar = ({ theme, setTheme }) => (
  <>
    <Navbar theme={theme} setTheme={setTheme} />
    <Outlet />
  </>
);

export default App;
