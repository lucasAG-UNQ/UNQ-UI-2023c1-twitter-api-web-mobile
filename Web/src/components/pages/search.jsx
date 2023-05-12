import { React, useState, useEffect } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import TwApi from '../services.js'

const Search = () => {

  const [params] = useSearchParams();

  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());

  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  if (!isLoggedUser) { return (<Navigate replace to="/login" />); }

  return (
    <>
      <h1>Buscador</h1>
      <div>{params.getAll('q')}</div>
    </>
  )
}

export default Search