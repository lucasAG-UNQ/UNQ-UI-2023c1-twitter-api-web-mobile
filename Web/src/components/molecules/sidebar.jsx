import React, {useState} from 'react';
import '../../styles/sidebar.css';
import { NavLink } from 'react-router-dom'
import { BsHouseFill, BsHash, BsPersonFill, BsDoorOpenFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";

const Sidebar = ({children}) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const toggleSidebarIsOpen = () => setSidebarIsOpen(!sidebarIsOpen);

  const menuItems = [
    { path: "/", name: "Inicio", icon: <BsHouseFill/> },
    { path: "/trending", name: "Tendencias", icon: <BsHash/> },
    { path: "/profile", name: "Perfil", icon: <BsPersonFill/> },
    { path: "/logout", name: "Salir", icon: <BsDoorOpenFill/> }
  ]

  return (
    <div className='container'>
      <div style={{width: sidebarIsOpen ? "400px" : "50px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{display: sidebarIsOpen ? "block" : "none"}} className="logo">TwitterG5</h1>
          <div style={{marginLeft: sidebarIsOpen ? "50px" : "0px"}} className="bars"><FaBars onClick={toggleSidebarIsOpen}/></div>
        </div>
        {
          menuItems.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{display: sidebarIsOpen ? "block" : "none"}} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  )
}

export default Sidebar