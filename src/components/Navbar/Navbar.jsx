import React from 'react'
import logo from '../../assets/tv.svg'
import Search from '../Search/Search'
import menu from '../../assets/Menu.svg'
import './style.css'

const Navbar = () => {
  return (
    <nav>
        <div className="navbar flex">
            <div className="logo flex">
                <div className="icon">
                    <img src={logo} alt="logo" />
                </div>
                <h1 className="logo-text">MovieBox</h1>
            </div>
            <Search />
            <div className="sign flex">
                <p><a href="/">Sign In</a></p>
                <button id="menu-btn" className="hamburger">
                    <img src={menu} alt="" />
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar