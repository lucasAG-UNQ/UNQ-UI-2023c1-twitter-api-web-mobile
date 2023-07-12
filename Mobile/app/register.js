import { React, useState, useEffect} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input, InputPass, TwitterLogo } from "./components/atoms/atomos_basic"
import { useNavigation } from '@react-navigation/native';
import TwApi from "./services/services";

import loginStyles from "./styles/estilos"

const Register = () => {
  const [user, setuser] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setpass] = useState('')
  const [imagen, setImagen] = useState('')
  const [backImg, setBackImg] = useState('')

  const [token, setToken] = useState(false)
  const [error, setError] = useState(null)

  const regData = {
    username: user,
    password: pass,
    email: email,
    image: imagen,
    backgroundImage: backImg
  }

  const navigation = useNavigation()

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
          setError(null);
        } )
        .catch( (error) => setError(error.description));
    }
  }
  
  const handleLoginSubmit = () => {
    TwApi.login({ username: regData.username, password: regData.password })
      .then((response) => {
        setError(null);
        TwApi.saveDataToStorage( "twitterAccessToken", response.headers.authorization);
        navigation.navigate("home", { state: { isLoggedUser: true }, });
      })
      .catch((error) => setError(error.description));
  };

  useEffect(() => {
    if (token) { 
      setTimeout( handleLoginSubmit , 1500);
    }
  }, [token]);
  
  return(
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <View style={loginStyles.cardBody}>
          <View style={loginStyles.logoContainer}>
            <TwitterLogo />
          </View>
          <View style={loginStyles.formContainer}>
          <Text style={loginStyles.title}>REGISTRO</Text>
            <Text style={loginStyles.subtitle}>Por favor ingrese los siguientes datos</Text>
            <Text style={loginStyles.subtitle}>para crear tu cuenta.</Text>
            <Input seccion={'Nombre de usuario'} setFuncion={setuser}/>
            <Input seccion={'eMail'} setFuncion={setEmail}/>
            <InputPass seccion={'Password'} setFuncion={setpass}/>
            <Input seccion={'Imgen de perfil'} setFuncion={setImagen}/>
            <Input seccion={'Imagen de fondo'} setFuncion={setBackImg}/>
            { !token 
              ? <TouchableOpacity style={loginStyles.button} onPress={handleRegisterSubmit}><Text style={loginStyles.buttonText}>Registrarse</Text></TouchableOpacity>
              : <Text style={loginStyles.subtitle}>Registro OK! Ingresando...</Text> }
            { error ? <Text style={loginStyles.errorText}>{error}</Text> : <></> }
          </View>
        </View>
      </View>
    </View>
  )
}

export default Register
