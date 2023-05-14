import { React, useState, useEffect} from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { useNavigate } from 'react-router'
import TwApi from '../services.js'
import {ImagenTweetter,Boton, InputTextLogin}from "../atoms/atomos_basic.jsx";
import "../css_style/login.css";

const Login = () => {
  const [user, setuser] = useState('')
  const [pass, setpass] = useState('')
  const [token, setToken] = useState(TwApi.isUserLogged())
  const [error, setError] = useState("")

  const navigate = useNavigate()
    let loginData = {
      username: user,
      password: pass
    }

  const validar = () => {
    let valida = true
    if(loginData.password.length < 1){
        setError("Debe ingresar la contraseña")
        valida = false
    }
    if(loginData.username.length < 1){
        setError("Debe ingresar un nombre de usuario")
        valida = false
    }
    return valida
  }
  
  const handleLoginSubmit =   (event) => {
    event.preventDefault();
    if (validar()) {
      TwApi.login(loginData, setToken, setError);
    }
  }
  
  useEffect(() => {
    if (token) { 
      navigate("/");
    }
  }, [token]);
  

  return ( 
    <div className="container py-4 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-4">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5 text-center">
              <ImagenTweetter/>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h1 className="fw-bold mb-2">LOGIN</h1>
                  <p className="text-white-50 mb-5">Por favor ingrese su usuario y contraseña</p>
                  <InputTextLogin seccion={'Usuario'} setFuncion={setuser}/>
                  <InputTextLogin seccion={'Password'} setFuncion={setpass}/>
                  <Boton funciondeboton ={'Login'} loguear={handleLoginSubmit}/>
                  <div className="etiquetaRoja">{error}</div>
                </div>
                
              </form>
            <div>
              ¿No tenes cuanta?  <NavLink to="/register">REGISTRATE</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login