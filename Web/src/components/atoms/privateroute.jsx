import { React, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const PrivateRoute = ({ children }) => {

    const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
    
    useEffect(() => {
      if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
    }, []);
  
    if (!isLoggedUser) { return (<Navigate replace to="/login" />); }

    return children;
}

export default PrivateRoute