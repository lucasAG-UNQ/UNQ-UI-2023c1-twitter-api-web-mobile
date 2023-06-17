import React from 'react';
import { Image, TextInput } from 'react-native';
import loginStyles from './estilos/estilos';
import logo from './image/twitter_logo.png';

const Input = ({seccion, setFuncion}) => {
  const handler = (value) => {
    setFuncion(value)
  }
  return(
    <TextInput
      style={loginStyles.input}
      placeholder={seccion}
      onChangeText={handler}/>);
}

const InputPass = ({seccion, setFuncion}) => {
  const handler = (value ) => {
    setFuncion(value)
  }
  return(
    <TextInput
      style={loginStyles.input}
      placeholder={seccion}
      secureTextEntry
      onChangeText={handler}/>);
}

const TwitterLogo = (props) => {
  return (
    <Image
      source={logo}
      style={loginStyles.logo}
      resizeMode="contain"
      accessibilityLabel="Twitter"
    />
  )
}
/*
const Boton = ({funciondeboton, loguear}) => {
    return(
    <button type="button" className="btn btn-outline-light btn-lg px-5" onClick={loguear}>{funciondeboton}</button>
  );
}
*/

export { Input, InputPass, TwitterLogo }