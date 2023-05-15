import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import TwApi from '../services.js'
import TwitterLogo from '../atoms/twitterlogo';

const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => { 
      TwApi.logout();
      navigate("/", { state: { isLoggedUser: false } }) 
    }, 3000);
  }, []);
  
  return (
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-10 col-lg-6 col-xl-6">
            <div className="card bg-dark text-white" >
              <div className="card-body p-5 text-center">
                <TwitterLogo sizeClass="img_logo_50" />
                <h2 className="fw-bold mb-2">TE VAMOS A EXTRAÑAR</h2>
                <h3 className="text-white-60 mb-5">Volvé pronto!!!</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Logout