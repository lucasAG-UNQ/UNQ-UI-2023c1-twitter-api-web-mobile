import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import TwApi from '../services.js'

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({username: "", password: ""});
  
  const handleOnChangeInput = name => event => {
    setLoginData(prevState => ({ ...prevState , [name]: event.target.value}))
  }
  
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    TwApi.login(loginData);
    navigate("/", { state: { isLoggedUser: true}});
  }

  return (
    <>
      <h1>Login</h1>
      <div className="container">
        <div className="col-md-6 col-sm-12">
          <form onSubmit={handleSubmitLogin}>
            <div className="form-floating mb-3">              
              <input type="text" 
                name="username" 
                className="form-control" 
                placeholder="usuario" 
                value={loginData.username}
                onChange={handleOnChangeInput("username")}/>
              <label htmlFor="username">Usuario</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" 
                name="password" 
                className="form-control" 
                placeholder="contraseña" 
                value={loginData.password}
                onChange={handleOnChangeInput("password")}/>
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