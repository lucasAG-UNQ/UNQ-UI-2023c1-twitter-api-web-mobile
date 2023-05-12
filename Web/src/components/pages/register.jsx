import { React, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const Register = () => {

  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());

  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  if (isLoggedUser) { return (<Navigate replace to="/" />); }

  return (
    <h1>
      Register</h1>
  )
}

export default Register