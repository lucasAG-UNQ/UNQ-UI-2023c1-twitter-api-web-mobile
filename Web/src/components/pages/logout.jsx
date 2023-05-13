import React from 'react';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const Logout = () => {
 
  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
  
  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  if (!isLoggedUser) { return (<Navigate replace to="/" state={{ isLoggedUser: false}}/>); }
 
  TwApi.logout();
  return (
    <h1>Saliendo...</h1>
  );

}

export default Logout