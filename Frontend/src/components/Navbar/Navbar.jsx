import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import React, { useEffect } from 'react';

function NavbarExport({ theme, setTheme }) {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  useEffect(() => {
    // console.log('Token:', token);
    // console.log(user);
  }, [token]);

  const menuOnClick = () => {
    let menu = document.querySelector('#menu-icon')
    let navbar = document.querySelector('.navbar')

    menu.classList.toggle('bx-x')
    navbar.classList.toggle('open')
  }

  const handleLogout = () => {
    logout();
    navigate('/products');
  };

  return (
    <header className={`${theme}`}>
        <a href='#' className='logo'><i className="ri-home-smile-fill"/><span>Logo</span></a>
        <ul className='navbar'>
          <li className='active'><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Manga</Link></li>
          <li><a href='#'>Comics</a></li>
          {token && user.role !== "admin" ? <li><Link to={"/chat"}>Chat <i class="ri-chat-3-line"></i></Link></li> : <></>}
          {user?.role ? (
            user.role === 'admin' ? (
            <li><Link to='/admin/products'>Admin Panel</Link></li>
            ) : (
            <></>
            )
          ) : (
            <></>
          )}
        </ul>
        <div className='main'>
          {token ? (
            <>
              <Link to='/profile' className='user'>
                <img src={user.photo} alt={`Foto de ${user.name}`} style={{width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px'}}/>
                {user.name}
              </Link>
              <Link onClick={handleLogout}><i className="ri-logout-box-line" style={{fontSize: '32px'}}/></Link>
            </>
          ) : (
            <>
              <Link className='user' to={'/login'}>
                <i className="ri-user-fill" />Sign In
              </Link>
              <Link to={'/register'}>Register</Link>
            </>
          )}
          {theme === 'light' ? <div className='theme' onClick={toggleMode}><i className="ri-sun-fill" style={{marginRight: '10px'}}/></div> : <div className='theme' onClick={toggleMode}><i className="ri-moon-fill" style={{marginRight: '10px'}}/></div>}
          <div onClick={menuOnClick} className='bx bx-menu' id='menu-icon'></div>
        </div>
    </header>
  );
}

export default NavbarExport;
