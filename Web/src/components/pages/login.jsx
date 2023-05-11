import React from 'react';
import TwApi from '../services.js'

const Login = () => {

  console.log(localStorage.getItem('twitterAcessToken'));

  TwApi.login();
  
  return (
    <div> Login</div>
  )
}

export default Login