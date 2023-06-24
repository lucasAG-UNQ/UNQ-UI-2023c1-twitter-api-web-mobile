import { React, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsHouseFill, BsHash, BsPersonFill, BsPersonPlusFill, BsDoorOpenFill } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import LoggedUserCard from '../molecules/loggedusercard';
import SearchBox from '../molecules/searchbox';
import TwitterLogo from '../atoms/twitterlogo';
import TwApi from '../services.js';
import '../../styles/organisms/sidebar.css';

const userMenuItems = () => {
  return [
  { path: "/home", name: "Inicio", icon: <BsHouseFill/> },
  { path: "/trending", name: "Tendencias", icon: <BsHash/> },
  { path: "/profile", name: "Perfil", icon: <BsPersonFill/> },
  { path: "/logout", name: "Salir", icon: <BsDoorOpenFill/> }
]};

const guestMenuItems = () => {
  return [
  { path: "/", name: "Inicio", icon: <BsHouseFill/> },
  { path: "/login", name: "Ingresar", icon: <BiLogIn/> },
  { path: "/register", name: "Registrarse", icon: <BsPersonPlusFill/> },
]};


const Sidebar = ({children}) => {
  const location = useLocation();
  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged() || location.state?.isLoggedUser);
  const [menuItems, setMenuItems] = useState([]);
    
  useEffect(() => {
    setIsLoggedUser(TwApi.isUserLogged() || location.state?.isLoggedUser);
    setMenuItems(isLoggedUser ? userMenuItems() : guestMenuItems());
  }, [location.state, isLoggedUser]);

  if (isLoggedUser){
    return (
      <div className="root_container">
        <div className="sidebar bg-dark">
          <div className="sb_top_section">
            <TwitterLogo sizeClass="img_logo_25" />
            <h1 className="sb_logo">Twitter-G5</h1>
          </div>

          { isLoggedUser && <LoggedUserCard /> }

          {
            menuItems.map((item, index) => (
              <NavLink to={item.path} key={index} className={({ isActive }) => (isActive ? 'sb_link sb_active' : 'sb_link')}>
                <div className="sb_icon">{item.icon}</div>
                <div className="sb_link_text">{item.name}</div>
              </NavLink>
            ))
          }

          { isLoggedUser && <SearchBox />}
        </div>
        <main>{children}</main>
      </div>
  )}
  return (
    <main>{children}</main>
  )
}

export default Sidebar