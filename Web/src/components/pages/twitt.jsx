import React from 'react';
import TwApi from "../services"
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import FullTwittWithActions from "../molecules/fullTwittWithActions"

const Twitt = () => {
  const  { id } = useParams();

  const [twitt,setTwitt] = useState('');
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.getTwitt(id)
                      .then(response => setTwitt(response.data))
                      .catch((error) => setError(error.description))
                },[])

  if (!twitt && !error) return <div className="fw-bold mb-2">Loading... </div>
  return (
    <div className="vh-100 overflow-auto">
      <h1 className="fw-bold mb-4 p-4">Twitt</h1>
        {(twitt)?<FullTwittWithActions twit={twitt} key={twitt.id} />:<p>{error}</p> }
    </div>
  )
}

export default Twitt