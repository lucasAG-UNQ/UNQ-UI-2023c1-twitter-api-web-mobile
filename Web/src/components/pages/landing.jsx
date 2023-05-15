import React from 'react'
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
        <h1>Bienvenido a Twitter</h1>
        <div>¿No tenés cuenta? <Link to="/register">Registrate</Link></div>
        <div>¿Ya sos usuario? <Link to="/login">Iniciar sesión</Link></div>
        </>
  )
}

export default Landing