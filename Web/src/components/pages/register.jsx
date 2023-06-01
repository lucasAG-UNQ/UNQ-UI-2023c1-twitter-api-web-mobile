import { React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router'
import TwApi from '../services.js'
import { Boton, InputText}from '../atoms/atomos_basic';
import TwitterLogo from '../atoms/twitterlogo';

const Register = () => {
  const [user, setuser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setpass] = useState('')
  const [imagen, setImagen] = useState('')
  const [backImg, setBackImg] = useState('')

  const [token, setToken] = useState(TwApi.isUserLogged())
  const [error, setError] = useState('')

  const regData = {
    username: user,
    password: pass,
    email: email,
    image: imagen,
    backgroundImage: backImg
  }

  const navigate = useNavigate()

  const validar = () => {
    let valida = true
    if(user.length < 1){
      setError("Debe ingresar un nombre de usuario")
      return false
    }
    if(email.length < 5 || !email.includes("@") || !email.includes(".")){
      setError("Debe ingresar un e-mail válido")
      return false
    }
    if(pass.length < 1){
        setError("Debe ingresar una contraseña")
        return false
    }
    if(imagen.length < 12 || (!imagen.toLowerCase().startsWith("http://") && !imagen.toLowerCase().startsWith("https://"))){
      setError("La imagen debe ser una URL válida")
      return false
    }
    if(backImg.length < 12 || (!backImg.toLowerCase().startsWith("http://") && !backImg.toLowerCase().startsWith("https://"))){
      setError("La imagen de fondo debe ser una URL válida")
      return false
    }
    return valida
  }
  
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    if (validar()) {
      TwApi.register(regData)
        .then( () => {
          setToken(true);
          setError('');
        } )
        .catch( (error) => setError(error.description));
    }
  }
  
  useEffect(() => {
    if (token) { 
      setError("USUARIO REGISTRADO EXITOSAMENTE")
      setTimeout(() => { navigate("/login") }, 3000);
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
                  <InputText seccion={'Nombre de usuario'} setFuncion={setuser}/>
                  <InputText seccion={'eMail'} setFuncion={setEmail}/>
                  <InputText seccion={'Password'} setFuncion={setpass}/>
                  <InputText seccion={'Imgen de perfil'} setFuncion={setImagen}/>
                  <InputText seccion={'Imagen de fondo'} setFuncion={setBackImg}/>
                  <div className="text-center">
                    <Boton funciondeboton ={'Registrarse'} loguear={handleRegisterSubmit}/>
                  </div>
                  <div className="etiquetaRoja  text-center">{error}</div>
                </form>

              </div>
              <div className="col-4 d-flex align-items-center order-1 order-lg-2">
                <div className="text-center">
                  <TwitterLogo sizeClass="img_logo_70" />
                </div>
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