import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router'
import TwApi from '../services.js'
import { Boton, InputText } from "../atoms/atomos_basic";
import TwitterLogo from '../atoms/twitterlogo';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const validar = () => {
    let valida = true
    if(password.length < 1){
        setError("Debe ingresar la contraseña")
        valida = false
    }
    if(username.length < 1){
        setError("Debe ingresar un nombre de usuario")
        valida = false
    }
    return valida
  }
  
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (validar()) {
      TwApi.login({ username: username, password: password })
      .then( (response) => {
        setError('');
        localStorage.setItem('twitterAcessToken', response.headers.authorization);
        navigate("/home", { state: { isLoggedUser: true } });
      })
      .catch( (error) => setError(error.description));
    }
  }

  return ( 
    <div className="container py-4 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5">
              <div className="text-center">
                <TwitterLogo sizeClass="img_logo_25" />
              </div>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-md-5 mt-md-4 pb-5">
                  <div className="text-center">
                    <h1 className="fw-bold mb-2">LOGIN</h1>
                    <p className="text-white-50 mb-5">Por favor ingrese su usuario y contraseña</p>
                  </div>
                  <InputText seccion={'Usuario'} setFuncion={setUsername}/>
                  <InputText seccion={'Password'} setFuncion={setPassword}/>
                  <div className="text-center">
                    <Boton funciondeboton ={'Login'} loguear={handleLoginSubmit}/>
                  </div>
                  <div className="etiquetaRoja text-center">{error}</div>
                </div>
              </form>
              <div className="text-center">
                ¿No tenés cuenta? <Link to="/register">REGISTRATE</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login