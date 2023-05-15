import { React, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const PublicRoute = ({ children }) => {

    const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
    
    useEffect(() => {
      setIsLoggedUser(TwApi.isUserLogged());
    }, [isLoggedUser]);
  
    if (isLoggedUser) { return (<Navigate replace to="/home" />); }

    return children;
}

export default PublicRoute