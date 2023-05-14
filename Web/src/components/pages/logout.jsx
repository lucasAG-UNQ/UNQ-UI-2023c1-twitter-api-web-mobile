import React from 'react';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TwApi from '../services.js'
import {ImagenTweetter} from '../atoms/atomos_basic.jsx'

const Logout = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
  const navigate = useNavigate()
  
  useEffect(() => {
    if (TwApi.isUserLogged()) { 
      setIsLoggedUser(TwApi.isUserLogged()); }
  }, [TwApi.isUserLogged()]);

  if (!isLoggedUser) {
    setTimeout(() => {navigate("/")}, 3000);
  }
   
  TwApi.logout();
  
  return (
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-10 col-lg-6 col-xl-6">
            <div className="card bg-dark text-white" >
              <div className="card-body p-5 text-center">
                <ImagenTweetter/>
                <h2 className="fw-bold mb-2">TE VAMOS A EXTRAÑAR</h2>
                <p></p>
                <h3 className="text-white-60 mb-5">Volve pronto !!!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

}

export default Logout