import { React, useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import TwApi from '../services.js'

const Login = () => {

  const [isLoggedUser, setIsLoggedUser] = useState(TwApi.isUserLogged());
  
  useEffect(() => {
    if (TwApi.isUserLogged()) { setIsLoggedUser(TwApi.isUserLogged()); }
  }, []);

  const [loginData, setLoginData] = useState({username: "", password: ""});
  
  const handleInputChange = name => event => {
    setLoginData(prevState => ({ ...prevState , [name]: event.target.value}))
  }
  
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    TwApi.login(loginData);
  }
  
  if (isLoggedUser) { return (<Navigate replace to="/" />); }

  return (
    <>
      <h1>Login</h1>
      <div className="container">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={handleLoginSubmit}>
            <div className="form-floating mb-3">              
              <input type="text" 
                name="username" 
                className="form-control" 
                placeholder="usuario" 
                value={loginData.username}
                onChange={handleInputChange("username")}/>
              <label htmlFor="username">Usuario</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" 
                name="password" 
                className="form-control" 
                placeholder="contraseña" 
                value={loginData.password}
                onChange={handleInputChange("password")}/>
              <label htmlFor="password">Contraseña</label>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login