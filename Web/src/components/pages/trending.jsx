import React from 'react';
import TwApi from "../services"
import TwitLog from "../organisms/twitLog";
import { useState, useEffect } from "react";

const Trending = () => {
  const [twitts,setTwitts] = useState([]);
  const [error,setError] = useState('');

  useEffect(()=>{TwApi.trendingTopics()
                      .then(response => setTwitts(response.data.results))
                      .catch((error) => setError(error.description))
                },[])

  if (error) return <div><h2>Ups... algo salió mal</h2><p className="etiquetaRoja">{error}</p></div>

  if (!twitts) return <div className="fw-bold mb-2">Loading... </div>

  return (
    <div className="vh-100 overflow-hidden">
      <div>
        <h1 className="fw-bold mb-4 p-4">Trending Topics</h1>
      </div>
      <div className="vh-100 overflow-auto">
        { (twitts.length > 0)?<TwitLog twits={twitts} />:<p>No se encontraron Twits de tendencia.</p>}
      </div>
    </div>
  )
}

export default Trending

    