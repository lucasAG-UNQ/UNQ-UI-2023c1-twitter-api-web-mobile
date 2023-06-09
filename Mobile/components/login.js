import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import loginStyles from "./estilos"
//import { Link } from "react-router-dom";
//import { useNavigate } from 'react-router'
//import TwApi from '../services.js'
//import TwitterLogo from '../atoms/twitterlogo';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  //const navigate = useNavigate()

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
//      TwApi.login({ username: username, password: password })
//      .then( (response) => {
//        setError('');
//        localStorage.setItem('twitterAcessToken', response.headers.authorization);
//        navigate("/home", { state: { isLoggedUser: true } });
//      })
//      .catch( (error) => setError(error.description));
    }
  }

  return (
    <View style={loginStyles.container}>
      <View style={loginStyles.card}>
        <View style={loginStyles.cardBody}>
          <View style={loginStyles.formContainer}>
            <Text style={loginStyles.title}>LOGIN</Text>
            <Text style={loginStyles.subtitle}>Por favor ingrese su usuario y contraseña</Text>
            <TextInput
              style={loginStyles.input}
              placeholder="Usuario"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={loginStyles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={loginStyles.button} onPress={handleLoginSubmit}>
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={loginStyles.errorText}>{error}</Text>
          </View>
          <View style={loginStyles.registerContainer}>
            <Text style={loginStyles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={loginStyles.registerLink}>REGISTRATE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

   
  export default Login