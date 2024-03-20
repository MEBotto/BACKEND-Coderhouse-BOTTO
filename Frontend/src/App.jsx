import 'boxicons';
import 'remixicon/fonts/remixicon.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext.jsx';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductsListContainer from './components/ProductsContainer/ProductsListContainer.jsx';
import ProductForm from './components/Forms/ProductForm.jsx';
import Login from './components/Login/Login.jsx';
import Profile from './components/Profile/Profile.jsx';
import Register from './components/Register/Register.jsx';
import AdminDashboard from './components/AdminDashboard/AdminDashboard.jsx';

function App() {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
    document.body.className = `${theme}-body`;
  }, [theme]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login onLogin={login}/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/admin' element={<AdminDashboard/>}/>
            <Route
            path='/'
            element={
              <>
                <Navbar theme={theme} setTheme={setTheme} />
                <Outlet />
              </>
            }
          >
            <Route path='/profile' element={<Profile />} />
            <Route path='/product/add' element={<ProductForm />} />
            <Route path='/products' element={<ProductsListContainer theme={theme} />} />
          </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

const OutletWithNavbar = ({ theme, setTheme }) => (
  <>
    <Navbar theme={theme} setTheme={setTheme} />
    <Outlet />
  </>
);

export default App;