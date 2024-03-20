import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <Link to={"/products"} className='logo-side'><img src="https://i.imgur.com/kAfOunx.jpg" alt="Logo" /><span className='nav-side-item'>Logo</span></Link>
        </li>
        <li>
          <Link to={"/products"}>
            <i className="fas fa-home"/>
            <span className='nav-side-item'>Home</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin/users"}><i className="fas fa-user"/><span className='nav-side-item'>Users</span></Link>
        </li>
        <li>
          <Link to={"/admin/products"}><i className="fas fa-tasks"/><span className='nav-side-item'>Products</span></Link>
        </li>
        <li>
          <a href='#' className='logout-sidebar'><i className="fas fa-sign-out-alt"/><span className='nav-side-item'>Logout</span></a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar