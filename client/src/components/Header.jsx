import {Link, NavLink} from 'react-router-dom'
import React from 'react'
import logo from '../assets/logo.png'


const Header = () => {
  return (
    <header>
      <Link className='logo'>
      <img src={logo} alt="Notes logo" className='logostyle'/>Notes App
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

    </header>
  )
}

export default Header
