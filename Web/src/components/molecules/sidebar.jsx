import React from 'react';
import './sidebar.css';
import { NavLink } from 'react-router-dom'
import { BsHouseFill, BsHash, BsPersonFill, BsDoorOpenFill } from "react-icons/bs";
import LoggedUserCard from './loggedusercard';
import SearchBox from './searchbox';

const Sidebar = ({children}) => {

  const menuItems = [
    { path: "/", name: "Inicio", icon: <BsHouseFill/> },
    { path: "/trending", name: "Tendencias", icon: <BsHash/> },
    { path: "/profile", name: "Perfil", icon: <BsPersonFill/> },
    { path: "/logout", name: "Salir", icon: <BsDoorOpenFill/> }
  ]

  return (
    <div className="root_container">
      <div className="sidebar">
        <div className="sb_top_section">
          <h1 className="sb_logo">Twitter-G5</h1>
        </div>

        <LoggedUserCard />

        {
          menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? 'sb_link sb_active' : 'sb_link')}>
              <div className="sb_icon">{item.icon}</div>
              <div className="sb_link_text">{item.name}</div>
            </NavLink>
          ))
        }

        <SearchBox />
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar