import React from 'react';
import { useParams } from 'react-router-dom';

const Twitt = () => {
  const  { id } = useParams();

  return (
    <>
      <h1>Twitt</h1>
      <div className="twitt">Twitt ID: {id}</div>
    </>
  )
}

export default Twitt