import { React, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TwApi from '../services.js'

const User = () => {
  const  { id } = useParams();
  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());

  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  if (!isLoggedUser) { return (<Navigate replace to="/login" />); }

  return (
    <>
      <h1>Usuario</h1>
      <div className="usuario">Usuario ID: {id}</div>
    </>
  )
}

export default User