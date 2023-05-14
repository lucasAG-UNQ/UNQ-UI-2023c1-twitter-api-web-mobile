import { React, useState, useEffect} from 'react';
import { NavLink, Redirect } from "react-router-dom";
import { useNavigate } from 'react-router'
import TwApi from '../services.js'
import {ImagenTweetter,Boton, InputTextLogin}from "../atoms/atomos_basic.jsx";
import "../css_style/login.css";

const Register = () => {
  const [user, setuser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setpass] = useState('')
  const [imagen, setImagen] = useState('')
  const [backImg, setBackImg] = useState('')

  const [token, setToken] = useState(TwApi.isUserLogged())
  const [error, setError] = useState(".")

    let regData = {
      username: user,
      password: pass,
      email: email,
      image: imagen,
      backgroundImage: backImg
    }

  const navigate = useNavigate()

  const validar = () => {
    let valida = true
    if(regData.username.length < 1){
      setError("Debe ingresar un nombre de usuario")
      return false
    }
    if(regData.email.length < 5 || !regData.email.includes("@") || !regData.email.includes(".")){
      setError("Debe ingresar un eMail válido")
      return false
    }
    if(regData.password.length < 1){
        setError("Debe ingresar una contraseña")
        return false
    }
    if(regData.image.length < 12 || !regData.image.toLowerCase().startsWith("http://") && !regData.image.toLowerCase().startsWith("https://")){
      setError("La imagen debe ser una URL válidad")
      return false
    }
    if(regData.backgroundImage.length < 12 || !regData.backgroundImage.toLowerCase().startsWith("http://") && !regData.image.toLowerCase().startsWith("https://")){
      setError("La imagen de fondo debe ser una URL válidad")
      return false
    }
    return valida
  }
  
  const handleRegisterSubmit =   (event) => {
    event.preventDefault();
    if (validar()) {
      TwApi.register(regData, setToken, setError);
    }
  }
  
  useEffect(() => {
    if (token) { 
      setError("USUARIO REGISTRADO EXITOSSAMENTE")
      setTimeout(() => {navigate("/login")}, 3000);
    }
  }, [token]);
  
  return(
  <div className="container py-4 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-md-8 col-lg-6 col-xl-8">
        <div className="card bg-dark text-white">
          <div className="card-body p-5" >
            <div className="row justify-content-center">
              <div className="col-8 order-2 order-lg-1" >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Registro</p>
                <form onSubmit={handleRegisterSubmit} className="">
                  <InputTextLogin seccion={'Nombre de usuario'} setFuncion={setuser}/>
                  <InputTextLogin seccion={'eMail'} setFuncion={setEmail}/>
                  <InputTextLogin seccion={'Password'} setFuncion={setpass}/>
                  <InputTextLogin seccion={'Imgen de perfil'} setFuncion={setImagen}/>
                  <InputTextLogin seccion={'Imagen de fondo'} setFuncion={setBackImg}/>
                  <div className="text-center">
                    <Boton funciondeboton ={'Registrarse'} loguear={handleRegisterSubmit}/>
                  </div>
                  <div className="etiquetaRoja  text-center">{error}</div>
                </form>

              </div>
              <div className="col-4 d-flex align-items-center order-1 order-lg-2">
                <ImagenTweetter clase="img_logo_70"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register