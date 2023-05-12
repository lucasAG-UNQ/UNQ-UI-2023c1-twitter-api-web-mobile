import React from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const  { id } = useParams();

  return (
    <>
      <h1>Usuario</h1>
      <div className="usuario">Usuario ID: {id}</div>
    </>
  )
}

export default User