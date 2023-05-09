import React from 'react';
import axios from 'axios';

const Login = () => {

  console.log(localStorage.getItem('twitterAcessToken'));

  axios.post('http://192.168.0.192:7070/login', { username: 'a', password: 'a'})
    .then(response => {
      console.log(response)
      localStorage.setItem('twitterAcessToken', response.headers.authorization);
    })
    .catch(error => {
      console.log(error.response.data.message)
    })

  return (
    <div> Login</div>
  )
}

export default Login