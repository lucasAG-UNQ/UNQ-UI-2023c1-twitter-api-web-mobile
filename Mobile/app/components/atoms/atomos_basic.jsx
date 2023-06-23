import React from 'react';
import { Image, TextInput } from 'react-native';
import loginStyles from '../../styles/estilos';
import logo from '../../assets/twitter_logo.png';

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

const InputSearch = ({seccion, setFuncion}) => {
  const handler = (value ) => {
    setFuncion(value)
  }
return(
  <TextInput
    style={loginStyles.inputSearch}
    placeholder={seccion}
    onChangeText={handler}
  />);
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

export {Input, InputPass, TwitterLogo, InputSearch }
