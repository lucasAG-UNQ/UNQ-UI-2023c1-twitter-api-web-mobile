import { React, useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TwApi from '../services.js'

const Twitt = () => {
  const  { id } = useParams();
  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());

  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  if (!isLoggedUser) { return (<Navigate replace to="/login" />); }

  return (
    <>
      <h1>Twitt</h1>
      <div className="twitt">Twitt ID: {id}</div>
    </>
  )
}

export default Twitt