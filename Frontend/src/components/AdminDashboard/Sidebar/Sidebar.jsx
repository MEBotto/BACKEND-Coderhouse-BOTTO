import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <a href='#' className='logo-side'><img src="https://i.imgur.com/kAfOunx.jpg" alt="Logo" /><span className='nav-side-item'>Logo</span></a>
        </li>
        <li>
          <a href='#'>
            <i className="fas fa-home"/>
            <span className='nav-side-item'>Logo</span>
          </a>
        </li>
        <li>
          <a href='#'><i className="fas fa-user"/><span className='nav-side-item'>Home</span></a>
        </li>
        <li>
          <a href='#'><i className="fas fa-tasks"/><span className='nav-side-item'>Users</span></a>
        </li>
        <li>
          <a href='#'><i className="fas fa-chart-bar"/><span className='nav-side-item'>Products</span></a>
        </li>
        <li>
          <a href='#' className='logout-sidebar'><i className="fas fa-sign-out-alt"/><span className='nav-side-item'>Logout</span></a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar