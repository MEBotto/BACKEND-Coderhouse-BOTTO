import "boxicons";
import "remixicon/fonts/remixicon.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import Products from "./pages/Products/Products.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Chat from "./pages/Chat/Chat.jsx";
import PasswordReset from "./pages/PasswordReset/PasswordReset.jsx";
import Cart from "./pages/Cart/Cart.jsx";

function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
    document.body.className = `${theme}-body`;
  }, [theme]);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/password_reset" element={<PasswordReset />} />
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
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/products/*" element={<Products theme={theme} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
