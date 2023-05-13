import { React, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const PublicRoute = ({ children }) => {

    const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
    
    useEffect(() => {
      if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
    }, []);
  
    if (isLoggedUser) { return (<Navigate replace to="/" />); }

    return children;
}

export default PublicRoute