import React from 'react'
import { Link } from "react-router-dom";
import TwitterLogo from '../atoms/twitterlogo';

const Landing = () => {
  return (
    <div className="container py-4 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-10 col-lg-6 col-xl-6">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5 text-center">
              <TwitterLogo sizeClass="img_logo_50" />
              <h1 className="fw-bold mb-2">Bienvenido a Twitter</h1>
              <div className="card-body p-5">
                <h4>¿No tenés cuenta? <Link to="/register">Registrate</Link></h4>
                <h4>¿Ya sos usuario? <Link to="/login">Iniciar sesión</Link></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing